import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LibrariansRoutingModule } from './librarians-routing.module';
import { LibrariansComponent } from './librarians.component';


@NgModule({
  declarations: [
    LibrariansComponent
  ],
  imports: [
    CommonModule,
    LibrariansRoutingModule
  ]
})
export class LibrariansModule { }
