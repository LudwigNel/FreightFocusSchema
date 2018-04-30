import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HomeService {
  private url = '';

  constructor(private http: HttpClient) { 
    this.url = environment.serviceUrl;
  }

  getLatestSchemaVersion(){
    return this.http.get(this.url + 'api/schema/latestversion');
  }
}
