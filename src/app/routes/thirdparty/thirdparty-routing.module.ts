import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ThirdTypesMainComponent } from './types/main/main.component';

const routes: Routes = [
  { path: 'terceros', },
  { path: 'terceros', },
  { path: 'tipos', component: ThirdTypesMainComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ThirdPartyRoutingModule { }
