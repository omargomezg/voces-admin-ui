import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ArticleModel, CategoryModel, DomainModel, PaginationModel} from "../../../shared/model";
import {PageEvent} from "@angular/material/paginator";
import {ArticleService, CategoryService, ValueService} from "../../../shared/service";
import {ArticleFilterModel} from "../../../shared/model/article-filter.model";
import {ToastrService} from "ngx-toastr";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
    selector: 'app-article-table',
    templateUrl: './article-table.component.html',
    styleUrls: ['./article-table.component.css']
})
export class ArticleTableComponent implements OnInit {

    loading: boolean;
    articles: ArticleModel[] = [];
    categories: CategoryModel[] = [];
    domains: DomainModel[] = [];
    pagination: PaginationModel = new PaginationModel();
    totalOfElements: number;
    selectedCategory: string = '0';
    selectedDomain: string = '0';
    text: string = ''
    formFilter: FormGroup = this.formBuilder.group({
        text: [''],
        category: [''],
        principalSite: ['']
    });

    constructor(public articleService: ArticleService, private router: Router,
                private categoryService: CategoryService,
                private formBuilder: FormBuilder,
                private toast: ToastrService,
                private valueService: ValueService) {
        this.loading = true;
        this.totalOfElements = 0;
    }

    ngOnInit(): void {
        if (sessionStorage.getItem('filter') != undefined) {
            const filter = JSON.parse(sessionStorage.getItem('filter') as string) as ArticleFilterModel;
            this.formFilter.setValue(filter);
        }
        if (sessionStorage.getItem('pagination') != undefined) {
            this.pagination = JSON.parse(sessionStorage.getItem('pagination') as string) as PaginationModel;
        }
        this.loadDomains();
        this.loadCategories();
        this.loadArticles();
    }

    loadDomains(): void {
        this.valueService.getDomains().subscribe(domains => {
            this.domains = domains;
        });
    }

    loadCategories(): void {
        this.categoryService.getAll().subscribe(categories => {
            this.categories = categories;
        });
    }

    loadArticles(): void {
        let filter = this.formFilter.value as ArticleFilterModel;
        sessionStorage.setItem('filter', JSON.stringify(filter));
        sessionStorage.setItem('pagination', JSON.stringify(this.pagination));
        this.articleService.getAll(this.pagination, filter).subscribe(result => {
            this.totalOfElements = result.totalElements;
            this.pagination.length = result.totalElements;
            this.articles = result.content;
            this.loading = false;
        });
    }

    open(id: string): void {
        this.router.navigateByUrl('/article/' + id);
    }

    addNewArticle(): void {
        this.router.navigateByUrl('/article/create');
    }

    handlePageEvent(e: PageEvent) {
        this.pagination.length = e.length;
        this.pagination.pageSize = e.pageSize;
        this.pagination.pageIndex = e.pageIndex;
        this.loadArticles()
    }

    refresh() {
        this.loadArticles();
    }

    clearFilter(): void {
        this.pagination = new PaginationModel();
        this.formFilter.reset();
        sessionStorage.removeItem('filter');
        sessionStorage.removeItem('pagination');
        this.ngOnInit();
    }

    setAsTag(): void {
        this.articleService.setAsTag(this.text).subscribe(result => {
            this.toast.success(`Se están procesando ${this.totalOfElements} artículos`);
        });
    }

    canUpdateTag(): boolean {
        return this.formFilter.controls['text'].value != '';
    }
}
