import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LibrariansComponent } from './librarians.component';

const routes: Routes = [
  {
    path: '',
    component: LibrariansComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LibrariansRoutingModule { }
