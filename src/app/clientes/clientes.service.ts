
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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
    let params = new HttpParams();
    params = params.append('id', String(id));
    clienteLocal = this.http.get<Cliente>(`${MEAT_API}/cliente/GetIdCliente`,{params: params} ).pipe();
    return clienteLocal;
  }

  ConsultaCEP(id: string):Observable<Endereco>{
    var EnderecoLocal : Observable<Endereco>
    let params = new HttpParams();
    params = params.append('id', String(id));
    EnderecoLocal = this.http.get<Endereco>(`${MEAT_API}/cliente/ConsultaCEP`, {params: params} ).pipe();
    return EnderecoLocal;
  }

  ValidaCnpjCpf(id: any):Observable<any>{
    var cpf : Observable<any>
    let params = new HttpParams();
    params = params.append('id', String(id));
    cpf = this.http.get<any>(`${MEAT_API}/cliente/ValidaCnpjCpf`, {params: params} ).pipe();
    return cpf;
  }

  GetAllClientes(campo : string,criterio : string): Observable<Cliente[]>{
    let params = new HttpParams();
    params = params.append('campo', campo);
    params = params.append('criterio', criterio);
    var clientes$ = this.http.get<Cliente[]>(`${MEAT_API}/cliente/GetAllClientes`,{params: params}).pipe();
    console.log("PASSOU SERVIÇO GetAllClientes");
    return clientes$;
  }

  GetClienteCPF(id: any): Observable<Cliente>{
    let params = new HttpParams();
    params = params.append('id', id);
    var clientes$ = this.http.get<Cliente>(`${MEAT_API}/cliente/GetClienteCPF`,{params: params}).pipe();
    return clientes$;
  }

  VerificaEmail(){
    return this.http.get<any>(`${MEAT_API}/cliente/VerificaEmail`).pipe();
  }

  SalvarCliente(cliente : Cliente): Observable<boolean>{
    if (cliente.id_Cli){
      console.log("alterar cliente");
      return this.AlterarCliente(cliente);
    }
    return this.InserirCliente(cliente);
  }

  InserirCliente(cliente : Cliente) : Observable<boolean>{
    const headers = new HttpHeaders()
    headers.append("Accept","text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8");
    // var gp : any;
    // headers.append('Content-Type','application/json')
    headers.append("Accept-Encoding","gzip, deflate");
    headers.append("Access-Control-Request-Headers","Content-type");
    headers.append("Access-Control-Request-Method","POST,OPTIONS,GET");
    headers.append('X-Requested-With','XMLHttpRequest');
    headers.append('Access-Control-Allow-Origin', 'https://localhost:44377' );
    headers.append('Content-Type', 'application/json');

    var arrayNumeros : number[];

    console.log(cliente);
    cliente.id_Cli = 0;
    cliente.idPessoa = 0;
    cliente.obJ_PESSOA.idPessoaEndereco = arrayNumeros;
    return this.http.post<boolean>(`${MEAT_API}/cliente/InserirCliente` ,cliente,{headers: headers});
  }

  ExcluirCliente(id : number) : Observable<boolean>{
    return this.http.delete<boolean>(`${MEAT_API}/cliente/Excluir/${id}`);
  }

  AlterarCliente(cliente : Cliente) : Observable<boolean>{
    const headers = new HttpHeaders()
    headers.append("Accept","text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8");
    headers.append("Accept-Encoding","gzip, deflate");
    headers.append("Access-Control-Request-Headers","Content-type");
    headers.append("Access-Control-Request-Method","POST,OPTIONS,GET");
    headers.append('X-Requested-With','XMLHttpRequest');
    headers.append('Access-Control-Allow-Origin', 'https://localhost:44377' );
    headers.append('Content-Type', 'application/json');

    console.log("alterar cliente gggggggggg");

    return this.http.put<boolean>(`${MEAT_API}/cliente/AlterarCliente/`,cliente,{headers: headers}).pipe(take(1));
  }

  GetAllEstados(): Observable<Estado[]>{
    let clubes$ = new Observable<Estado[]>();
    clubes$ = this.http.get<Estado[]>(`${MEAT_API}/cliente/GetAllEstados`).pipe();
    return clubes$;
  }

  GetTelefonePorIdCliente(id: number): Observable<Telefone[]>{
    let fones$ = new Observable<Telefone[]>();
    let params = new HttpParams();
    params = params.append('id', String(id));
    fones$ = this.http.get<Telefone[]>(`${MEAT_API}/cliente/GetTelefonePorIdCliente`, {params: params} ).pipe();
    return fones$;
  }

}
