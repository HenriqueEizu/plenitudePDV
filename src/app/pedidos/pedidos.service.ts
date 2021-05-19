
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { MEAT_API } from '../app.api';

import { Pedido, Midia, Vendedor, Estoque, ItensPedido, ItensEstoque, RetornoPedido } from './pedidos.model';


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

    GetItensPedido(id: number): Observable<ItensPedido[]>{
      let params = new HttpParams();
      params = params.append('idPedido', String(id));
      var itensPedido$ = this.http.get<ItensPedido[]>(`${MEAT_API}/pedido/GetItensPedido/`,{params: params} ).pipe();
      return itensPedido$
    }



}
