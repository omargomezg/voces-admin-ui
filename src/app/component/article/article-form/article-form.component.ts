import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ArticleService} from "../../../shared/service/article.service";
import {FormBuilder, Validators} from "@angular/forms";
import {configuration} from "../../../shared/constant/configuration";
import {Editor} from "ngx-editor";
import {ArticleModel} from "../../../shared/model/article.model";

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
  authors = configuration.authors;
  statuses = configuration.statuses;
  editor: Editor = new Editor();
  html: '' | undefined;

  articleForm = this.fb.group({
    title: ['', Validators.required],
    permalink: ['', Validators.required],
    summary: [''],
    content: ['', Validators.required],
    referringSite: [''],
    principalSite: [configuration.sites[0], Validators.required],
    featureImage: ['https://buzzlab.ch/wp-content/uploads/2013/05/placeholder.png'],
    status: ['DRAFT'],
    author: this.fb.group({
      alias: [''],
      email: ['']
    })
  });

  constructor(private route: ActivatedRoute, private articleService: ArticleService, private fb: FormBuilder, private router: Router) {
    //TODO Set author from user session
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
      this.articleForm.controls["title"].setValue(article.title);
      this.articleForm.controls["content"].setValue(article.content);
      this.articleForm.controls["summary"].setValue(article.summary);
      this.articleForm.controls["referringSite"].setValue(article.referringSite);
      this.createPermalink(article.title);
    })
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
    this.articleService.create(this.articleForm.value as ArticleModel).subscribe(result => {
      console.log(result)
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
}
