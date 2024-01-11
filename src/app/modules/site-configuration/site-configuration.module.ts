import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SiteListComponent } from './site-list/site-list.component';
import {ConfigurationRoutingModule} from "./site-configuration-routing.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { CategoryComponent } from './category/category.component';
import {MatChipsModule} from '@angular/material/chips';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';



@NgModule({
  declarations: [
    SiteListComponent,
    CategoryComponent
  ],
  imports: [
    CommonModule,
    ConfigurationRoutingModule,
    ReactiveFormsModule,
    MatChipsModule,
    MatCheckboxModule,
    MatButtonModule,
    FormsModule
  ]
})
export class SiteConfigurationModule { }
