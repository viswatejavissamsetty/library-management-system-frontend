import { Injectable } from '@angular/core';

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
  userProfileData!:UserProfileDataType;

  constructor() {}

  setUserData(data: any) {
    this.userProfileData = data;
  }

  getUserData(): UserProfileDataType{
    return this.userProfileData;
  }
}
