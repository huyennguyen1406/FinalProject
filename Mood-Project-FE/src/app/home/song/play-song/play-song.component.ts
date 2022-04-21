import {Component, OnInit} from '@angular/core';
import {Song} from '../../../model/Song';
import {SongService} from '../../../service/song.service';
import {ActivatedRoute} from '@angular/router';
import {LikeSong} from '../../../model/LikeSong';
import {Playlist} from '../../../model/Playlist';
import {CommentSong} from '../../../model/CommentSong';
import {User} from '../../../model/User';
import {UsersService} from '../../../service/users.service';
import {LikesongService} from '../../../service/likesong.service';
import {CommentsongService} from '../../../service/commentsong.service';
import {HttpService} from '../../../service/http.service';
import {PlaylistService} from '../../../service/playlist.service';

declare var Amplitude: any;

@Component({
  selector: 'app-play-song',
  templateUrl: './play-song.component.html',
  styleUrls: ['./play-song.component.css']
})
export class PlaySongComponent implements OnInit {
  songList: Song[];
  likeSongs: LikeSong[];
  commentSong: CommentSong[];
  id: number;
  userId: number;
  song: Song;
  user: User;
  p: number;
  page: number;
  totalLike;

  constructor(private songService: SongService,
              private playlistService: PlaylistService,
              private router: ActivatedRoute,
              private userService: UsersService,
              private likeSongService: LikesongService,
              private commentSongService: CommentsongService,
              private httpService: HttpService) {
  }

  ngOnInit(): void {
    this.userId = Number(this.httpService.getID());
    this.id = Number(this.router.snapshot.paramMap.get('id'));

    // Lấy totalLike - DONE
    this.likeSongService.getTotalLike(this.id).subscribe(countLike => {
      this.totalLike = countLike;
    });

    // Lấy comment của bài hát - DONE
    this.commentSongService.getCommentBySong(this.id).subscribe(comments => {
      this.commentSong = comments;
    });

    // Lấy các bài hát bạn được like nhiều nhất - DONE
    this.songService.getSongByLike().subscribe(res => {
      this.songList = res;
    });

    // Lấy user - chưa biết để làm gì
    this.userService.getUserById(this.httpService.getID()).subscribe(res => {
      this.user = res;
      console.log(this.user);
    });

    // Lấy bài hát, dùng để chạy bài hát - DONE
    this.songService.getSongById(this.id).subscribe(res => {
      this.song = res;
      Amplitude.init({
        songs: [
          {
            url: this.song.mp3UrlSong,
            cover_art_url: this.song.avatarUrlSong
          }
        ],
      });
    });
  }

  // Đổi bài hát : dùng trong đoạn "Có thể bạn muốn nghe" - DONE
  // tslint:disable-next-line:typedef
  changeSong(data) {
    this.commentSongService.getCommentBySong(data).subscribe(res => {
      this.commentSong = res;
    });

    this.likeSongService.getTotalLike(data).subscribe(countLike => {
      this.totalLike = countLike;
    });

    this.songService.getSongById(data).subscribe(res => {
      this.song = res;
      Amplitude.init({
        songs: [
          {
            url: this.song.mp3UrlSong,
            cover_art_url: this.song.avatarUrlSong
          }
        ],
      });
    });
  }
}
