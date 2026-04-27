import { BrowserWindow, ipcMain } from 'electron'
import type { UploadStage } from '../../preload/api'

export function registerUploadHandlers(): void {
  ipcMain.handle('upload:recording', async (event, filePath: string): Promise<string> => {
    const win = BrowserWindow.fromWebContents(event.sender)
    const send = (stage: UploadStage) => win?.webContents.send('upload:progress', stage)

    // TODO: replace stub with real backend integration
    // Pattern:
    //   1. send('saving')  — already done by recording:stop handler
    //   2. POST /recordings (multipart or presigned S3) → { jobId }
    //   3. GET /recordings/:jobId/status (SSE) → emit stage events
    //   4. resolve with shareUrl from final SSE event
    send('saving')
    send('uploading')
    send('transcribing')
    send('titling')
    send('done')

    return `https://rec.app/v/${Date.now()}`
  })
}
