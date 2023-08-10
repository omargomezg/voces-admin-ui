import {Component, OnInit} from '@angular/core';
import {ArticleService} from "../../../shared/service/article.service";
import {Router} from "@angular/router";
import {ArticleModel, CategoryModel, PaginationModel} from "../../../shared/model";
import {PageEvent} from "@angular/material/paginator";
import {CategoryService} from "../../../shared/service";
import {ArticleFilterModel} from "../../../shared/model/article-filter.model";

@Component({
  selector: 'app-article-table',
  templateUrl: './article-table.component.html',
  styleUrls: ['./article-table.component.css']
})
export class ArticleTableComponent implements OnInit {

  articles: ArticleModel[] = [];
  categories: CategoryModel[] = [];
  pagination: PaginationModel = new PaginationModel();
  totalOfElements: number;
  selectedCategory: string = '0';

  constructor(public articleService: ArticleService, private router: Router,
              private categoryService: CategoryService) {
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
    if(this.selectedCategory!='0') {
      filter.category = this.selectedCategory;
    }
    this.articleService.getAll(this.pagination, filter).subscribe(result => {
      this.totalOfElements = result.totalItems;
      this.pagination.length = result.totalItems;
      this.articles = result.items;
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
