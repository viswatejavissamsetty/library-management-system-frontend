import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileService } from './services/user-profile.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [],
  imports: [],
  providers: [UserProfileService],
  exports: [CommonModule, ReactiveFormsModule, HttpClientModule, FormsModule],
})
export class SharedModule {
  static forRoot() {
    return {
      ngModule: SharedModule,
      providers: [UserProfileService],
    };
  }
}
