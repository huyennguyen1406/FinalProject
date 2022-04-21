import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {User} from '../../model/User';
import {UsersService} from '../../service/users.service';
import {HttpService} from '../../service/http.service';

// @ts-ignore
@Component({
  selector: 'app-navbar-user',
  templateUrl: './navbar-user.component.html',
  styleUrls: ['./navbar-user.component.css']
})
export class NavbarUserComponent implements OnInit {
  user: User;
  idUser: string;
  constructor(private route: Router,
              private userService: UsersService,
              private httpService: HttpService) { }

  ngOnInit(): void {
    this.idUser = this.httpService.getID();
    this.userService.getUserById(this.idUser).subscribe(res => {
      this.user = res;
    });
  }

  // tslint:disable-next-line:typedef
  logout(){
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('id');
    sessionStorage.clear();
    this.route.navigate(['']);
  }

}
