import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../../service/user.service';

@Component({
  selector: 'menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export default class MenuComponent implements OnInit {
  menu: Array<any>;
  constructor(
    private router: Router,
    private userService: UserService,
) { }
  getMenu(params: any): void {
    this.userService.getUserInfo(params).then((res) => this.menu = res.menu);
  }
  ngOnInit(): void {
    let params = {
      email: 'zhuzhengcao@hinterstellar.com',
      password: '123aaa'
    };
    this.getMenu(params);
  }
  toNav(tag: string): void {
    console.log('toNav======>');
    this.router.navigate(['/users']);
  }
}
