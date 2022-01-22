import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginData: FormGroup;

  constructor(private fb: FormBuilder, private loginService: LoginService, private router: Router) {
    this.loginData = fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  login() {
    if (this.loginData.valid) {
      this.loginService.login(this.loginData.value).subscribe(
        ({ access_token }) => {
          console.log(access_token);
          sessionStorage.setItem('access_token', access_token);
          this.loginService.getUserProfile().subscribe(
            (data) => {
              this.loginService.setUserData(data);
              if(data.isLibrarian){
                this.router.navigate(['..', 'librarian'])
              }else{
                this.router.navigate(['', 'users'])
              }
            },
            (error) => {
              console.error(error);
            }
          );
        },
        (err) => {
          console.error(err);
        }
      );
    } else {
      console.log('Invalid form data');
    }
  }
}
