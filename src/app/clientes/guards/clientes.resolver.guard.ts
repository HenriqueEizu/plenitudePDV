import { Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Resolve} from '@angular/router';
import {Observable, of} from 'rxjs';
import { Cliente, Pessoa,Endereco } from '../clientes.model';
import { ClientesService } from '../clientes.service';

@Injectable({
    providedIn: 'root'
})

export class ClientesResolverGuard implements Resolve<Cliente> {


constructor(private service: ClientesService){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Cliente> {
        if  (route.params && route.params['id']){
          console.log("entrou no guards");
          return this.service.GetIdCliente(route.params['id']);
        }

        var pessoa = new Pessoa();
        var endereco = new Endereco();
        pessoa.obJ_ENDERECO = endereco;

        return of ({
          idCliente	: null,
          id_Cli	: null,
          id_Cli_Lj	: null,
          idPessoa	: null,
          obJ_PESSOA : pessoa,
          contato	: null,
          profEmpresa	: null,
          profCargo	: null,
          profProfissao	: null,
          profSalario	: null,
          profDtAdmissao	: null,
          banCodBanco	: null,
          banNomeBanco	: null,
          banDtInicioBanco	: null,
          banAgencia	: null,
          banNumConta	: null,
          banChequeEspecial	: null,
          idUsuario : null
        });
    }

}
