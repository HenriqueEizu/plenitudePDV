import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanLoad, Route } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UsuarioService } from '../usuario/usuario.service';
import { Usuario } from '../usuario/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad{

  blnLogado : boolean;
  usuarioLogado : Usuario;
  blnHome : boolean = false;
  constructor(private usuarioServico:  UsuarioService
              ,private route : Router
              ) { }
  canLoad(route: Route) : Observable<boolean> | Promise<boolean> | boolean{
    return this.blnLogado;
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean{

    if (state.url == "/home"){
      this.blnHome = true;
    }else{
      this.blnHome = false;
    }

      if (this.VerificaLogin(this.blnHome) == false ){
          this.route.navigate(['login']);
          this.blnLogado = false;
      }

    return this.blnLogado;


    // if (this.VerificaLogin(this.blnHome) == false ){
    //     console.log("entrou no guard")
    //     this.route.navigate(['login']);
    //     this.blnLogado = false;
    // }else
    // {
    //   console.log("entrou em usuario")
    //   this.route.navigate(['usuario']);
    // }

    // return this.blnLogado;

  }

  VerificaLogin(blnHome: boolean) : boolean{
    this.usuarioServico.isLoggedIn.subscribe((logado : Boolean) => {
      if (logado == true){
        this.blnLogado = true;
        this.usuarioServico.usuarioCacheFunc.subscribe((user : Usuario) => {
          this.usuarioLogado = user;
        })
      }else{
          this.blnLogado = false;
      }
    });

    return this.blnLogado;
  }
}
