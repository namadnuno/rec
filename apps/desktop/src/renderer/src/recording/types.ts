/**
 * Shared types for the recording flow.
 * These will eventually map to Electron IPC payloads.
 */

export type RecordingStatus = "idle" | "recording" | "uploading" | "done";

export type SourceId = "full" | "window" | "region" | "camera";

export interface RecordingSource {
  id: SourceId;
  label: string;
  sublabel: string;
}

export interface RecordingOptions {
  source: RecordingSource;
  audioEnabled: boolean;
  showCursor: boolean;
}

export interface RecordingSession {
  options: RecordingOptions;
  /** Elapsed seconds at time of stop */
  duration: number;
  /** Populated after upload completes */
  shareUrl?: string;
}
