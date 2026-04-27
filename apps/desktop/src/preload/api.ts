export type UploadStage = 'saving' | 'uploading' | 'transcribing' | 'titling' | 'done'

export interface CaptureSource {
  id: string          // opaque Electron desktopCapturer source ID
  sourceId: 'full' | 'window' | 'region' | 'camera'
  name: string
  thumbnail: string   // base64 data URL
}

export interface Api {
  getSources(): Promise<CaptureSource[]>
  stopRecording(buffer: ArrayBuffer): Promise<{ filePath: string }>
  uploadRecording(filePath: string): Promise<string>             // resolves with shareUrl
  onUploadProgress(cb: (stage: UploadStage) => void): () => void
  openExternal(url: string): void
  copyToClipboard(text: string): void
}
