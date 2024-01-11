import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PrincipalComponent} from "./component/principal/principal.component";
import {MaintenanceComponent} from "./component/maintenance/maintenance.component";

const routes: Routes = [
  {path: '', component: PrincipalComponent},
  {path: 'maintenance', component: MaintenanceComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigurationRoutingModule {
}
