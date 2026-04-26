import {
  Button,
  SourceCard,
  Toggle,
  Select,
  CapsLabel,
  BodyText,
  IconScreen,
  IconWindow,
  IconCamera,
  IconMic,
  cn,
} from "@rec/design-system";
import { Crop } from "lucide-react";
import { useState } from "react";
import type { RecordingOptions, RecordingSource } from "./types";

const SOURCES: RecordingSource[] = [
  { id: "full",   label: "Full display",  sublabel: "1920×1080 · Display 1" },
  { id: "window", label: "Window",        sublabel: "Select a specific window" },
  { id: "region", label: "Screen region", sublabel: "Draw a custom area" },
  { id: "camera", label: "Webcam only",   sublabel: "Front camera · 720p" },
];

const SOURCE_ICONS: Record<string, React.ReactNode> = {
  full:   <IconScreen   size={18} strokeWidth={1.5} />,
  window: <IconWindow   size={18} strokeWidth={1.5} />,
  region: <Crop         size={18} strokeWidth={1.5} />,
  camera: <IconCamera   size={18} strokeWidth={1.5} />,
};

interface IdleScreenProps {
  onStart: (options: RecordingOptions) => void;
}

export function IdleScreen({ onStart }: IdleScreenProps) {
  const [sourceId, setSourceId]       = useState<string | null>(null);
  const [audioEnabled, setAudio]      = useState(true);
  const [showCursor, setShowCursor]   = useState(true);

  const selectedSource = SOURCES.find((s) => s.id === sourceId) ?? null;

  function handleStart() {
    if (!selectedSource) return;
    onStart({ source: selectedSource, audioEnabled, showCursor });
  }

  return (
    <div className="flex flex-col h-full animate-fadein">
      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto px-7 py-6 flex flex-col gap-5">
        <div>
          <h2 className="font-sans text-base font-semibold text-fg-0">
            New recording
          </h2>
          <BodyText className="mt-0.5">Choose what to capture</BodyText>
        </div>

        {/* Source grid */}
        <div className="grid grid-cols-2 gap-2">
          {SOURCES.map((source) => (
            <SourceCard
              key={source.id}
              icon={SOURCE_ICONS[source.id]}
              label={source.label}
              sublabel={source.sublabel}
              selected={sourceId === source.id}
              onClick={() => setSourceId(source.id)}
            />
          ))}
        </div>

        {/* Options */}
        <div className="bg-bg-2 border border-border rounded-lg p-4 flex flex-col gap-4">
          <CapsLabel>Audio & options</CapsLabel>
          <Toggle
            label="Record audio"
            sublabel="Built-in microphone"
            checked={audioEnabled}
            onChange={setAudio}
          />
          <Toggle
            label="Show cursor"
            sublabel="Visible in recording"
            checked={showCursor}
            onChange={setShowCursor}
          />
          <div className="pt-1">
            <Select
              label="Audio device"
              options={[
                { value: "default", label: "Built-in microphone" },
                { value: "hdmi",    label: "HDMI Audio" },
                { value: "none",    label: "None" },
              ]}
              disabled={!audioEnabled}
            />
          </div>
        </div>
      </div>

      {/* Footer bar */}
      <div className="shrink-0 px-7 py-3.5 border-t border-border flex items-center justify-between">
        <span
          className={cn(
            "text-xs text-fg-2 transition-colors duration-150",
            selectedSource && "text-fg-1",
          )}
        >
          {selectedSource
            ? `${selectedSource.label} · ${audioEnabled ? "mic on" : "no audio"}`
            : "No source selected"}
        </span>
        <Button
          variant="primary"
          disabled={!selectedSource}
          onClick={handleStart}
        >
          Start recording
        </Button>
      </div>
    </div>
  );
}
