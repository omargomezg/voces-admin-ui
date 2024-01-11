import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrincipalComponent } from './component/principal/principal.component';
import {ConfigurationRoutingModule} from "./configuration-routing.module";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatButtonModule} from "@angular/material/button";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatTabsModule} from "@angular/material/tabs";
import { MaintenanceComponent } from './component/maintenance/maintenance.component';



@NgModule({
  declarations: [
    PrincipalComponent,
    MaintenanceComponent
  ],
    imports: [
        CommonModule,
        ConfigurationRoutingModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule,
        FormsModule,
        MatTabsModule,
        ReactiveFormsModule
    ]
})
export class ConfigurationModule { }
