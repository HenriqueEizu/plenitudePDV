import { Component, OnInit, Input} from '@angular/core';
import {FormGroup, FormBuilder, Validators, AbstractControl,AsyncValidatorFn,ValidationErrors, FormControl } from '@angular/forms'
import {Usuario} from './usuario.model'
import { formatDate,DatePipe,registerLocaleData} from "@angular/common";
import {Observable, EMPTY, Subject} from 'rxjs'
import {Router, ActivatedRoute} from '@angular/router'
import localeBR from "@angular/common/locales/br";
import { delay, map, tap, filter, take, switchMap } from 'rxjs/operators';
import { IFormCanDeactivate } from '../guards/form-deactivate';
registerLocaleData(localeBR, "br");

import {UsuarioService} from './usuario.service'
import { AlertModalService } from '../shared/alertmodal/alertmodal.service';


@Component({
  selector: 'ppl-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit, IFormCanDeactivate {

  blnExisteLogin : boolean;
  usuarioLocal : Usuario;
  usuarioForm: FormGroup
  emailPattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  numberPattern = /^[1-9]*$/
  message: String;
  usuarioExiste : Observable<Usuario>;
  usuarioCarregado : Usuario;
  usuario : any;
  confirmResult : Subject<boolean>;

  constructor(private usuarioService: UsuarioService
    , private router: Router
    , private formBuilder : FormBuilder
    ,private route: ActivatedRoute
    ,private alertService: AlertModalService){

     }

  podeDesativar() {
    return true;
  }

  myDate = new Date();

  ngOnInit(): void {

  }
}
