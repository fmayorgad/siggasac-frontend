import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { SchoolsRoutingModule } from './schools-routing.module';
import { SchoolsModuleMainComponent } from './components/main/main.component';
import {createSchoolDialogComponent} from './components/dialogs/createSchool/create.component'

const COMPONENTS = [SchoolsModuleMainComponent];
const COMPONENTS_DYNAMIC = [createSchoolDialogComponent];

@NgModule({
  imports: [
    SharedModule,
    SchoolsRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_DYNAMIC
  ],
  entryComponents: COMPONENTS_DYNAMIC
})
export class SchoolsModule { }
