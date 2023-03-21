import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'voces-admin-ui';

  constructor(private route: ActivatedRoute) {
  }

ngOnInit() {
  this.route.queryParams.subscribe(params => {
    if (params['code'])
      sessionStorage.setItem('token', params['code']);
  });
}

}
