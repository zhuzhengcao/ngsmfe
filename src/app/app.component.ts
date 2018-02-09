import { Component } from '@angular/core';

import { UserService } from './service/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  menu: Array<any>;
  constructor(
    private userService: UserService
) { }
  getInfo(): void {
    let params = {
      email: 'zhuzhengcao@hinterstellar.com',
      password: '123aaa'
    };
    this.userService.getUserInfo(params).then((res) => this.menu = res.menu);
  }
}
