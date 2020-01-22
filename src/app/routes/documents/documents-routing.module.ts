import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DocumentsMainComponent } from './budgetNotes/main/main.component';

const routes: Routes = [
  { path: 'documentos_notas_presupuestales', component: DocumentsMainComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocumentsRoutingModule { }

