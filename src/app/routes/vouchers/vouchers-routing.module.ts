import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VouchersMainComponent } from './main/main.component';
import { VouchersDialogsCreateComponent } from './dialogs/create/create.component';

const routes: Routes = [
  { path: '', component: VouchersMainComponent },
  { path: 'create', component: VouchersDialogsCreateComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VouchersRoutingModule {
}
