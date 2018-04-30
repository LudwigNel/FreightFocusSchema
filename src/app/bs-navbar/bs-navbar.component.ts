import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorage } from '../common/local-storage.service';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit{
 
  username = '';
  loggedIn = false;

  constructor(private localStorageServove: LocalStorage, private router: Router) { }

  ngOnInit(): void {
    this.localStorageServove.watchStorage().subscribe((changed: boolean) =>{
      this.loggedIn = this.localStorageServove.getItem('loggedIn') === '1';
      this.username = this.localStorageServove.getItem('username') || '';
    });   
  }

  logout(){
   this.localStorageServove.removeItem('token');
   this.localStorageServove.addItem('loggedIn', '0');
   this.loggedIn = false;
   this.username = '';

   this.router.navigate(['/login']);
  }

}
