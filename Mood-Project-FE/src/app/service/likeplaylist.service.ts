import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {HttpService} from './http.service';
import {LikePlaylist} from '../model/LikePlaylist';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class LikeplaylistService {

  constructor(private http: HttpClient,
              private httpService: HttpService) { }


  getTotalLike(idPlaylist: number): Observable<any> {
    return this.http.get<any> (API_URL + `/home/like/playlist/${idPlaylist}`, this.httpService.getHttp())
  }

  updateLikePlaylist(idUser: number, idPlaylist: number): Observable<any> {
    return this.http.get(API_URL + `/home/like/playlist/${idUser}/${idPlaylist}`, this.httpService.getHttp());
  }


}
