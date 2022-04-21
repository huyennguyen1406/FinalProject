import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Song} from '../model/Song';
import {HttpService} from './http.service';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class SongService {

  constructor(private http: HttpClient,
              private httpService: HttpService) {}

  // Lấy toàn bộ bài hát
  getAllSongs(): Observable<Song[]> {
    return this.http.get<Song[]>(API_URL + '/home/song');
  }

  getAllSongsNew(): Observable<Song[]> {
    return this.http.get<Song[]>(API_URL + '/home/song/newest');
  }

  getAllSongsLikeMost(): Observable<Song[]> {
    return this.http.get<Song[]> (API_URL + '/home/song/like-most')
  }

  // Lấy bài hát theo Id
  getSongById(id: number): Observable<Song> {
    return this.http.get<Song>(API_URL + '/home/song/' + id);
  }

  // Lấy toàn bộ bài nhạc sở hữu
  getSongByUser(idUser: number): Observable<Song[]> {
    return this.http.get<Song[]>(API_URL + '/home/song/own/' + idUser, this.httpService.getHttp());
  }

  getSongBySinger(singerid: number): Observable<Song[]> {
    return this.http.get<Song[]>(API_URL + '/home/singer/' + singerid);
  }

  getSongByName(search: string): Observable<Song[]> {
    let params = new HttpParams().set('search', search);
    return this.http.get<Song[]>(API_URL + '/home/song/search' , {params});
  }

  getSongByLike(): Observable<Song[]> {
    return this.http.get<Song[]>(API_URL + '/home/song/like-most');
  }

  // tạo bài hát mới
  createSong(song: Song): Observable<any> {
    return this.http.post(API_URL + '/home/song', song, this.httpService.getHttp());
  }

  // chỉnh sửa song
  updateSong(idSong: number, song: Song): Observable<any> {
    return this.http.put(API_URL + '/home/song/' + idSong, song, this.httpService.getHttp());
  }

  deleteSong(idSong: number): Observable<any> {
    return this.http.delete(API_URL + '/home/song/' + idSong, this.httpService.getHttp());
  }
}
