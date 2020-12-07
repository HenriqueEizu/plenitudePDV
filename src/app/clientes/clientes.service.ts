
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { MEAT_API } from '../app.api';

import { Cliente, Endereco, Estado, Telefone, TipoTelefone } from './clientes.model';


let tiposFone: TipoTelefone[] = [{
  "IndTipoFone" : "F",
  "DescTipoTelefone"  : "Fixo"
}, {
  "IndTipoFone" : "C",
  "DescTipoTelefone"  : "Celular"
}, {
  "IndTipoFone" : "X",
  "DescTipoTelefone"  : "Fax"
}, {
  "IndTipoFone" : "I",
  "DescTipoTelefone"  : "Indefinido"
}];

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  constructor(private http: HttpClient
    ,private router: Router) { }

  getTipoTelefone() {
      return tiposFone;
  }

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

  ValidaCnpjCpf(id: any):Observable<any>{
    var cpf : Observable<any>
    cpf = this.http.get<any>(`${MEAT_API}/cliente/ValidaCnpjCpf/${id}` ).pipe();
    return cpf;
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
      console.log("alterar cliente");
      return this.AlterarCliente(cliente);
    }
    return this.InserirCliente(cliente);
  }

  InserirCliente(cliente : Cliente) : Observable<boolean>{
    return this.http.post<boolean>(`${MEAT_API}/cliente/Incluir` ,cliente)
  }

  ExcluirCliente(id : number) : Observable<boolean>{
    return this.http.delete<boolean>(`${MEAT_API}/cliente/Excluir/${id}`);
  }

  AlterarCliente(cliente : Cliente) : Observable<boolean>{
    return this.http.put<boolean>(`${MEAT_API}/cliente/Alterar/${cliente.Id_Cli}`,cliente).pipe(take(1));
  }

  GetAllEstados(): Observable<Estado[]>{
    let clubes$ = new Observable<Estado[]>();
    clubes$ = this.http.get<Estado[]>(`${MEAT_API}/cliente/GetAllEstados`).pipe();
    return clubes$;
  }

  GetTelefonePorIdCliente(id: number): Observable<Telefone[]>{
    let fones$ = new Observable<Telefone[]>();
    fones$ = this.http.get<Telefone[]>(`${MEAT_API}/cliente/GetTelefonePorIdCliente/${id}` ).pipe();
    return fones$;
  }

}
