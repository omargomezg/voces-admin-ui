import {Component, Inject} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {AuthorModel} from "../../../shared/model/author.model";
import {AuthorService} from "../../../shared/service/author.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-author-form',
  templateUrl: './author-form.component.html',
  styleUrls: ['./author-form.component.css']
})
export class AuthorFormComponent {

  formAuthor = this.formBuilder.group({
    id:[''],
    alias: ['', Validators.required],
    email: ['', Validators.required]
  })
  constructor(private formBuilder: FormBuilder,
              private toastrService: ToastrService,
              private authorService: AuthorService,
              public dialogRef: MatDialogRef<AuthorFormComponent>,
              @Inject(MAT_DIALOG_DATA) public author: AuthorModel) {
    if(author.id) {
      this.formAuthor.controls['id'].setValue(author.id);
      this.formAuthor.controls['alias'].setValue(author.alias);
      this.formAuthor.controls['email'].setValue(author.email);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  submit(): void {
    this.authorService.create(this.formAuthor.value as AuthorModel).subscribe(
      author => {
        this.dialogRef.close(author);
      },
      error => {
        this.toastrService.error("Ups tenemos problemas charlie")
      }
    )
  }

}
