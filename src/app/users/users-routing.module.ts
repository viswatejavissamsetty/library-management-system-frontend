import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotificationsComponent } from '../shared/components/notifications/notifications.component';
import { BookingsComponent } from './bookings/bookings.component';
import { BookViewComponent } from './landing/books/book-view/book-view.component';
import { LandingComponent } from './landing/landing.component';
import { UsersComponent } from './users.component';

const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
    children: [
      { path: 'landing', component: LandingComponent },
      { path: 'bookings', component: BookingsComponent },
      { path: 'books/:book', component: BookViewComponent },
      { path: 'notifications', component: NotificationsComponent },
      { path: '', redirectTo: 'landing', pathMatch: 'full' },
      { path: '**', component: LandingComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
