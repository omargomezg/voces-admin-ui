import {Component, OnInit} from '@angular/core';
import {CategoryService} from "../../../../shared/service";
import {CategoryModel, UncategorizedModel} from "../../../../shared/model";
import {ToastrService} from "ngx-toastr";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";

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
    formCategory = this.fb.group({
        id: [''],
        name: ['', [Validators.required]],
        slug: ['', [Validators.required]],
        keywords: this.fb.array([])
    });

    constructor(private categoryService: CategoryService, private toastr: ToastrService,
                private fb: FormBuilder) {
    }

    ngOnInit(): void {
        this.loadUncategorizedNames();
        this.loadCategories();
    }

    buildForm(category: CategoryModel): void {
        this.formCategory.controls['id'].setValue(category.id);
        this.formCategory.controls['name'].setValue(category.name);
        this.formCategory.controls['slug'].setValue(category.slug);
        if (category.keywords) {
            category.keywords.forEach(keyword => {
                this.keywords.push(this.fb.control(keyword));
            })
        }
    }

    loadCategories(): void {
        this.categoryService.getAll().subscribe(data => {
            this.categories = data;
            this.loadForm(data[0].id);
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

    removeKeyword(index: number): void {
        this.keywords.removeAt(index)
    }

    get keywords(): FormArray {
        return this.formCategory.controls['keywords'] as FormArray;
    }

    addKeyword(event: any) {
        const value = event.target.value;
        this.keywords.push(this.fb.control(value));
        event.target.value = '';

    }

    loadForm(id: string) {
        this.categoryService.findById(id).subscribe(data => {
           this.buildForm(data);
        });
    }

    save(): void {
        this.categoryService.update(this.formCategory.value as CategoryModel).subscribe(() => {
            this.toastr.success('Category updated successfully');
        });
    }
}
