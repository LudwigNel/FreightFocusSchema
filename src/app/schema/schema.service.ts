import { Injectable } from '@angular/core';
import { SchemaModel } from './model/schema';
import { environment } from '../../environments/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalStorage } from '../common/local-storage.service';

@Injectable()
export class SchemaService {
  private url = '';

  constructor(private http: HttpClient, private localStorageService: LocalStorage) { 
    this.url = environment.serviceUrl;
  }

  createSchema(schema: SchemaModel){
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.localStorageService.getItem('token'));
    return this.http.post(this.url + 'api/schema/add', schema, { headers: headers });
  }

  retrieveSchemaList(){
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.localStorageService.getItem('token'));
    return this.http.get(this.url + 'api/schemas', { headers: headers });
  }

  retrieveSchema(id: number){
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.localStorageService.getItem('token'));
    return this.http.get(this.url + 'api/schema/' + id, { headers: headers });
  }

  updateSchema(schema: SchemaModel){
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.localStorageService.getItem('token'));
    return this.http.put(this.url + 'api/schema/update', schema, { headers: headers });
  }

  deleteSchema(id: number){
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.localStorageService.getItem('token'));
    return this.http.delete(this.url + 'api/scheme/delete/' + id, { headers: headers });
  }
}
