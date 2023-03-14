import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {AuthorModel} from "../model/author.model";
import {configuration} from "../constant/configuration";

@Injectable({
  providedIn: 'root'
})
export class AuthorService {
  path = configuration.endpoint + '/author';
  constructor(private httpClient: HttpClient) {
  }

  getAll(): Observable<AuthorModel[]> {
    return this.httpClient.get<AuthorModel[]>(this.path);
  }

  create(author: AuthorModel): Observable<AuthorModel[]> {
    return this.httpClient.post<AuthorModel[]>(this.path, author);
  }

  delete(id: string): Observable<void> {
    return this.httpClient.delete<void>(this.path + "/" + id);
  }
}
