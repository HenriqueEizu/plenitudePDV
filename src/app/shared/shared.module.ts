import {NgModule, ModuleWithProviders} from "@angular/core"
import {CommonModule} from '@angular/common'
import {FormsModule,ReactiveFormsModule} from '@angular/forms'
import {InputComponent} from './input/input.component';
import { AlertModalComponent } from './alertmodal/alertmodal.component';
import { AlertModalService } from './alertmodal/alertmodal.service';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';

@NgModule({
    declarations: [InputComponent, AlertModalComponent, ConfirmModalComponent],
    imports : [CommonModule,FormsModule,ReactiveFormsModule],
    exports: [InputComponent,CommonModule,FormsModule,ReactiveFormsModule
                ,AlertModalComponent,ConfirmModalComponent],
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