import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {CategoryModel, UncategorizedModel} from "../model";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  path = environment.apiUrl + '/category';

  constructor(private httpClient: HttpClient) {
  }

  getAll(): Observable<CategoryModel[]> {
    return this.httpClient.get<CategoryModel[]>(this.path);
  }

  findById(id: string): Observable<CategoryModel> {
    return this.httpClient.get<CategoryModel>(this.path + '/' + id);
  }

  create(category: CategoryModel): Observable<CategoryModel> {
    return this.httpClient.post<CategoryModel>(this.path, category);
  }

  update(category: CategoryModel): Observable<CategoryModel> {
    return this.httpClient.put<CategoryModel>(this.path + '/' + category.id, category);
  }

  getUncategorized(): Observable<UncategorizedModel[]> {
    return this.httpClient.get<UncategorizedModel[]>(this.path + '/uncategorized');
  }

  setUncategorizedNameToCategory(uncategorizedName: string, categoryId: string): Observable<void> {
    let params = new HttpParams();
    params = params.append('uncategorizedName', uncategorizedName);
    params = params.append('categoryId', categoryId);
    return this.httpClient.patch<void>(this.path + '/uncategorized', {}, {params: params});
  }

  processNewsUncategorized(): Observable<void> {
    return this.httpClient.post<void>(this.path + '/uncategorized', {});
  }

}
