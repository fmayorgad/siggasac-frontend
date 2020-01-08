import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ThirdTypesMainComponent } from './types/main/main.component';
import { ThirdsMainComponent } from './thirds/main/main.component';

const routes: Routes = [
  { path: 'terceros_listado', component: ThirdsMainComponent},
  { path: 'terceros_tipos', component: ThirdTypesMainComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ThirdPartyRoutingModule { }
