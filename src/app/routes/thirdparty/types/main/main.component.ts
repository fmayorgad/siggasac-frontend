import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { CreateThirdTypeDialogComponent } from '../dialogs/create/create.component';
import { ThirdPartyTypesService } from '../../../../services';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-budgedaccounts.module-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.css']
})
export class ThirdTypesMainComponent implements OnInit {
    constructor(
        public dialog: MatDialog,
        private thirdPartyTypesService: ThirdPartyTypesService,
        ) { }
    // bodycardtitled variables
    title = 'Terceros: Tipos de Terceros';
    icon = 'group';
    color = '#ff7e40';
    subtitle = 'Listado de los Tipos de Terceros creados en la plataforma.';

    mainTablePaginationOptions = [10, 15, 50];

    states = { 0: 'Inactivo', 1: 'Activo' };
    types = [];

    displayedColumns: string[] = ['id', 'name', 'state', 'acciones'];
    dataSource = new MatTableDataSource<types>([]);

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    getAll() {
        this.thirdPartyTypesService.getAll().subscribe(
			data => {
                console.log(data);
                this.types =  data;
                this.dataSource = new MatTableDataSource<types>(this.types);
			},
			error => {
				// this.alertService.error(error);
				console.log(error);
			});
    }

    create() {
        const dialogRef = this.dialog.open(CreateThirdTypeDialogComponent, { disableClose: true });
        dialogRef.afterClosed().subscribe(result => {
            this.getAll();
        });
    }

    ngOnInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.getAll();
    }
}

export interface types {
    id: number;
    description: string;
    state: number;
}

