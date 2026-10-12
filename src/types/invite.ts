export type InvitationSide = 'groom' | 'bride';
export type InvitePackageCode = 'mehfil' | 'mango' | 'lotus' | 'sitar';

export interface InviteFormValues {
  side: InvitationSide;
  guestName: string;
  packageCode: InvitePackageCode;
}
