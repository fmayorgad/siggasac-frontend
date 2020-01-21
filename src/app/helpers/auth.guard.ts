import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild } from '@angular/router';
import { GlobalsUser } from '../../assets/data/globals';

import { AuthenticationService } from '../services/authentication.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private globalsUser: GlobalsUser
  ) { }

  // Función cíclica que permite saber si se tiene acceso a una ruta o no
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    const currentUser = this.authenticationService.currentUserValue;
    console.log(route);
    console.log(state);
    console.log(this.globalsUser['nav']);
    if (currentUser) {

      // es posible definir una estructura ciclica sin tener que definir el indexpath, pero se tendria que cambiar la estrucutra de las rutas
      // y por orden preferimos dejar las rutas y subrutas separadas usando LOADCHILDREN  en las rutas principales

      // cuando lastpathindex es cero, se esta validando la primer posición de ruta
      if (route['_lastPathIndex'] === 0) {
        console.log(Object.keys(this.globalsUser) )
        console.log(this.globalsUser.nav)
        console.log("buscando",route.routeConfig.path)
        if (this.globalsUser.nav[route.routeConfig.path]) {
          console.log("bn")
          return true;
        } else {
          console.log("error")
          //localStorage.removeItem('currentUser');
          //localStorage.removeItem('token');
          //this.router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url } });
          //this.authenticationService.logout();
          return false;
        }
      }

      // segunda posición
      if (route['_lastPathIndex'] === 1) {
        console.log("validando la segunda")
      }
      return true;
    } else {
      this.router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url } });
      return false;
    }

  }

  // se revisa si puede ejecutar una ruta hija
  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.canActivate(route, state);
  }

}

