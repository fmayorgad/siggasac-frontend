import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { BillingAccountsRoutingModule } from './billingaccounts-routing.module';
import {PucAccountsModuleMainComponent} from './puc/main/main.component';
import {BudgedAccountsModuleMainComponent} from './budgedaccounts/main/main.component';

const COMPONENTS = [PucAccountsModuleMainComponent, BudgedAccountsModuleMainComponent];
const COMPONENTS_DYNAMIC = [];

@NgModule({
  imports: [
  SharedModule,
  BillingAccountsRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_DYNAMIC
  ],
  entryComponents: COMPONENTS_DYNAMIC
})
export class BillingaccountsModule { }
