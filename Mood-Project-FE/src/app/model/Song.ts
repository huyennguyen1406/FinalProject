import {User} from './User';
import {Playlist} from './Playlist';
import {Author} from "./Author";
import {Category} from "./Category";
import {Tag} from "./Tag";

export interface Song {
  idSong?: number;
  nameSong?: string;
  descriptionSong?: string;
  mp3UrlSong?: string;
  avatarUrlSong?: string;
  user?: User;

  numberOfViewSong?: number;
  dateCreateSong?: string;
  playlists?: Playlist[];
  tags?: Tag[];

}
