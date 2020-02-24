import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { DocumentsRoutingModule } from './documents-routing.module';
import { BudgetNotesMainComponent } from './budgetNotes/main/main.component';
import { AvaliabilityCertificatesMainComponent } from './availabilityCertificates/main/main.component';
import { PurchaseOrdersMainComponent } from './purchaseOrders/main/main.component';
import {CertificatedReceibedMainComponent} from './certificatedReceived/main/main.component';
import {PaymentOrdersMainComponent} from './PaymentOrders/main/main.component';
// dynamics
import { CreateBudgedNoteDialogComponent } from './budgetNotes/dialogs/create/create.component';
import { CloseDialogsComponent } from './budgetNotes/dialogs/close/close.component';
import { EditBudgedNoteDialogComponent } from './budgetNotes/dialogs/edit/edit.component';
import { EditCDPDialogComponent } from './availabilityCertificates/dialogs/edit/edit.component';
import { CloseDialogsComponent as CloseCDPDialogsComponent } from './availabilityCertificates/dialogs/close/close.component';
import { CreateCDPDialogComponent } from './availabilityCertificates/dialogs/create/create.component';
import { CreatePurchaseOrderDialogComponent } from './purchaseOrders/dialogs/create/create.component';
import {CreateCerticatedReceibedDialogComponent} from './certificatedReceived/dialogs/create/create.component';

import { from } from 'rxjs';

const COMPONENTS = [PaymentOrdersMainComponent, BudgetNotesMainComponent, AvaliabilityCertificatesMainComponent, PurchaseOrdersMainComponent, CertificatedReceibedMainComponent];
const COMPONENTS_DYNAMIC = [
  CreateBudgedNoteDialogComponent, CreatePurchaseOrderDialogComponent, CloseDialogsComponent, EditBudgedNoteDialogComponent, CreateCDPDialogComponent, EditCDPDialogComponent, CloseCDPDialogsComponent, CreateCerticatedReceibedDialogComponent
];

@NgModule({
  imports: [
    SharedModule,
    DocumentsRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_DYNAMIC
  ],
  entryComponents: COMPONENTS_DYNAMIC
})
export class DocumentsModule { }

