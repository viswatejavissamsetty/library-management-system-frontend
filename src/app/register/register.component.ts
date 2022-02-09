import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserProfileService } from '../shared/services/user-profile.service';
import { RegisterService } from './services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  isLinear = true; // TODO: Need to change it to true
  basicFormGroup: FormGroup;
  securityInformationFormGroup: FormGroup;
  addressDetailsFormGroup: FormGroup;

  confirm = false;

  constructor(
    private _formBuilder: FormBuilder,
    private registerService: RegisterService,
    private userProfileService: UserProfileService,
    private router: Router
  ) {
    this.basicFormGroup = this._formBuilder.group({
      idCardNumber: ['', Validators.required],
      firstName: ['', Validators.required],
      middleName: [''],
      lastName: ['', Validators.required],
      nickName: [''],
    });
    this.securityInformationFormGroup = this._formBuilder.group({
      email: ['', Validators.required],
      mobileNumber: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.addressDetailsFormGroup = this._formBuilder.group({
      addressLine1: ['', Validators.required],
      addressLine2: [''],
      city: ['', Validators.required],
      state: ['', Validators.required],
      village: ['', Validators.required],
      pincode: ['', Validators.required],
      country: ['', Validators.required],
      branch: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  registerUser() {
    this.registerService
      .registerUser({
        ...this.basicFormGroup.value,
        ...this.addressDetailsFormGroup.value,
        ...this.securityInformationFormGroup.value,
      })
      .subscribe(
        (data) => {
          this.userProfileService.setUserData(data);
          this.userProfileService.openSnackBar(
            'Succesfully registered account',
            'SUCCESS'
          );
          this.router.navigate(['..', 'login']);
        },
        (err) => {
          this.userProfileService.openSnackBar(err.error.message, 'DANGER');
        }
      );
  }
}
