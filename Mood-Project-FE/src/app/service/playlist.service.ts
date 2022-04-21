import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {HttpService} from './http.service';
import {Observable} from 'rxjs';
import {Song} from '../model/Song';
import {environment} from '../../environments/environment';
import {Playlist} from '../model/Playlist';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {
  constructor(private http: HttpClient,
              private httpService: HttpService) {
  }

  getAllPlaylists(): Observable<Playlist[]> {
    return this.http.get<Playlist[]>(API_URL + '/home/playlist');
  }

  getAllPlaylistsNew(): Observable<Playlist[]> {
    return this.http.get<Playlist[]>(API_URL + '/home/playlist/newest');
  }


  // Lấy toàn bộ bài hát trong playlist theo Id
  getPlaylistById(idPlaylist: number): Observable<Playlist> {
    return this.http.get<Playlist>(API_URL + '/home/playlist/' + idPlaylist);
  }

  getPlaylistByName(search: string): Observable<Playlist[]> {
    let params = new HttpParams().set('search', search);
    return this.http.get<Playlist[]>(API_URL + '/home/playlist/search', {params});
  }

  getPlaylistByUser(idUser: number): Observable<Playlist[]> {
    return this.http.get<Playlist[]>(API_URL + '/home/playlist/list/' + idUser, this.httpService.getHttp());
  }

  createPlaylist(playlist: Playlist): Observable<any> {
    return this.http.post(API_URL + '/playlist', playlist, this.httpService.getHttp());
  }

  updatePlaylist(playlist: Playlist): Observable<any> {
    return this.http.put(API_URL + '/playlist/update', playlist, this.httpService.getHttp());
  }

  updateSongOfPlaylist(idPlaylist: number, idSong: number): Observable<any> {
    // @ts-ignore
    return this.http.get(API_URL + `/home/song/${idSong}/${idPlaylist}`, this.httpService.getHttp());
  }

  // xóa playlist
  deletePlaylist(idPlaylist: number): Observable<any> {
    return this.http.delete(API_URL + '/home/playlist/' + idPlaylist, this.httpService.getHttp());
  }

  // Xóa bài hát khỏi playlist
  deleteSongOfPlaylist(idPlaylist: number, idSong: number): Observable<any> {
    return this.http.delete(API_URL + `/home/song/${idSong}/${idPlaylist}`, this.httpService.getHttp());
  }
}
