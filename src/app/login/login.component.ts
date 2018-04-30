import { UserService } from './../common/user.service';
import { UserModel } from './model/user.model';
import { Component, OnInit } from '@angular/core';
import { UserInfoModel } from '../common/model/user-info-model';
import { Router, ActivatedRoute } from '@angular/router';
import { NgProgress } from '@ngx-progressbar/core';
import { LocalStorage } from '../common/local-storage.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: UserModel = new UserModel('', '');
  loading = false;
  returnUrl = '';

  constructor(private userService: UserService, 
    private localStorageService: LocalStorage, 
    private router: Router, 
    public progress: NgProgress, 
    private toastr: ToastrService, 
    private route: ActivatedRoute) { 
   
  }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
  }

  login(login: any){
    this.progress.start();

    let username = login.username;
    let password = login.password;

    this.userService.login(username, password)      
      .subscribe((result: any) =>{        
          this.localStorageService.addItem('token', result.access_token);
          this.localStorageService.addItem('loggedIn', "1");
          this.progress.complete ();

          this.getLoggedInUserInfo();
      }, 
      (error: any) =>{
        this.progress.complete();
        console.log(error);
        this.toastr.error('Please check your username and password', 'Login Failed');
      });
  }

  getLoggedInUserInfo(){
    this.userService.getLoggedInUserInfo()
      .subscribe((user: UserInfoModel) =>{
        this.localStorageService.addItem('username', user.userName);
        this.localStorageService.addItem('userId', user.userId);
        this.localStorageService.addItem('loggedOn', user.loggedIn.toString());
        
        this.router.navigate([this.returnUrl]);
      }, 
      (error: any) =>{
        this.progress.complete();
        console.log(error);
      });
  }
}