import { BsNavbarComponent } from './bs-navbar/bs-navbar.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LocalStorageModule, LocalStorageService } from 'angular-2-local-storage';
import { NgProgressModule } from '@ngx-progressbar/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { DataTableModule } from 'angular5-data-table';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SchemaComponent } from './schema/schema.component';
import { HomeComponent } from './home/home.component';
import { UserService } from './common/user.service';
import { AuthGuard } from './common/auth-guard.service';
import { AddHeaderInterceptor } from './http/add-header-interceptor';
import { removeDebugNodeFromIndex } from '@angular/core/src/debug/debug_node';
import { LocalStorage } from './common/local-storage.service';
import { HomeService } from './home/home.service';
import { SchemaFormComponent } from './schema/schema-form/schema-form.component';
import { SchemaService } from './schema/schema.service';

@NgModule({
  declarations: [
    AppComponent, 
    BsNavbarComponent, 
    HomeComponent, 
    SchemaComponent, 
    LoginComponent, 
    SchemaFormComponent, 
  ],
  imports: [
    BrowserModule, 
    BrowserAnimationsModule,
    NgbModule.forRoot(),
    FormsModule,
    HttpClientModule,
    FormsModule,
    DataTableModule,
    LocalStorageModule.withConfig({
      prefix: '',
      storageType: 'localStorage'
    }),
    NgProgressModule.forRoot( {color: 'navy', speed: 500, thick: true, spinner: false} ),
    ToastrModule.forRoot(),
    RouterModule.forRoot([
      { path: '', component: HomeComponent }, 
      { path: 'login', component: LoginComponent },
     
      { path: 'schema/edit/:id', component: SchemaFormComponent,  canActivate: [ AuthGuard ] }, 
      { path: 'schema/new', component: SchemaFormComponent,  canActivate: [ AuthGuard ] },       
      { path: 'schema', component: SchemaComponent,  canActivate: [ AuthGuard ] }, 
    ])
  ],
  providers: [ 
    UserService, 
    AuthGuard, 
    LocalStorageService, 
    LocalStorage,
    HomeService, 
    SchemaService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
