import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { DxDataGridModule } from 'devextreme-angular/ui/data-grid';
import { DxBulletModule, DxTemplateModule,DxValidationSummaryModule,DxValidatorModule } from 'devextreme-angular';
import { BrowserModule } from '@angular/platform-browser';

import { SharedModule } from '../shared/shared.module';
import { ClientesRouting } from './clientes.routing';
import { ClientesComponent } from './clientes.component';
import { ClientesService } from './clientes.service';
import { ClientesListComponent } from './clientes-list/clientes-list.component';



@NgModule({
  imports: [DxDataGridModule,DxTemplateModule,DxBulletModule,BrowserModule,DxValidationSummaryModule,
    DxValidatorModule,
    CommonModule, FormsModule, HttpClientModule, ClientesRouting,SharedModule.forRoot()],
  exports: [],
  declarations: [ClientesComponent, ClientesListComponent],
  providers: [ClientesService], //,ClubeDeactivateGuard, ClubeResolverGuard],
})
export class ClientesModule {}

