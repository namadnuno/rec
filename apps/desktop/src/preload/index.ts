import { electronAPI } from '@electron-toolkit/preload'
import { contextBridge, ipcRenderer } from 'electron'
import type { Api, CaptureSource, UploadStage } from './api'

const api: Api = {
  getSources: () =>
    ipcRenderer.invoke('recording:getSources') as Promise<CaptureSource[]>,

  stopRecording: (buffer: ArrayBuffer) =>
    ipcRenderer.invoke('recording:stop', buffer) as Promise<{ filePath: string }>,

  uploadRecording: (filePath: string) =>
    ipcRenderer.invoke('upload:recording', filePath) as Promise<string>,

  onUploadProgress: (cb: (stage: UploadStage) => void) => {
    const handler = (_: Electron.IpcRendererEvent, stage: UploadStage) => cb(stage)
    ipcRenderer.on('upload:progress', handler)
    return () => ipcRenderer.off('upload:progress', handler)
  },

  openExternal: (url: string) => ipcRenderer.send('shell:openExternal', url),

  copyToClipboard: (text: string) => ipcRenderer.send('clipboard:write', text),
}

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-expect-error
  window.electron = electronAPI
  // @ts-expect-error
  window.api = api
}
