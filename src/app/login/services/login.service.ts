import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { UserProfileService } from 'src/app/shared/services/user-profile.service';
import { environment } from '../../../environments/environment';

const auth = environment.urls.auth;
const profile = environment.urls.profile;

type UserProfileDataType = {
  idCardNumber: string;
  firstName: string;
  middleName: string;
  lastName: string;
  nickName: string;
  email: string;
  mobileNumber: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  village: string;
  pincode: string;
  country: string;
  branch: string;
  joiningDate: Date;
  dateOfBirth: Date;
  isLibrarian: false;
};

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(
    private http: HttpClient,
    private sharedService: UserProfileService,
    private _snackBar: MatSnackBar
  ) {}

  login(body: {
    username: string;
    password: string;
  }): Observable<{ access_token: string }> {
    return <Observable<{ access_token: string }>>this.http.post(auth, body);
  }

  getUserProfile(): Observable<UserProfileDataType> {
    return <Observable<UserProfileDataType>>this.http.get(profile);
  }

  setUserData(userdata: any) {
    this.sharedService.setUserData(userdata);
  }

  openSnackBar(message: string, level: 'DANGER' | 'SUCCESS' | 'NORMAL') {
    const pannelClasses = {
      DANGER: 'text-danger',
      SUCCESS: 'text-success',
      NORMAL: '',
    };
    this._snackBar.open(message, 'dismiss', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: pannelClasses[level],
    });
  }
}
