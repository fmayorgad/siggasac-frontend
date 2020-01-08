import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientDocumentTypesMainComponent } from './client/main/main.component';
import { AdminDocumentTypesMainComponent } from './admin/main/main.component';

const routes: Routes = [
  { path: 'tipos_documento_disponibles', component: AdminDocumentTypesMainComponent},
  { path: 'tipos_documento_listado', component: ClientDocumentTypesMainComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocumentTypesRoutingModule { }

