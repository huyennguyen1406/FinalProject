import {Role} from './Role';

export interface User {

  id?: number;
  name?: string;
  address?: string;
  phone?: string;
  avatarURL?: string;
  email?: string;
  username?: string;
  password?: string;
  role?: Role[];

}
