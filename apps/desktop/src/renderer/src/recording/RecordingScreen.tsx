import { Button, IconPause, IconPlay, IconStop, MonoText, Timer } from '@rec/design-system'
import { useCallback, useEffect, useRef } from 'react'
import { useElapsedTimer } from '../hooks/useElapsedTimer'
import { useMediaRecorder } from '../hooks/useMediaRecorder'
import type { RecordingOptions } from './types'

interface RecordingScreenProps {
  options: RecordingOptions
  onStop: (durationSeconds: number, filePath: string) => void
}

export function RecordingScreen({ options, onStop }: RecordingScreenProps) {
  const elapsedRef = useRef(0)
  const optionsRef = useRef(options)

  const handleStopped = useCallback(
    async (buffer: ArrayBuffer) => {
      const { filePath } = await window.api.stopRecording(buffer)
      onStop(elapsedRef.current, filePath)
    },
    [onStop],
  )

  const recorder = useMediaRecorder({ onStopped: handleStopped })
  const { elapsed } = useElapsedTimer(recorder.state === 'recording')
  elapsedRef.current = elapsed

  useEffect(() => {
    recorder.start(optionsRef.current)
  }, [recorder.start])

  const isRecording = recorder.state === 'recording'
  const isPaused = recorder.state === 'paused'
  const isStopping = recorder.state === 'stopping'

  return (
    <div className="flex flex-col h-full items-center justify-center px-8 animate-fadein">
      <div className="bg-bg-2 border border-border rounded-xl px-10 py-8 flex flex-col items-center gap-4 w-full max-w-xs">

        {/* Status indicator */}
        <div className="flex items-center gap-2">
          {isStopping ? (
            <span className="text-xs font-semibold text-fg-2 tracking-widest uppercase">
              Saving…
            </span>
          ) : isPaused ? (
            <span className="text-xs font-semibold text-fg-2 tracking-widest uppercase">
              Paused
            </span>
          ) : (
            <>
              <span className="w-2 h-2 rounded-full bg-red-500 animate-record-pulse" />
              <span className="text-xs font-semibold text-fg-1 tracking-widest uppercase">
                Recording
              </span>
            </>
          )}
        </div>

        <Timer seconds={elapsed} recording={isRecording} size="lg" />

        <MonoText className="text-fg-2 text-xs">
          {options.source.label}
          {options.audioEnabled ? ' · mic on' : ''}
        </MonoText>

        <div className="flex gap-2.5 mt-2">
          <Button
            variant="ghost"
            disabled={isStopping}
            onClick={isPaused ? recorder.resume : recorder.pause}
          >
            {isPaused
              ? <><IconPlay  size={14} strokeWidth={2} /> Resume</>
              : <><IconPause size={14} strokeWidth={2} /> Pause</>
            }
          </Button>
          <Button variant="record" disabled={isStopping} onClick={recorder.stop}>
            <IconStop size={14} strokeWidth={2} />
            {isStopping ? 'Saving…' : 'Stop'}
          </Button>
        </div>

        {recorder.error && (
          <p className="text-xs text-red-400 text-center">{recorder.error}</p>
        )}
      </div>

      <MonoText className="mt-5 text-fg-2 text-xs">
        ~/Videos/rec/rec-{new Date().toISOString().slice(0, 10)}.mp4
      </MonoText>
    </div>
  )
}
