import {Song} from './Song';
import {User} from './User';

export interface Playlist {

  idPlaylist?: number;
  namePlaylist?: string;
  user?: User;
  avatarPlaylistUrl?: string;
  descriptionPlaylist?: string;
  dateCreatePlaylist?: string;
  lastModifierPlaylist?: string;
  numberOfViewPlaylist?: number;
  songs?: Song[];

}
