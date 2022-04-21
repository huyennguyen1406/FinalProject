import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {HttpService} from './http.service';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class LikesongService {

  constructor(private http: HttpClient,
              private httpService: HttpService) { }

  getAllLikeSong(): Observable<any> {
    return this.http.get<any>(API_URL + '/like/song', this.httpService.getHttp());
  }

  getTotalLike(idSong: number): Observable<any> {
    return this.http.get<any>(API_URL + `/home/like/song/${idSong}`)
  }

  updateLikeSong(idUser: number, idSong: number): Observable<any> {
    return this.http.get(API_URL + `/home/like/song/${idUser}/${idSong}`, this.httpService.getHttp());
  }
}
