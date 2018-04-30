import { Injectable } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LocalStorage {
  private storageSub= new Subject<boolean>();

  constructor(private localStorageService: LocalStorageService) { }

  addItem(type: string, value: string){
    this.localStorageService.set(type, value);
    this.storageSub.next(true);
  }

  getItem(type: string) : string{
    return this.localStorageService.get(type);
  }

  removeItem(type: string){
    this.localStorageService.remove(type);
    this.storageSub.next(true);
  }

  watchStorage(): Observable<any> {
    return this.storageSub.asObservable();
  }
}
