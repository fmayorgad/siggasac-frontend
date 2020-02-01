import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { RequestsRoutingModule } from './requests-routing.module';
import { RequestsMainComponent } from './main/main.component';
import { BanksDialogsCreateComponent } from './dialogs/create/create.component';
import { BanksDialogsEditComponent } from './dialogs/edit/edit.component';

const COMPONENTS = [RequestsMainComponent ];
const COMPONENTS_DYNAMIC = [BanksDialogsCreateComponent, BanksDialogsEditComponent];

@NgModule({
  imports: [
    SharedModule,
    RequestsRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_DYNAMIC
  ],
  entryComponents: COMPONENTS_DYNAMIC
})
export class RequestsModule { }
