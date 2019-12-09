import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { puc } from '../../puc/main/puc';

@Component({
  selector: 'app-budgedaccounts.module-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class BudgedAccountsModuleMainComponent implements OnInit{
  constructor() {}
  // bodycardtitled variables
  title = 'Cuentas: Cuentas Presupuestales';
  icon = 'list_alt';
  color = '#4bc0c0';
  subtitle = 'Listado de Cuentas Presupuestales disponibles en la plataforma.';

  mainTablePaginationOptions = [10, 15, puc.length];

  displayedColumns: string[] = ['number', 'name' ,'acciones'];
  dataSource = new MatTableDataSource<puc>(puc);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}

export interface puc {
  number: string;
  name: string;
}

const schools: puc[] = puc;