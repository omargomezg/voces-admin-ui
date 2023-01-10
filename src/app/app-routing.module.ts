import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ArticleTableComponent} from "./component/article/article-table/article-table.component";
import {ArticleFormComponent} from "./component/article/article-form/article-form.component";

const routes: Routes = [
  {path: '', component: ArticleTableComponent},
  {path: 'article', component: ArticleTableComponent},
  {path: 'article/create', component: ArticleFormComponent},
  {path: 'article/:id', component: ArticleFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
