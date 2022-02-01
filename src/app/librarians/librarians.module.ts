import { LibrarianService } from './services/librarian.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LibrariansRoutingModule } from './librarians-routing.module';
import { LibrariansComponent } from './librarians.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HeadersInterceptor } from '../headers.interceptor';
import { NavigationComponent } from './navigation/navigation.component';
import { LandingComponent } from './landing/landing.component';
import { SharedModule } from '../shared/shared.module';
import { BookingsComponent } from './landing/bookings/bookings.component';
import { ReturnsComponent } from './landing/returns/returns.component';
import { NewBookComponent } from './landing/new-book/new-book.component';

@NgModule({
  declarations: [
    LibrariansComponent,
    NavigationComponent,
    LandingComponent,
    BookingsComponent,
    ReturnsComponent,
    NewBookComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    LibrariansRoutingModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeadersInterceptor,
      multi: true,
    },
    LibrarianService
  ]
})
export class LibrariansModule { }
