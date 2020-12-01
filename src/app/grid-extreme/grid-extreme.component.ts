import { NgModule, Component, Pipe, PipeTransform, enableProdMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { DxDataGridModule,
         DxBulletModule,
         DxTemplateModule } from 'devextreme-angular';
import DataSource from 'devextreme/data/data_source';
import { GridExtremeService, Employee, State } from './grid-extreme.service';


if(!/localhost/.test(document.location.host)) {
    enableProdMode();
}

@Component({
  selector: 'ppl-grid-extreme',
  templateUrl: './grid-extreme.component.html',
  styleUrls: ['./grid-extreme.component.css'],
  providers: [GridExtremeService]
})
export class GridExtremeComponent  {

  dataSource: Employee[];
    states: State[];
    events: Array<string> = [];

    constructor(service: GridExtremeService) {
        this.dataSource = service.getEmployees();
        this.states = service.getStates();
    }

    logEvent(eventName) {
        this.events.unshift(eventName);
    }

    clearEvents() {
        this.events = [];
    }

}
