import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { SharedModule } from '../shared/shared.module';
import { UserProfileService } from '../shared/services/user-profile.service';
import { NavigationComponent } from './navigation/navigation.component';
import { LandingComponent } from './landing/landing.component';
import { BookingsComponent } from './bookings/bookings.component';


@NgModule({
  declarations: [
    UsersComponent,
    NavigationComponent,
    LandingComponent,
    BookingsComponent
  ],
  imports: [
    SharedModule,
    UsersRoutingModule
  ],
  providers: [UserProfileService]
})
export class UsersModule { }
