import { Component, OnInit } from '@angular/core';
import { SchemaService } from './schema.service';
import { NgProgress } from '@ngx-progressbar/core';
import { ToastrService } from 'ngx-toastr';
import { SchemaModel } from './model/schema';
import { DataTableResource } from 'angular5-data-table';

@Component({
  selector: 'app-schema',
  templateUrl: './schema.component.html',
  styleUrls: ['./schema.component.css']
})
export class SchemaComponent implements OnInit {
  schemaList = new Array<SchemaModel>();
  tableResource: DataTableResource<SchemaModel>;
  items = new Array<SchemaModel>();
  itemCount = 0;

  constructor(private schemaService: SchemaService, 
    public progress: NgProgress, 
    private toastService: ToastrService) { 
      
    }

  ngOnInit() {
    this.progress.start();
    this.schemaService.retrieveSchemaList()
      .subscribe((schemas: Array<SchemaModel>) =>{
        this.initializeTable(schemas);
        this.schemaList =  schemas;     
        this.progress.complete();
      }, 
      (error: any) =>{
        console.log(error);
        this.progress.complete();
        this.toastService.error('Failed To Load Schema List');
      });
  }

  private initializeTable(schemas: Array<SchemaModel>){
    this.tableResource = new DataTableResource(schemas);
    this.tableResource.count().then((count: any) => 
    {
      this.itemCount = count;
    });
    this.tableResource.query({ offset: 0 }).then((items: any[]) =>{
      this.items = items;
    });
  }

  reloadItems(params){
    if(!this.tableResource) return;
    this.tableResource.query(params)
    .then(items => this.items = items);
  }

  filter(query: string){
    let filteredSchemaList = (query) ? this.schemaList.filter(s => s.version.includes(query) || s.comment.includes(query)) : this.schemaList;

    this.initializeTable(filteredSchemaList);
  }
}
