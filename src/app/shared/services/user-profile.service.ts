import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

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
export class UserProfileService {
  userProfileData!: UserProfileDataType;
  private userId: string = '';

  constructor(private http: HttpClient) {
    this.getUserData().subscribe((userProfile) => {
      this.userId = userProfile.idCardNumber;
      this.userProfileData = userProfile;
    });
  }

  setUserData(data: any) {
    this.userProfileData = data;
    console.log(this.userProfileData);
  }

  getUserData(): Observable<UserProfileDataType> {
    return <Observable<UserProfileDataType>>this.http.get(profile);
  }

  getUserId(): string {
    return this.userId;
  }
}
