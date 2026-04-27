import { useCallback, useRef, useState } from 'react'
import type { RecordingOptions } from '../recording/types'

export type RecorderState = 'idle' | 'recording' | 'paused' | 'stopping'

const MIME_TYPE = 'video/webm;codecs=vp9,opus'
const VIDEO_BITRATE = 4_000_000 // 4 Mbps

interface UseMediaRecorderOptions {
  onStopped: (buffer: ArrayBuffer) => void
}

interface UseMediaRecorderResult {
  state: RecorderState
  error: string | null
  start: (options: RecordingOptions) => Promise<void>
  pause: () => void
  resume: () => void
  stop: () => void
}

export function useMediaRecorder({ onStopped }: UseMediaRecorderOptions): UseMediaRecorderResult {
  const [state, setState] = useState<RecorderState>('idle')
  const [error, setError] = useState<string | null>(null)

  const recorderRef = useRef<MediaRecorder | null>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const chunksRef = useRef<Blob[]>([])
  const onStoppedRef = useRef(onStopped)
  onStoppedRef.current = onStopped

  const start = useCallback(async (options: RecordingOptions) => {
    try {
      setError(null)
      chunksRef.current = []

      const stream = await acquireStream(options)
      streamRef.current = stream

      const recorder = new MediaRecorder(stream, {
        mimeType: MIME_TYPE,
        videoBitsPerSecond: VIDEO_BITRATE,
      })

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data)
      }

      recorder.onstop = async () => {
        streamRef.current?.getTracks().forEach((t) => t.stop())
        streamRef.current = null
        const blob = new Blob(chunksRef.current, { type: 'video/webm' })
        const buffer = await blob.arrayBuffer()
        setState('idle')
        onStoppedRef.current(buffer)
      }

      recorder.start(1000)
      recorderRef.current = recorder
      setState('recording')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to start recording')
      setState('idle')
    }
  }, [])

  const pause = useCallback(() => {
    if (recorderRef.current?.state !== 'recording') return
    streamRef.current?.getVideoTracks().forEach((t) => {
      t.enabled = false
    })
    recorderRef.current.pause()
    setState('paused')
  }, [])

  const resume = useCallback(() => {
    if (recorderRef.current?.state !== 'paused') return
    streamRef.current?.getVideoTracks().forEach((t) => {
      t.enabled = true
    })
    recorderRef.current.resume()
    setState('recording')
  }, [])

  const stop = useCallback(() => {
    if (!recorderRef.current || recorderRef.current.state === 'inactive') return
    setState('stopping')
    recorderRef.current.stop()
  }, [])

  return { state, error, start, pause, resume, stop }
}

async function acquireStream(options: RecordingOptions): Promise<MediaStream> {
  const { source, audioEnabled } = options

  if (source.id === 'camera') {
    return navigator.mediaDevices.getUserMedia({ video: true, audio: audioEnabled })
  }

  const sources = await window.api.getSources()
  const captureSource = sources.find((s) => s.sourceId === source.id)
  if (!captureSource) throw new Error(`No capture source found for: ${source.id}`)

  const audioConstraints = audioEnabled
    ? ({ mandatory: { chromeMediaSource: 'desktop' } } as unknown as MediaTrackConstraints)
    : false

  return navigator.mediaDevices.getUserMedia({
    audio: audioConstraints,
    video: {
      mandatory: {
        chromeMediaSource: 'desktop',
        chromeMediaSourceId: captureSource.id,
        minWidth: 1280,
        maxWidth: 3840,
        minFrameRate: 30,
      },
    } as unknown as MediaTrackConstraints,
  })
}
