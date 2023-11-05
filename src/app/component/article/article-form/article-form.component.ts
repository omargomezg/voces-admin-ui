import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormArray, FormBuilder, Validators} from "@angular/forms";
import {configuration} from "../../../shared/constant/configuration";
import {Editor, Toolbar} from "ngx-editor";
import {ArticleModel, AuthorModel, CategoryModel, DomainModel} from "../../../shared/model";
import {ToastrService} from "ngx-toastr";
import {MatDialog} from "@angular/material/dialog";
import {AuthorFormComponent} from "../../author/author-form/author-form.component";
import {UploadModalComponent} from "../../file/upload-modal/upload-modal.component";
import {ArticleService, AuthorService, CategoryService, ValueService} from "../../../shared/service";
import {CategoryFormComponent} from "../../category/category-form/category-form.component";

@Component({
    selector: 'app-article-form',
    templateUrl: './article-form.component.html',
    styleUrls: ['./article-form.component.css']
})
export class ArticleFormComponent implements OnInit, OnDestroy {

    sites: DomainModel[] = [];
    categories: CategoryModel[] = [];
    authors: AuthorModel[] = [];
    statuses = configuration.statuses;
    filePath = configuration.fileServer;
    editor: Editor = new Editor();
    toolbar: Toolbar = [
        ['bold', 'italic', 'underline', 'strike'],
        ['ordered_list', 'bullet_list'],
        ['blockquote', 'code'],
        [{heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']}],
        ['link', 'image'],
        ['text_color', 'background_color'],
        ['align_left', 'align_center', 'align_right', 'align_justify'],
        ['horizontal_rule', 'format_clear']
    ];
    showingDialog: boolean;
    html: '' | undefined;
    articleForm = this.fb.group({
        id: [''],
        title: ['', Validators.required],
        permalink: ['', Validators.required],
        summary: ['', [Validators.maxLength(255)]],
        content: ['', Validators.required],
        referringSite: [''],
        principalSite: [configuration.sites[0], Validators.required],
        featureImage: this.fb.group({
            url: ['https://buzzlab.ch/wp-content/uploads/2013/05/placeholder.png'],
            alt: [''],
            title: ['']
        }),
        category: this.fb.group({
            id: ['', Validators.required],
            name: ''
        }),
        tags: this.fb.array([]),
        status: ['DRAFT'],
        author: this.fb.group({
            id: ['', Validators.required]
        })
    });
    private redirectOnSave: boolean;

    constructor(private route: ActivatedRoute, private articleService: ArticleService, private fb: FormBuilder,
                private router: Router,
                private toastrService: ToastrService,
                private valueService: ValueService,
                private authorService: AuthorService,
                private categoryService: CategoryService,
                public matDialog: MatDialog) {
        //TODO Set author from user session
        this.showingDialog = false;
        this.redirectOnSave = true;
    }

    get summary() {
        return this.articleForm.get('summary');
    }

    get tags() {
        return this.articleForm.get('tags') as FormArray;
    }

    ngOnInit(): void {
        this.valueService.getDomains().subscribe(domains => {
            this.sites = domains;
        });
        this.loadAuthors();
        this.loadCategories();
        this.route.params.subscribe(params => {
            if (params['id'])
                this.loadArticle(params['id']);
        });
    }

    ngOnDestroy(): void {
        this.editor.destroy();
    }

    loadCategories(): void {
        this.categoryService.getAll().subscribe(categories => {
            this.categories = categories;
        });
    }

    loadArticle(id: string): void {
        this.articleService.findById(id).subscribe(article => {
            this.articleForm.controls["id"].setValue(article.id);
            this.articleForm.controls["title"].setValue(article.title);
            this.articleForm.controls["content"].setValue(article.content);
            this.articleForm.controls["summary"].setValue(article.summary);
            this.articleForm.controls["referringSite"].setValue(article.referringSite);
            this.articleForm.controls["status"].setValue(article.status);
            this.articleForm.controls["principalSite"].setValue(article.principalSite);
            if (article.category) {
                this.articleForm.controls['category'].controls['id'].setValue(article.category.id);
                this.articleForm.controls['category'].controls['name'].setValue(article.category.name);
            }
            if (article.featureImage) {
                this.articleForm.controls['featureImage'].controls['title'].setValue(article.featureImage.title);
                this.articleForm.controls['featureImage'].controls['alt'].setValue(article.featureImage.alt);
                this.articleForm.controls['featureImage'].controls['url'].setValue(article.featureImage.url);
            }
            if (article.tags) {
                article.tags.forEach(tag => {
                    this.tags.push(this.fb.control(tag));
                });
                this.articleForm.controls["tags"].setValue(article.tags);
            }
            if (!article.permalink)
                this.createPermalink(article.title);
            else
                this.articleForm.controls["permalink"].setValue(article.permalink);
            if (article.author) {
                this.articleForm.controls['author'].controls['id'].setValue(article.author.id);
            }
        })
    }

    addTag(event: any): void {
        const value = event.target.value;
        this.tags.push(this.fb.control(value));
        event.target.value = '';
    }

    removeTag(index: number) {
        this.tags.removeAt(index)
    }

    loadAuthors(): void {
        this.authorService.getAll().subscribe(authors => {
            this.authors = authors;
            console.log(authors[0].id)
            this.articleForm.controls['author'].controls['id'].setValue(authors[0].id);
        });
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

    save(status: string): void {
        this.articleForm.controls['status'].setValue(status);
        if (this.articleForm.controls['id'].value !== '') {
            this.articleService.update(this.articleForm.value as ArticleModel).subscribe(
                () => {
                    this.handleSuccessFull();
                }, error => {
                    this.toastrService.error("Ups tenemos problemas charlie")
                });
        } else {
            this.articleService.create(this.articleForm.value as ArticleModel).subscribe(
                () => {
                    this.handleSuccessFull();
                }, error => {
                    this.toastrService.error("Ups tenemos problemas charlie")
                });
        }
    }

    handleSuccessFull() {
        this.toastrService.success('Articulo actualizado');
        if (this.redirectOnSave) {
            this.router.navigateByUrl('/article');
        } else {
            this.redirectOnSave = false;
        }
    }

    cancel(): void {
        this.router.navigateByUrl('/article');
    }

    delete(): void {
        const title = this.articleForm.get('title')?.value;
        if (confirm("Primero debes confirmar que quieres eliminar " + title)) {
            this.articleService.delete(this.articleForm.controls['id'].value as string).subscribe(
                result => {
                    this.toastrService.success("Articulo eliminado");
                    this.router.navigateByUrl('/article');
                }, error => {
                    this.toastrService.error("Ups tenemos problemas charlie")
                });
        }
    }

    setPermalink(event: any) {
        this.createPermalink(event.target.value)
    }

    openAuthorForm(): void {
        this.showingDialog = true;
        const dialogRef = this.matDialog.open(AuthorFormComponent, {
            data: {},
        });

        dialogRef.afterClosed().subscribe(result => {
            this.showingDialog = false;
            this.loadAuthors();
        });
    }

    openFileUpload() {
        this.showingDialog = true;
        const dialogRef = this.matDialog.open(UploadModalComponent, {
            data: {title: 'Imagen destacada'},
        });

        dialogRef.afterClosed().subscribe(fileName => {
            let hasId = this.articleForm.controls['id'].value as string !== '';
            if (fileName) {
                this.articleForm.controls['featureImage'].controls['url'].setValue(`${this.filePath}/${fileName}`);
                if (hasId) {
                    this.redirectOnSave = false;
                    this.save(this.articleForm.controls['status'].value as string);
                }
            }
            this.showingDialog = false;
        });
    }

    addCategory() {
        this.showingDialog = true;
        const dialogRef = this.matDialog.open(CategoryFormComponent, {
            data: {},
        });

        dialogRef.afterClosed().subscribe(result => {
            this.showingDialog = false;
            this.loadCategories();
        });
    }
}
