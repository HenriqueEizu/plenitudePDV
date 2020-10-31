
import { Component } from '@angular/core';
import {Router} from '@angular/router'
import {Observable} from 'rxjs'
import { UsuarioService } from './usuario/usuario.service';
import { Usuario } from './usuario/usuario.model';

@Component({
  selector: 'ppl-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {

  title = 'plenitude-pdv';
  isLoggedIn$: Observable<boolean>;
  blnLogado : boolean;

  constructor(private loginService: UsuarioService,
              private router : Router) { }

  // constructor() { }

  ngOnInit(): void {
    this.isLoggedIn$ = this.loginService.isLoggedIn;
  }

  logout(){
    this.loginService.logout();
    this.router.navigate(['login'])
  }
}
