# Screen Recording — Linux Implementation Plan

## Context

UI is complete (4 screens: Idle → Recording → Uploading → Done).
IPC bridge is empty. Main process has no recording logic.
Goal: wire real screen capture on Linux behind the existing UI.

---

## Architecture Decision

**Approach: Electron `desktopCapturer` + renderer `MediaRecorder` → ffmpeg mux**

| Layer | Responsibility |
|-------|---------------|
| Main process | Source enumeration, ffmpeg mux/convert, file I/O, shell/clipboard |
| Preload | Typed IPC bridge (`window.api`) |
| Renderer | `getUserMedia` stream, `MediaRecorder`, chunk accumulation |

Why not ffmpeg-only in main:
- `desktopCapturer` + `MediaRecorder` handles pause/resume natively
- No child process stream complexity
- WebM → MP4 mux via ffmpeg is fast (no re-encode)

Why not pure MediaRecorder:
- Output is WebM; users expect MP4
- ffmpeg mux at the end gives MP4 with correct timestamps (no re-encode, ~1s)

---

## Linux Display Protocol Handling

Linux has two display servers — code must handle both.

### Detection

```ts
// main process
const isWayland = process.env.WAYLAND_DISPLAY !== undefined
  || process.env.XDG_SESSION_TYPE === 'wayland'
```

### X11

- `desktopCapturer.getSources({ types: ['screen', 'window'] })` works out of the box
- Region capture: use ffmpeg `x11grab` with crop geometry (no `desktopCapturer` needed)
- Cursor: ffmpeg `-draw_mouse 1` flag; Electron stream passes cursor automatically

### Wayland

- Electron 32+ supports Wayland via `--ozone-platform=wayland` or `ELECTRON_OZONE_PLATFORM_HINT=auto`
- `desktopCapturer` on Wayland requires `--enable-features=WebRTCPipeWireCapturer` flag
- PipeWire portal (`xdg-desktop-portal`) must be installed on user's system
- Region capture on Wayland: only available via portal (no programmatic crop)
- Set in `app.commandLine.appendSwitch` before `app.whenReady()`

```ts
// main/index.ts — add before app.whenReady()
app.commandLine.appendSwitch('enable-features', 'WebRTCPipeWireCapturer')
if (process.env.WAYLAND_DISPLAY) {
  app.commandLine.appendSwitch('ozone-platform', 'wayland')
}
```

---

## Phase 1 — IPC Bridge

**File: `src/preload/index.ts`**

Expose typed `window.api` with these channels:

```ts
window.api = {
  // Source enumeration
  getSources(): Promise<Source[]>

  // Recording lifecycle
  startRecording(options: RecordingOptions): Promise<void>
  stopRecording(): Promise<{ filePath: string; durationMs: number }>
  pauseRecording(): void
  resumeRecording(): void

  // Upload
  uploadRecording(filePath: string): Promise<void>
  on(channel: 'upload:progress', cb: (stage: UploadStage) => void): () => void

  // Shell
  openExternal(url: string): void
  copyToClipboard(text: string): void
}
```

All `ipcRenderer.invoke` calls go here. Keep renderer free of Electron imports.

---

## Phase 2 — Main Process IPC Handlers

**File: `src/main/index.ts` (or split into `src/main/handlers/`)**

### `recording:getSources`

```ts
ipcMain.handle('recording:getSources', async () => {
  const sources = await desktopCapturer.getSources({
    types: ['screen', 'window'],
    thumbnailSize: { width: 320, height: 180 },
    fetchWindowIcons: true,
  })
  return sources.map(s => ({
    id: s.id,
    name: s.name,
    thumbnail: s.thumbnail.toDataURL(),
  }))
})
```

### `recording:stop`

- Receives accumulated WebM chunks from renderer via `ipcMain.handle`
- Writes WebM to temp file
- Runs ffmpeg mux: `ffmpeg -i input.webm -c copy output.mp4`
- Moves output to `~/Videos/rec/rec-YYYY-MM-DD-HH-mm-ss.mp4`
- Returns final file path + duration

### `recording:upload`

- Reads file from disk
- Streams to backend (multipart or presigned S3 URL)
- Emits progress events: `win.webContents.send('upload:progress', stage)`

### Shell handlers

```ts
ipcMain.on('shell:openExternal', (_, url) => shell.openExternal(url))
ipcMain.on('clipboard:write',   (_, text) => clipboard.writeText(text))
```

---

## Phase 3 — Renderer Recording Logic

**File: `src/renderer/src/recording/RecordingScreen.tsx`**

### Stream acquisition

```ts
const sources = await window.api.getSources()
// user selected sourceId matches sources[i].id

const stream = await navigator.mediaDevices.getUserMedia({
  audio: options.audioEnabled
    ? { mandatory: { chromeMediaSource: 'desktop' } }
    : false,
  video: {
    mandatory: {
      chromeMediaSource: 'desktop',
      chromeMediaSourceId: selectedSource.id,
      minWidth: 1280,
      maxWidth: 3840,
      minFrameRate: 30,
    }
  }
} as MediaStreamConstraints)
```

### MediaRecorder setup

```ts
const recorder = new MediaRecorder(stream, {
  mimeType: 'video/webm;codecs=vp9,opus',
  videoBitsPerSecond: 4_000_000,   // 4 Mbps — good quality, reasonable size
})

const chunks: Blob[] = []
recorder.ondataavailable = e => { if (e.data.size > 0) chunks.push(e.data) }
recorder.start(1000)  // chunk every 1s (smooth progress)
```

### Pause / Resume

```ts
// pause
recorder.pause()
stream.getVideoTracks()[0].enabled = false  // freeze frame

// resume
stream.getVideoTracks()[0].enabled = true
recorder.resume()
```

### Stop

```ts
recorder.stop()
recorder.onstop = async () => {
  const blob = new Blob(chunks, { type: 'video/webm' })
  const buffer = await blob.arrayBuffer()
  const { filePath, durationMs } = await window.api.stopRecording(buffer)
  onStop(Math.round(durationMs / 1000))
}
```

---

## Phase 4 — Region Capture (Linux-specific)

Region capture requires separate handling per display protocol.

### X11

1. Renderer shows overlay window for user to draw selection rectangle
2. Main process receives `{ x, y, width, height, display }` geometry
3. Launch ffmpeg directly (no desktopCapturer):

```ts
// src/main/recorders/x11Grab.ts
spawn('ffmpeg', [
  '-f', 'x11grab',
  '-r', '30',
  '-s', `${width}x${height}`,
  '-i', `:0.0+${x},${y}`,
  '-draw_mouse', showCursor ? '1' : '0',
  '-f', 'webm',
  '-c:v', 'vp9',
  'pipe:1'          // pipe to Node stream
])
```

### Wayland

- Region capture goes through PipeWire portal — OS presents its own selection UI
- No overlay needed: `desktopCapturer` with portal handles it
- Constraint: user cannot define region programmatically, only via portal dialog

---

## Phase 5 — UploadingScreen: Real Events

Replace `setTimeout` simulation with IPC events.

**Renderer:**
```ts
useEffect(() => {
  const unsub = window.api.on('upload:progress', (stage) => setStage(stage))
  window.api.uploadRecording(filePath)
  return unsub
}, [])
```

**Main process** emits stages as each step completes:
```
saving → uploading → transcribing → titling → done
```

**Backend contract** (to be defined):
- `POST /recordings` multipart — returns `{ jobId }`
- `GET /recordings/:jobId/status` SSE stream — emits stage events
- `GET /recordings/:jobId` — returns `{ shareUrl }`

---

## Phase 6 — DoneScreen: Fix Stubs

**`handleOpenBrowser`:**
```ts
function handleOpenBrowser() {
  window.api.openExternal(shareUrl)
}
```

**Copy button:**
```ts
function handleCopy() {
  window.api.copyToClipboard(shareUrl)
  setCopied(true)
  setTimeout(() => setCopied(false), 2000)
}
```

---

## Phase 7 — Output & File Handling

**Save path:** `~/Videos/rec/rec-YYYY-MM-DD-HH-mm-ss.mp4`

**ffmpeg mux command (no re-encode):**
```sh
ffmpeg -i /tmp/rec-tmp.webm -c copy ~/Videos/rec/rec-2026-04-26-14-30-00.mp4
```

**Codec selection:**
- Default: VP9 + Opus → MP4 mux (fastest, best Linux compat)
- Optional quality setting (future): H.264 via re-encode (slower, wider compat)

**Cleanup:** delete `/tmp/rec-tmp.webm` after successful mux.

---

## Dependencies to Add

```sh
# apps/desktop
pnpm add ffmpeg-static          # bundled ffmpeg binary (no system dep)

# or detect system ffmpeg first, fall back to ffmpeg-static
```

`ffmpeg-static` bundles a prebuilt ffmpeg for the target platform — no requirement on user to install ffmpeg. Use `ffmpeg-static` path in `spawn()`.

---

## Implementation Order

1. **Phase 1** — IPC bridge (preload types) — unblocks everything
2. **Phase 2** — Main handlers: `getSources`, shell, clipboard (no ffmpeg yet)
3. **Phase 3** — Renderer: stream + MediaRecorder (full/window sources work)
4. **Phase 2 cont.** — `recording:stop` handler with ffmpeg mux
5. **Phase 5** — Upload events (needs backend contract first)
6. **Phase 4** — Region capture (most complex, do last)
7. **Phase 6** — DoneScreen stubs (trivial, do alongside Phase 2)

---

## Open Questions Before Starting

- [ ] Backend API contract for upload (multipart vs presigned S3)?
- [ ] Is `ffmpeg-static` acceptable or expect system ffmpeg?
- [ ] Target Wayland support now or X11-only first?
- [ ] Region capture: Wayland portal dialog acceptable (no custom overlay)?
- [ ] Output format: WebM OK or MP4 required for first release?
