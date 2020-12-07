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
        pessoa.OBJ_ENDERECO = endereco;

        return of ({
          IdCliente	: null,
          Id_Cli	: null,
          Id_Cli_Lj	: null,
          IdPessoa	: null,
          OBJ_PESSOA : pessoa,
          Contato	: null,
          ProfEmpresa	: null,
          ProfCargo	: null,
          ProfProfissao	: null,
          ProfSalario	: null,
          ProfDtAdmissao	: null,
          BanCodBanco	: null,
          BanNomeBanco	: null,
          BanDtInicioBanco	: null,
          BanAgencia	: null,
          BanNumConta	: null,
          BanChequeEspecial	: null,
          IdUsuario : null
        });
    }

}
