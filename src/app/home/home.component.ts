import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';
import { NgProgress } from '@ngx-progressbar/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  latestSchema = '';

  constructor(private homeService: HomeService, 
    public progress: NgProgress, 
    private toastService: ToastrService) { }

  ngOnInit() {
    this.progress.start();

    this.homeService.getLatestSchemaVersion()
      .subscribe((latestVersion: string) =>{
        this.progress.complete();
        this.latestSchema = latestVersion;
      }, 
      (error: any) =>{
        console.log(error);
        this.progress.complete();
        this.toastService.error('Failed to retrieve the latest schema version');
      });
  }

}
