import {Component, OnInit} from '@angular/core';
import {NotificationService} from "../../shared/service";
import {NotificationModel} from "../../shared/model";
import {beforeRead} from "@popperjs/core";

@Component({
  selector: 'app-notification-sidebar',
  templateUrl: './notification-sidebar.component.html',
  styleUrls: ['./notification-sidebar.component.css']
})
export class NotificationSidebarComponent implements OnInit {
  notifications: NotificationModel[] = [];
  today = new Date().getDate();

  constructor(private notificationService: NotificationService) {
  }

  ngOnInit(): void {
    this.notificationService.getAll().subscribe((data) => {
      this.notifications = data;
    });
  }

  protected readonly beforeRead = beforeRead;
}
