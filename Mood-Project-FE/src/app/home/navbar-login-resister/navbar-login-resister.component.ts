import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {SongService} from "../../service/song.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar-login-resister',
  templateUrl: './navbar-login-resister.component.html',
  styleUrls: ['./navbar-login-resister.component.css']
})
export class NavbarLoginResisterComponent implements OnInit {

  isLoggedIn: boolean;
  searchForm: FormGroup;

  constructor(private songService: SongService,
              private router: Router,
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group(
      {
        nameSearch: ['']
      });
    if (sessionStorage.getItem('auth-token')){
      this.isLoggedIn = true;
    }
  }

  // tslint:disable-next-line:typedef
  search() {
    this.router.navigate(['/search'], { queryParams: { name: this.searchForm.value.nameSearch } });
  }

  // tslint:disable-next-line:typedef
  changePage() {
    // @ts-ignore
    this.router.navigate(['/login'] );
  }

}
