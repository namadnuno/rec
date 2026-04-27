import { clipboard, ipcMain, shell } from 'electron'

export function registerShellHandlers(): void {
  ipcMain.on('shell:openExternal', (_event, url: string) => {
    shell.openExternal(url)
  })

  ipcMain.on('clipboard:write', (_event, text: string) => {
    clipboard.writeText(text)
  })
}
