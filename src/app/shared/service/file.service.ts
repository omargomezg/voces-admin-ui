import {Injectable} from "@angular/core";
import {configuration} from "../constant/configuration";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {FileModel} from "../model/file.model";

@Injectable({
  providedIn: 'root'
})
export class FileService {
  path = configuration.endpoint + '/file';

  constructor(private httpClient: HttpClient) {
  }

  upload(formData: FormData ): Observable<FileModel> {
    return this.httpClient.post<FileModel>(this.path, formData);
  }

}
