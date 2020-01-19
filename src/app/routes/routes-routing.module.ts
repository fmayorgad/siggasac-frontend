import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { environment } from '@env/environment';

import { AdminLayoutComponent } from '../theme/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from '../theme/auth-layout/auth-layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './sessions/login/login.component';
import { RecoverComponent } from './sessions/recover/recover.component';
import { AuthGuard } from '../helpers';

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivateChild: [AuthGuard],
        data: { title: 'Dashboard', titleI18n: 'dashboard' },
      },
      {
        path: 'configuracion',
        loadChildren: () => import('./settings/settingsplatform.module').then(m => m.SettingsModule),
      },
      {
        path: 'colegios',
        loadChildren: () => import('./schools/schools.module').then(m => m.SchoolsModule),
      },
      {
        path: 'cuentas',
        loadChildren: () => import('./billingaccounts/billingaccounts.module').then(m => m.BillingaccountsModule),
      },
      { path: 'bancos', loadChildren: () => import('./banks/banks.module').then(m => m.BanksModule) },
      {
        path: 'terceros',
        loadChildren: () => import('./thirdparty/thirdparty.module').then(m => m.ThirdPartyModule),
      },
      {
        path: 'comprobantes',
        loadChildren: () => import('./vouchers/vouchers.module').then(m => m.VouchersModule),
      },
      { path: 'fuentes', loadChildren: () => import('./revenue/revenue.module').then(m => m.RevenueModule) },
      {
        path: 'proyectos',
        loadChildren: () => import('./proyects_subsidiaries/proyects.module').then(m => m.ProyectsSubsidiariesModule),
      },
      {
        path: 'cuentas_bancarias',
        loadChildren: () => import('./bank_accounts/bankAccounts.module').then(m => m.BankAccountsModule),
      },
      {
        path: 'tipos_documento',
        loadChildren: () => import('./documentTypes/documentTypes.module').then(m => m.DocumentTypesModule),
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard]
      },
      {
        path: 'documentos',
        loadChildren: () => import('./documents/documents.module').then(m => m.DocumentsModule),
     
      },
    ],
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,
        data: { title: 'Login', titleI18n: 'Login' },
      },
      {
        path: 'recoverPassword',
        component: RecoverComponent,
        data: { title: 'Recuperar Contraseña', titleI18n: 'Recover' },
      },
    ],
  },
  {
    path: 'settings',
    component: AuthLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'platform',
        canActivateChild: [AuthGuard],
        component: LoginComponent,
      },
      {
        path: 'profile',
        component: RecoverComponent,
      },
    ],
  },
  { path: '**', redirectTo: 'dashboard' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: environment.useHash,
    }),
  ],
  exports: [RouterModule],
})
export class RoutesRoutingModule {
}
