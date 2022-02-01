import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { SharedModule } from '../shared/shared.module';
import { UserProfileService } from '../shared/services/user-profile.service';
import { NavigationComponent } from './navigation/navigation.component';
import { LandingComponent } from './landing/landing.component';
import { BookingsComponent } from './bookings/bookings.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HeadersInterceptor } from '../headers.interceptor';
import { BooksComponent } from './landing/books/books.component';
import { BooksService } from './services/books.service';
import { BookItemComponent } from './landing/books/book-item/book-item.component';
import { BookViewComponent } from './landing/books/book-view/book-view.component';
import { QrCodeModule } from 'ng-qrcode';
import { BookingService } from './services/booking.service';

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
  imports: [SharedModule, UsersRoutingModule, QrCodeModule],
  providers: [
    UserProfileService,
    BooksService,
    BookingService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeadersInterceptor,
      multi: true,
    },
  ],
})
export class UsersModule {}
