import { Component, OnInit, ViewChild, ChangeDetectorRef  } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { CreateThirdDialogComponent } from '../dialogs/create/create.component';
import { ThirdsService } from '../../../../services';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-budgedaccounts.module-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.css']
})
export class ThirdsMainComponent implements OnInit {
    constructor(
        public dialog: MatDialog,
        private thirdsService: ThirdsService,
        private changeDetectorRefs: ChangeDetectorRef
        ) { }
    // bodycardtitled variables
    title = 'Terceros:Terceros';
    icon = 'group';
    color = 'tomato';
    subtitle = 'Listado de los Terceros creados en la plataforma.';

    mainTablePaginationOptions = [5, 10, 15, 50];

    states = { 0: 'Inactivo', 1: 'Activo' };
    data = [];

    displayedColumns: string[] = ['id', 'businessName','name', 'phones', 'acciones'];
    dataSource = new MatTableDataSource<any>([]);

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;
    @ViewChild(MatTable, {static: false}) tables: MatTable<any>;

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    getAll() {
        this.thirdsService.getAll().subscribe(
			data => {
                console.log(data);
                this.data =  data;
                this.dataSource = new MatTableDataSource<types>(this.data);
                this.changeDetectorRefs.detectChanges();
                this.tables.renderRows();
			},
			error => {
				// this.alertService.error(error);
				console.log(error);
			});
    }

    create() {
        const dialogRef = this.dialog.open(CreateThirdDialogComponent, { disableClose: true });
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

