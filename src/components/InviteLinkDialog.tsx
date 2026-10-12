import { useEffect, useRef, useState } from 'react';
import { Check, Copy, ExternalLink, X } from 'lucide-react';

interface InviteLinkDialogProps {
  open: boolean;
  url: string;
  onClose: () => void;
}

export function InviteLinkDialog({ open, url, onClose }: InviteLinkDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const urlRef = useRef<HTMLTextAreaElement>(null);
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'manual'>('idle');

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      setCopyState('idle');
      dialog.showModal();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  async function copyUrl() {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(url);
        setCopyState('copied');
        return;
      }
      throw new Error('Clipboard API unavailable');
    } catch {
      // Legacy fallback is useful on older browsers and non-secure contexts.
      try {
        const field = urlRef.current;
        if (field) {
          field.focus();
          field.select();
          const copied = document.execCommand('copy');
          if (copied) {
            setCopyState('copied');
            return;
          }
        }
      } catch {
        // Manual selection below remains available.
      }
      setCopyState('manual');
      urlRef.current?.focus();
      urlRef.current?.select();
    }
  }

  function handleClose() {
    onClose();
  }

  return (
    <dialog
      ref={dialogRef}
      className="invite-dialog"
      aria-labelledby="dialog-title"
      aria-describedby="dialog-description"
      onClose={handleClose}
      onCancel={(event) => {
        event.preventDefault();
        handleClose();
      }}
    >
      <div className="dialog-content">
        <button className="icon-button dialog-close" type="button" onClick={handleClose} aria-label="Close dialog">
          <X size={21} aria-hidden="true" />
        </button>
        <div className="success-mark" aria-hidden="true"><Check size={23} strokeWidth={2.2} /></div>
        <p className="eyebrow dialog-eyebrow">READY TO SHARE</p>
        <h2 id="dialog-title">Your invite link is ready!</h2>
        <p id="dialog-description" className="dialog-description">Click the link below to copy it, or use the button.</p>

        <div className="url-copy-area">
          <textarea
            ref={urlRef}
            className="url-area-text"
            readOnly
            aria-label="Generated invite link. Click to copy, or select and copy manually."
            value={url}
            rows={3}
            onClick={copyUrl}
          />
          <span className="url-area-icon" aria-hidden="true"><Copy size={18} /></span>
        </div>

        <button className="button button-primary copy-button" type="button" onClick={copyUrl}>
          {copyState === 'copied' ? <Check size={19} aria-hidden="true" /> : <Copy size={18} aria-hidden="true" />}
          {copyState === 'copied' ? 'Copied!' : 'Copy Invite Link'}
        </button>
        <p className={`copy-status ${copyState === 'manual' ? 'copy-status-error' : ''}`} role="status" aria-live="polite">
          {copyState === 'copied' && 'Link copied successfully!'}
          {copyState === 'manual' && 'Automatic copying wasn’t available. Select the link above and copy it manually.'}
        </p>
        <div className="dialog-footer">
          <button className="button button-secondary" type="button" onClick={handleClose}>Done</button>
          <a className="preview-link" href={url} target="_blank" rel="noreferrer">
            Open link <ExternalLink size={15} aria-hidden="true" />
          </a>
        </div>
      </div>
    </dialog>
  );
}
