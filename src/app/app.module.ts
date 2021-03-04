import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SidenavComponent } from './sidenav/sidenav.component';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core.module';
import { NewCompanyModule } from './new-company/new-company/new-company.module';
import { CompanyListModule } from './company-list/company-list/company-list.module';

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    CoreModule,
    // NewCompanyModule,
    // CompanyListModule,
  ],
  exports: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
