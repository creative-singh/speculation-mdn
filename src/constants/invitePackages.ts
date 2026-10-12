import type { InvitePackageCode } from '../types/invite';

export interface InvitePackage {
  code: InvitePackageCode;
  label: string;
  functions: string;
}

export const INVITE_PACKAGES: readonly InvitePackage[] = [
  { code: 'mehfil', label: 'Mehfil — All Functions', functions: 'All wedding functions' },
  { code: 'mango', label: 'Mango — Haldi Only', functions: 'Haldi' },
  { code: 'lotus', label: 'Lotus — Reception at Velvet Leaf', functions: 'Reception' },
  { code: 'sitar', label: 'Sitar — Anand Karaj + Reception', functions: 'Anand Karaj and Reception' },
] as const;
