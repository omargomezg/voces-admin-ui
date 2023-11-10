import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {DomainModel} from "../model";

@Injectable({
  providedIn: 'root'
})
export class ValueService {

  path: string = environment.apiUrl + '/value';
  
  constructor(private httpClient: HttpClient) { }
  
  getDomains(): Observable<DomainModel[]> {
    return this.httpClient.get<DomainModel[]>(this.path + "/domain");
  }
  
}
