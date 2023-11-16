import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-login',
  template: ''
})
export class LoginComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router) {
  }

  login(): void {

  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
    if (params['code']) {
      sessionStorage.setItem('token', params['code']);
      this.router.navigateByUrl('/article');
    }
  });
  }
}
