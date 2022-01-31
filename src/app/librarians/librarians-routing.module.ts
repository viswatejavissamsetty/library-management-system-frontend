import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotificationsComponent } from '../shared/components/notifications/notifications.component';
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
      },
      {
        path: 'notifications',
        component: NotificationsComponent,
      },
      {
        path: '',
        pathMatch: 'full',
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
