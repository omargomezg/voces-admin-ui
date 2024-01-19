import { Injectable } from '@angular/core';
import { Observable, of, partition } from 'rxjs';
import { LogModel, PageModel, PaginationModel } from '../model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  path = environment.apiUrl + '/home';

  constructor(private httpClient: HttpClient) { }

  getAll(options: PaginationModel): Observable<PageModel<LogModel>> {
    let params = new HttpParams();
    params = params.append('page', options.pageIndex);
    params = params.append('size', options.pageSize);
    return this.httpClient.get<PageModel<LogModel>>(this.path, { params: params });
  }

  delete(id: string): Observable<any> {
    return this.httpClient.delete(this.path + '/' + id);
  }

  deleteAll(): Observable<void> {
    this.httpClient.delete(this.path + '/all').subscribe();
    return of(void 0);
  }

}
