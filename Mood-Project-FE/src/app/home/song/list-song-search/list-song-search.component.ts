import { Component, OnInit } from '@angular/core';
import {Song} from '../../../model/Song';
import {SongService} from '../../../service/song.service';
import {ActivatedRoute} from '@angular/router';
import {Playlist} from '../../../model/Playlist';
import {PlaylistService} from '../../../service/playlist.service';

@Component({
  selector: 'app-list-song-search',
  templateUrl: './list-song-search.component.html',
  styleUrls: ['./list-song-search.component.css']
})
export class ListSongSearchComponent implements OnInit {

  search: string;
  songLists: Song[] = [];
  playLists: Playlist[] = [];
  p: number;
  page: number;

  constructor(private songService: SongService,
              private playlistService: PlaylistService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.search = params.name;
      this.songService.getSongByName(this.search).subscribe(res => {
        this.songLists = res;
      });
      this.playlistService.getPlaylistByName(this.search).subscribe(res => {
        this.playLists = res;
      });
    });
  }
}
