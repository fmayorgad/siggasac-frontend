
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { environment } from '../../../../../../environments/environment'
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators, AbstractControl } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { LocationService } from '../../../../../services/location.service';
import { SchoolService } from '../../../../../services'
import { MatSnackBar } from '@angular/material/snack-bar';
import { timeout } from 'rxjs/operators';
import { createNewHosts } from '@angularclass/hmr';


function compare() {
  //console.log(p,p1)
  return (control): { [key: string]: boolean } | null => {
    if (1 === 1) {
      return { 'invaeeeelid': true };
    }
    return null;
  };
}

@Component({
  selector: 'editchool',
  templateUrl: 'edit.html',
})

export class EditSchoolDialogComponent implements OnInit {

  constructor(
    private locationService: LocationService,
    private _snackBar: MatSnackBar,
    private schoolService: SchoolService,
    @Inject(MAT_DIALOG_DATA) public incomingdata: any
  ) { }

  title = '';
  icon = 'business';
  color = color;
  subtitle = '';
  p = '';
  pc = '';
  data = this.incomingdata;
  countries;
  departments;
  cities;
  createFormGroup;



  comparation(c) {
    return (control): { [key: string]: boolean } | null => {
      // valido que ya este creado el objeto formulario
      if (this.createFormGroup) {
        return this.createFormGroup.controls.password.value !== this.createFormGroup.controls.passwordconfirm.value ? { noMatch: true } : null;
      }
    };
  }

  getAllContries() {
    this.locationService.getCountry().subscribe(
      data => {
        console.log(data);
        this.countries = data;
      },
      error => {
        console.log(error);
      });
  }

  getDepartments() {
    console.log(this.createFormGroup.value.countryId)
    this.locationService.getDepartment(this.createFormGroup.value.countryId).subscribe(
      data => {
        console.log(data);
        this.departments = data;
      },
      error => {
        console.log(error);
      });
  }

  getCities() {
    this.locationService.getCities(this.createFormGroup.value.departmentId).subscribe(
      data => {
        console.log(data);
        this.cities = data;
      },
      error => {
        console.log(error);
      });
  }

  create() {
    console.log(this.createFormGroup);
    console.log(this.createFormGroup.value);

    this._snackBar.open('Instituciòn duplicada.', 'Aceptar', {
      duration: 3000,
    });

    // this.schoolService.createSchool().subscribe(
    //   data => {
    //     console.log(data);
    //     data.map(c => c.sectorName = this.sectors[c.sectorId]);
    //     this.dataSource = new MatTableDataSource<any>(data);
    //   },
    //   error => {
    //     // this.alertService.error(error);
    //     console.log(error);
    //   });
    // this.dialogRef.close("No tienes permisos para realizar esta acciòn.");
  }


  ngOnInit() {
    this.getAllContries();
    this.title = 'Editando Colegio';
    this.subtitle = this.data.name;

    this.createFormGroup = new FormGroup({
      name: new FormControl(this.data.name, [Validators.maxLength(75), Validators.required, Validators.minLength(10)]),
      nit: new FormControl(this.data.nit, [Validators.maxLength(12), Validators.required]),
      address: new FormControl(this.data.address, [Validators.maxLength(75), Validators.required, Validators.minLength(10)]),
      neighborhood: new FormControl( this.data.neighborhood, [Validators.maxLength(75), Validators.minLength(10)]),
      phones: new FormControl(this.data.phones, [Validators.maxLength(50), Validators.minLength(7), Validators.required]),
      fax: new FormControl(this.data.fax, [Validators.maxLength(50), Validators.minLength(7)]),
      countryId: new FormControl('', [Validators.required]),
      departmentId: new FormControl('', [Validators.required]),
      townId: new FormControl('', [Validators.required]),
      rent: new FormControl('', []),
      keep: new FormControl('', []),
      keeper: new FormControl('', []),
      iva: new FormControl('', []),
      taxpayer: new FormControl('', []),
      selfkeep: new FormControl('', [])
    }
    );
  }

}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

const color = environment.colors.success;
