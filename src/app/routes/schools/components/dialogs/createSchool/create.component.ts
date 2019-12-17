import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, ViewChild } from '@angular/core';
import { environment } from '../../../../../../environments/environment'
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { LocationService } from '../../../../../services/location.service';
import { SchoolService } from '../../../../../services'
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'createschool',
  templateUrl: 'create.html',
})

export class createSchoolDialogComponent implements OnInit {

  constructor(
    private locationService: LocationService,
    private _snackBar: MatSnackBar,
    private schoolService: SchoolService,
  ) { }

  title = 'Crear';
  icon = 'business';
  color = color;
  subtitle = 'Crear colegio en la plataforma';

  countries;
  departments;
  cities;

  createFormGroup = new FormGroup({
    name: new FormControl('', [Validators.maxLength(75), Validators.required, Validators.minLength(10)]),
    nit: new FormControl('', [Validators.maxLength(12), Validators.required]),
    address: new FormControl('', [Validators.maxLength(75), Validators.required, Validators.minLength(10)]),
    neighborhood: new FormControl('', [Validators.maxLength(75), Validators.required, Validators.minLength(10)]),
    phones: new FormControl('', [Validators.maxLength(50), Validators.minLength(7), Validators.required]),
    fax: new FormControl('', [Validators.maxLength(50), Validators.minLength(7)]),
    countryId: new FormControl('', [Validators.required]),
    departmentId: new FormControl('', [Validators.required]),
    townId: new FormControl('', [Validators.required]),
  });

  matcher = new MyErrorStateMatcher();

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
    console.log(this.createFormGroup.value.departmentId)
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

    this._snackBar.open("Instituciòn duplicada.", "Aceptar", {
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
  }

}


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

const color = environment.colors.success;
