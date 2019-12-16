import { Injectable } from '@angular/core';

import { AuthenticationService } from '../services';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(private _authService: AuthenticationService, private _router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot)
    : Observable<boolean> | Promise<boolean> | boolean {

    const user = this._authService.currentUserValue;

    return user.role === next.data.role;

    // navigate to not found page
    this._router.navigate(['/404']);

    return false;
  }
}
