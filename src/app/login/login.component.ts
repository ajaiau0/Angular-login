import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';
const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
});

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private loginService: LoginService, private router: Router, private fb: FormBuilder) {
    this.loginForm = this.fb.group({ username: ['', Validators.required], password: ['', Validators.required] });
  }

  ngOnInit() {
  }
  login = () => {
    this.loginService.Login(this.loginForm.value).subscribe(res => {
      if (!!res) {
        Swal.fire(
          'Success!',
          `Hi ${res.user_name}`,
          'success'
        );
      }
    },
    (err: HttpErrorResponse) => {
      if (err instanceof HttpErrorResponse) {
        Toast.fire({
          title: '',
          icon: 'error',
          text: `${err.error.non_field_errors[0]}`
        });
      }
    });
  }
}
