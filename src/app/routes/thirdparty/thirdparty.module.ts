import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { ThirdPartyRoutingModule } from './thirdparty-routing.module';
import { ThirdTypesMainComponent } from './types/main/main.component';
import { ThirdsMainComponent } from './thirds/main/main.component';
import {CreateThirdTypeDialogComponent} from './types/dialogs/create/create.component';
import {CreateThirdDialogComponent} from './thirds/dialogs/create/create.component';

const COMPONENTS = [ThirdTypesMainComponent, ThirdsMainComponent ];
const COMPONENTS_DYNAMIC = [CreateThirdTypeDialogComponent, CreateThirdDialogComponent];

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
