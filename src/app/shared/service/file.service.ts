import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {FileModel} from "../model/file.model";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class FileService {
  path = environment.apiUrl + '/file';

  constructor(private httpClient: HttpClient) {
  }

  upload(formData: FormData): Observable<FileModel> {
    return this.httpClient.post<FileModel>(this.path, formData);
  }

}
