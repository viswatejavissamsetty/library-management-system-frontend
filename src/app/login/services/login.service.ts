import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserProfileService } from 'src/app/shared/services/user-profile.service';
import { environment } from '../../../environments/environment';

const auth = environment.urls.auth;
const profile = environment.urls.profile;

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient, private sharedService: UserProfileService) {}

  login(body: {
    username: string;
    password: string;
  }): Observable<{ access_token: string }> {
    return <Observable<{ access_token: string }>>this.http.post(auth, body);
  }

  getUserProfile() {
    return this.http.get(profile, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('access_token')}`,
      },
    });
  }

  setUserData(userdata: any) {
    this.sharedService.setUserData(userdata);
  }
}
