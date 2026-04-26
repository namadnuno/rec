# @rec/design-system

Tailwind v4 design system for **rec** — tokens, utilities, and React components shared across all apps in the monorepo.

## Setup

### 1. Add the dependency

In any app (`apps/desktop`, future `apps/web`, etc.):

```json
// apps/desktop/package.json
{
  "dependencies": {
    "@rec/design-system": "workspace:*"
  }
}
```

Then run `pnpm install` from the repo root.

---

### 2. Install Tailwind v4 in the app

For the Electron/Vite app:

```bash
pnpm add -D tailwindcss @tailwindcss/vite --filter @rec/desktop
```

Add the Vite plugin in `electron.vite.config.ts`:

```ts
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "electron-vite";

export default defineConfig({
  renderer: {
    plugins: [tailwindcss()],
    // ...
  },
});
```

---

### 3. Import the design system CSS

In the renderer's entry CSS file (e.g. `apps/desktop/src/renderer/src/index.css`):

```css
@import "@rec/design-system/css";
```

That's it. All `@theme` tokens and base styles are now available.

---

### 4. Use components

```tsx
import { Button, Timer, Badge, Toggle, SourceCard, Input, Select } from "@rec/design-system";

// Primary CTA
<Button variant="primary">Start recording</Button>

// Recording stop button
<Button variant="record">
  <span className="w-2 h-2 rounded-full bg-white animate-record-pulse" />
  Stop
</Button>

// Live timer
<Timer seconds={elapsed} recording={isRecording} size="lg" />

// Recording state badge
<Badge variant="record" dot>Recording</Badge>

// Source selector
<SourceCard
  icon="🖥"
  label="Full display"
  sublabel="1920×1080"
  selected={source === "full"}
  onClick={() => setSource("full")}
/>

// Form inputs
<Input label="Output folder" placeholder="/home/user/Videos/rec" />
<Select label="Audio device" options={[
  { value: "mic", label: "Built-in microphone" },
  { value: "hdmi", label: "HDMI Audio" },
  { value: "none", label: "None" },
]} />

// Toggle
<Toggle
  label="Record audio"
  sublabel="Built-in microphone"
  checked={audioEnabled}
  onChange={setAudioEnabled}
/>
```

---

## Token reference

All tokens are available as Tailwind utilities from the `@theme` block:

| Token group | CSS var | Tailwind class |
|---|---|---|
| Surfaces | `--color-bg-1` | `bg-bg-1` |
| Foreground | `--color-fg-0` | `text-fg-0` |
| Borders | `--color-border` | `border-border` |
| Teal | `--color-teal-400` | `bg-teal-400` |
| Red | `--color-red-500` | `bg-red-500` |
| Radius | `--radius-lg` | `rounded-lg` |
| Shadows | `--shadow-md` | `shadow-md` |
| Font sans | `--font-family-sans` | `font-sans` |
| Font mono | `--font-family-mono` | `font-mono` |

Custom utilities added via `@layer utilities`:

| Class | Purpose |
|---|---|
| `animate-record-pulse` | Pulsing opacity (recording dot) |
| `animate-fadein` | Entrance fade + slide up |
| `text-timer` | 48px mono timer display |
| `text-timer-sm` | 22px mono (tray) |
| `text-caps` | 11px uppercase tracking label |
| `drag-region` | Electron `-webkit-app-region: drag` |
| `no-drag` | Electron `-webkit-app-region: no-drag` |

---

## Raw token values (non-CSS contexts)

```ts
import { colors, spacing, radii, shadows } from "@rec/design-system";

// Useful for: canvas drawing, electron native APIs, test snapshots
colors.teal400   // "#2dd4bf"
colors.record    // "#ef4444"
radii.xl         // "12px"
```

---

## File structure

```
packages/design-system/
├── package.json
├── tsconfig.json
└── src/
    ├── index.ts              ← barrel export (components + tokens + cn)
    ├── tokens.ts             ← typed JS token constants
    ├── lib/
    │   └── cn.ts             ← clsx + tailwind-merge helper
    ├── css/
    │   └── globals.css       ← @import tailwindcss + @theme tokens
    └── components/
        ├── Button.tsx        ← primary / record / ghost / subtle / danger
        ├── Badge.tsx         ← default / primary / record / success / ai
        ├── Timer.tsx         ← HH:MM:SS with recording state
        ├── Input.tsx         ← text input + select
        ├── Toggle.tsx        ← controlled on/off switch
        └── SourceCard.tsx    ← source selector card (screen/window/camera)
```
