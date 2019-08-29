import { Component, Input, Output, EventEmitter,ViewChild } from '@angular/core';
import { CaseService } from './case.service';
import '@webcomponents/custom-elements';


import { MatTableDataSource, MatSort } from '@angular/material';
import {SelectionModel, DataSource } from '@angular/cdk/collections';
import { delay } from 'rxjs/operators';

export interface Project {
  goal: number;
  date: Date;
  name: string;
}





@Component({
  selector: 'case-search',
  templateUrl: './case-search.component.html',
  styleUrls: ['./case-search.component.css']
})
export class CaseSearchComponent  {





  @ViewChild(MatSort, {static: true}) sort: MatSort;

  projects          : Array<Project>;
  loading           : boolean = false;
  displayedColumns  : string[] =  ['id', 'name', 'type','description'];
  dataSource = new MatTableDataSource([]);

  public caseList: any[];
  public caseList2: JSON[]=[];
  public searchobj:any={"caseId":"","caseName":"","caseType":""};
  public userobj:any;
  @Input('inputobj')
  set inputobj(inputobj: string) {
    console.log('got inputobj: ', inputobj);
    //this.caseList = JSON.parse(inputobj);
    // let input=JSON.parse(inputobj);
    this.displayResult(inputobj);
  /*  let input=JSON.parse(inputobj);
    //other parameter can be used from React JS
    this.userobj=input.userobj;
    if(input.searchobj.caseId!="" || input.searchobj.caseName!="" || input.searchobj.caseType!=""){
      this.searchobj.caseId=input.searchobj.caseId;
      this.searchobj.caseName=input.searchobj.caseName.toLowerCase();
      this.searchobj.caseType=input.searchobj.caseType.toLowerCase();
      if(input.searchobj.caseId=="")
        this.searchobj.caseId=null;
      if(input.searchobj.caseName=="")
          this.searchobj.caseName=null;
      if(input.searchobj.caseType=="")
            this.searchobj.caseType=null;
    }
    else
      this.searchobj=={"caseId":"","caseName":"","caseType":""};*/
  }

//  @Output('inputobjelected') inputobjelected = new EventEmitter<any>();
  displayResult(input:string){
    debugger;
    let inputobj=JSON.parse(input);

    console.log("In display resurlt "+ inputobj.searchobj);
    if(inputobj.searchobj.caseId!="" || inputobj.searchobj.caseName!="" || inputobj.searchobj.caseType!=""){
        this.searchobj.caseId=inputobj.searchobj.caseId;
        this.searchobj.caseName=inputobj.searchobj.caseName.toLowerCase();
        this.searchobj.caseType=inputobj.searchobj.caseType.toLowerCase();
        if(inputobj.searchobj.caseId=="")
          this.searchobj.caseId=null;
        if(inputobj.searchobj.caseName=="")
            this.searchobj.caseName=null;
        if(inputobj.searchobj.caseType=="")
              this.searchobj.caseType=null;
      }
      else
        this.searchobj=={"caseId":"","caseName":"","caseType":""};
    console.log("Search obj:"+ JSON.stringify(this.searchobj));
    if(inputobj.searchobj.caseId=="" && inputobj.searchobj.caseName=="" && inputobj.searchobj.caseType=="" && this.loading==false){
      console.log("Inside 1");
    //  this.loading=true;
      this.dataSource.data =this.caseList;
      this.dataSource.sort = this.sort;
    //  this.loading = false;
    }
    else if(this.loading==false){
        console.log("Inside 2");
      for(var i=0;i<this.caseList.length;i++)
      if(this.caseList[i].id==this.searchobj.caseId || this.caseList[i].name.toLowerCase().indexOf(this.searchobj.caseName)>-1 || this.caseList[i].type.toLowerCase().indexOf(this.searchobj.caseType)>-1){
          this.caseList2.push(this.caseList[i]);
      }
      if(this.caseList2.length>0){
          console.log("Inside 3");
          console.log("search res"+JSON.stringify(this.caseList2));
      //  this.loading=true;
        this.dataSource.data =this.caseList2;
        this.dataSource.sort = this.sort;
      //  this.loading = false;
      //console.log("search res"+JSON.stringify(this.dataSource.data));
        this.caseList2=[];
      }

    }


  }
  constructor(private _caseService:CaseService) {
    // tslint:disable-next-line:no-console

    console.debug("Constructor :"+this.inputobj);


  }
  ngOnInit(){
         this.caseList=[{"id":"loading...","name":"loading...","type":"loading...","description":"loading..."}];
         this.getAllCases();
  }

  getAllCases(){
    this.loading = true;
    this._caseService.getCases().subscribe(
        (response:any) =>{
           if(response.length > 0){
             this.caseList=response;
             this.dataSource.data =response;

             this.dataSource.sort = this.sort;
             this.loading = false;
           }
           else
             this.caseList=[{"id":"","name":"Sorry! Something went wrong,No case data found to display. Please check server connection.","description":""}];
             console.log("Response from server: "+ JSON.stringify(this.caseList));
         },
         err => {
           console.log(err);
           this.loading = false;
            this.caseList=[{"id":"","name":"Sorry! Something went wrong,No case data found to display. Please check server connection.","description":""}];
         }
    );
  }



}
