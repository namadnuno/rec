import { join } from 'node:path'
import { app, type BrowserWindow, Menu, nativeImage, Tray } from 'electron'

export function createTray(mainWindow: BrowserWindow): Tray {
  const icon = nativeImage.createFromPath(join(__dirname, '../../resources/rec-icon.png'))
  const tray = new Tray(icon)
  tray.setToolTip('Rec')

  const menu = Menu.buildFromTemplate([
    {
      label: 'Open',
      click: () => {
        mainWindow.show()
        mainWindow.focus()
      },
    },
    {
      label: 'DevTools',
      click: () => mainWindow.webContents.openDevTools({
        mode: 'detach'
      }),
    },
    { type: 'separator' },
    { label: 'Quit', click: () => app.quit() },
  ])

  tray.setContextMenu(menu)
  tray.on('double-click', () => {
    mainWindow.show()
    mainWindow.focus()
  })

  return tray
}