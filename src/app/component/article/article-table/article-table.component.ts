import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ArticleModel, CategoryModel, DomainModel, PaginationModel} from "../../../shared/model";
import {PageEvent} from "@angular/material/paginator";
import {ArticleService, CategoryService, ValueService} from "../../../shared/service";
import {ArticleFilterModel} from "../../../shared/model/article-filter.model";
import {ToastrService} from "ngx-toastr";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {Sort} from '@angular/material/sort';

@Component({
  selector: 'app-article-table',
  templateUrl: './article-table.component.html',
  styleUrls: ['./article-table.component.css']
})
export class ArticleTableComponent implements OnInit {

  displayedColumns: string[] = ['title', 'author', 'domain', 'createdAt', 'updatedAt', 'status', 'actions'];
  loading: boolean = false;
  articles: ArticleModel[] = [];
  categories: CategoryModel[] = [];
  domains: DomainModel[] = [];
  pagination: PaginationModel = new PaginationModel();
  articleFilter: ArticleFilterModel = new ArticleFilterModel();
  totalOfElements: number;
  selectedCategory: string = '0';
  selectedDomain: string = '0';
  text: string = ''
  formFilter: FormGroup = this.formBuilder.group({
    text: new FormControl(''),
    category: new FormControl(''),
    principalSite: new FormControl(''),
    sortBy: new FormControl(''),
    direction: new FormControl('')
  });

  constructor(public articleService: ArticleService, private router: Router,
              private categoryService: CategoryService,
              private formBuilder: FormBuilder,
              private toast: ToastrService,
              private valueService: ValueService) {
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
            this.formFilter.controls['principalSite'].setValue('');
        });
    }

    loadCategories(): void {
        this.categoryService.getAll().subscribe(categories => {
            this.categories = categories;
            this.formFilter.controls['category'].setValue('');
        });
    }

    loadArticles(): void {
    this.loading = true;
      let filter = this.formFilter.value as ArticleFilterModel;
      this.articleFilter.category = filter.category;
      this.articleFilter.principalSite = filter.principalSite;
      sessionStorage.setItem('filter', JSON.stringify(this.articleFilter));
      sessionStorage.setItem('pagination', JSON.stringify(this.pagination));
      this.articleService.getAll(this.pagination, this.articleFilter).subscribe(result => {
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
        this.loading = true;
        this.pagination.length = e.length;
        this.pagination.pageSize = e.pageSize;
        this.pagination.pageIndex = e.pageIndex;
        this.loadArticles()
    }

    refresh() {
        this.loading = true;
        this.pagination.pageIndex = 0;
        this.loadArticles();
    }

  clearFilter(): void {
    this.pagination = new PaginationModel();
    this.loading = true;
    this.formFilter.reset();
    sessionStorage.removeItem('filter');
    sessionStorage.removeItem('pagination');
    this.ngOnInit();
  }

  setAsTag(): void {
    const tag = this.formFilter.controls['text'].value;
    this.articleService.setAsTag(tag).subscribe(result => {
      this.toast.success(`Se están procesando ${this.totalOfElements} artículos`);
    });
  }

  canUpdateTag(): boolean {
    return this.formFilter.controls['text'].value != '';
  }

  show(article: ArticleModel): void {
    window.open(`${article.site.url}/${article.permalink}`, '_blank');
  }

  announceSortChange(sortState: Sort) {
    this.articleFilter.sortBy = sortState.active;
    this.articleFilter.direction = sortState.direction.toUpperCase();
    this.pagination.pageIndex = 0;
    this.loadArticles();
  }
}
