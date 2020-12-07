
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { MEAT_API } from '../app.api';

import { Pedido } from './pedidos.model';


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


    ExcluirPedido(id : number) : Observable<boolean>{
      return this.http.delete<boolean>(`${MEAT_API}/pedido/Excluir/${id}`);
    }

    GetIdPedido(id: number):Observable<Pedido>{
      var clienteLocal : Observable<Pedido>
      clienteLocal = this.http.get<Pedido>(`${MEAT_API}/pedido/GetIdPedido/${id}` ).pipe();
      return clienteLocal;
    }

}
