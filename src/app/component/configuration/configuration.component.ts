import {Component} from '@angular/core';
import {ArticleService} from "../../shared/service";
import {PendingFileModel} from "../../shared/model";

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css']
})
export class ConfigurationComponent {

  pendingFiles: PendingFileModel[] = [];

  constructor(private articleService: ArticleService) {
    this.getListOfPendingImages();
  }

  getListOfPendingImages(): void {
    this.articleService.getPending().subscribe(pendingFiles => this.pendingFiles = pendingFiles);
  }

  retryFile(file: PendingFileModel): void {
    this.articleService.retryPendingFile(file).subscribe(() => this.getListOfPendingImages());
   }

}
