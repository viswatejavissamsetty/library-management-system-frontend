import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileService } from './services/user-profile.service';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [],
  imports: [
    
  ],
  providers: [UserProfileService],
  exports: [CommonModule, ReactiveFormsModule],
})
export class SharedModule {
  static forRoot() {
    return {
      ngModule: SharedModule,
      providers: [
        UserProfileService
      ],
    };
 }
}
