export type RecordingStatus = 'idle' | 'recording' | 'uploading' | 'done'

export type SourceId = 'full' | 'window' | 'region' | 'camera'

export interface RecordingSource {
  id: SourceId
  label: string
  sublabel: string
}

export interface RecordingOptions {
  source: RecordingSource
  audioEnabled: boolean
  showCursor: boolean
}

export interface RecordingSession {
  options: RecordingOptions
  duration: number    // elapsed seconds at stop
  filePath: string    // local path after save
  shareUrl?: string   // populated after upload
}
