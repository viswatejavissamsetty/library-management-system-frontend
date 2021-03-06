import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { SharedModule } from '../shared/shared.module';
import { UserProfileService } from '../shared/services/user-profile.service';
import { NavigationComponent } from './navigation/navigation.component';
import { LandingComponent } from './landing/landing.component';
import { BookingsComponent } from './bookings/bookings.component';
import { BooksComponent } from './landing/books/books.component';
import { BooksService } from './services/books.service';
import { BookItemComponent } from './landing/books/book-item/book-item.component';
import { BookViewComponent } from './landing/books/book-view/book-view.component';
import { QrCodeModule } from 'ng-qrcode';
import { BookingService } from './services/booking.service';
import { SnackbarService } from '../shared/services/snackbar.service';
import { NotificationsService } from '../shared/services/notifications.service';

@NgModule({
  declarations: [
    UsersComponent,
    NavigationComponent,
    LandingComponent,
    BookingsComponent,
    BooksComponent,
    BookItemComponent,
    BookViewComponent,
  ],
  imports: [SharedModule, UsersRoutingModule, QrCodeModule, CommonModule],
  providers: [
    UserProfileService,
    BooksService,
    BookingService,
    SnackbarService,
  ],
})
export class UsersModule {
  constructor(notificationsService: NotificationsService) {
    setTimeout(() => {
      notificationsService.notificationFetchControl.next(true);
    }, 1000);
  }
}
