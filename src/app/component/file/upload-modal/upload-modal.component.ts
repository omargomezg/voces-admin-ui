import {Component, Inject} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {AuthorModel} from "../../../shared/model/author.model";
import {ArticleFormComponent} from "../../article/article-form/article-form.component";
import {FileService} from "../../../shared/service/file.service";

@Component({
  selector: 'app-upload-modal',
  templateUrl: './upload-modal.component.html',
  styleUrls: ['./upload-modal.component.css']
})
export class UploadModalComponent {
  fileToUpload: File | undefined;

  constructor(private httpClient: HttpClient,
              private fileService: FileService,
              public dialogRef: MatDialogRef<ArticleFormComponent>,
              @Inject(MAT_DIALOG_DATA) public inputData: any) {
  }

  onFileSelected(event: any) {
    const formData: FormData = new FormData();
    formData.append('file', event.target.files.item(0));
    this.fileService.upload(formData).subscribe(file => {
      this.dialogRef.close(file.filePath);
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
