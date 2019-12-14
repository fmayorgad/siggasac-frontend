import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, ViewChild } from '@angular/core';
import { environment } from '../../../../../../environments/environment'
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

@Component({
  selector: 'createschool',
  templateUrl: 'create.html',
})

export class createSchoolDialogComponent {
  title = 'Crear';
  icon = 'business';
  color = color;
  subtitle = 'Crear colegio en la plataforma';

  createFormGroup = new FormGroup({
    name: new FormControl('', [Validators.maxLength(75), Validators.required, Validators.minLength(10)]),
    nit: new FormControl('', [Validators.maxLength(12), Validators.required])
  });

  matcher = new MyErrorStateMatcher();

  print() {
    console.log(this.createFormGroup);
    console.log(this.matcher);
  }
}


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

const color = environment.colors.success;
