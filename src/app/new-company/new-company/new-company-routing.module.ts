import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { NewCompanyComponent } from './new-company.component';


const route: Routes = [
  { path: '', component: NewCompanyComponent }
]
@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(route)],
  exports: [RouterModule]
})
export class NewCompanyRoutingModule {

}