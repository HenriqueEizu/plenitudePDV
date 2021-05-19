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

          idPedido	: null,
          id_Ped	: null,
          id_Cli	: null,
          cliente	: cliente,
          vendedor : vendedor,
          id_Loja	: null,
          loja	: loja,
          idMidia	: null,
          descMidia : null,
          midia	: midia,
          flMesmoEndEntrega	: null,
          idEnderecoEntrega	: null,
          endereco	: endereco,
          idFoneEntrega	: null,
          telefone	: telefone,
          situacao	: null,
          descrSituacao	: null,
          tipo	: null,
          descrTipo	: null,
          dtPed	: null,
          entrega	: null,
          tReceb	: null,
          per_Ent	: null,
          totProd	: null,
          desconto	: null,
          desc_Por	: null,
          totPed	: null,
          vlFrete	: null,
          val_Afin	: null,
          entregue	: null,
          cup_Fisc	: null,
          tem_Frt	: null,
          encerrou	: null,
          enviado	: null,
          nome_Cli	: null,
          versao	: null,
          codpdv	: null,
          impresso	: null,
          env_Mail	: null,
          id_PdOri	: null,
          bloq_Est	: null,
          prazo_Mp	: null,
          desc_Max	: null,
          nf_Pauli	: null,
          temCupom	: null,
          numCupom	: null,
          envCupom	: null,
          obsMidia	: null,
          observ	: null,
          obs_Fin	: null

      })

    }
}
