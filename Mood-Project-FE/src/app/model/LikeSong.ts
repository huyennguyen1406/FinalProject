import {User} from './User';
import {Song} from './Song';

export interface LikeSong {
  idLikeSong?: number;
  // status?: boolean;
  userLikeSong?: User;
  songLikeSong?: Song;
}
