import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material';

import { BankService, GlobalService } from '../../../../services';
import { BanksDialogsCreateComponent } from '../dialogs/create/create.component';
import { EditPermissionsDialogsEditComponent } from '../dialogs/editPermission/edit.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-banks-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class PlatformMainComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    private bankService: BankService,
    private _snackBar: MatSnackBar,
    private globalService: GlobalService
  ) {
  }

  windowwith = window.innerWidth;
  colsnumber = 6;

  cards = {
    profiles: {
      title: 'Asignación de Permisos',
      icon: 'person_add',
      color: '#ee4e1c',
      subtitle: 'Asignar permisos a los perfiles existentes',
    },
    aud: {
      title: 'Auditoría',
      icon: 'playlist_add_check',
      color: '#f7555c',
      subtitle: 'Activar/desactivar auditoria de módulos',
    },
  };

  profiles;

  nodataheight = '100px';
  nodatamessage = 'No hay datos para mostrar';

  states = {
    0: 'Inactivo',
    1: 'Activo'
  };


  // tabla permisos
  dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatTable, { static: false }) table: MatTable<any>;
  mainTablePaginationOptions: number[];
  displayedColumns: string[];
  noData = false;
  isLoading = true;

  // tabla auditoría
  dataSourceAuditoria = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator, { static: false }) paginatorAuditoria: MatPaginator;
  @ViewChild(MatSort, { static: false }) sortAuditoria: MatSort;
  @ViewChild(MatTable, { static: false }) tableAuditoria: MatTable<any>;
  mainTablePaginationOptionsAuditoria: number[];
  displayedColumnsAuditoria: string[];
  noDataAuditoria = false;
  isLoadingAuditoria = true;

  @HostListener('window:resize', ['$event']) onResize(event) {
    this.windowwith = event.target.innerWidth;
  }

  getAllProfiles() {
    this.globalService.getProfiles().subscribe(
      data => {
        console.log(data);
        this.dataSource = new MatTableDataSource<any>(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.isLoading = false;
        if (data.length === 0) {
          this.noData = true;
        } else {
          this.noData = false;
        }
      },
      error => {
      });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  editPermissions(element) {

    console.log(element)
    const dialogRef = this.dialog.open(EditPermissionsDialogsEditComponent, { disableClose: true, data: element });

    dialogRef.afterClosed().subscribe(result => {
      if (result.state === 1) {
        this._snackBar.open(result.message, 'Aceptar', {
          duration: 3000,
        });
      }
      if (result.state === 0) {
        this._snackBar.open(result.message, 'Aceptar', {
          duration: 3000,
        });
      }
    });
  }

  ngOnInit() {
    this.getAllProfiles();
    this.displayedColumns = ['name', 'actions'];
    this.mainTablePaginationOptions = [4, 15, 50];
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }



  // edit(element) {

  //   console.log(element)
  //   const dialogRef = this.dialog.open(BanksDialogsEditComponent, { disableClose: true, data: element });

  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result.state === 1) {
  //       this._snackBar.open(result.message, 'Aceptar', {
  //         duration: 3000,
  //       });
  //       this.getAll();
  //     }
  //     if (result.state === 0) {
  //       this._snackBar.open(result.message, 'Aceptar', {
  //         duration: 3000,
  //       });
  //     }
  //   });
  // }

  // getAll() {
  //   this.bankService.getAllBanks()
  //     .subscribe(banks => {
  //       this.dataSource = new MatTableDataSource<Bank>(banks);
  //       this.dataSource.paginator = this.paginator;
  //       this.dataSource.sort = this.sort;
  //       this.table.renderRows();
  //       this.isLoading = false;

  //       if (banks.length == 0) { this.noData = true }
  //     });
  // }

  // createBank() {
  //   const dialogRef = this.dialog.open(BanksDialogsCreateComponent, { disableClose: true });
  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result) { this.getAll(); }
  //   });
  // }
}
