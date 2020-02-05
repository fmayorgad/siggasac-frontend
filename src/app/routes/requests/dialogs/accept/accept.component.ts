import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { MatDialogRef } from '@angular/material/dialog';
import { BankService } from '../../../../services';

@Component({
  selector: 'accept-dialogs-create',
  templateUrl: './accept.component.html',
  styleUrls: ['./accept.component.css'],
})
export class AcceptDialogComponent {

  constructor(
    private bankService: BankService,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<AcceptDialogComponent>,
  ) {
  }
  
  title = 'Aprobar Solicitud: ';
  icon = 'check';
  color = '#4caf50';
  subtitle = 'Crear Banco';

  bankForm = new FormGroup({
    name: new FormControl(
      '',
      [
        Validators.maxLength(75),
        Validators.required,
        Validators.minLength(5),
      ],
    ),
    code: new FormControl(
      '',
      [
        Validators.maxLength(75),
        Validators.required,
        Validators.minLength(5),
      ],
    ),
  });

  

  get form() {
    return this.bankForm.controls;
  }

  create() {
    this.bankService
      .createBank(`${this.form.name.value}`, `${this.form.code.value}`)
      .subscribe(
        response => {
          this._snackBar.open('Banco creado satisfactoriamente.', 'Aceptar', {
            duration: 3000,
          });

          this.dialogRef.close('Todo creado satisfactoriamente!');
        },
        error => {
          console.error(error);
        },
      );
  }
}
