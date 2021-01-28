
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { MEAT_API } from '../app.api';

import { Pedido, Midia, Vendedor, Estoque, ItensPedido, ItensEstoque } from './pedidos.model';


@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  constructor(private http: HttpClient
    ,private router: Router) { }

    GetAllPedidos(campo : string,criterio : string): Observable<Pedido[]>{
      let params = new HttpParams();
      params = params.append('campo', campo);
      params = params.append('criterio', criterio);
      var clientes$ = this.http.get<Pedido[]>(`${MEAT_API}/pedido/listaPedidos`,{params: params}).pipe();
      return clientes$;
    }

    GetItensEstoque(estoque : string,palavraChave : string, nPedido : string): Observable<ItensEstoque[]>{
      let params = new HttpParams();
      params = params.append('estoque', estoque);
      params = params.append('palavraChave', palavraChave);
      params = params.append('numeroPedido', nPedido);
      var itensEstoque$ = this.http.get<ItensEstoque[]>(`${MEAT_API}/pedido/listaItensEstoque`,{params: params}).pipe();
      return itensEstoque$;
    }



    GetAllMidia(): Observable<Midia[]>{
      var midias$ = this.http.get<Midia[]>(`${MEAT_API}/pedido/listaMidias`).pipe();
      return midias$;
    }

    GetAllEstoques(): Observable<Estoque[]>{
      var estoque$ = this.http.get<Estoque[]>(`${MEAT_API}/pedido/listaEstoques`).pipe();
      return estoque$;
    }



    GetAllVendedores(): Observable<Vendedor[]>{
      var vendedor$ = this.http.get<Vendedor[]>(`${MEAT_API}/pedido/listaVendedores`).pipe();
      return vendedor$;
    }

    GetIdPedido(id: number):Observable<Pedido>{
      var clienteLocal : Observable<Pedido>
      clienteLocal = this.http.get<Pedido>(`${MEAT_API}/pedido/GetIdPedido/${id}` ).pipe();
      return clienteLocal;
    }

    SalvarPedido(pedido : Pedido): Observable<boolean>{
      if (pedido.Id_Ped){
        return this.AlterarPedido(pedido);
      }
      return this.InserirPedido(pedido);
    }

    InserirPedido(pedido : Pedido) : Observable<boolean>{
      return this.http.post<boolean>(`${MEAT_API}/pedido/Incluir` ,pedido)
    }

    ExcluirPedido(id : number) : Observable<boolean>{
      return this.http.delete<boolean>(`${MEAT_API}/pedido/Excluir/${id}`);
    }

    ExcluirItemPedido(id : ItensPedido) : Observable<boolean>{
      return this.http.delete<boolean>(`${MEAT_API}/pedido/ExcluirItemPedido/${id}`);
    }


    AlterarPedido(pedido : Pedido) : Observable<boolean>{
      return this.http.put<boolean>(`${MEAT_API}/pedido/Alterar/${pedido.Id_Cli}`,pedido).pipe(take(1));
    }

    IncluirItemEstoquePedido(itensEstoque :ItensEstoque[]){
      return this.http.post<boolean>(`${MEAT_API}/pedido/IncluirItemEstoquePedido` ,itensEstoque)
    }

    GetItensPedido(id: number): Observable<ItensPedido[]>{
      var itensPedido$ = this.http.get<ItensPedido[]>(`${MEAT_API}/pedido/listaItensPedido/${id}` ).pipe();
      return itensPedido$
    }



}
