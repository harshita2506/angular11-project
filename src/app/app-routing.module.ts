import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

export const routes = [
  { path: '', redirectTo: '/new-company', pathMatch: 'full' },
  // {
  //   path: 'new-company', 
  //   loadChildren: './new-company/new-company/new-company.module#NewCompanyModule'
  // }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
