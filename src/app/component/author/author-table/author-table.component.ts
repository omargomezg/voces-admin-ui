import {Component} from '@angular/core';
import {AuthorService} from "../../../shared/service/author.service";
import {AuthorModel} from "../../../shared/model/author.model";
import {ToastrService} from "ngx-toastr";
import {AuthorFormComponent} from "../author-form/author-form.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-author-table',
  templateUrl: './author-table.component.html',
  styleUrls: ['./author-table.component.css']
})
export class AuthorTableComponent {
  authors: AuthorModel[] = [];

  constructor(private authorService: AuthorService,
              private toastrService: ToastrService,
              public dialog: MatDialog) {
    this.loadAuthors()
  }

  loadAuthors(): void {
    this.authorService.getAll().subscribe(authors => this.authors = authors);
  }

  open(id: string): void {
    const dialogRef = this.dialog.open(AuthorFormComponent, {
      data: this.authors.find(author => author.id === id),
    });

    dialogRef.afterClosed().subscribe(result => {
      this.loadAuthors();
    });
  }

  delete(id: string) {
    if (confirm("Are you sure to delete " + id)) {
      this.authorService.delete(id).subscribe(() => {
          this.loadAuthors();
          this.toastrService.success('Autor eliminado')
        },
        error => this.toastrService.success('Autor eliminado'));
    }
  }
}
