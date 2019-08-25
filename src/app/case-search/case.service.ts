import { Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


import 'rxjs';


@Injectable()
export class CaseService  {
  private REST_API_BASE_PATH="http://localhost:3001";
  private URL=this.REST_API_BASE_PATH + "/cases";

  constructor(private _http: HttpClient) {

   console.log("Initializing ...");

 }

  getCases(){
    console.log("Inside service Case");
    return this._http.get(this.URL);
  }

}
