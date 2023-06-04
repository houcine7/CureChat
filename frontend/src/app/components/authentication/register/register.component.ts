import { Component, OnInit } from '@angular/core';
import {
  AngularFireStorage,
  AngularFireUploadTask,
} from '@angular/fire/compat/storage';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerFormGroup!: FormGroup;

  basePath: string = '/images';
  downloadedUrl: string = '';
  task!: AngularFireUploadTask;
  isAvatarAdded: boolean = false;
  isTaskFaild: boolean = false;
  errorMessage!: string;

  progressValue!: number | undefined;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private fireStorage: AngularFireStorage,
    private authService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.registerFormGroup = this.fb.group({
      username: this.fb.control(''),
      firstName: this.fb.control(''),
      lastName: this.fb.control(''),
      password: this.fb.control(''),
      confirmPassword: this.fb.control(''),
      avatar: this.fb.control(''),
    });
  }

  async onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.isAvatarAdded = true;
      const filePath = `${this.basePath}/${file.name}`;
      this.task = this.fireStorage.upload(filePath, file);

      this.task.percentageChanges().subscribe({
        next: (next) => {
          this.progressValue = next;
        },
        error: (err) => {
          console.log(err);
        },
      });

      (await this.task).ref.getDownloadURL().then((url) => {
        console.log(url);

        this.downloadedUrl = url;
      });
    } else {
      alert('No images selected');
      this.downloadedUrl = '';
    }
  }

  handelClick = (): void => {
    console.log(typeof this.registerFormGroup.value.username);
    const data = {
      username: this.registerFormGroup.value.username,
      password: this.registerFormGroup.value.password,
      firstName: this.registerFormGroup.value.firstName,
      lastName: this.registerFormGroup.value.lastName,
      avatar: this.downloadedUrl,
    };

    if (data.username.length <= 3) {
      this.errorMessage = 'username must be at least 4 characters';
      this.isTaskFaild = true;
    } else if (
      data.password.length < 8 ||
      this.registerFormGroup.value.confirmPassword !== data.password
    ) {
      this.errorMessage =
        'Password  must be at least 8 characters, check also password confirmation';
      this.isTaskFaild = true;
    } else if (data.avatar.length == 0) {
      this.errorMessage = 'Kindely add an avatar to your account';
      this.isTaskFaild = true;
    } else if (
      data.lastName.length < 3 ||
      data.firstName.length < 3 ||
      data.lastName.length > 10 ||
      data.firstName.length > 10
    ) {
      this.errorMessage = 'pleas enter a valid first name & last name';
      this.isTaskFaild = true;
    } else {
      this.authService.register(data).subscribe({
        next: (res) => {
          console.log(res);
          localStorage.setItem('user', JSON.stringify(res));
          this.router.navigateByUrl('/user/messages');
        },
        error: (err) => {
          this.isTaskFaild = true;
          this.errorMessage = err.message;
          console.log(err);
        },
      });
    }
  };

  handelHideAlert = (): void => {
    this.isTaskFaild = false;
  };
}
