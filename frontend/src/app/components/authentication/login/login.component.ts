import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginFormGroup!: FormGroup;
  isTaskFaild: boolean = false;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.loginFormGroup = this.fb.group({
      username: this.fb.control(''),
      password: this.fb.control(''),
    });
  }

  handelSubmit = (): void => {
    //
    const data = {
      username: this.loginFormGroup.value.username,
      password: this.loginFormGroup.value.password,
    };

    if (data.username.length <= 3) {
      this.errorMessage = 'username is not valid';
      this.isTaskFaild = true;
    } else if (data.password.length < 8) {
      this.errorMessage = 'Password  is not valid';
      this.isTaskFaild = true;
    } else {
      //
      this.authService.loging(data).subscribe({
        next: (res) => {
          localStorage.setItem('user', JSON.stringify(res));
          this.router.navigateByUrl('user/messages').then(() => {
            window.location.reload();
          });
        },
        error: (err) => {
          this.errorMessage = 'Bad credentials';
          this.isTaskFaild = true;
        },
      });
    }
  };

  handelHideAlert = (): void => {
    this.isTaskFaild = false;
  };
}
