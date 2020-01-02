import { Component, OnInit, ViewChild, Inject, ElementRef } from '@angular/core';
import { environment } from '../../../../../../environments/environment'
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ThirdPartyTypesService } from '../../../../../services';
import { ThirdsService, BankService } from '../../../../../services';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTable } from '@angular/material/table';

@Component({
	selector: 'accounts',
	templateUrl: 'accounts.component.html',
})

export class AcountThirdDialogComponent implements OnInit {

	constructor(
		private thirdsService: ThirdsService,
		private thirdPartyTypesService: ThirdPartyTypesService,
		private _snackBar: MatSnackBar,
		public dialogRef: MatDialogRef<AcountThirdDialogComponent>,
		public bankService: BankService,
		@Inject(MAT_DIALOG_DATA) public incomingdata: any
	) { }
	title = this.incomingdata.businessName;
	icon = 'list';
	color = color;
	subtitle = 'Listado de Cuentas Bancarias';
	accountTypes = [];
	banks = [];
	textTittle = 'Crear';
	data;
	canceleditbutton = false;

	// valores a poner en el formulario al editar
	bankId ;
	accountTypeId ;
	accountNumber ;

	createFormGroup = new FormGroup({
		bankId: new FormControl(this.bankId, [Validators.required]),
		accountTypeId: new FormControl(this.accountTypeId, [Validators.required]),
		accountNumber: new FormControl(this.accountNumber, [Validators.required, Validators.pattern('^[0-9]{7,14}$')]),
	});

	matcher = new MyErrorStateMatcher();

	dataSource = new MatTableDataSource<any>([]);
	displayedColumns: string[] = ['bankId', 'accountTypeId', 'accountNumber', 'acciones'];
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;
	@ViewChild(MatTable, { static: false }) tables: MatTable<any>;
	noData = false;
	isLoading = true;
	nodataheight = '100px';
	nodatamessage = 'No hay cuentas bancarias creadas';

	@ViewChild("bankselector", { static: true }) focussable: ElementRef;

	applyFilter(filterValue: string) {
		this.dataSource.filter = filterValue.trim().toLowerCase();
	}

	getAllTypes() {
		this.bankService.getTypes().subscribe(
			data => {
				console.log(data);
				this.accountTypes = data;
			},
			error => {
				// this.alertService.error(error);
				console.log(error);
			});
	}

	getAllBanks() {
		this.bankService.getAllBanks().subscribe(
			data => {
				console.log(data);
				this.banks = data;
			},
			error => {
				// this.alertService.error(error);
				console.log(error);
			});
	}

	selectInput() {
		this.focussable.nativeElement.focus();
	}

	getMyAccounts() {
		this.thirdsService.getAccounts(this.incomingdata.id).subscribe(
			data => {
				let tmp = data ? data : [];
				console.log(tmp);
				this.data = tmp;
				const x = [{bankId: 2, accountTypeId: 1, accountNumber: 3223232}];
				this.dataSource = new MatTableDataSource<any>(x);
				this.tables.renderRows();
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
				console.log(error);
			});
	}

	ngOnInit() {
		this.dataSource.paginator = this.paginator;
		this.dataSource.sort = this.sort;
		this.getAllTypes();
		this.getAllBanks();
		this.getMyAccounts();
	}

	create() {
		console.log(this.createFormGroup.value);
		const tmp = {};
		tmp['thirdPartyId'] = this.incomingdata.id;
		tmp['bankId'] = this.createFormGroup.value.bankId;
		tmp['accountTypeId'] = this.createFormGroup.value.accountTypeId;
		tmp['accountNumber'] = this.createFormGroup.value.accountNumber;

		this.thirdsService.createAccount(tmp).subscribe(
			data => {
				this._snackBar.open('Cuenta creada satisfactoriamente', 'Aceptar', {
					duration: 30000,
				});
				this.getMyAccounts();
			},
			error => {
				// this.alertService.error(error);
				console.log(error);
				this._snackBar.open('Error al realizar la acción. Intentalo de nuevo más tarde.', 'Aceptar', {
					duration: 3000,
				});
			});
	}
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
	isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
		const isSubmitted = form && form.submitted;
		return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
	}
}

const color = environment.colors.success;

