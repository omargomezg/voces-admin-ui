import {Component, OnInit} from '@angular/core';
import {ArticleService} from "../../../shared/service/article.service";
import {ArticleModel} from "../../../shared/model/article.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-article-table',
  templateUrl: './article-table.component.html',
  styleUrls: ['./article-table.component.css']
})
export class ArticleTableComponent implements OnInit {

  articles: ArticleModel[] | undefined;

  constructor(public articleService: ArticleService, private router: Router) {
  }

  ngOnInit(): void {
    this.articleService.getAll().subscribe(result => this.articles = result);
  }

  open(id: string): void {
    this.router.navigateByUrl('/article/' + id);
  }

  addNewArticle(): void {this.router.navigateByUrl('/article/create');
  }
}
