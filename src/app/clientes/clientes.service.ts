
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { MEAT_API } from '../app.api';

import { Cliente, Endereco, Estado } from './clientes.model';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  constructor(private http: HttpClient
    ,private router: Router) { }

  GetIdCliente(id: number):Observable<Cliente>{
    var clienteLocal : Observable<Cliente>
    clienteLocal = this.http.get<Cliente>(`${MEAT_API}/cliente/GetIdCliente/${id}` ).pipe();
    return clienteLocal;
  }

  ConsultaCEP(id: string):Observable<Endereco>{
    var EnderecoLocal : Observable<Endereco>
    EnderecoLocal = this.http.get<Endereco>(`${MEAT_API}/cliente/ConsultaCEP/${id}` ).pipe();
    return EnderecoLocal;
  }

  GetAllClientes(campo : string,criterio : string): Observable<Cliente[]>{
    let params = new HttpParams();
    params = params.append('campo', campo);
    params = params.append('criterio', criterio);
    var clientes$ = this.http.get<Cliente[]>(`${MEAT_API}/cliente/listaclientes`,{params: params}).pipe();
    return clientes$;
  }

  VerificaEmail(){
    return this.http.get<any>(`${MEAT_API}/cliente/VerificaEmail`).pipe();
  }

  SalvarCliente(cliente : Cliente): Observable<boolean>{
    if (cliente.Id_Cli){
      return this.AlterarClube(cliente);
    }
    return this.InserirClube(cliente);
  }

  InserirClube(cliente : Cliente) : Observable<boolean>{
    return this.http.post<boolean>(`${MEAT_API}/cliente/Incluir` ,cliente)
  }

  ExcluirClube(id : number) : Observable<boolean>{
    return this.http.delete<boolean>(`${MEAT_API}/cliente/Excluir/${id}`);
  }

  AlterarClube(cliente : Cliente) : Observable<boolean>{
    return this.http.put<boolean>(`${MEAT_API}/cliente/Alterar/${cliente.Id_Cli}`,cliente).pipe(take(1));
  }

  GetAllEstados(): Observable<Estado[]>{
    let clubes$ = new Observable<Estado[]>();
    clubes$ = this.http.get<Estado[]>(`${MEAT_API}/cliente/GetAllEstados`).pipe();
    return clubes$;
  }


}
