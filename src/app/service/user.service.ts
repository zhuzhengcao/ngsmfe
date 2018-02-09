import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class UserService {
    private userInfoUrl = '/api/accounts/login/';
    private headers = new Headers({'Content-Type': 'application/json'});
    userInfo: any;
    constructor(
        private http: Http
    ) {}
    getUserInfo(params: any): Promise<any> {
        return this.http.post(this.userInfoUrl, JSON.stringify(params), {headers: this.headers})
                   .toPromise()
                   .then(response => this.userInfo = response.json().data)
                   .catch(this.handleError);
    }
    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
      }
}