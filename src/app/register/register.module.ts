import { NgModule } from '@angular/core';

import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './register.component';

import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from '../shared/shared.module';
import { RegisterService } from './services/register.service';

@NgModule({
  declarations: [RegisterComponent],
  imports: [
    RegisterRoutingModule,
    SharedModule,
    MatStepperModule,
    MatFormFieldModule,
    MatButtonModule
  ],
  providers: [RegisterService]
})
export class RegisterModule {}
