import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';

import { VoucherService } from '../../../services';
import { VouchersDialogsCreateComponent } from '../dialogs/create/create.component';

@Component({
  selector: 'app-vouchers-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class VouchersMainComponent implements OnInit {
  title = 'Comprobantes';
  icon = 'receipt';
  color = '#20b9e5';
  subtitle = 'comprobantes creados en la plataforma';

  dataSource: MatTableDataSource<Voucher>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  mainTablePaginationOptions: number[];

  displayedColumns: string[];

  constructor(
    public dialog: MatDialog,
    public voucherService: VoucherService,
  ) {
  }

  ngOnInit(): void {
    this.getAll();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getAll() {
    this.voucherService
      .getAllVouchers()
      .subscribe(
        vouchers => {
          this.dataSource = new MatTableDataSource<Voucher>(vouchers);
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

  createVoucher() {
    const dialogRef = this.dialog.open(VouchersDialogsCreateComponent, { disableClose: true });
    dialogRef.afterClosed().subscribe(result => {
      if (result) this.getAll();
    });
  }

}

interface Voucher {
  id: number;
  description: string;
  classification: string;
  code: string;
  state: number
}


