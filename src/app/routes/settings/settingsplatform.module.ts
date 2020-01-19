import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { SettingsPlatformRoutingModule } from './settingsplatform-routing.module';
import { PlatformMainComponent } from './platform/main/main.component';
import { BanksDialogsCreateComponent } from './platform/dialogs/create/create.component';
import { BanksDialogsEditComponent } from './platform/dialogs/edit/edit.component';

const COMPONENTS = [PlatformMainComponent ];
const COMPONENTS_DYNAMIC = [BanksDialogsCreateComponent, BanksDialogsEditComponent];

@NgModule({
  imports: [
    SharedModule,
    SettingsPlatformRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_DYNAMIC
  ],
  entryComponents: COMPONENTS_DYNAMIC
})
export class SettingsModule { }
