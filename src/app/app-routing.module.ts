import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {ArticleTableComponent} from "./component/article/article-table/article-table.component";
import {ArticleFormComponent} from "./component/article/article-form/article-form.component";
import {AuthorTableComponent} from "./component/author/author-table/author-table.component";
import {AuthGuardService} from "./shared/service";
import {LoginComponent} from "./component/login/login.component";
import { LogComponent } from './component/log/log.component';

const routes: Routes = [
  {path: '', component: ArticleTableComponent, canActivate: [AuthGuardService]},
  {path: 'article', component: ArticleTableComponent, canActivate: [AuthGuardService]},
  {path: 'article/create', component: ArticleFormComponent, canActivate: [AuthGuardService]},
  {path: 'article/:id', component: ArticleFormComponent, canActivate: [AuthGuardService]},
  { path: 'authors', component: AuthorTableComponent, canActivate: [AuthGuardService] },
  {path: 'logs', component: LogComponent, canActivate: [AuthGuardService]},
  {
    path: 'configuration',
    loadChildren: () => import('./modules/configuration/configuration.module').then(m => m.ConfigurationModule),
    canActivate: [AuthGuardService]
  },
  {
  path: 'sites',
    loadChildren: () => import('./modules/site-configuration/site-configuration.module').then(m => m.SiteConfigurationModule),
    canActivate: [AuthGuardService]
  },
  {path: 'authentication', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
