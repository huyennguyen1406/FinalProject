import { Component, OnInit } from '@angular/core';
import {PlaylistService} from '../../service/playlist.service';
import {ActivatedRoute} from '@angular/router';
import {HttpService} from '../../service/http.service';
import {Song} from '../../model/Song';
import {Playlist} from '../../model/Playlist';
declare var Swal: any;

@Component({
  selector: 'app-user-playlist',
  templateUrl: './user-playlist.component.html',
  styleUrls: ['./user-playlist.component.css']
})
export class UserPlaylistComponent implements OnInit {


  constructor(private playlistService: PlaylistService,
              private router: ActivatedRoute,
              private httpClient: HttpService) { }

  songList: Song[];
  idPlaylist: number;
  userId: number;
  p: number;
  playlist: Playlist;

  ngOnInit(): void {
    this.userId = Number(this.httpClient.getID());
    this.idPlaylist = Number(this.router.snapshot.paramMap.get('id'));
    this.playlistService.getPlaylistById(this.idPlaylist).subscribe(res => {
      this.playlist = res;
      this.songList = res.songs;
      console.log(res.songs[1].user.name)
    });
  }

  // tslint:disable-next-line:typedef
  onDeleteSongWithoutPlaylist(idSong){
    this.playlistService.deleteSongOfPlaylist(this.idPlaylist, idSong).subscribe(res => {
      this.playlistService.getPlaylistById(this.idPlaylist).subscribe(data => {
        this.songList = data.songs;
      });
      Swal.fire({
        icon: 'success',
        title: 'Tạo thành công',
        showConfirmButton: true,
        timer: 3000
      });
    });
  }
}
