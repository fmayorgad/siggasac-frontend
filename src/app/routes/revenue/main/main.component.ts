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

  dataSource = new MatTableDataSource<Revenue>([]);

  noData = false;
  isLoading = true;
  nodataheight = '100px';
  nodatamessage = 'No hay datos para mostrar';

  constructor(
    public dialog: MatDialog,
    public revenueService: RevenueService,
  ) {
  }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  mainTablePaginationOptions: number[];

  displayedColumns: string[];


  ngOnInit(): void {
    this.displayedColumns = ['description', 'clasification', 'code', 'state', 'actions'];
    this.mainTablePaginationOptions = [5, 15, 50];
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.getAll();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getAll() {
    this.revenueService
      .getAllRevenues()
      .subscribe(
        data => {
          this.dataSource = new MatTableDataSource<Revenue>(data);
          this.mainTablePaginationOptions = [5, 15, 50];
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;

          this.isLoading = false;
          if(data.length==0){ this.noData=true}
        },
        error => {
          console.error(error);
        }
      );
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


