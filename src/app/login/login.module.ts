import { NgModule } from '@angular/core';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { LoginService } from './services/login.service';
import { SharedModule } from '../shared/shared.module';
import { UserProfileService } from '../shared/services/user-profile.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HeadersInterceptor } from '../headers.interceptor';
import { SnackbarService } from '../shared/services/snackbar.service';

@NgModule({
  declarations: [LoginComponent],
  imports: [LoginRoutingModule, SharedModule],
  providers: [LoginService, UserProfileService, SnackbarService],
})
export class LoginModule {}
