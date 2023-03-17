import {Component, OnInit} from '@angular/core';
import {ArticleService} from "../../../shared/service/article.service";
import {ArticleModel} from "../../../shared/model/article.model";
import {Router} from "@angular/router";
import {OptionsModel} from "../../../shared/model/options.model";

@Component({
  selector: 'app-article-table',
  templateUrl: './article-table.component.html',
  styleUrls: ['./article-table.component.css']
})
export class ArticleTableComponent implements OnInit {

  articles: ArticleModel[];
  totalOfElements: number;
  options: OptionsModel = {
    orderBy: 'Name',
    orderDir: 'ASC',
    page: 1,
    search: '',
    size: 25
  };

  constructor(public articleService: ArticleService, private router: Router) {
    this.articles = [];
    this.totalOfElements = 0;
  }

  ngOnInit(): void {
    this.loadArticles();
  }

  loadArticles(): void {
    this.articleService.getAll(this.options).subscribe(result => {
      this.totalOfElements = result.totalItems;
      this.articles = result.articles
    });
  }

  open(id: string): void {
    this.router.navigateByUrl('/article/' + id);
  }

  addNewArticle(): void {
    this.router.navigateByUrl('/article/create');
  }

  get numbers(): number[] {
    const limit = Math.ceil(this.totalOfElements / this.options.size);
    return Array.from({ length: limit }, (_, i) => i + 1);
  }

  prev(): void {
    this.options.page--;
    this.loadArticles();
  }

  next() {
    this.options.page++;
    this.loadArticles();
  }

  to(page: number) {
    this.options.page = page;
    this.loadArticles();
  }
}
