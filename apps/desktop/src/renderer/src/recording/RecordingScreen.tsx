import { Button, Timer, CapsLabel, MonoText, IconPause, IconPlay, IconStop } from "@rec/design-system";
import { useEffect, useRef, useState } from "react";
import type { RecordingOptions } from "./types";

interface RecordingScreenProps {
  options: RecordingOptions;
  onStop: (durationSeconds: number) => void;
}

export function RecordingScreen({ options, onStop }: RecordingScreenProps) {
  const [elapsed, setElapsed] = useState(0);
  const [paused, setPaused]   = useState(false);
  const intervalRef           = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!paused) {
      intervalRef.current = setInterval(() => setElapsed((e) => e + 1), 1000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [paused]);

  function handleStop() {
    if (intervalRef.current) clearInterval(intervalRef.current);
    onStop(elapsed);
  }

  return (
    <div className="flex flex-col h-full items-center justify-center px-8 animate-fadein">
      <div className="bg-bg-2 border border-border rounded-xl px-10 py-8 flex flex-col items-center gap-4 w-full max-w-xs">

        {/* Status indicator */}
        <div className="flex items-center gap-2">
          {paused ? (
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

        {/* Timer */}
        <Timer
          seconds={elapsed}
          recording={!paused}
          size="lg"
        />

        {/* Source info */}
        <MonoText className="text-fg-2 text-xs">
          {options.source.label}
          {options.audioEnabled ? " · mic on" : ""}
        </MonoText>

        {/* Controls */}
        <div className="flex gap-2.5 mt-2">
          <Button
            variant="ghost"
            onClick={() => setPaused((p) => !p)}
          >
            {paused
              ? <><IconPlay  size={14} strokeWidth={2} /> Resume</>
              : <><IconPause size={14} strokeWidth={2} /> Pause</>
            }
          </Button>
          <Button variant="record" onClick={handleStop}>
            <IconStop size={14} strokeWidth={2} />
            Stop
          </Button>
        </div>
      </div>

      {/* Output path hint */}
      <MonoText className="mt-5 text-fg-2 text-xs">
        ~/Videos/rec/rec-{new Date().toISOString().slice(0, 10)}.mp4
      </MonoText>
    </div>
  );
}
