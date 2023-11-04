import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ArticleTableComponent} from './component/article/article-table/article-table.component';
import {ArticleFormComponent} from './component/article/article-form/article-form.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgxEditorModule} from 'ngx-editor';
import {HeaderComponent} from './component/header/header.component';
import {ToastrModule} from "ngx-toastr";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AuthorFormComponent} from './component/author/author-form/author-form.component';
import {AuthorTableComponent} from './component/author/author-table/author-table.component';
import {MatDialogModule} from "@angular/material/dialog";
import {UploadModalComponent} from './component/file/upload-modal/upload-modal.component';
import {MatButtonModule} from "@angular/material/button";
import {FooterComponent} from './component/footer/footer.component';
import {LoginComponent} from "./component/login/login.component";
import {MatPaginatorModule} from "@angular/material/paginator";
import {ConfigurationComponent} from './component/configuration/configuration.component';
import {MatInputModule} from "@angular/material/input";
import {MatMenuModule} from "@angular/material/menu";
import { NotificationSidebarComponent } from './component/notification-sidebar/notification-sidebar.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatIconModule} from "@angular/material/icon";
import { CategoryFormComponent } from './component/category/category-form/category-form.component';
import {MatProgressBarModule} from "@angular/material/progress-bar";

@NgModule({
  declarations: [
    AppComponent,
    ArticleTableComponent,
    ArticleFormComponent,
    HeaderComponent,
    AuthorFormComponent,
    AuthorTableComponent,
    UploadModalComponent,
    FooterComponent,
    LoginComponent,
    ConfigurationComponent,
    NotificationSidebarComponent,
    CategoryFormComponent
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
        FormsModule,
        MatPaginatorModule,
        MatInputModule,
        MatMenuModule,
        MatProgressSpinnerModule,
        MatIconModule,
        MatProgressBarModule
    ],
  providers: [],
  exports: [
    HeaderComponent,
    FooterComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
