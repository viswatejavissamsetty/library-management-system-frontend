import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

export type RegisteredUserData = {
  idCardNumber: string;
  firstName: string;
  middleName: string;
  lastName: string;
  nickName: string;
  email: string;
  password: string;
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
  isLibrarian: boolean;
};

const newUser = environment.urls.newUser;

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  constructor(private http: HttpClient, private _snackBar: MatSnackBar) {}

  registerUser(userData: any): Observable<RegisteredUserData> {
    return <Observable<RegisteredUserData>>this.http.post(newUser, userData);
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
