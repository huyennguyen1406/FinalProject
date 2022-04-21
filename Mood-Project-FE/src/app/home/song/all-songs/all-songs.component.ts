import {Component, OnInit} from '@angular/core';
import {Song} from '../../../model/Song';
import {SongService} from '../../../service/song.service';
import {LikesongService} from '../../../service/likesong.service';
import {LikeSong} from '../../../model/LikeSong';
import {HttpService} from '../../../service/http.service';
import {PlaylistService} from '../../../service/playlist.service';
import {Playlist} from '../../../model/Playlist';
import {UsersService} from '../../../service/users.service';
import {User} from '../../../model/User';
import {isFromDtsFile} from "@angular/compiler-cli/src/ngtsc/util/src/typescript";

declare var Swal: any;

@Component({
  selector: 'app-all-songs',
  templateUrl: './all-songs.component.html',
  styleUrls: ['./all-songs.component.scss']
})
export class AllSongsComponent implements OnInit {

  songList: Song[];
  likesongs: LikeSong[] = [];
  playlists: Playlist[];
  userId: number;
  status: boolean;
  song: Song;
  user: User;
  p: number;
  url: string;
  likeTotal: number[] = [];

  constructor(private songService: SongService,
              private playlistService: PlaylistService,
              private likeSongService: LikesongService,
              private userService: UsersService,
              private httpClient: HttpService) {
  }

  ngOnInit(): void {
    this.songService.getAllSongs().subscribe(res => {
      this.songList = res;

      // tslint:disable-next-line:no-shadowed-variable
      this.playlistService.getPlaylistByUser(this.userId).subscribe(res => {
        this.playlists = res;
      });

      this.userId = Number(this.httpClient.getID());

      for (let i = 0; i < this.songList.length; i++) {
        this.likeSongService.getTotalLike(this.songList[i].idSong).subscribe(totalLike => {
          if (totalLike == null) {
            this.likeTotal.push(0);
          } else {
            this.likeTotal.push(totalLike);
          }
        })
      }
      console.log(this.likeTotal);

      this.playlistService.getPlaylistByUser(this.userId).subscribe(playlist => {
        this.playlists = playlist;
      });
    });
  }

  // tslint:disable-next-line:typedef
  likeSong(idUser: number, idSong: number) {
    console.log(idUser)
    console.log(idSong)
    this.likeSongService.updateLikeSong(idUser, idSong).subscribe((countLike) => {
      for (let i = 0; i < this.songList.length; i++) {
        if (this.songList[i].idSong == idSong) {
          this.likeTotal[i] = countLike;
        }
      }
    })
  }

  // tslint:disable-next-line:typedef
  addSongInPlaylist(idPlaylist, idSong) {
    console.log(idPlaylist)
    console.log(idSong)
    this.playlistService.updateSongOfPlaylist(idPlaylist, idSong).subscribe(res => {
      this.playlistService.getPlaylistByUser(this.userId).subscribe(data => {
        this.playlists = data;
        console.log(data)
      });
      Swal.fire({
        icon: 'success',
        title: res.message,
        showConfirmButton: true,
        timer: 3000
      });
    });
  }
}
