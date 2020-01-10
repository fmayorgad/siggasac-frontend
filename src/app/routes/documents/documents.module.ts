import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { DocumentsRoutingModule } from './documents-routing.module';
import { DocumentsMainComponent } from './budgetNotes/main/main.component';

// dynamics
import {CreateBudgedNoteDialogComponent } from './budgetNotes/dialogs/create/create.component';

const COMPONENTS = [DocumentsMainComponent];
const COMPONENTS_DYNAMIC = [
  CreateBudgedNoteDialogComponent
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

