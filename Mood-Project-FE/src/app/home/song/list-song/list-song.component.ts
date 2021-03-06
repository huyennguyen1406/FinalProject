import { Component, OnInit } from '@angular/core';
import {Song} from '../../../model/Song';
import {SongService} from '../../../service/song.service';

@Component({
  selector: 'app-list-song',
  templateUrl: './list-song.component.html',
  styleUrls: ['./list-song.component.sass']
})
export class ListSongComponent implements OnInit {

  songList: Song[] = [];
  song1: Song;
  song2: Song;
  song3: Song;
  song4: Song;
  song5: Song;
  song6: Song;
  constructor(private songService: SongService) { }

  ngOnInit(): void {
    // sửa thành getAllSongsNew()
    this.songService.getAllSongsLikeMost().subscribe(songs => {
      this.songList = songs;
      for (const i = 0; i < this.songList.length; ) {
        this.song1 = this.songList[i];
        this.song2 = this.songList[i + 1];
        this.song3 = this.songList[i + 2];
        this.song4 = this.songList[i + 3];
        this.song5 = this.songList[i + 4];
        this.song6 = this.songList[i + 5];
        break;
      }
    });
  }

}
