import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { SchoolConfigurationsRoutingModule } from './schoolconfigurations-routing.module';
import { AccountingPeriodsMainComponent } from './accounting_periods/main/main.component';
import {CloseDialogsComponent} from './accounting_periods/dialogs/closeMonth/close.component';
import {RequestDialogComponent} from './accounting_periods/dialogs/request/request.component';
import {ShowRequestsDialogComponent} from './accounting_periods/dialogs/showrequest/showrequests.component';

const COMPONENTS = [AccountingPeriodsMainComponent];
const COMPONENTS_DYNAMIC = [CloseDialogsComponent, RequestDialogComponent, ShowRequestsDialogComponent];

@NgModule({
  imports: [
    SharedModule,
    SchoolConfigurationsRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_DYNAMIC
  ],
  entryComponents: COMPONENTS_DYNAMIC
})
export class SchoolConfigurationsModule { }
