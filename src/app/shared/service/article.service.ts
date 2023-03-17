import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {configuration} from "../constant/configuration";
import {ArticleModel} from "../model/article.model";
import {ListOfModel} from "../model/list-of.model";
import {OptionsModel} from "../model/options.model";

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  path = configuration.endpoint + '/article';

  constructor(private httpClient: HttpClient) {
  }

  getAll(options: OptionsModel): Observable<ListOfModel> {
    let params = new HttpParams();
    params = params.append('page', options.page-1);
    params = params.append('size', options.size);
    return this.httpClient.get<ListOfModel>(this.path, {params: params});
  }

  findById(id: string): Observable<ArticleModel> {
    return this.httpClient.get<ArticleModel>(this.path + "/" + id);
  }

  delete(id: string): Observable<void> {
    return this.httpClient.delete<void>(this.path + "/" + id);
  }

  create(article: ArticleModel): Observable<ArticleModel> {
    return this.httpClient.post<ArticleModel>(this.path, article);
  }

  update(article: ArticleModel): Observable<ArticleModel> {
    return this.httpClient.put<ArticleModel>(this.path + "/" + article.id, article);
  }

}
