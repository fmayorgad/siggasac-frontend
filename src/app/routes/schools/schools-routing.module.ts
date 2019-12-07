import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SchoolsModuleMainComponent } from './components/main/main.component';

const routes: Routes = [
{ path: 'colegios', },
{ path: '', component: SchoolsModuleMainComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SchoolsRoutingModule { }
