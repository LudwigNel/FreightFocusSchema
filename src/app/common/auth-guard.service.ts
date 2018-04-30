import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { LocalStorageService } from 'angular-2-local-storage';
import { LocalStorage } from './local-storage.service';

@Injectable()
export class AuthGuard implements CanActivate{

   constructor(private router: Router, private localStorgeService: LocalStorage) { }

   canActivate(route, state: RouterStateSnapshot) {
    if(this.localStorgeService.getItem('loggedIn') === '1' && this.localStorgeService.getItem('token') !== ''){
      return true;
    }
    else{
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } })
      return false;
    }
  }

}
