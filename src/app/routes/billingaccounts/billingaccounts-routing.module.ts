import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PucAccountsModuleMainComponent} from './puc/main/main.component';
import {BudgedAccountsModuleMainComponent} from './budgedaccounts/main/main.component';

const routes: Routes = [
  { path: 'cuentas', },
{ path: 'puc', component: PucAccountsModuleMainComponent },
{ path: 'cuentas-presupuestales', component: BudgedAccountsModuleMainComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})
export class BillingAccountsRoutingModule { }
