import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { LocalStorageService } from 'angular-2-local-storage';

export class AddHeaderInterceptor implements HttpInterceptor {
    constructor(private localStorageService: LocalStorageService){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const clonedRequest = req.clone({ headers: req.headers });

        if(req.url.indexOf('token') > 0){
            clonedRequest.headers.set('Content-Type', 'application/x-www-form-urlencoded');
        }
        let token = this.localStorageService.get('token');
        clonedRequest.headers.set('Authorization', 'Bearer ' + token);     
    
        return next.handle(clonedRequest);    
    }
}