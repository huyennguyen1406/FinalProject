import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {LoginService} from '../../service/login.service';


declare var Swal: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  constructor(private fb: FormBuilder,
              private loginService: LoginService,
              private router: Router) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      address: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      email: ['', [Validators.required]],
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  // tslint:disable-next-line:typedef
  register(){
    const user = {
      name: this.registerForm.value.name,
      address: this.registerForm.value.address,
      phone: this.registerForm.value.phone,
      email: this.registerForm.value.email,
      username: this.registerForm.value.username,
      password: this.registerForm.value.password
    };
    this.loginService.register(user).subscribe(res => {
      // tslint:disable-next-line:triple-equals
      if (res.message != null) {
        this.router.navigate(['login']);
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: res.message,
        });
      }
    });
  }

}
