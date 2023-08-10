import {Component, OnInit} from '@angular/core';
import {CategoryService} from "../../../../shared/service";
import {UncategorizedModel} from "../../../../shared/model/uncategorized.model";
import {CategoryModel} from "../../../../shared/model/category.model";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {
  uncategorizedNames: UncategorizedModel[] = [];
  categories: CategoryModel[] = [];
  category?: string;
  wordpressCategory?: string;

  constructor(private categoryService: CategoryService, private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.loadUncategorizedNames();
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoryService.getAll().subscribe(data => {
      this.categories = data;
    });
  }

  loadUncategorizedNames(): void {
    this.categoryService.getUncategorized().subscribe(data => {
      this.uncategorizedNames = data;
    });
  }

  changeCategory(): void {
    if (this.category && this.wordpressCategory) {
      this.categoryService.setUncategorizedNameToCategory(this.wordpressCategory, this.category).subscribe(() => {
        this.toastr.success('Category updated successfully');
        this.loadUncategorizedNames();
      });
    }
  }

  getNewCategories(): void {
    this.categoryService.processNewsUncategorized().subscribe(() => {
      this.toastr.success('News updated successfully');
      this.loadUncategorizedNames();
    });
  }
}
