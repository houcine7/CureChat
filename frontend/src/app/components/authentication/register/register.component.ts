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

  progressValue!: number | undefined;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private fireStorage: AngularFireStorage,
    private authService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.registerFormGroup = this.fb.group({
      username: this.fb.control(null),
      firstName: this.fb.control(null),
      lastName: this.fb.control(null),
      password: this.fb.control(null),
      confirmPassword: this.fb.control(null),
      avatar: this.fb.control(null),
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
    const data = {
      username: this.registerFormGroup.value.username,
      password: this.registerFormGroup.value.password,
      firstName: this.registerFormGroup.value.firstName,
      lastName: this.registerFormGroup.value.lastName,
      avatar: this.downloadedUrl,
    };

    this.authService.register(data).subscribe({
      next: (res) => {
        console.log(res);
        localStorage.setItem('user', JSON.stringify(res));
        this.router.navigateByUrl('/user/messages');
      },
      error: (err) => {
        console.log(err);
      },
    });
  };
}
