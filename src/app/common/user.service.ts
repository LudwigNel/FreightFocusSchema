import { environment } from './../../environments/environment.prod';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalStorage } from './local-storage.service';

@Injectable()
export class UserService {
  url: string;
  headers: any;

  constructor(private http: HttpClient, private localStorageService: LocalStorage) {
    this.url = environment.serviceUrl;   
  }

  login(username: string, password: string){
    let data = "username=" + username + "&password=" + password + "&grant_type=password";
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.post(this.url + 'token', data, { headers: headers });
  }

  getLoggedInUserInfo(){
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.localStorageService.getItem('token'));
    return this.http.get(this.url + 'api/user/loggedin', {headers: headers} );
  }
}
