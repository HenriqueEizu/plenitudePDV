import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { DxDataGridModule } from 'devextreme-angular/ui/data-grid';
import { DxBulletModule, DxTemplateModule,DxValidationSummaryModule,DxValidatorModule } from 'devextreme-angular';
import { BrowserModule } from '@angular/platform-browser';

import { SharedModule } from '../shared/shared.module';
import { PedidosRouting } from './pedidos.routing';
import { PedidosComponent } from './pedidos.component';
import { PedidosService } from './pedidos.service';
import { PedidosListComponent } from './pedidos-list/pedidos-list.component';



@NgModule({
  imports: [DxDataGridModule,DxTemplateModule,DxBulletModule,BrowserModule,DxValidationSummaryModule,
    DxValidatorModule,
    CommonModule, FormsModule, HttpClientModule, PedidosRouting,SharedModule.forRoot()],
  exports: [],
  declarations: [PedidosComponent, PedidosListComponent],
  providers: [PedidosService], //,ClubeDeactivateGuard, ClubeResolverGuard],
})
export class PedidosModule {}

