import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router , RouterStateSnapshot} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor( private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const user = sessionStorage.getItem('token');
    if (user !== null) {
      // authorised so return true
      return true;
    }

    // not logged in so redirect to login page with the return url
    window.open('any_url', '_self');
    return false;
  }

}
