import { IconCheck, MonoText } from '@rec/design-system'
import { useUploadProgress } from '../hooks/useUploadProgress'

function formatDuration(s: number): string {
  const m = Math.floor(s / 60)
  const sec = s % 60
  return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`
}

interface UploadingScreenProps {
  durationSeconds: number
  filePath: string
  onDone: (shareUrl: string) => void
}

export function UploadingScreen({ durationSeconds, filePath, onDone }: UploadingScreenProps) {
  const { label, progress, isDone } = useUploadProgress(filePath, onDone)

  return (
    <div className="flex flex-col h-full items-center justify-center px-8 animate-fadein">
      <div className="bg-bg-2 border border-border rounded-xl px-10 py-8 flex flex-col items-center gap-4 w-full max-w-xs">

        {/* Spinner / check */}
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300"
          style={{
            border: isDone ? '2px solid #2dd4bf' : '3px solid #262626',
            borderTopColor: '#2dd4bf',
            animation: isDone ? 'none' : 'spin 1s linear infinite',
          }}
        >
          {isDone && <IconCheck size={20} strokeWidth={2.5} className="text-teal-400" />}
        </div>

        <p className="font-sans text-sm font-semibold text-fg-0 text-center">{label}</p>

        <MonoText className="text-fg-2 text-xs">
          Duration: {formatDuration(durationSeconds)}
        </MonoText>

        <div className="w-full bg-bg-4 rounded-full h-1 overflow-hidden">
          <div
            className="h-full bg-teal-400 rounded-full transition-[width] duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <MonoText className="text-fg-2 text-[10px]">{progress}%</MonoText>
      </div>
    </div>
  )
}
