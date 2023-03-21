import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ArticleTableComponent} from "./component/article/article-table/article-table.component";
import {ArticleFormComponent} from "./component/article/article-form/article-form.component";
import {AuthorTableComponent} from "./component/author/author-table/author-table.component";
import {AuthGuardService} from "./shared/service/auth-guard.service";

const routes: Routes = [
  {path: '', component: ArticleTableComponent, canActivate: [AuthGuardService]},
  {path: 'article', component: ArticleTableComponent, canActivate: [AuthGuardService]},
  {path: 'article/create', component: ArticleFormComponent, canActivate: [AuthGuardService]},
  {path: 'article/:id', component: ArticleFormComponent, canActivate: [AuthGuardService]},
  {path: 'authors', component: AuthorTableComponent, canActivate: [AuthGuardService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
