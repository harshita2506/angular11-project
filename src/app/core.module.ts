import { NgModule } from '@angular/core';
import { MatSidenavContainer } from '@angular/material/sidenav';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@NgModule({
  providers: [MatSidenavContainer,
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} }]
})
export class CoreModule {

}