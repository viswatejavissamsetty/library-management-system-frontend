import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
        path: '',
        pathMatch: 'full',
        redirectTo: 'landing'
      },
      {
        path: '**',
        redirectTo: 'landing'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LibrariansRoutingModule { }
