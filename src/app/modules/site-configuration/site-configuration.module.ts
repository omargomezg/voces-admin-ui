import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SiteListComponent } from './site-list/site-list.component';
import {ConfigurationRoutingModule} from "./site-configuration-routing.module";
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    SiteListComponent
  ],
    imports: [
        CommonModule,
        ConfigurationRoutingModule,
        ReactiveFormsModule,
    ]
})
export class SiteConfigurationModule { }
