import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material';

import { BankService } from '../../../services';
import { BanksDialogsCreateComponent } from '../dialogs/create/create.component';
import { BanksDialogsEditComponent } from '../dialogs/edit/edit.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-requests-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class RequestsMainComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    private bankService: BankService,
    private _snackBar: MatSnackBar,
  ) {
  }

  title = 'Solicitudes de Modificación';
  icon = 'playlist_add_check';
  color = '#3f51b5';
  subtitle = 'Listado de Solicitudes de Modificación de las instituciones';

  noData = false;
  isLoading = true;
  nodataheight = '100px';
  nodatamessage = 'No hay datos para mostrar';

  states = {
    0: 'Inactivo',
    1: 'Activo'
  };

  mainTablePaginationOptions: number[] = [5, 10, 15, 50];
  displayedColumns = ['name', 'code', 'state', 'actions'];

  dataSourcePending = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator, { static: false }) paginatorPending: MatPaginator;
  @ViewChild(MatSort, { static: false }) sortPending: MatSort;
  @ViewChild(MatTable, { static: false }) tablePending: MatTable<any>;

  dataSourceSolved = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator, { static: false }) paginatorSolved: MatPaginator;
  @ViewChild(MatSort, { static: false }) sortSolved: MatSort;
  @ViewChild(MatTable, { static: false }) tableSolved: MatTable<any>;

  ngOnInit() {
    this.getAll();
    this.dataSourcePending.paginator = this.paginatorPending;
    this.dataSourcePending.sort = this.sortPending;

    this.dataSourceSolved.paginator = this.paginatorSolved;
    this.dataSourceSolved.sort = this.sortSolved;
  }

  applyFilter(targetTable, filterValue: string) {
    this[targetTable].filter = filterValue.trim().toLowerCase();
  }

  edit(element) {

    console.log(element)
    const dialogRef = this.dialog.open(BanksDialogsEditComponent, { disableClose: true, data: element });

    dialogRef.afterClosed().subscribe(result => {
      if (result.state === 1) {
        this._snackBar.open(result.message, 'Aceptar', {
          duration: 3000,
        });
        this.getAll();
      }
      if (result.state === 0) {
        this._snackBar.open(result.message, 'Aceptar', {
          duration: 3000,
        });
      }
    });
  }

  getAll() {
    this.bankService.getAllBanks()
      .subscribe(banks => {
        this.dataSourcePending = new MatTableDataSource<any>(banks);
        this.dataSourcePending.paginator = this.paginatorPending;
        this.dataSourcePending.sort = this.sortPending;
        this.tablePending.renderRows();
        this.isLoading = false;

        if (banks.length == 0) { this.noData = true }
      });
  }

  createBank() {
    const dialogRef = this.dialog.open(BanksDialogsCreateComponent, { disableClose: true });
    dialogRef.afterClosed().subscribe(result => {
      if (result) { this.getAll(); }
    });
  }
}


