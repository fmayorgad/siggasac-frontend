import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';

import { RevenueService } from '../../../services';
import { RevenueDialogsCreateComponent } from '../dialogs/create/create.component';

@Component({
  selector: 'app-vouchers-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class RevenueMainComponent implements OnInit {
  title = 'Flujos';
  icon = 'assessment';
  color = '#20b9e5';
  subtitle = 'flujos creados en la plataforma';

  dataSource: MatTableDataSource<Revenue>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  mainTablePaginationOptions: number[];

  displayedColumns: string[];

  constructor(
    public dialog: MatDialog,
    public revenueService: RevenueService,
  ) {
  }

  ngOnInit(): void {
    this.getAll();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getAll() {
    this.revenueService
      .getAllRevenues()
      .subscribe(
        revenues => {
          this.dataSource = new MatTableDataSource<Revenue>(revenues);
          this.initTableComponents();
        },
        error => {
          console.error(error);
        }
      );
  }

  private initTableComponents() {
    this.displayedColumns = ['description', 'classification', 'code', 'state', 'actions'];
    this.mainTablePaginationOptions = [10, 15, 50];
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  createRevenue() {
    const dialogRef = this.dialog.open(RevenueDialogsCreateComponent, { disableClose: true });
    dialogRef.afterClosed().subscribe(result => {
      if (result) this.getAll();
    });
  }

}

interface Revenue {
  id: number;
  description: string;
  classification: string;
  code: string;
  state: number
}


