import {NgModule, ModuleWithProviders} from "@angular/core"
import {CommonModule} from '@angular/common'
import {FormsModule,ReactiveFormsModule} from '@angular/forms'
import {InputComponent} from './input/input.component';
import { AlertModalComponent } from './alertmodal/alertmodal.component';
import { AlertModalService } from './alertmodal/alertmodal.service';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { HighlightMouseDirective } from './highlight-mouse.directive';
import { HighlightDirective } from './highlight.directive';
import { TooltipModule } from 'ng2-tooltip-directive';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {NgxPaginationModule} from 'ngx-pagination';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    declarations: [InputComponent, AlertModalComponent, ConfirmModalComponent,HighlightMouseDirective, HighlightDirective],
    imports : [CommonModule,FormsModule,ReactiveFormsModule,TooltipModule,Ng2SearchPipeModule
              ,NgxPaginationModule,NgbModule],
      exports: [InputComponent,CommonModule,FormsModule,ReactiveFormsModule,HighlightDirective
        ,AlertModalComponent,ConfirmModalComponent,HighlightMouseDirective,HighlightDirective
        ,TooltipModule,Ng2SearchPipeModule,NgxPaginationModule,NgbModule],
entryComponents : [AlertModalComponent],
})

export class SharedModule{
    static forRoot(): ModuleWithProviders<ReactiveFormsModule>{
        return {
            ngModule: SharedModule,
            providers: [AlertModalService]
        }
    }
}


