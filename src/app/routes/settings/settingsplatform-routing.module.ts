import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlatformMainComponent } from './platform/main/main.component';
import { AuthGuard } from '../../helpers';

const routes: Routes = [
  {
    path: 'platform',
    component: PlatformMainComponent,
    canActivateChild: [AuthGuard],
    children: []
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsPlatformRoutingModule { }
