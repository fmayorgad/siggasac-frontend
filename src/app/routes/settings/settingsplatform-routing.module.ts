import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlatformMainComponent } from './platform/main/main.component';
import { AuthGuard } from '../../helpers';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      {
        path: 'platform',
        component: PlatformMainComponent,
        canActivateChild: [AuthGuard],
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsPlatformRoutingModule { }
