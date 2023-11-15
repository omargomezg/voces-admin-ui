import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {ArticleModel, ListOfModel, PaginationModel, PendingFileModel} from "../model";
import {ArticleFilterModel} from "../model/article-filter.model";

@Injectable({
    providedIn: 'root'
})
export class ArticleService {

    path = environment.apiUrl + '/article';

    constructor(private httpClient: HttpClient) {
    }

    getAll(options: PaginationModel, filter: ArticleFilterModel): Observable<ListOfModel> {
        let params = new HttpParams();
        params = params.append('page', options.pageIndex);
        params = params.append('size', options.pageSize);
        if (filter.category) {
            params = params.append('category', filter.category);
        }
        if (filter.principalSite) {
            params = params.append('principalSite', filter.principalSite);
        }
        if (filter.text) {
            params = params.append('text', filter.text);
        }
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
        article.createdAt = '';
        article.updatedAt = '';
        return this.httpClient.put<ArticleModel>(this.path + "/" + article.id, article);
    }

    getPending(): Observable<PendingFileModel[]> {
        return this.httpClient.get<PendingFileModel[]>(this.path + "/pending");
    }

    retryPendingFile(file: PendingFileModel): Observable<any> {
        return this.httpClient.post<any>(this.path + "/pending/retry", file);
    }

}
