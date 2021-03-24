import { NgModule } from "@angular/core";
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSortModule } from '@angular/material/sort';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { CustomDateDirective } from './custom-date.directive';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ConfirmationDialogComponent, CustomDateDirective],
  imports: [MatDialogModule,
    MatFormFieldModule,
    MatButtonModule,
    MatListModule,
    MatMenuModule,
    MatPaginatorModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatSidenavModule,
    MatTableModule,
    MatNativeDateModule,
    MatSortModule,
    MatDatepickerModule,
    MatSnackBarModule,
    MatInputModule,
    MatSelectModule,
    CommonModule
  ],
  exports: [
    MatDialogModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatButtonModule,
    MatListModule,
    MatMenuModule,
    MatPaginatorModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatSidenavModule,
    MatTableModule,
    MatNativeDateModule,
    MatSortModule,
    MatDatepickerModule,
    MatSnackBarModule,
    MatInputModule,
    MatSelectModule,
    CustomDateDirective,
    RouterModule
  ],
  providers: [
  ],
})
export class SharedModule {

}