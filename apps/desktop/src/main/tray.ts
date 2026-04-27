import { app, type BrowserWindow, Menu, nativeImage, Tray } from 'electron'


// Minimal 16x16 monochrome PNG for tray (works on all platforms)
const TRAY_ICON_B64 =
  'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlz' +
  'AAALEwAACxMBAJqcGAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAABSSURB' +
  'VDiNY2AYBfQHAAIIAAH/A4H/AYH/AYH/AYH/AYH/AYH/AYH/AYH/AYH/AYH/AYH/AYH/AYH/' +
  'AYH/AYH/AYH/AYH/AYH/AQAAAP//AwAI4AX/oAAAAABJRU5ErkJggg=='

export function createTray(mainWindow: BrowserWindow): Tray {
  const icon = nativeImage.createFromDataURL(`data:image/png;base64,${TRAY_ICON_B64}`)
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