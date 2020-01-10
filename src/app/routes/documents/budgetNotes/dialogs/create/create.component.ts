import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, ViewChild } from '@angular/core';
import { environment } from '../../../../../../environments/environment'
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators, AbstractControl } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { timeout } from 'rxjs/operators';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdminDocumentTypesService, BudgetAccountsService, CampusService, GlobalService, VoucherService, ClientDocumentTypesService } from '../../../../../services';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTable } from '@angular/material/table';

@Component({
  selector: 'create-budged-account',
  templateUrl: 'create.html',
})

export class CreateBudgedNoteDialogComponent implements OnInit {

  constructor(
    private _snackBar: MatSnackBar,
    private globalService: GlobalService,
    private adminDocumentTypesService: AdminDocumentTypesService,
    private campusService: CampusService,
    public dialogRef: MatDialogRef<CreateBudgedNoteDialogComponent>,
    public voucherService: VoucherService,
    public clientDocumentTypesService: ClientDocumentTypesService,
    private budgetAccountsService: BudgetAccountsService,
  ) {
  }

  title = 'Crear';
  icon = 'add';
  color = color;
  subtitle = 'Crear Nota Presupuestal.';

  budgedAccounts;

  dinfilter = {};

  createFormGroup = new FormGroup({
    typeAdministratorDocumentId: new FormControl('', [Validators.required]),
    treasuryCode: new FormControl('', [Validators.minLength(4), Validators.required, Validators.maxLength(4)]),
    utilityCenter: new FormControl('', [Validators.required]),
    voucherId: new FormControl('', [Validators.required]),
    chronologicalOrder: new FormControl('', []),
    showDate: new FormControl('', [])
  });

  documentType;
  campus;
  natures = {};
  vouchers;
  accounts = [
    { accountid: 0, campusid: 0, revenueid: 0, proyectid: 0, amount: 0, filter: '' },
    { accountid: 0, campusid: 0, revenueid: 0, proyectid: 0, amount: 0, filter: '' },
  ];

  dataSource = new MatTableDataSource<any>(this.accounts);
  displayedColumns: string[] = ['accountid', 'campusid', 'revenueid', 'proyectid', 'amount'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatTable, { static: false }) tables: MatTable<any>;


  filterSelect(text, filter) {
    console.log(text)
    return filter.description.trim().toLowerCase().includes(text.trim().toLowerCase()) | filter.code.includes(text);
  }

  getAccounts() {
    this.budgetAccountsService.getAll().subscribe(data => {
      this.budgedAccounts = data;
    });
  }

  getAllVouchers() {
    this.voucherService
      .getAllVouchers()
      .subscribe(
        vouchers => {
          this.vouchers = vouchers;
        },
        error => {
          console.error(error);
        }
      );
  }

  getAllDocumentTypes() {
    this.adminDocumentTypesService.getAll().subscribe(
      data => {
        console.log(this.natures);
        this.documentType = data;
        this.documentType.map(d => {
          const t = d;
          d.documentNatureName = this.natures[d.natureDocumentId].name;
        });
        console.log(this.documentType)
      },
      error => {
        console.log(error);
      });
  }

  getAllSubsidiaries() {
    this.campusService.getAll().subscribe(
      data => {
        console.log(data);
        this.campus = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  getAllNatures() {
    this.globalService.getDocumentNature().subscribe(
      data => {
        const tmp = data;
        for (const i of data) {
          this.natures[i.id] = i;
        }
        this.getAllDocumentTypes();
      },
      error => {
        console.log(error);
      });
  }

  create() {
    const obj = {
      typeAdministratorDocumentId: this.createFormGroup.value.typeAdministratorDocumentId,
      treasuryCode: this.createFormGroup.value.treasuryCode,
      utilityCenter: this.createFormGroup.value.utilityCenter,
      voucherId: this.createFormGroup.value.voucherId,
      chronologicalOrder: this.createFormGroup.value.chronologicalOrder === true ? 1 : 0,
      showDate: this.createFormGroup.value.showDate === true ? 1 : 0
    };

    this.clientDocumentTypesService.create(obj).subscribe(
      data => {
        this.dialogRef.close({ state: 1, message: 'Tipo de documento creado satisfactoriamente.' });
      },
      error => {
        console.log(error);
        this.dialogRef.close({
          state: 0,
          message: 'Error al ejecutar la acción. Intentalo de neuvo más tarde.'
        });
      });
  }

  ngOnInit() {
    this.getAllNatures();
    this.getAllSubsidiaries();
    this.getAllVouchers();
    this.getAccounts();
  }
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

const color = environment.colors.success;
