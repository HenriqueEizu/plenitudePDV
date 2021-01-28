import { Vendedor } from './../pedidos.model';
import { Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Resolve} from '@angular/router';
import {BehaviorSubject, Observable, of} from 'rxjs';

import { Endereco, Telefone, Cliente, Pessoa } from '../../clientes/clientes.model';
import { Loja, Midia,Pedido} from '../pedidos.model'
import { PedidosService} from '../pedidos.service'

@Injectable({
    providedIn: 'root'
})

export class PedidosResolverGuard implements Resolve<Pedido> {


constructor(private service: PedidosService){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Pedido> {
        if  (route.params && route.params['id']){
          console.log("entrou no guards");
          return this.service.GetIdPedido(route.params['id']);
        }

        var loja = new Loja();
        var midia = new Midia();
        var endereco = new Endereco();
        var telefone = new Telefone();
        var vendedor = new Vendedor();
        var pessoa = new Pessoa();
        var cliente : Cliente;


        return of ({

              IdPedido	: null,
              Id_Ped	: null,
              Id_Cli	: null,
              cliente	: cliente, //
              vendedor : vendedor,
              Id_Loja	: null,
              loja	: loja, //
              IdMidia	: null,
              midia	: midia, //
              DescMidia : null,
              FlMesmoEndEntrega	: null,
              IdEnderecoEntrega	: null,
              endereco	: endereco, //
              IdFoneEntrega	: null,
              telefone	: telefone, //
              Situacao	: null,
              DescrSituacao	: null,
              Tipo	: null,
              DescrTipo	: null,
              DtPed	: null,
              Entrega	: null,
              DtReceb	: null,
              Per_Ent	: null,
              TotProd	: null,
              Desconto	: null,
              Desc_Por	: null,
              TotPed	: null,
              VlFrete	: null,
              Val_Afin	: null,
              Entregue	: null,
              Cup_Fisc	: null,
              Tem_Frt	: null,
              Encerrou	: null,
              Enviado	: null,
              Nome_Cli	: null,
              Versao	: null,
              Codpdv	: null,
              Impresso	: null,
              Env_Mail	: null,
              Id_PdOri	: null,
              Bloq_Est	: null,
              Prazo_Mp	: null,
              Desc_Max	: null,
              Nf_Pauli	: null,
              TemCupom	: null,
              NumCupom	: null,
              EnvCupom	: null,
              ObsMidia	: null,
              Observ	: null,
              Obs_Fin	: null

      })

    }
}
