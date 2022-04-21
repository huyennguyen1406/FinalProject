import {Component, OnInit} from '@angular/core';
import {Song} from '../../../model/Song';
import {SongService} from '../../../service/song.service';
import {ActivatedRoute} from '@angular/router';
import {UsersService} from '../../../service/users.service';
import {HttpService} from '../../../service/http.service';
import {PlaylistService} from '../../../service/playlist.service';
import {Playlist} from '../../../model/Playlist';
import {LikeSong} from '../../../model/LikeSong';
import {LikesongService} from '../../../service/likesong.service';
import {CommentsongService} from '../../../service/commentsong.service';
import {CommentSong} from '../../../model/CommentSong';
import {User} from '../../../model/User';
import {FormBuilder, FormGroup} from '@angular/forms';

declare var Amplitude: any;
declare var Swal: any;

@Component({
  selector: 'app-user-play-song',
  templateUrl: './user-play-song.component.html',
  styleUrls: ['./user-play-song.component.css']
})
export class UserPlaySongComponent implements OnInit {
  songList: Song[];
  likeSongs: LikeSong[];
  playlists: Playlist[];
  commentSong: CommentSong[];
  id: number;
  song: Song;
  userId: number;
  user: User;
  form: FormGroup;
  p: number;
  totalLike: number;

  constructor(private userService: UsersService,
              private songService: SongService,
              private likeSongService: LikesongService,
              private commentSongService: CommentsongService,
              private playlistService: PlaylistService,
              private router: ActivatedRoute,
              private httpService: HttpService,
              private formBuild: FormBuilder) {
  }

  ngOnInit(): void {
    this.form = this.formBuild.group({
      comment: ['']
    });
    this.userId = Number(this.httpService.getID());
    this.id = Number(this.router.snapshot.paramMap.get('id'));

    // Lấy totalLike - DONE
    this.likeSongService.getTotalLike(this.id).subscribe(countLike => {
      this.totalLike = countLike;
    });

    this.playlistService.getPlaylistByUser(this.userId).subscribe(res => {
      this.playlists = res;
    });

    // Lấy comment của bài hát - DONE
    this.commentSongService.getCommentBySong(this.id).subscribe(comments => {
      this.commentSong = comments;
    });


    // this.likeSongService.getAllLikeSong().subscribe(res => {
    //   this.likeSongs = res;
    // });

    // Lấy các bài hát bạn được like nhiều nhất - DONE
    this.songService.getSongByLike().subscribe(res => {
      this.songList = res;
    });

    // Lấy thông tin user
    this.userService.getUserById(this.httpService.getID()).subscribe(res => {
      this.user = res;
    });

    // Lấy bài hát, dùng để chạy bài hát - DONE
    this.songService.getSongById(this.id).subscribe(res => {
      this.song = res;
      Amplitude.init({
        songs: [
          {
            url: this.song.mp3UrlSong,
            cover_art_url: this.song.avatarUrlSong
          },
        ],
      });
    });
  }

  // tslint:disable-next-line:typedef
  likeSong(idUser: number, idSong: number) {
    this.likeSongService.updateLikeSong(idUser, idSong).subscribe((countLike) =>{
      this.totalLike = countLike;
    })
  }

  // tslint:disable-next-line:typedef
  onEnter() {
    const comment = {
      contentComment: this.form.value.comment,
      userCommentSong: this.user,
      songCommentSong: this.song
    };
    this.commentSongService.updateCommentSong(comment).subscribe(res => {
      this.commentSongService.getCommentBySong(this.song.idSong).subscribe( data => {
        this.commentSong = data;
        this.form.reset();
      });
    });
  }

  // tslint:disable-next-line:typedef
  addSongInPlaylist(listID, songId) {
    this.playlistService.updateSongOfPlaylist(listID, songId).subscribe(res => {
      this.playlistService.getPlaylistByUser(this.userId).subscribe(data => {
        this.playlists = data;
      });
      Swal.fire({
        icon: 'success',
        title: res.message,
        showConfirmButton: true,
        timer: 3000
      });
    });
  }

  // tslint:disable-next-line:typedef
  changeSong(data) {

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

    this.commentSongService.getCommentBySong(data).subscribe(res => {
      this.commentSong = res;
    });
  }


}
