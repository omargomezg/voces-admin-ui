import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ArticleTableComponent } from './component/article/article-table/article-table.component';
import { ArticleFormComponent } from './component/article/article-form/article-form.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { NgxEditorModule } from 'ngx-editor';
import { HeaderComponent } from './component/header/header.component';
import {ToastrModule} from "ngx-toastr";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { AuthorFormComponent } from './component/author/author-form/author-form.component';
import { AuthorTableComponent } from './component/author/author-table/author-table.component';
import {MatDialogModule} from "@angular/material/dialog";
import { UploadModalComponent } from './component/file/upload-modal/upload-modal.component';
import {MatButtonModule} from "@angular/material/button";
import { FooterComponent } from './component/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    ArticleTableComponent,
    ArticleFormComponent,
    HeaderComponent,
    AuthorFormComponent,
    AuthorTableComponent,
    UploadModalComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxEditorModule,
    BrowserAnimationsModule,
    MatDialogModule,
    ToastrModule.forRoot(),
    MatButtonModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
