import {User} from './User';
import {Song} from './Song';

export interface CommentSong {
  idCommentSong?: number;
  contentComment?: string;
  userCommentSong?: User;
  songCommentSong?: Song;
}
