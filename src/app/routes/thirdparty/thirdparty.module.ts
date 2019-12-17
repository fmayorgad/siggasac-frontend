import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { ThirdPartyRoutingModule } from './thirdparty-routing.module';
import { ThirdTypesMainComponent } from './types/main/main.component';
import {CreateThirdTypeDialogComponent} from './types/dialogs/create/create.component';

const COMPONENTS = [ThirdTypesMainComponent];
const COMPONENTS_DYNAMIC = [CreateThirdTypeDialogComponent];

@NgModule({
  imports: [
  SharedModule,
  ThirdPartyRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_DYNAMIC
  ],
  entryComponents: COMPONENTS_DYNAMIC
})
export class ThirdPartyModule { }
