import { Component } from '@angular/core';
import {configuration} from "../../shared/constant/configuration";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  logOut() {
    sessionStorage.clear();
    let clientId= configuration.cognito.clientId;
    let uri = 'http://localhost:4200'
    window.open(`${clientId}&redirect_uri=${uri}`, '_self')
  }
}
