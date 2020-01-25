import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import {DashboardComponent} from './superadmin/dashboard.component';
import {DashboardRoutingModule} from './dashboard-routing.module';


const COMPONENTS = [DashboardComponent];
const COMPONENTS_DYNAMIC = [];

@NgModule({
  imports: [
    SharedModule,
    DashboardRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_DYNAMIC
  ],
  entryComponents: COMPONENTS_DYNAMIC
})
export class DashboardModule { }

