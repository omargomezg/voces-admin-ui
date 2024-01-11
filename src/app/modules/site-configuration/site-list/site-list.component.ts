import {Component, OnInit} from '@angular/core';
import {DomainModel, SiteModel} from "../../../shared/model";
import {ValueService, SiteService} from "../../../shared/service";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {MatDialog} from '@angular/material/dialog';
import {CategoryComponent} from '../category/category.component';

@Component({
    selector: 'app-site-list',
    templateUrl: './site-list.component.html',
    styleUrls: ['./site-list.component.css']
})
export class SiteListComponent implements OnInit {
    domains: DomainModel[] = [];
    site!: SiteModel;
    domainForm!: FormGroup;
    selectedDomain: string = '';
    reg = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';


    constructor(private siteService: SiteService, private valueService: ValueService,
                private matDialog: MatDialog,
                private fb: FormBuilder, private toastr: ToastrService) {
    }

    ngOnInit(): void {
        this.loadDomains();
    }


    loadDomains(): void {
        this.valueService.getDomains().subscribe(domains => {
            this.domains = domains;
            this.selectDomain(domains[0].key);
        });
    }

    buildForm(): void {
        this.domainForm = this.fb.group({
            id: [this.getValue(this.site.id)],
            name: [this.getValue(this.site.name), [Validators.required]],
            domain: [this.getValue(this.site.domain), [Validators.required]],
            description: [this.getValue(this.site.description), [Validators.required]],
            url: [this.getValue(this.site.url), [Validators.required, Validators.pattern(this.reg)]],
            logo: [this.getValue(this.site.logo), [Validators.required]],
            favicon: [this.getValue(this.site.favicon), [Validators.required]],
            socialNetworks: this.fb.array([]),
            keywords: this.fb.array([])
        });
        if (this.site.socialNetworks) {
            this.site.socialNetworks.forEach(socialNetwork => {
                this.socialNetworks.push(this.fb.group({
                    name: [this.getValue(socialNetwork.name), [Validators.required]],
                    url: [this.getValue(socialNetwork.url), [Validators.required]]
                }));
            })
        }
        if(this.site.keywords) {
            this.site.keywords.forEach(keyword => {
                this.keywords.push(this.fb.control(keyword));
            })
        }
    }

    get socialNetworks(): FormArray {
        return this.domainForm.controls['socialNetworks'] as FormArray;
    }

    addNewSocialNetwork(): void {
        this.socialNetworks.push(this.fb.group({
            name: ['', [Validators.required]],
            url: ['', [Validators.required]]
        }));
    }

    get keywords(): FormArray {
        return this.domainForm.controls['keywords'] as FormArray;
    }

    addKeyword(event: any): void {
        const value = event.target.value;
        this.keywords.push(this.fb.control(value));
        event.target.value = '';
    }

    getValue(value: string): string {
        return value ? value : '';
    }

    removeKeyword(index: number): void {
        this.keywords.removeAt(index)
    }

    selectDomain(domain: string): void {
        this.selectedDomain = domain;
        this.loadSite();
    }

    loadSite(): void {
        this.siteService.getByDomain(this.selectedDomain).subscribe(site => {
            this.site = site;
            this.buildForm();
        });
    }

    save() {
        if (this.domainForm.valid) {
            if (this.site.id == null)
                this.siteService.create(this.domainForm.value as SiteModel).subscribe(() => {
                    this.toastr.success('Site created successfully');
                    this.loadSite();
                });
            else
                this.siteService.update(this.domainForm.value as SiteModel).subscribe(() => {
                    this.toastr.success('Site updated successfully');
                    this.loadSite();
                });
        }
    }

  openCategoryModal() {
    const dialogRef = this.matDialog.open(CategoryComponent, {
      data: this.site,
    });

    dialogRef.afterClosed().subscribe(categories => {
      this.site.categories = categories;
    });
  }
}
