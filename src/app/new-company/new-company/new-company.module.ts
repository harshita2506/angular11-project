import { NgModule } from '@angular/core';
import { NewCompanyComponent } from './new-company.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NewCompanyRoutingModule } from './new-company-routing.module';

@NgModule({
  declarations: [NewCompanyComponent],
  imports: [SharedModule, ReactiveFormsModule, CommonModule, RouterModule, NewCompanyRoutingModule],
  exports:[]
})

export class NewCompanyModule{

}