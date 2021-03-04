import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { CompanyListComponent } from './company-list.component';
import { CompanyListRoutingModule } from './company-list-routing.module';
import { CommonModule } from '@angular/common';

console.warn("company-list")
@NgModule({
  declarations: [CompanyListComponent],
  imports: [SharedModule, CompanyListRoutingModule, CommonModule],
  exports: []
})
export class CompanyListModule {

}