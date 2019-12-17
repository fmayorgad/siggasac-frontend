import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { BanksRoutingModule } from './banks-routing.module';
import { BanksMainComponent } from './main/main.component';

const COMPONENTS = [BanksMainComponent];
const COMPONENTS_DYNAMIC = [];

@NgModule({
  imports: [
    SharedModule,
    BanksRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_DYNAMIC
  ],
  entryComponents: COMPONENTS_DYNAMIC
})
export class BanksModule { }
