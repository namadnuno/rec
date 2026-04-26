/**
 * rec — Icon set
 *
 * All icons are re-exported from lucide-react with semantic aliases
 * so usage reads like the product domain, not the icon library.
 *
 * Usage:
 *   import { IconRecord, IconStop, IconMic } from "@rec/design-system/icons"
 *   // or
 *   import { IconRecord, IconStop, IconMic } from "@rec/design-system"
 *
 * Every icon accepts standard SVG + lucide props:
 *   size        (default 24)
 *   strokeWidth (default 1.5)
 *   color       (default "currentColor")
 *   className
 */

export {
  // ── Recording controls ───────────────────────────────────
  Circle      as IconRecordDot,     // filled circle — live indicator dot
  Square      as IconStop,          // stop recording
  Play        as IconPlay,          // resume / playback
  Pause       as IconPause,         // pause recording
  CircleStop  as IconRecord,        // primary record button icon

  // ── Sources ──────────────────────────────────────────────
  Monitor     as IconScreen,        // full display / screen source
  AppWindow   as IconWindow,        // window capture source
  Crop        as IconRegion,        // screen region / crop
  Camera      as IconCamera,        // webcam source
  Mic         as IconMic,           // audio / microphone
  MicOff      as IconMicOff,        // audio disabled

  // ── Sharing & upload ─────────────────────────────────────
  Share2      as IconShare,         // share button
  Clipboard   as IconCopyLink,      // copy link to clipboard
  ClipboardCheck as IconCopied,     // copy confirmed
  Upload      as IconUpload,        // uploading state
  Link        as IconLink,          // embed / link

  // ── Playback / viewer ────────────────────────────────────
  Volume2     as IconVolume,        // volume control
  VolumeX     as IconMute,          // muted state
  Maximize2   as IconFullscreen,    // fullscreen
  Minimize2   as IconExitFullscreen,

  // ── UI chrome ────────────────────────────────────────────
  X           as IconClose,         // close / dismiss
  ChevronDown as IconChevronDown,   // dropdown indicator
  ChevronRight as IconChevronRight,
  Settings    as IconSettings,      // settings / gear
  Check       as IconCheck,         // success / done
  Clock       as IconClock,         // timer context
  Loader      as IconLoader,        // spinner / loading
  AlertCircle as IconError,         // error state
  Info        as IconInfo,          // info / hint
  Search      as IconSearch,        // transcript search
  Folder      as IconFolder,        // output folder

} from "lucide-react";

// Re-export the icon type for prop-spreading convenience
export type { LucideProps as IconProps } from "lucide-react";
