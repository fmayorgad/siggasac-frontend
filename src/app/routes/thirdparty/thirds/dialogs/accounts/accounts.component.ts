import { Component, OnInit, ViewChild , Inject} from '@angular/core';
import { environment } from '../../../../../../environments/environment'
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ThirdPartyTypesService } from '../../../../../services';
import { ThirdsService, BankService } from '../../../../../services';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
	selector: 'accounts',
	templateUrl: 'accounts.component.html',
})

export class AcountThirdDialogComponent implements OnInit{

	constructor(
		private thirdsService: ThirdsService,
		private thirdPartyTypesService: ThirdPartyTypesService,
		private _snackBar: MatSnackBar,
		public dialogRef: MatDialogRef<AcountThirdDialogComponent>,
		public bankService : BankService,
		@Inject(MAT_DIALOG_DATA) public incomingdata: any
	) { }
	title = this.incomingdata.businessName;
	icon = 'list';
	color = color;
	subtitle = 'Listado de Cuentas Bancarias';
	accountTypes = [];

	createFormGroup = new FormGroup({
		name: new FormControl('', [ Validators.maxLength(75), Validators.required, Validators.minLength(5)]),
		businessName: new FormControl('', [Validators.maxLength(75), Validators.required, Validators.minLength(5)]),
		firstname: new FormControl('', [Validators.maxLength(75), Validators.required, Validators.minLength(3)]),
	});

	matcher = new MyErrorStateMatcher();

	getAllTypes() {
        this.bankService.getTypes().subscribe(
			data => {
                console.log(data);
                this.accountTypes =  data;
			},
			error => {
				// this.alertService.error(error);
				console.log(error);
			});
	}
	ngOnInit() {
        this.getAllTypes();
    }

	create() {
		console.log( this.createFormGroup) ;
		console.log( this.createFormGroup.value) ;

		let tmp = {};
		tmp['code'] = Math.random()*100;
		tmp['businessName'] = this.createFormGroup.value.businessName;
		tmp['surname'] = this.createFormGroup.value.firstname;
		tmp['surname2'] = this.createFormGroup.value.lastname;
		tmp['name'] = this.createFormGroup.value.name;
		tmp['name2'] = 'NA';
		tmp['phones'] = this.createFormGroup.value.phones;
		tmp['cellphone'] = this.createFormGroup.value.cellphone;
		tmp['fax'] = this.createFormGroup.value.fax;
		tmp['postalCode'] = this.createFormGroup.value.postalcode;
		tmp['address'] = this.createFormGroup.value.address;
		tmp['documentNumber'] = this.createFormGroup.value.documentNumber;
		tmp['typePersonId'] = this.createFormGroup.value.typePerson;
		tmp['documentTypeId'] = this.createFormGroup.value.documentType;
		tmp['thirdPartyTypeId'] = this.createFormGroup.value.thirdtype;

		tmp['retentionEffect'] = this.createFormGroup.value.keep === 0 ? 0 : 1 ;
		tmp['vatInvoice'] = this.createFormGroup.value.iva ===  0 ? 0 : 1 ;
		tmp['isSelfRetainer'] = this.createFormGroup.value.selfkeep === 0 ? 0 : 1 ;
		tmp['isGreatContributor'] = this.createFormGroup.value.taxpayer === 0 ? 0 : 1 ;
		tmp['isWithholdingAgent'] = this.createFormGroup.value.keeper === 0 ? 0 : 1 ;
		tmp['declareIncome'] = this.createFormGroup.value.rent === 0 ? 0 : 1 ;

		this.thirdsService.create(tmp).subscribe(
			data => {
				console.log(data);
			},
			error => {
				// this.alertService.error(error);
				console.log(error);
			});
		this._snackBar.open('Tercero creado satisfactoriamente.', 'Aceptar', {
			duration: 3000,
		}); 
		this.dialogRef.close('Todo creado satisfactoriamente');
	}
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
	isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
		const isSubmitted = form && form.submitted;
		return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
	}
}

const color = environment.colors.success;

