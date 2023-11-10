import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SiteListComponent} from "./site-list/site-list.component";

const routes: Routes = [
    {path: '', component: SiteListComponent},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ConfigurationRoutingModule {
}
