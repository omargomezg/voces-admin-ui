import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ArticleTableComponent } from './component/article/article-table/article-table.component';
import { ArticleFormComponent } from './component/article/article-form/article-form.component';
import {HttpClientModule} from "@angular/common/http";
import {ReactiveFormsModule} from "@angular/forms";
import { NgxEditorModule } from 'ngx-editor';

@NgModule({
  declarations: [
    AppComponent,
    ArticleTableComponent,
    ArticleFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxEditorModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
