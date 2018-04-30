import { Component, OnInit } from '@angular/core';
import { SchemaService } from '../schema.service';
import { ToastrService } from 'ngx-toastr';
import { NgProgress } from '@ngx-progressbar/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SchemaModel } from '../model/schema';

@Component({
  selector: 'app-schema-form',
  templateUrl: './schema-form.component.html',
  styleUrls: ['./schema-form.component.css']
})
export class SchemaFormComponent implements OnInit {
  private schemaId = 0;
  schema = new SchemaModel();

  constructor(private schemaService: SchemaService, 
    private toastService: ToastrService, 
    public progress: NgProgress, 
    private router: Router, 
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.schemaId = +this.route.snapshot.paramMap.get('id');
    if(this.schemaId > 0){
      this.progress.start();
      this.schemaService.retrieveSchema(this.schemaId)
        .subscribe((schema: SchemaModel) =>{
            this.progress.complete();
            this.schema = schema;
        }, 
      (error: any) =>{
        this.progress.complete();
        console.log(error);
      })
    }
  }

  save(schema){
    this.progress.start();
    if(this.schemaId == 0){  
    this.schemaService.createSchema(schema)
      .subscribe((result: any) =>{
        this.progress.complete();
        this.toastService.info('The schema was successfully created', 'Save Complete');
        this.router.navigate(['schema']);
      }, 
      (error: any) =>{
        this.progress.complete();
        console.log(error);
        this.toastService.error('Error while trying to create the schema', 'Save Failed');
      });
    }else{
      schema.schemaId = this.schemaId;
      this.schemaService.updateSchema(schema)
        .subscribe((result: any) =>{
          this.progress.complete();
          this.toastService.info('The schema was successfully updated', 'Save Complete');
          this.router.navigate(['schema']);
        }, 
        (error: any) =>{
          this.progress.complete();
          console.log(error);
          this.toastService.error('Error while trying to update the schema', 'Save Failed');
        });
    }
  }

  delete(){
    if(this.schemaId > 0){
      if(!confirm('Are you certain you want to delete thi schema?')) return;

      this.progress.start();      
      this.schemaService.deleteSchema(this.schemaId)
        .subscribe((result: any) =>{
          this.progress.complete();
          this.toastService.info('The schema was successfully deleted', 'Save Complete');
          this.router.navigate(['schema']);
        }, 
        (error: any) =>{
          this.progress.complete();
          console.log(error);
          this.toastService.error('Error while trying to delete the schema', 'Save Failed');
        });
    }
  }
}
