import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Usuario } from '../usuario/usuario.model';
import { UsuarioService } from '../usuario/usuario.service';

@Component({
  selector: 'ppl-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})


export class HeaderComponent implements OnInit {

  isLoggedIn$: Observable<boolean>;
  logado : boolean;
  usuarioLogadoObs : Observable<Usuario>;
  usuarioLogado : Usuario;
  strNome : string;
  blnHabilitaDashboard : boolean = false;
  constructor(private usuarioService: UsuarioService
              ,private router: Router
              ) { }

  ngOnInit(): void {
    this.isLoggedIn$ = this.usuarioService.isLoggedIn;

    this.usuarioService.isLoggedIn.subscribe(( p : boolean) => {
      this.logado = p
      if (p == false)
      {
        this.router.navigate(['login'])
      }
    });

    this.usuarioService.usuarioCacheFunc.subscribe((u : Usuario) =>{
      this.usuarioLogado = u
      console.log(this.usuarioLogado + "iiiiiiiiiiiiiiiiiiiiiiiiiiii")
    });
  }

  logout(){
    this.usuarioService.logout();
    this.router.navigate(['login'])
  }

}
