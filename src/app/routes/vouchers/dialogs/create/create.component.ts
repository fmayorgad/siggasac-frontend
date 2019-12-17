import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';
import { VoucherService } from '../../../../services';

@Component({
  selector: 'app-vouchers-dialogs-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class VouchersDialogsCreateComponent {
  title = 'Crear';
  icon = 'group';
  color = '#1523e5';
  subtitle = 'Crear Comprobante';

  voucherForm = new FormGroup({
    description: new FormControl(
      '',
      [Validators.required],
    ),
    classification: new FormControl(
      '',
      [Validators.required],
    ),
    code: new FormControl(
      '',
      [Validators.required],
    ),
  });

  constructor(
    public voucherService: VoucherService,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<VouchersDialogsCreateComponent>,
  ) {
  }

  get form() {
    return this.voucherForm.controls;
  }

  create() {
    this.voucherService
      .createVoucher(
        `${this.form.description.value}`,
        `${this.form.classification.value}`,
        `${this.form.code.value}`
      )
      .subscribe(
        response => {
          this._snackBar.open('Comprobante creado satisfactoriamente.', 'Aceptar', {
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
