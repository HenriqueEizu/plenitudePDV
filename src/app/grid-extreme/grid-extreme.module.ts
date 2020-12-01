import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { GridExtremeComponent } from './grid-extreme.component';
import { GridExtremeService } from './grid-extreme.service';
import { GridExtremeRouting } from './grid-extreme.routing';

import { SharedModule} from  '../shared/shared.module';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { DxDataGridModule } from 'devextreme-angular/ui/data-grid';
import { DxBulletModule, DxTemplateModule } from 'devextreme-angular';
import { BrowserModule } from '@angular/platform-browser';
// import { Usuario } from './guards/clube-deactive.guard';
// import { UsuarioResolverGuard } from './guards/clube.resolver.guard';


@NgModule({
  imports: [DxDataGridModule,DxTemplateModule,DxBulletModule,BrowserModule,
          CommonModule, FormsModule, HttpClientModule, GridExtremeRouting,SharedModule.forRoot()],
  exports: [],
  declarations: [GridExtremeComponent],
  providers: [GridExtremeService], //,ClubeDeactivateGuard, ClubeResolverGuard],
})
export class GridExtremeModule {}
// platformBrowserDynamic().bootstrapModule(GridExtremeModule);


