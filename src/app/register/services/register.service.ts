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
  constructor(private http: HttpClient) {}

  registerUser(userData: any): Observable<RegisteredUserData> {
    return <Observable<RegisteredUserData>>this.http.post(newUser, userData);
  }
}
