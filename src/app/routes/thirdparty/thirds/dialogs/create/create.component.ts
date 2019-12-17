import { Component, OnInit, ViewChild , Inject} from '@angular/core';
import { environment } from '../../../../../../environments/environment'
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ThirdPartyTypesService } from '../../../../../services';
import { ThirdsService } from '../../../../../services';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
	selector: 'createthird',
	templateUrl: 'create.html',
})

export class CreateThirdDialogComponent implements OnInit{

	constructor(
		private thirdsService: ThirdsService,
		private thirdPartyTypesService: ThirdPartyTypesService,
		private _snackBar: MatSnackBar,
		public dialogRef: MatDialogRef<CreateThirdDialogComponent>,
	) { }
	title = 'Crear';
	icon = 'group';
	color = color;
	subtitle = 'Crear un Tercero.';
	typesthirds = [];

	createFormGroup = new FormGroup({
		name: new FormControl('', [ Validators.maxLength(75), Validators.required, Validators.minLength(5)]),
		businessName: new FormControl('', [Validators.maxLength(75), Validators.required, Validators.minLength(5)]),
		firstname: new FormControl('', [Validators.maxLength(75), Validators.required, Validators.minLength(3)]),
		lastname: new FormControl('', [Validators.maxLength(75), Validators.required, Validators.minLength(3)]),
		address: new FormControl('', [Validators.maxLength(75),  Validators.minLength(3)]),
		neighbohood: new FormControl('', [Validators.maxLength(75),  Validators.minLength(5)]),
		phones: new FormControl('', [Validators.maxLength(50),  Validators.minLength(7)]),
		cellphone: new FormControl('', [Validators.maxLength(38),  Validators.minLength(10)]),
		fax: new FormControl('', [Validators.maxLength(20),  Validators.minLength(5)]),
		postalcode: new FormControl('', [Validators.maxLength(10), Validators.minLength(10)]),
		typePerson: new FormControl('', [Validators.required]),
		documentNumber: new FormControl('', [Validators.required, Validators.maxLength(15), Validators.minLength(8)]),
		documentType: new FormControl('', [Validators.required]),
		thirdtype: new FormControl('', [Validators.required]),
	});

	matcher = new MyErrorStateMatcher();

	getAllTypes() {
        this.thirdPartyTypesService.getAll().subscribe(
			data => {
                console.log(data);
                this.typesthirds =  data;
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

		let tmp = {}
		tmp['code'] = Math.random()*100;
		tmp['businessName'] = this.createFormGroup.value.businessName;
		tmp['surname'] = this.createFormGroup.value.firstname;
		tmp['surname2'] = this.createFormGroup.value.lastname;
		tmp['name'] = this.createFormGroup.value.name;
		tmp['name2'] = "NA";
		tmp['phones'] = this.createFormGroup.value.phones;
		tmp['cellphone'] = this.createFormGroup.value.cellphone;
		tmp['fax'] = this.createFormGroup.value.fax;
		tmp['postalCode'] = this.createFormGroup.value.postalcode;
		tmp['address'] = this.createFormGroup.value.address;
		tmp['documentNumber'] = this.createFormGroup.value.documentNumber;
		tmp['typePersonId'] = this.createFormGroup.value.typePerson;
		tmp['documentTypeId'] = this.createFormGroup.value.documentType;
		tmp['thirdPartyTypeId'] = this.createFormGroup.value.thirdtype;
		this.thirdsService.create(tmp).subscribe(
			data => {
				console.log(data);
			},
			error => {
				// this.alertService.error(error);
				console.log(error);
			});
		this._snackBar.open("Tercero creado satisfactoriamente.", "Aceptar", {
			duration: 3000,
		}); 
		this.dialogRef.close("Todo creado satisfactoriamente");
	}
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
	isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
		const isSubmitted = form && form.submitted;
		return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
	}
}

const color = environment.colors.success;
