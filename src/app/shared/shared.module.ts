import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileService } from './services/user-profile.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HeadersInterceptor } from '../headers.interceptor';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { NotificationsService } from './services/notifications.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';


@NgModule({
  declarations: [NotificationsComponent],
  imports: [CommonModule, FormsModule],
  providers: [UserProfileService, NotificationsService],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    MatSnackBarModule,
    NotificationsComponent,
  ],
})
export class SharedModule {
  static forRoot() {
    return {
      ngModule: SharedModule,
      providers: [
        UserProfileService,
        NotificationsService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: HeadersInterceptor,
          multi: true,
        },
      ],
    };
  }
}
