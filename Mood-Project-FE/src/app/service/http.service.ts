import { Injectable } from '@angular/core';
import {HttpHeaders} from '@angular/common/http';

// @ts-ignore
@Injectable({
  providedIn: 'root'
})
export class HttpService {

  token = sessionStorage.getItem('auth-token');
  // tslint:disable-next-line:variable-name
  headers_object = new HttpHeaders().set('Authorization', 'Bearer ' + this.token);
  httpOptions = {
    headers: this.headers_object
  };
  idUser: string;

  constructor() { }

  // tslint:disable-next-line:contextual-lifecycle use-lifecycle-interface
  ngOnInit(): void {
  }

  // tslint:disable-next-line:typedef
  getHttp(){
    return this.httpOptions;
  }

  // tslint:disable-next-line:typedef
  getID(): string {
    return this.idUser = sessionStorage.getItem('idUser');
  }
}
