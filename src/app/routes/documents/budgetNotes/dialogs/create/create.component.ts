import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, ViewChild } from '@angular/core';
import { environment } from '../../../../../../environments/environment'
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators, AbstractControl } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { timeout } from 'rxjs/operators';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdminDocumentTypesService, RevenueService, ThirdsService, BudgetAccountsService, ProjectsService, CampusService, GlobalService, VoucherService, ClientDocumentTypesService } from '../../../../../services';
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
    private revenueService: RevenueService,
    private projectsService: ProjectsService,
    private thirdsService: ThirdsService,
  ) {
  }

  title = 'Crear';
  icon = 'add';
  color = color;
  subtitle = 'Crear Nota Presupuestal.';

  budgedAccounts;

  dinfilter = {};

  createFormGroup = new FormGroup({
    budget: new FormControl('', [Validators.required]),
    conceptId: new FormControl('', [Validators.required]),
    subconceptId: new FormControl('', []),
    thirdPartyId: new FormControl('', []),
    noteDate: new FormControl('', [Validators.required]),
  });

  mainTablePaginationOptions = [5, 10, 15, 50];

  documentType;
  projects;
  campus;
  natures = {};
  revenues;
  revenuetypes;
  concepts;
  subconcepts;
  thirds;

  accounts = [
    { accountid: 0, campusid: 0, revenueid: 0, projectid: 0, amount: 0, filterb: '' },
    { accountid: 0, campusid: 0, revenueid: 0, projectid: 0, amount: 0, filterb: '' },
  ];

  totalAmount = 0;

  dataSource = new MatTableDataSource<any>(this.accounts);
  displayedColumns: string[] = ['accountid', 'campusid', 'revenueid', 'proyectid', 'amount', 'actions'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatTable, { static: false }) tables: MatTable<any>;

  getAmount() {
    this.totalAmount = this.accounts.reduce((a, b) => +a + +b.amount, 0);
  }

  addAccount() {
    this.accounts.push({ accountid: 0, campusid: 0, revenueid: 0, projectid: 0, amount: 0, filterb: '' });
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource = new MatTableDataSource<any>(this.accounts);
  }

  deletere(i) {
    this.accounts.splice(i, 1);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource = new MatTableDataSource<any>(this.accounts);
    this.getAmount();
  }

  getBudgets() {
    this.globalService.getBudgets().subscribe(data => {
      this.revenuetypes = data;
    });
  }

  getConcepts() {
    this.createFormGroup.controls.conceptId.setValue(undefined);
    this.globalService.getConcepts(this.createFormGroup.value.budget).subscribe(data => {
      this.concepts = data;
    });
  }

  getSubconcepts() {
    this.globalService.getSubconcepts(this.createFormGroup.value.conceptId).subscribe(data => {
      this.subconcepts = data;
    });
  }

  getThirds() {
    this.thirdsService.getAll().subscribe(
      data => {
        this.thirds = data;
      });
  }

  filterSelect(text, filter, type) {

    if (type === 1) {
      return filter.description.trim().toLowerCase().includes(text.trim().toLowerCase()) | filter.code.includes(text);
    }

    if (type === 2) {
      return filter.name.trim().toLowerCase().includes(text.trim().toLowerCase()) | filter.code.includes(text);
    }

    if (type === 3) {
      return filter.description.trim().toLowerCase().includes(text.trim().toLowerCase()) | filter.code.includes(text);
    }

    if (type === 4) {
      return filter.description.trim().toLowerCase().includes(text.trim().toLowerCase()) | filter.code.includes(text);
    }
  }



  getAccounts() {
    this.budgetAccountsService.getAll().subscribe(data => {
      this.budgedAccounts = data;
    });
  }

  getRevenues() {
    this.revenueService.getAllRevenues().subscribe(data => {
      this.revenues = data;
    });
  }

  getProyects() {
    this.projectsService.getAll().subscribe(data => {
      this.projects = data;
    });
  }

  getAllSubsidiaries() {
    this.campusService.getAll().subscribe(data => {
      this.campus = data;
    });
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
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.getAllNatures();
    this.getAllSubsidiaries();
    this.getAccounts();
    this.getRevenues();
    this.getProyects();
    this.getBudgets();
    this.getThirds();
  }
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

const color = environment.colors.success;
