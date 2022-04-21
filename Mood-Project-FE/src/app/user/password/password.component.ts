import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UsersService} from '../../service/users.service';
import {Router} from '@angular/router';
// @ts-ignore
import {TokenStorageService} from '../../securiy/_services/token-storage.service';
import {ConfirmedValidator} from './confirmed.validators';
declare var Swal: any;
// @ts-ignore
@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {changePasswordForm: FormGroup;
  isRepassSuccessfully =  false;
  isRepassedFailed = true;
  errorMessage = '';
  idUser?: number;
  constructor(private fb: FormBuilder,
              private userService: UsersService,
              private router: Router,
              private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    this.changePasswordForm = this.fb.group({
      currentPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    }, {
      validators: ConfirmedValidator('newPassword', 'confirmPassword')
    });
    if (this.tokenStorage.getToken()){
      this.idUser = this.tokenStorage.getUser().id;
    }
  }

  // tslint:disable-next-line:typedef
  get currentPassword(){
    // @ts-ignore
    return this.changePasswordForm.get('currentPassword');
  }
  // tslint:disable-next-line:typedef
  get newPassword(){
    // @ts-ignore
    return this.changePasswordForm.get('newPassword');
  }
  // tslint:disable-next-line:typedef
  get confirmPassword(){
    // @ts-ignore
    return this.changePasswordForm.get('confirmPassword');
  }
  // tslint:disable-next-line:typedef
  get f(){
    return this.changePasswordForm.controls;
  }
  // tslint:disable-next-line:typedef
  changePassword(){
    const changPasswordForm = {
      currentPassword: this.changePasswordForm.value.currentPassword,
      newPassword: this.changePasswordForm.value.newPassword,
      confirmPassword: this.changePasswordForm.value.confirmPassword
    };
    // @ts-ignore
    this.userService.changePassword(changPasswordForm, this.idUser).subscribe(
      (data) => {
        console.log(data);
        this.isRepassSuccessfully = true;
        this.isRepassedFailed = false;
        this.router.navigate(['/login']).then();
        sessionStorage.clear();
      }
    );
  }
}
