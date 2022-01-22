import { NgModule } from '@angular/core';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginService } from './services/login.service';
import { SharedModule } from '../shared/shared.module';
import { UserProfileService } from '../shared/services/user-profile.service';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    LoginRoutingModule,
    HttpClientModule,
    SharedModule
  ],
  providers: [LoginService, UserProfileService]
})
export class LoginModule {}
