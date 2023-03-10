import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {configuration} from "../constant/configuration";
import {ArticleModel} from "../model/article.model";

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  path = configuration.endpoint + '/article';
  constructor(private httpClient: HttpClient) {
  }
  getAll(): Observable<ArticleModel[]> {
    return this.httpClient.get<ArticleModel[]>(this.path);
  }

  findById(id: string): Observable<ArticleModel> {
    return this.httpClient.get<ArticleModel>(this.path +  "/" + id);
  }



}
