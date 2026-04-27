/// <reference types="vite/client" />

type UploadStage = 'saving' | 'uploading' | 'transcribing' | 'titling' | 'done'

interface CaptureSource {
  id: string
  sourceId: 'full' | 'window' | 'region' | 'camera'
  name: string
  thumbnail: string
}

interface Window {
  api: {
    getSources(): Promise<CaptureSource[]>
    stopRecording(buffer: ArrayBuffer): Promise<{ filePath: string }>
    uploadRecording(filePath: string): Promise<string>
    onUploadProgress(cb: (stage: UploadStage) => void): () => void
    openExternal(url: string): void
    copyToClipboard(text: string): void
  }
}
