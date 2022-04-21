import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {HttpService} from './http.service';
import {CommentSong} from '../model/CommentSong';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class CommentsongService {

  constructor(private http: HttpClient,
              private httpService: HttpService) { }

  // Lấy hết comment trong 1 Song
  getCommentBySong(idSong: number): Observable<any>{
    return this.http.get<any>(API_URL + '/home/comment/song/list/' + idSong);
  }

  updateCommentSong(commentSong: CommentSong): Observable<any> {
    return this.http.post(API_URL + '/home/comment/song', commentSong, this.httpService.getHttp());
  }
}
