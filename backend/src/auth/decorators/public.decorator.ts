import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';
export const USER_ONLY_KEY = 'userOnly';

export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
export const UserOnly = () => SetMetadata(USER_ONLY_KEY, true);