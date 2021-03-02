import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { PageEvent, MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { NewCompanyComponent } from 'src/app/new-company/new-company/new-company.component';
import { MatSort } from '@angular/material/sort';

export interface CompanyListElement {
  company_name: string;
  email: number;
  phone_number: number;
  created_at: string;
}

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.css']
})
export class CompanyListComponent implements OnInit, AfterViewInit {
  addNewCompanyDialogRef: MatDialogRef<NewCompanyComponent>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = ['company_name', 'email', 'phone_number', 'created_at', 'action'];
  dataSource = new MatTableDataSource<CompanyListElement>();
  companyList: any;
  newEvent: PageEvent;
  pageSize: number = 5;
  length: number = 0;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 20];
  constructor(private http: HttpClient, private dialog: MatDialog, private snackBarService: SnackbarService) { }

  ngOnInit(): void {
    this.getCompanyList(this.newEvent);
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  getCompanyList(event: PageEvent): void {
    this.http.get('http://localhost:3000/company')
      .subscribe(result => {
        this.companyList = result;
        this.dataSource = new MatTableDataSource<CompanyListElement>(this.companyList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  getRowData(row) {
    row.edit = true;
    this.addNewCompanyDialogRef = this.dialog.open(NewCompanyComponent, {
      height: '450px',
      data: row
    });
    this.addNewCompanyDialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getCompanyList(this.newEvent);
      }
    });
  }
  DeleteRowData(row) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      minHeight: 'auto',
      minWidth: '400px',
      data: 'Are you sure to delete this company details'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.http.delete('http://localhost:3000/company/' + row.id)
          .subscribe(() => {
            this.snackBarService.showSnackBar('Company details deleted successfully', '', 'success');
            this.getCompanyList(this.newEvent);
          });
      }
    });
  }
}
