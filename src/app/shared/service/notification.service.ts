import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {NotificationModel} from "../model";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  path = environment.apiUrl + '/notification';

  constructor(private httpClient: HttpClient) {
  }

  getAll(): Observable<NotificationModel[]> {
    return this.httpClient.get<NotificationModel[]>(this.path);
  }

}
