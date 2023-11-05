import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrincipalComponent } from './component/principal/principal.component';
import {ConfigurationRoutingModule} from "./configuration-routing.module";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatButtonModule} from "@angular/material/button";
import {FormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    PrincipalComponent
  ],
  imports: [
    CommonModule,
    ConfigurationRoutingModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    FormsModule
  ]
})
export class ConfigurationModule { }
