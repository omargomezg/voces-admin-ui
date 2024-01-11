import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CategoryModel, PageModel, SiteModel} from "../model";

@Injectable({
    providedIn: 'root'
})
export class SiteService {
    path: string = environment.apiUrl;

    constructor(private httpClient: HttpClient) {
    }

  getAll(): Observable<PageModel<SiteModel>> {
    return this.httpClient.get<PageModel<SiteModel>>(this.path + "/site");
  }

  getByDomain(domain: string): Observable<SiteModel> {
    return this.httpClient.get<SiteModel>(`${this.path}/site/${domain}`);
  }

  create(site: SiteModel): Observable<SiteModel> {
    return this.httpClient.post<SiteModel>(this.path + "/site", site);
  }

  update(site: SiteModel): Observable<SiteModel> {
    return this.httpClient.put<SiteModel>(`${this.path}/site/${site.id}`, site);
  }

  setCategories(siteId: string, categories: CategoryModel[]): Observable<SiteModel> {
    return this.httpClient.put<SiteModel>(`${this.path}/site/${siteId}/category`, categories);
  }
}
