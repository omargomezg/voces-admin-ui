import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ArticleService} from "../../../shared/service/article.service";
import {FormBuilder, Validators} from "@angular/forms";
import {configuration} from "../../../shared/constant/configuration";
import {Editor} from "ngx-editor";
import {ArticleModel} from "../../../shared/model/article.model";
import {ToastrService} from "ngx-toastr";
import {AuthorService} from "../../../shared/service/author.service";
import {AuthorModel} from "../../../shared/model/author.model";
import {MatDialog} from "@angular/material/dialog";
import {AuthorFormComponent} from "../../author/author-form/author-form.component";

@Component({
  selector: 'app-article-form',
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.css']
})
export class ArticleFormComponent implements OnInit, OnDestroy {

  sites = configuration.sites.map(site => {
    return {
      name: site,
      value: site
    }
  });
  authors: AuthorModel[] = [];
  statuses = configuration.statuses;
  editor: Editor = new Editor();
  html: '' | undefined;

  articleForm = this.fb.group({
    id: [''],
    title: ['', Validators.required],
    permalink: ['', Validators.required],
    summary: [''],
    content: ['', Validators.required],
    referringSite: [''],
    principalSite: [configuration.sites[0], Validators.required],
    featureImage: ['https://buzzlab.ch/wp-content/uploads/2013/05/placeholder.png'],
    status: ['DRAFT'],
    author: this.fb.group({
      id: ['', Validators.required]
    })
  });

  constructor(private route: ActivatedRoute, private articleService: ArticleService, private fb: FormBuilder,
              private router: Router,
              private toastrService: ToastrService,
              private authorService: AuthorService,
              public dialog: MatDialog) {
    //TODO Set author from user session
    this.loadAuthors();
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id'])
        this.loadArticle(params['id']);
    });
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }

  loadArticle(id: string): void {
    this.articleService.findById(id).subscribe(article => {
      this.articleForm.controls["id"].setValue(article.id);
      this.articleForm.controls["title"].setValue(article.title);
      this.articleForm.controls["content"].setValue(article.content);
      this.articleForm.controls["summary"].setValue(article.summary);
      this.articleForm.controls["referringSite"].setValue(article.referringSite);
      this.createPermalink(article.title);
    })
  }

  loadAuthors(): void{
    this.authorService.getAll().subscribe(authors => this.authors = authors);
  }

  createPermalink(title: string): void {
    let permalink = title.normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9_]+/gi, '-')
      .toLowerCase();
    this.articleForm.controls["permalink"].setValue(permalink);
  }

  setStatus(position: number): void {
    this.articleForm.controls["permalink"].setValue(this.statuses[position]);
  }

  save(): void {
    this.articleService.create(this.articleForm.value as ArticleModel).subscribe(
      result => {
      console.log(result)
    }, error => {
        this.toastrService.error("Ups tenemos problemas charlie")
      });
  }

  publish(): void {
  }

  hidden(): void {
  }

  cancel(): void {
    this.router.navigateByUrl('/article');
  }

  delete(): void {

  }

  setPermalink(event: any) {
    this.createPermalink(event.target.value)
  }

  openAuthorForm(): void {
    const dialogRef = this.dialog.open(AuthorFormComponent, {
      data: {},
    });

    dialogRef.afterClosed().subscribe(result => {
      this.loadAuthors();
    });
  }
}
