import {Injectable} from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService  {

  constructor() {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const user = sessionStorage.getItem('token');
    if (user !== null) {
      // authorised so return true
      return true;
    }

    const {domain, region, clientId, uri} = environment.cognito;
    const fullUrl = `https://${domain}.auth.${region}.amazoncognito.com/oauth2/authorize?client_id=${clientId}&response_type=code&scope=email+openid+profile&redirect_uri=${uri}`;
    alert('You must be logged in to view this page. ' + fullUrl);
    window.open(fullUrl, '_self');
    return false;
  }

}
