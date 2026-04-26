import { useState } from "react";
import {
  IdleScreen,
  RecordingScreen,
  UploadingScreen,
  DoneScreen,
} from "./recording";
import type { RecordingOptions, RecordingSession } from "./recording";

type Screen = "idle" | "recording" | "uploading" | "done";

export default function App() {
  const [screen, setScreen]   = useState<Screen>("idle");
  const [session, setSession] = useState<Partial<RecordingSession>>({});

  function handleStart(options: RecordingOptions) {
    setSession({ options });
    setScreen("recording");
  }

  function handleStop(duration: number) {
    setSession((s) => ({ ...s, duration }));
    setScreen("uploading");
  }

  function handleDone(shareUrl: string) {
    setSession((s) => ({ ...s, shareUrl }));
    setScreen("done");
  }

  function handleNewRecording() {
    setSession({});
    setScreen("idle");
  }

  return (
    <div className="w-full h-screen bg-bg-1 text-fg-0 flex flex-col overflow-hidden">
      {screen === "idle" && (
        <IdleScreen onStart={handleStart} />
      )}

      {screen === "recording" && session.options && (
        <RecordingScreen
          options={session.options}
          onStop={handleStop}
        />
      )}

      {screen === "uploading" && session.duration !== undefined && (
        <UploadingScreen
          durationSeconds={session.duration}
          onDone={handleDone}
        />
      )}

      {screen === "done" && session.shareUrl && (
        <DoneScreen
          shareUrl={session.shareUrl}
          onNewRecording={handleNewRecording}
        />
      )}
    </div>
  );
}
