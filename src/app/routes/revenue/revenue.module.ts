import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { RevenueRoutingModule } from './revenue-routing.module';
import { RevenueDialogsCreateComponent } from './dialogs/create/create.component';
import { RevenueMainComponent } from './main/main.component';

const COMPONENTS = [RevenueDialogsCreateComponent, RevenueMainComponent];
const COMPONENTS_DYNAMIC = [];

@NgModule({
  imports: [
    SharedModule,
    RevenueRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_DYNAMIC
  ],
  entryComponents: COMPONENTS_DYNAMIC
})
export class RevenueModule { }
