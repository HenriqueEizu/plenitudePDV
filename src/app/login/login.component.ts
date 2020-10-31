import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators, AbstractControl} from '@angular/forms'

import {Router} from '@angular/router'
import { faAddressBook } from '@fortawesome/free-solid-svg-icons';
import {AlertModalService} from '../shared/alertmodal/alertmodal.service'
import { BsModalRef } from 'ngx-bootstrap/modal/public_api';
import { BehaviorSubject } from 'rxjs';
import { UsuarioService } from '../usuario/usuario.service';
import {Usuario} from '../usuario/usuario.model'

@Component({
  selector: 'ppl-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private loggedIn = new BehaviorSubject<boolean>(false);

  usuarioLogado1: Usuario = null;

  private usuarioLogado = new BehaviorSubject<Usuario>(this.usuarioLogado1);

  get usuarioCacheFunc() {
    return this.usuarioLogado; // {2}
  }

  get isLoggedIn() {
    return this.loggedIn.asObservable(); // {2}
  }

  loginForm: FormGroup
  usuarioLocal : Usuario;
  message: String;
  faAddressBook = faAddressBook;
  bdModalRef: BsModalRef;


  constructor(private loginService: UsuarioService
    , private formBuilder : FormBuilder
    ,private alertService: AlertModalService
    , private router: Router){}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      Login: this.formBuilder.control('',[Validators.required, Validators.minLength(6)]),
      Senha: this.formBuilder.control('',[Validators.required, Validators.minLength(6)])
    })
  }

  VerificaUsuario(usuario: Usuario){
    this.loginService.VerificaUsuario(usuario)
      .subscribe((usuarioLocal: Usuario) => {
        this.usuarioLocal = usuarioLocal
        if (this.usuarioLocal == undefined || this.usuarioLocal == null){

          // this.message = "Login ou Senha não conferem"
          this.loginForm.reset();
        }

      },(error : any) => this.handlerError());
}
handlerError(){
  this.alertService.showAlertDanger("Login ou senha incorreta")
}

logout() {                            // {4}
  this.loggedIn.next(false);
}


}
