import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {HttpService} from './http.service';
import {CommentPlaylist} from '../model/CommentPlaylist';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class CommentplaylistService {

  constructor(private http: HttpClient,
              private httpService: HttpService) { }

  // Lấy toàn bộ comment của playlist theo Id
  getCommentByPlaylist(idPlaylist: number): Observable<CommentPlaylist[]>{
    return this.http.get<CommentPlaylist[]>(API_URL + '/home/comment/playlist/list/' + idPlaylist);
  }

  // Lấy tổng like của playlist
  getTotalLikePlaylist(idPlaylist: number): Observable<any> {
    return this.http.get<any>(API_URL + `/home/like/playlist/${idPlaylist}`)
  }
  // Thêm comment vào playlist
  updateCommentPlaylist(commentPlaylist: CommentPlaylist): Observable<any> {
    return this.http.post(API_URL + '/home/comment/playlist', commentPlaylist, this.httpService.getHttp());
  }
}
