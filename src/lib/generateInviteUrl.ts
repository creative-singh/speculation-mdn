import type { InviteFormValues } from '../types/invite';

export const INVITE_BASE_URL = 'https://bhavishya-wedding-invite.vercel.app/';

/** Builds a personalized invite URL, keeping query parameters in the required order. */
export function generateInviteUrl({ side, guestName, packageCode }: InviteFormValues): string {
  const guest = guestName.trim();
  if (!guest) {
    throw new Error('Please enter the guest name.');
  }

  const url = new URL(INVITE_BASE_URL);
  if (side === 'bride') url.searchParams.set('side', 'bride');
  url.searchParams.set('guest', guest);
  url.searchParams.set('k', packageCode.toLowerCase());

  // URLSearchParams encodes literal plus signs as %2B, so converting remaining + to %20
  // changes only serialized spaces and preserves names containing a literal plus sign.
  return `${url.origin}${url.pathname}?${url.searchParams.toString().replace(/\+/g, '%20')}`;
}
