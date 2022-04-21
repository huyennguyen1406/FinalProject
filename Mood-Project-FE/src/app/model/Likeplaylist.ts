import {User} from './User';
import {Playlist} from './Playlist';

export interface LikePlaylist {
  idLikePlaylist?: number;
  // status?: boolean;
  userLikeSong?: User;
  playlistLikeSong?: Playlist;
}
