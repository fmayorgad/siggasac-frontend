import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BanksMainComponent } from './main/main.component';
import { BanksDialogsCreateComponent } from './dialogs/create/create.component';

const routes: Routes = [{ path: '', component: BanksMainComponent },
{ path: 'create', component: BanksDialogsCreateComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BanksRoutingModule { }
