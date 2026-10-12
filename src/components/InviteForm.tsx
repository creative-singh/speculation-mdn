import { useState, type FormEvent } from 'react';
import { ArrowRight, Heart, Link2 } from 'lucide-react';
import { INVITE_PACKAGES } from '../constants/invitePackages';
import { generateInviteUrl } from '../lib/generateInviteUrl';
import type { InvitationSide, InvitePackageCode } from '../types/invite';
import { FormField } from './FormField';
import { InviteLinkDialog } from './InviteLinkDialog';

export function InviteForm() {
  const [side, setSide] = useState<InvitationSide>('groom');
  const [guestName, setGuestName] = useState('');
  const [packageCode, setPackageCode] = useState<InvitePackageCode>('mehfil');
  const [guestError, setGuestError] = useState('');
  const [generatedUrl, setGeneratedUrl] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedName = guestName.trim();
    if (!trimmedName) {
      setGuestError('Please enter the guest name.');
      setGeneratedUrl('');
      return;
    }
    setGuestError('');
    const url = generateInviteUrl({ side, guestName: trimmedName, packageCode });
    setGeneratedUrl(url);
    setDialogOpen(true);
  }

  return (
    <>
      <main className="page-shell">
        <header className="page-header">
          <div className="brand-mark" aria-hidden="true"><Heart size={22} strokeWidth={1.7} /></div>
          <p className="eyebrow">BHAVISHYA LOADING...</p>
          <h1>Bhavishya Invite<br className="mobile-break" /> Link Generator</h1>
        </header>

        <section className="form-card" aria-labelledby="form-heading">
          <div className="card-heading">
            <div className="heading-icon" aria-hidden="true"><Link2 size={20} /></div>
            <div>
              <h2 id="form-heading">Personalize your invite</h2>
              <p>Just three little details, and you’re ready to share.</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            <FormField id="invitation-side" label="Invitation From">
              <select id="invitation-side" className="form-control" value={side} onChange={(event) => setSide(event.target.value as InvitationSide)}>
                <option value="groom">Groom</option>
                <option value="bride">Bride</option>
              </select>
            </FormField>

            <FormField id="guest-name" label="Guest Name" hint="Enter the name just as you’d like it to appear." error={guestError}>
              <input
                id="guest-name"
                className={`form-control ${guestError ? 'form-control-error' : ''}`}
                type="text"
                autoComplete="name"
                placeholder="e.g. Arnav Sharma Ji"
                value={guestName}
                onChange={(event) => {
                  setGuestName(event.target.value);
                  if (guestError) setGuestError('');
                }}
                aria-invalid={Boolean(guestError)}
                aria-describedby={[guestError ? 'guest-name-error' : '', 'guest-name-hint'].filter(Boolean).join(' ') || undefined}
                required
              />
            </FormField>

            <FormField id="invite-package" label="Invitation Package" hint="Choose the events included in this invitation.">
              <select id="invite-package" className="form-control" value={packageCode} onChange={(event) => setPackageCode(event.target.value as InvitePackageCode)}>
                {INVITE_PACKAGES.map((invitePackage) => (
                  <option key={invitePackage.code} value={invitePackage.code}>{invitePackage.label}</option>
                ))}
              </select>
              <p className="package-note">
                <span className="package-note-dot" aria-hidden="true" />
                {INVITE_PACKAGES.find((item) => item.code === packageCode)?.functions}
              </p>
            </FormField>

            <button className="button button-primary generate-button" type="submit">
              Generate Invite Link <ArrowRight size={19} aria-hidden="true" />
            </button>
          </form>
          <p className="privacy-note"><span aria-hidden="true">✦</span> Made with love, by Lovely.</p>
        </section>
        <footer className="page-footer">A special invite for a special day.</footer>
      </main>
      <InviteLinkDialog open={dialogOpen} url={generatedUrl} onClose={() => setDialogOpen(false)} />
    </>
  );
}
