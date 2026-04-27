import { Button, CapsLabel, IconCopied, IconCopyLink, MonoText } from '@rec/design-system'
import { useState } from 'react'

interface DoneScreenProps {
  shareUrl: string
  onNewRecording: () => void
}

export function DoneScreen({ shareUrl, onNewRecording }: DoneScreenProps) {
  const [copied, setCopied] = useState(false)

  function handleCopy() {
    window.api.copyToClipboard(shareUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }

  function handleOpenBrowser() {
    window.api.openExternal(shareUrl)
  }

  return (
    <div className="flex flex-col h-full items-center justify-center px-8 animate-fadein">
      <div className="bg-bg-2 border border-border rounded-xl px-9 py-7 flex flex-col items-center gap-4 w-full max-w-xs">

        {/* Success icon */}
        <div className="w-11 h-11 rounded-full bg-green-900/60 flex items-center justify-center">
          <svg
            aria-hidden="true"
            width="20" height="20" viewBox="0 0 24 24"
            fill="none" stroke="#4ade80" strokeWidth="2.5"
            strokeLinecap="round" strokeLinejoin="round"
          >
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </div>

        <div className="text-center">
          <p className="font-sans text-sm font-semibold text-fg-0">Recording ready</p>
          <p className="font-sans text-xs text-fg-2 mt-1">AI title and transcript generated</p>
        </div>

        {/* Share URL */}
        <div className="w-full">
          <CapsLabel className="mb-1.5 block">Share link</CapsLabel>
          <div className="flex gap-2">
            <div className="flex-1 bg-bg-3 border border-border rounded-md px-2.5 py-2 overflow-hidden">
              <MonoText className="text-xs text-fg-1 block truncate">{shareUrl}</MonoText>
            </div>
            <Button
              variant={copied ? 'subtle' : 'ghost'}
              size="sm"
              onClick={handleCopy}
              className="shrink-0"
            >
              {copied
                ? <><IconCopied   size={13} strokeWidth={2}   /> Copied!</>
                : <><IconCopyLink size={13} strokeWidth={1.5} /> Copy</>
              }
            </Button>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 w-full">
          <Button variant="ghost" className="flex-1 justify-center" onClick={handleOpenBrowser}>
            Open in browser
          </Button>
          <Button variant="primary" className="flex-1 justify-center" onClick={onNewRecording}>
            New recording
          </Button>
        </div>
      </div>
    </div>
  )
}
