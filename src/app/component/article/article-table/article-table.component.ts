import {Component, OnInit} from '@angular/core';
import {ArticleService} from "../../../shared/service/article.service";
import {Router} from "@angular/router";
import {ArticleModel, CategoryModel, PaginationModel} from "../../../shared/model";
import {PageEvent} from "@angular/material/paginator";
import {CategoryService} from "../../../shared/service";
import {ArticleFilterModel} from "../../../shared/model/article-filter.model";
import {configuration} from "../../../shared/constant/configuration";

@Component({
    selector: 'app-article-table',
    templateUrl: './article-table.component.html',
    styleUrls: ['./article-table.component.css']
})
export class ArticleTableComponent implements OnInit {

    loading: boolean;
    articles: ArticleModel[] = [];
    categories: CategoryModel[] = [];
    domains = configuration.sites;
    pagination: PaginationModel = new PaginationModel();
    totalOfElements: number;
    selectedCategory: string = '0';
    selectedDomain: string = '0';

    constructor(public articleService: ArticleService, private router: Router,
                private categoryService: CategoryService) {
        this.loading = true;
        this.totalOfElements = 0;
    }

    ngOnInit(): void {
        this.loadCategories();
        this.loadArticles();
    }

    loadCategories(): void {
        this.categoryService.getAll().subscribe(categories => {
            this.categories = categories;
        });
    }

    loadArticles(): void {
        const filter = new ArticleFilterModel();
        if (this.selectedCategory != '0') {
            filter.category = this.selectedCategory;
        }
        if (this.selectedDomain != '0') {
            filter.principalSite = this.selectedDomain;
        }
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
}
