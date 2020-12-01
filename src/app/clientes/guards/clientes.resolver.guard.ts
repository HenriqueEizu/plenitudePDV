import { Endereco } from './../clientes.model';
import { Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Resolve} from '@angular/router';
import {Observable, of} from 'rxjs';
import { Cliente, Pessoa } from '../clientes.model';
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
        console.log("entrou no guards");

      //   CnpjCpf : this.formBuilder.control(this.cliente.OBJ_PESSOA.CnpjCpf,[Validators.required, Validators.pattern(this.cpfPattern)],[this.ValidaCPF.bind(this)]),
      // IEstRG : this.formBuilder.control(this.cliente.OBJ_PESSOA.IEstRG,[Validators.required, Validators.minLength(2),Validators.maxLength(18)]),
      // IndFisJur : this.formBuilder.control(this.cliente.OBJ_PESSOA.IndFisJur,[Validators.required, Validators.minLength(1),Validators.maxLength(1)]),
      // IdPessoa : [this.cliente.OBJ_PESSOA.IdPessoa],
      // Nome : this.formBuilder.control(this.cliente.OBJ_PESSOA.Nome,[Validators.required, Validators.minLength(2),Validators.maxLength(60)]),
      // Apelido : this.formBuilder.control(this.cliente.OBJ_PESSOA.Apelido,[Validators.required, Validators.minLength(2),Validators.maxLength(20)]),
      // OrgEmisRg : this.formBuilder.control(this.cliente.OBJ_PESSOA.OrgEmisRg,[Validators.required, Validators.minLength(2),Validators.maxLength(6)]),
      // EstCivil : this.formBuilder.control(this.cliente.OBJ_PESSOA.EstCivil,[Validators.required, Validators.minLength(1),Validators.maxLength(1)]),
      // DtNascimento : this.formBuilder.control(this.cliente.OBJ_PESSOA.DtNascimento),
      // ProfProfissao : this.formBuilder.control(this.cliente.ProfProfissao,[Validators.required, Validators.minLength(2),Validators.maxLength(30)]),
      // DhIns : this.formBuilder.control(this.cliente.OBJ_PESSOA.DhIns),
      // IdPessoaEndereco : [this.cliente.OBJ_PESSOA.IdPessoaEndereco],
      // IdEndereco : [this.cliente.OBJ_PESSOA.IdEndereco],
      // CEP : this.formBuilder.control(this.cliente.OBJ_PESSOA.OBJ_ENDERECO.CEP ,[Validators.required,Validators.pattern(this.cepPattern)]),
      // UF : this.formBuilder.control(this.cliente.OBJ_PESSOA.OBJ_ENDERECO.UF,[Validators.required, Validators.minLength(2),Validators.maxLength(2)]),
      // Localidade : this.formBuilder.control(this.cliente.OBJ_PESSOA.OBJ_ENDERECO.Localidade,[Validators.required, Validators.minLength(2),Validators.maxLength(60)]),
      // Logradouro : this.formBuilder.control(this.cliente.OBJ_PESSOA.OBJ_ENDERECO.Logradouro,[Validators.required, Validators.minLength(2),Validators.maxLength(60)]),
      // Numero : this.formBuilder.control(this.cliente.OBJ_PESSOA.OBJ_ENDERECO.Numero,[Validators.required, Validators.minLength(2),Validators.maxLength(8),Validators.pattern(this.numberPattern)]),
      // Complemento : this.formBuilder.control(this.cliente.OBJ_PESSOA.OBJ_ENDERECO.Complemento,[Validators.required, Validators.minLength(2),Validators.maxLength(40)]),
      // Bairro : this.formBuilder.control(this.cliente.OBJ_PESSOA.OBJ_ENDERECO.Bairro,[Validators.required, Validators.minLength(2),Validators.maxLength(40)]),
      // EMail : this.formBuilder.control(this.cliente.OBJ_PESSOA.EMail,[Validat

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
