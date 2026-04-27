import { desktopCapturer, ipcMain } from 'electron'
import { mkdir, unlink, writeFile } from 'fs/promises'
import { homedir } from 'os'
import { join } from 'path'
import { spawn } from 'child_process'
import type { CaptureSource } from '../../preload/api'

function outputDir(): string {
  return join(homedir(), 'Videos', 'rec')
}

function timestamp(): string {
  return new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19)
}

function muxToMp4(webmPath: string, mp4Path: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const proc = spawn('ffmpeg', ['-y', '-i', webmPath, '-c', 'copy', mp4Path])
    proc.on('close', (code) => (code === 0 ? resolve() : reject(new Error(`ffmpeg exited ${code}`))))
    proc.on('error', reject)
  })
}

export function registerRecordingHandlers(): void {
  ipcMain.handle('recording:getSources', async (): Promise<CaptureSource[]> => {
    const [screens, windows] = await Promise.all([
      desktopCapturer.getSources({
        types: ['screen'],
        thumbnailSize: { width: 320, height: 180 },
      }),
      desktopCapturer.getSources({
        types: ['window'],
        thumbnailSize: { width: 320, height: 180 },
        fetchWindowIcons: true,
      }),
    ])

    return [
      ...screens.map((s) => ({
        id: s.id,
        sourceId: 'full' as const,
        name: s.name,
        thumbnail: s.thumbnail.toDataURL(),
      })),
      ...windows.map((s) => ({
        id: s.id,
        sourceId: 'window' as const,
        name: s.name,
        thumbnail: s.thumbnail.toDataURL(),
      })),
    ]
  })

  ipcMain.handle(
    'recording:stop',
    async (_event, buffer: ArrayBuffer): Promise<{ filePath: string }> => {
      const dir = outputDir()
      await mkdir(dir, { recursive: true })

      const ts = timestamp()
      const webmPath = join(dir, `rec-${ts}.webm`)
      const mp4Path = join(dir, `rec-${ts}.mp4`)

      await writeFile(webmPath, Buffer.from(buffer))

      try {
        await muxToMp4(webmPath, mp4Path)
        await unlink(webmPath).catch(() => {})
        return { filePath: mp4Path }
      } catch {
        // ffmpeg unavailable — keep webm as fallback
        return { filePath: webmPath }
      }
    },
  )
}
