export interface IUser {
  id: number;

  userId: string;

  firstName: string;

  lastName: string;

  username: string;

  email: string;

  bio: string;

  qrCodeImageUri: string;

  imageUrl: string;

  lastLogin: string | number | Date;

  createdAt: string;

  updatedAt: string;

  role: string;

  authorities: string;

  accountNonExpired: boolean;

  accountNonLocked: boolean;

  enabled: boolean;

  createdBy: number;

  updatedBy: number;

  mfa: boolean;

  credentialsNonExpired: boolean;
}

export type Role = { role: string };

export type User = { user: IUser };

export type Users = { users: IUser[] };

export type QrCodeRequest = Pick<IUser, "userId"> &
{
  qrCode?: string,
  qrCode1: string,
  qrCode2: string,
  qrCode3: string,
  qrCode4: string,
  qrCode5: string,
  qrCode6: string
}
