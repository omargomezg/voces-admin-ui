import {Component} from '@angular/core';
import {configuration} from "../../shared/constant/configuration";
import {NotificationService} from "../../shared/service";
import {MatDialog} from "@angular/material/dialog";
import {NotificationSidebarComponent} from "../notification-sidebar/notification-sidebar.component";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private notificationService: NotificationService, private matDialog: MatDialog) {
  }

  logOut() {
    sessionStorage.clear();
    let {clientId, region, domain, uri} = configuration.cognito;
    window.open(`https://${domain}.auth.${region}.amazoncognito.com/logout?response_type=code&client_id=${clientId}&redirect_uri=${uri}`, '_self')
  }

  openNotification() {
    this.matDialog.open(NotificationSidebarComponent);
  }
}
