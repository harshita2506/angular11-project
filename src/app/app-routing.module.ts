import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NewCompanyComponent } from './new-company/new-company/new-company.component';
import { CompanyListComponent } from './company-list/company-list/company-list.component';

export const routes = [
  { path: '', redirectTo: '/new-company', pathMatch: 'full' },
  { path: 'new-company', component: NewCompanyComponent, label: 'new Company' },
  { path: 'comapany-list', component: CompanyListComponent, label: 'comapany-list' },
  { path: '**', component: NewCompanyComponent }

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
