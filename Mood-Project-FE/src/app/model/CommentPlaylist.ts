import {User} from './User';
import {Playlist} from './Playlist';

export interface CommentPlaylist {

  idCommentPlaylist?: number;
  contentComment?: string;
  userCommentPlaylist?: User;
  playlistCommentPlaylist?: Playlist;
  dateCreate?: string;

}
