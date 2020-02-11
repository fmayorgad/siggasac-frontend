import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { DocumentsRoutingModule } from './documents-routing.module';
import { DocumentsMainComponent } from './budgetNotes/main/main.component';

// dynamics
import {CreateBudgedNoteDialogComponent } from './budgetNotes/dialogs/create/create.component';
import {CloseDialogsComponent} from './budgetNotes/dialogs/close/close.component';
import {EditBudgedNoteDialogComponent} from './budgetNotes/dialogs/edit/edit.component';

const COMPONENTS = [DocumentsMainComponent];
const COMPONENTS_DYNAMIC = [
  CreateBudgedNoteDialogComponent, CloseDialogsComponent, EditBudgedNoteDialogComponent
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

