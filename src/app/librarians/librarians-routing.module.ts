import { NewBookComponent } from './landing/new-book/new-book.component';
import { ReturnsComponent } from './landing/returns/returns.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotificationsComponent } from '../shared/components/notifications/notifications.component';
import { BookingsComponent } from './landing/bookings/bookings.component';
import { LandingComponent } from './landing/landing.component';
import { LibrariansComponent } from './librarians.component';

const routes: Routes = [
  {
    path: '',
    component: LibrariansComponent,
    children: [
      {
        path: 'landing',
        component: LandingComponent,
        children: [
          {
            path: 'bookings',
            component: BookingsComponent,
          },
          {
            path: 'returns',
            component: ReturnsComponent,
          },
          {
            path: 'new-book',
            component: NewBookComponent,
          },
          {
            path: '',
            redirectTo: 'bookings',
            pathMatch: 'full',
          },
          {
            path: '**',
            redirectTo: 'bookings',
          },
        ],
      },
      {
        path: 'notifications',
        component: NotificationsComponent,
      },
      {
        path: '',
        // pathMatch: 'full',
        redirectTo: 'landing',
      },
      {
        path: '**',
        redirectTo: 'landing',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LibrariansRoutingModule {}
