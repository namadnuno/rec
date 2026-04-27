import { useEffect, useRef, useState } from 'react'

export type UploadStage = 'saving' | 'uploading' | 'transcribing' | 'titling' | 'done'

const STAGE_LABELS: Record<UploadStage, string> = {
  saving: 'Saving file…',
  uploading: 'Uploading…',
  transcribing: 'Generating transcript…',
  titling: 'Generating title…',
  done: 'Done!',
}

const STAGE_PROGRESS: Record<UploadStage, number> = {
  saving: 20,
  uploading: 55,
  transcribing: 80,
  titling: 95,
  done: 100,
}

interface UseUploadProgressResult {
  stage: UploadStage
  label: string
  progress: number
  isDone: boolean
}

export function useUploadProgress(
  filePath: string,
  onDone: (shareUrl: string) => void,
): UseUploadProgressResult {
  const [stage, setStage] = useState<UploadStage>('saving')
  const onDoneRef = useRef(onDone)
  onDoneRef.current = onDone

  useEffect(() => {
    const unsub = window.api.onUploadProgress((s) => setStage(s as UploadStage))
    window.api.uploadRecording(filePath).then((shareUrl) => {
      onDoneRef.current(shareUrl)
    })
    return unsub
  }, [filePath])

  return {
    stage,
    label: STAGE_LABELS[stage],
    progress: STAGE_PROGRESS[stage],
    isDone: stage === 'done',
  }
}
