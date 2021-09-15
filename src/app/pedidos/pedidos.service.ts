
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { MEAT_API } from '../app.api';

import { Pedido, Midia, Vendedor, Estoque, ItensPedido, ItensEstoque, RetornoPedido, FormaPagamento, ItemPagamento, RetornoCalculaPedido } from './pedidos.model';


@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  constructor(private http: HttpClient
    ,private router: Router) { }

    GetAllPedidos(campo : string,criterio : string, blnIntegrado : boolean): Observable<Pedido[]>{
      let params = new HttpParams();
      params = params.append('campo', campo);
      params = params.append('criterio', criterio);
      params = params.append('integrado', String(blnIntegrado));
      var clientes$ = this.http.get<Pedido[]>(`${MEAT_API}/pedido/GetAllPedidos`,{params: params}).pipe();
      return clientes$;
    }

    GetItensEstoque(estoque : string,palavraChave : string, nPedido : string): Observable<ItensEstoque[]>{
      let params = new HttpParams();
      params = params.append('estoque', estoque);
      params = params.append('palavraChave', palavraChave);
      params = params.append('numeroPedido', nPedido);
      var itensEstoque$ = this.http.get<ItensEstoque[]>(`${MEAT_API}/pedido/GetItensEstoque`,{params: params}).pipe();
      return itensEstoque$;
    }



    GetAllMidia(): Observable<Midia[]>{
      var midias$ = this.http.get<Midia[]>(`${MEAT_API}/pedido/GetAllMidia`).pipe();
      return midias$;
    }

    GetAllEstoques(): Observable<Estoque[]>{
      var estoque$ = this.http.get<Estoque[]>(`${MEAT_API}/pedido/GetAllEstoques`).pipe();
      return estoque$;
    }



    GetAllVendedores(): Observable<Vendedor[]>{
      var vendedor$ = this.http.get<Vendedor[]>(`${MEAT_API}/pedido/GetAllVendedores`).pipe();
      return vendedor$;
    }


    GetAllFormaPagamentoDominio(): Observable<FormaPagamento[]>{
      var formaPagto$ = this.http.get<FormaPagamento[]>(`${MEAT_API}/pedido/GetAllFormaPagamentoDominio`).pipe();
      return formaPagto$;
    }

    GetIdPedido(id: number):Observable<Pedido>{
      var clienteLocal : Observable<Pedido>
      let params = new HttpParams();
      params = params.append('idPedido', String(id));
      clienteLocal = this.http.get<Pedido>(`${MEAT_API}/pedido/GetIdPedido`,{params: params} ).pipe();
      return clienteLocal;
    }

    SalvarPedido(pedido : Pedido): Observable<RetornoPedido>{
      if (pedido.id_Ped){
        return this.AlterarPedido(pedido);
      }
      return this.InserirPedido(pedido);
    }

    InserirPedido(pedido : Pedido) : Observable<RetornoPedido>{
      const headers = new HttpHeaders()
      headers.append("Accept","text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8");
      headers.append("Accept-Encoding","gzip, deflate");
      headers.append("Access-Control-Request-Headers","Content-type");
      headers.append("Access-Control-Request-Method","POST,OPTIONS,GET");
      headers.append('X-Requested-With','XMLHttpRequest');
      headers.append('Access-Control-Allow-Origin', 'https://localhost:44377' );
      headers.append('Content-Type', 'application/json');

      return this.http.post<RetornoPedido>(`${MEAT_API}/pedido/InserirPedido` ,pedido,{headers: headers}).pipe();
    }

    ExcluirPedido(id : number) : Observable<boolean>{
      return this.http.delete<boolean>(`${MEAT_API}/pedido/Excluir/${id}`);
    }

    ExcluirItemPedido(id : number) : Observable<RetornoPedido>{
      let params = new HttpParams();
      params = params.append('idItemPedido', String(id));
      return this.http.delete<RetornoPedido>(`${MEAT_API}/pedido/ExcluirItemPedido`,{params: params});
    }


    AlterarPedido(pedido : Pedido) : Observable<RetornoPedido>{
      const headers = new HttpHeaders()
      headers.append("Accept","text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8");
      headers.append("Accept-Encoding","gzip, deflate");
      headers.append("Access-Control-Request-Headers","Content-type");
      headers.append("Access-Control-Request-Method","POST,OPTIONS,GET");
      headers.append('X-Requested-With','XMLHttpRequest');
      headers.append('Access-Control-Allow-Origin', 'https://localhost:44377' );
      headers.append('Content-Type', 'application/json');

      return this.http.put<RetornoPedido>(`${MEAT_API}/pedido/AlterarPedido/`,pedido,{headers: headers}).pipe(take(1));
    }

    EncerraPedido(pedido : Pedido) : Observable<RetornoPedido>{
      const headers = new HttpHeaders()
      headers.append("Accept","text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8");
      headers.append("Accept-Encoding","gzip, deflate");
      headers.append("Access-Control-Request-Headers","Content-type");
      headers.append("Access-Control-Request-Method","POST,OPTIONS,GET");
      headers.append('X-Requested-With','XMLHttpRequest');
      headers.append('Access-Control-Allow-Origin', 'https://localhost:44377' );
      headers.append('Content-Type', 'application/json');

      return this.http.post<RetornoPedido>(`${MEAT_API}/pedido/EncerraPedido/`,pedido,{headers: headers}).pipe(take(1));
    }

    PedidoRecalcula(IdPedido : number): Observable<RetornoCalculaPedido>{
      let params = new HttpParams();
      params = params.append('idPedido', String(IdPedido));

      return this.http.get<RetornoCalculaPedido>(`${MEAT_API}/pedido/PedidoRecalcula/` ,{params: params}).pipe();
    }

    IncluirItemEstoquePedido(ItensEstoque :ItensEstoque[]){
      const headers = new HttpHeaders()
      headers.append("Accept","text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8");
      headers.append("Accept-Encoding","gzip, deflate");
      headers.append("Access-Control-Request-Headers","Content-type");
      headers.append("Access-Control-Request-Method","POST,OPTIONS,GET");
      headers.append('X-Requested-With','XMLHttpRequest');
      headers.append('Access-Control-Allow-Origin', 'https://localhost:44377' );
      headers.append('Content-Type', 'application/json');
      return this.http.post<boolean>(`${MEAT_API}/pedido/IncluirItemEstoquePedido` ,ItensEstoque,{headers: headers}).pipe();
    }


    IncluirFormaPagamento(formaPagto :FormaPagamento, itempagto : ItemPagamento) : Observable<RetornoPedido>{
      const headers = new HttpHeaders()
      headers.append("Accept","text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8");
      headers.append("Accept-Encoding","gzip, deflate");
      headers.append("Access-Control-Request-Headers","Content-type");
      headers.append("Access-Control-Request-Method","POST,OPTIONS,GET");
      headers.append('X-Requested-With','XMLHttpRequest');
      headers.append('Access-Control-Allow-Origin', 'https://localhost:44377' );
      headers.append('Content-Type', 'application/json');

      var data = {formaPagto : formaPagto, itempagto : itempagto};
      return this.http.post<RetornoPedido>(`${MEAT_API}/pedido/IncluirFormaPagamento` ,{params : data},{headers: headers}).pipe(take(1));
    }

    GetItensPedido(id: number): Observable<ItensPedido[]>{
      let params = new HttpParams();
      params = params.append('idPedido', String(id));
      var itensPedido$ = this.http.get<ItensPedido[]>(`${MEAT_API}/pedido/GetItensPedido/`,{params: params} ).pipe();
      return itensPedido$
    }

    GetFormaPagamento(idpedido: number): Observable<FormaPagamento[]>{
      let params = new HttpParams();
      params = params.append('idPedido', String(idpedido));
      var formaPagto$ = this.http.get<FormaPagamento[]>(`${MEAT_API}/pedido/GetFormaPagamento/`,{params: params} ).pipe();
      return formaPagto$
    }

    GetItensPagamento(idFormaPagamento: number): Observable<ItemPagamento[]>{
      let params = new HttpParams();
      params = params.append('idFormaPagamento', String(idFormaPagamento));
      var itensPagto$ = this.http.get<ItemPagamento[]>(`${MEAT_API}/pedido/GetItensPagamento/`,{params: params} ).pipe();
      return itensPagto$
    }

    ExcluirFormaPagamento(formaPagamento: FormaPagamento): Observable<boolean>{
      let params = new HttpParams();
      console.log(formaPagamento);
      params = params.append('idFormaPagamento', String(formaPagamento.id_Frp));
      var formaPagto$ = this.http.get<boolean>(`${MEAT_API}/pedido/ExcluirFormaPagamento/`,{params: params} ).pipe();
      return formaPagto$
    }


}
