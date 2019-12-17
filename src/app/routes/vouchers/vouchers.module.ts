import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { VouchersRoutingModule } from './vouchers-routing.module';
import { VouchersMainComponent } from './main/main.component';
import { VouchersDialogsCreateComponent } from './dialogs/create/create.component';

const COMPONENTS = [VouchersMainComponent, VouchersDialogsCreateComponent];
const COMPONENTS_DYNAMIC = [];

@NgModule({
  imports: [
    SharedModule,
    VouchersRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_DYNAMIC
  ],
  entryComponents: COMPONENTS_DYNAMIC
})
export class VouchersModule { }
