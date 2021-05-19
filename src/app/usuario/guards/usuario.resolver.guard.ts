import { Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Resolve} from '@angular/router';
import {Observable, of} from 'rxjs';
import { Usuario } from '../usuario.model';
import { UsuarioService } from '../usuario.service';

@Injectable({
    providedIn: 'root'
})

export class UsuarioResolverGuard implements Resolve<Usuario> {

constructor(private service: UsuarioService){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Usuario> {
        if  (route.params && route.params['id']){
            return this.service.GetIdusuario(route.params['id']);
        }

        return of ({
          Id_Usr : null,
          Login : null,
          Senha : null,
          usuario :null,
          FlAtivo : null,
          DtVencSenha : null,
          IdEMail : null
        });
    }

}
