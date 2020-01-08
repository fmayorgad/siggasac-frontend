import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProyectsMainComponent } from './proyects/main/main.component';
import { SubsidiariesMainComponent } from './subsidiaries/main/main.component';

const routes: Routes = [
  { path: 'proyectos_proyectos', component: ProyectsMainComponent},
  { path: 'proyectos_sedes', component: SubsidiariesMainComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProyectsSubsidiariesRoutingModule { }
