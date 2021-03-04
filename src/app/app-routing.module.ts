import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

export const routes = [
  // { path: '', redirectTo: '/new-company', pathMatch: 'full' },
  {
    path: 'new-company', loadChildren: () => import(`./new-company/new-company/new-company.module`).then(
      module => module.NewCompanyModule
    )
  },
  {
    path: 'company-list', loadChildren: () => import(`./company-list/company-list/company-list.module`).then(
      module => module.CompanyListModule
    )
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
