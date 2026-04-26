import { MonoText, IconLoader, IconCheck } from "@rec/design-system";
import { useEffect, useState } from "react";

type UploadStage =
  | "saving"
  | "uploading"
  | "transcribing"
  | "titling"
  | "done";

const STAGES: { id: UploadStage; label: string; progress: number }[] = [
  { id: "saving",      label: "Saving file…",              progress: 20  },
  { id: "uploading",   label: "Uploading…",                progress: 55  },
  { id: "transcribing",label: "Generating transcript…",    progress: 80  },
  { id: "titling",     label: "Generating title…",         progress: 95  },
  { id: "done",        label: "Done!",                      progress: 100 },
];

// Simulated delays between stages (ms). Replace with real IPC events later.
const STAGE_DELAYS: Record<UploadStage, number> = {
  saving:       800,
  uploading:    1800,
  transcribing: 2800,
  titling:      3600,
  done:         4200,
};

interface UploadingScreenProps {
  durationSeconds: number;
  /** Called when all stages complete. Pass a real share URL from IPC here. */
  onDone: (shareUrl: string) => void;
}

function formatDuration(s: number): string {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
}

export function UploadingScreen({ durationSeconds, onDone }: UploadingScreenProps) {
  const [stageIndex, setStageIndex] = useState(0);

  const currentStage = STAGES[stageIndex];
  const isDone       = currentStage.id === "done";

  useEffect(() => {
    const timers = STAGES.map((stage, i) =>
      setTimeout(() => {
        setStageIndex(i);
        // TODO: replace setTimeout simulation with real IPC events:
        //   window.api.on('upload:progress', (stage) => setStage(stage))
        if (stage.id === "done") {
          setTimeout(() => onDone("https://rec.app/v/placeholder"), 500);
        }
      }, STAGE_DELAYS[stage.id]),
    );
    return () => timers.forEach(clearTimeout);
  }, [onDone]);

  return (
    <div className="flex flex-col h-full items-center justify-center px-8 animate-fadein">
      <div className="bg-bg-2 border border-border rounded-xl px-10 py-8 flex flex-col items-center gap-4 w-full max-w-xs">

        {/* Spinner / check */}
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300"
          style={{
            border: isDone
              ? "2px solid #2dd4bf"
              : "3px solid #262626",
            borderTopColor: isDone ? "#2dd4bf" : "#2dd4bf",
            animation: isDone ? "none" : "spin 1s linear infinite",
          }}
        >
          {isDone && (
            <IconCheck size={20} strokeWidth={2.5} className="text-teal-400" />
          )}
        </div>

        {/* Stage label */}
        <p className="font-sans text-sm font-semibold text-fg-0 text-center">
          {currentStage.label}
        </p>

        <MonoText className="text-fg-2 text-xs">
          Duration: {formatDuration(durationSeconds)}
        </MonoText>

        {/* Progress bar */}
        <div className="w-full bg-bg-4 rounded-full h-1 overflow-hidden">
          <div
            className="h-full bg-teal-400 rounded-full transition-[width] duration-500 ease-out"
            style={{ width: `${currentStage.progress}%` }}
          />
        </div>

        <MonoText className="text-fg-2 text-[10px]">
          {currentStage.progress}%
        </MonoText>
      </div>
    </div>
  );
}
