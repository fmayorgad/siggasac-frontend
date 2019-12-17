import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ThirdTypesMainComponent } from './types/main/main.component';
import { ThirdsMainComponent } from './thirds/main/main.component';

const routes: Routes = [
  { path: 'terceros', component: ThirdsMainComponent},
  { path: 'tipos', component: ThirdTypesMainComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ThirdPartyRoutingModule { }
