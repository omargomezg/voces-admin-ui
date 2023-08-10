import {Component} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {CategoryService} from "../../../shared/service";
import {CategoryModel} from "../../../shared/model";
import {ToastrService} from "ngx-toastr";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent {

  categoryForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    slug: ['', [Validators.required, Validators.minLength(3)]],
  });

  constructor(private formBuilder: FormBuilder, private categoryService: CategoryService,
              private toastr: ToastrService,
              public dialogRef: MatDialogRef<CategoryFormComponent>) {
  }

  save(): void {
    this.categoryService.create(this.categoryForm.value as CategoryModel).subscribe(() => {
      this.toastr.success('Category created successfully');
      this.dialogRef.close();
    });
  }
}
