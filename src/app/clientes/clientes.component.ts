import { Component, OnInit, Input, ViewChild} from '@angular/core';
import {FormGroup, FormBuilder, Validators, AbstractControl,AsyncValidatorFn,ValidationErrors, FormControl } from '@angular/forms'
import { formatDate,DatePipe,registerLocaleData} from "@angular/common";
import {Observable, EMPTY, Subject} from 'rxjs'
import {Router, ActivatedRoute} from '@angular/router'
import localeBR from "@angular/common/locales/br";
import { delay, map, tap, filter, take, switchMap } from 'rxjs/operators';
import { IFormCanDeactivate } from '../guards/form-deactivate';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
registerLocaleData(localeBR, "br");

import { Cliente, Pessoa, Endereco, Telefone, Estado } from '../clientes/clientes.model';
import { ClientesService } from './../clientes/clientes.service';
import { AlertModalService } from '../shared/alertmodal/alertmodal.service';


@Component({
  selector: 'ppl-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  insertModalRef : BsModalRef;
  @ViewChild('template') template;
  blnExisteClube : boolean;
  clienteForm: FormGroup
  emailPattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  numberPattern = /^[1-9]*$/
  cpfPattern = /([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})/
  cepPattern = /^([\d]{2})([\d]{3})([\d]{3})|^[\d]{2}.[\d]{3}-[\d]{3}/
  message: String;
  clenteExiste : Observable<Cliente>;
  fileToUpload: File = null;
  myDate = new Date();
  cliente : any;
  enderecoCliente : Endereco;
  estados : Estado[];

  constructor(private clienteService: ClientesService
    , private router: Router
    , private formBuilder : FormBuilder
     , private modalService: BsModalService
    ,private alertService: AlertModalService
    ,private route: ActivatedRoute) { }



  ngOnInit(): void {

    this.clienteService.GetAllEstados().subscribe((es : Estado[]) => {
      this.estados = es;
      });

    this.cliente = this.route.snapshot.data['cliente'];

    this.clienteForm = this.formBuilder.group({
      Id_Cli : [this.cliente.Id_Cli],
      CnpjCpf : this.formBuilder.control(this.cliente.CnpjCpf,[Validators.required, Validators.pattern(this.cpfPattern)]), //),[this.ValidaCPF.bind(this)]),
      IEstRG : this.formBuilder.control(this.cliente.IEstRG,[Validators.required, Validators.minLength(2),Validators.maxLength(18)]),
      IndFisJur : this.formBuilder.control(this.cliente.IndFisJur,[Validators.required, Validators.minLength(1),Validators.maxLength(1)]),
      IdPessoa : [this.cliente.IdPessoa],
      Nome : this.formBuilder.control(this.cliente.Nome,[Validators.required, Validators.minLength(2),Validators.maxLength(60)]),
      Apelido : this.formBuilder.control(this.cliente.Apelido,[Validators.required, Validators.minLength(2),Validators.maxLength(20)]),
      OrgEmisRg : this.formBuilder.control(this.cliente.OrgEmisRg,[Validators.required, Validators.minLength(2),Validators.maxLength(6)]),
      EstCivil : this.formBuilder.control(this.cliente.EstCivil,[Validators.required, Validators.minLength(1),Validators.maxLength(1)]),
      DtNascimento : this.formBuilder.control(this.cliente.DtNascimento),
      ProfProfissao : this.formBuilder.control(this.cliente.ProfProfissao,[Validators.required, Validators.minLength(2),Validators.maxLength(30)]),
      DhIns : this.formBuilder.control(this.cliente.DhIns),
      IdEndereco : [this.cliente.IdEndereco],
      CEP : this.formBuilder.control(this.cliente.CEP,[Validators.required,Validators.pattern(this.cpfPattern)]),
      UF : this.formBuilder.control(this.cliente.UF,[Validators.required, Validators.minLength(2),Validators.maxLength(2)]),
      Localidade : this.formBuilder.control(this.cliente.Localidade,[Validators.required, Validators.minLength(2),Validators.maxLength(60)]),
      Logradouro : this.formBuilder.control(this.cliente.Logradouro,[Validators.required, Validators.minLength(2),Validators.maxLength(60)]),
      Numero : this.formBuilder.control(this.cliente.Numero,[Validators.required, Validators.minLength(2),Validators.maxLength(8),Validators.pattern(this.numberPattern)]),
      Complemento : this.formBuilder.control(this.cliente.Complemento,[Validators.required, Validators.minLength(2),Validators.maxLength(40)]),
      Bairro : this.formBuilder.control(this.cliente.Bairro,[Validators.required, Validators.minLength(2),Validators.maxLength(40)]),
      EMail : this.formBuilder.control(this.cliente.EMail,[Validators.required, Validators.pattern(this.emailPattern)]),
      Contato : this.formBuilder.control(this.cliente.Contato,[Validators.required, Validators.minLength(2),Validators.maxLength(40)]),
      DDD1 : this.formBuilder.control(this.cliente.DDD1,[Validators.required, Validators.minLength(2),Validators.maxLength(40)]),
      Fone1 : this.formBuilder.control(this.cliente.Fone1,[Validators.required, Validators.minLength(2),Validators.maxLength(40)]),
      Ramal : this.formBuilder.control(this.cliente.Ramal,[Validators.required, Validators.minLength(2),Validators.maxLength(40)]),
      DDD2 : this.formBuilder.control(this.cliente.DDD2,[Validators.required, Validators.minLength(2),Validators.maxLength(40)]),
      Fone2 : this.formBuilder.control(this.cliente.Fone2,[Validators.required, Validators.minLength(2),Validators.maxLength(40)]),
      DDD3 : this.formBuilder.control(this.cliente.DDD3,[Validators.required, Validators.minLength(2),Validators.maxLength(40)]),
      Fone3 : this.formBuilder.control(this.cliente.Fone3,[Validators.required, Validators.minLength(2),Validators.maxLength(40)]),
    });
  }

  ValidaCPF(strCPF : string) {
    var Soma;
    var Resto;
    Soma = 0;
    var i;
    if (strCPF == "00000000000") return false;

    for (i=1; i<=9; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (11 - i);
    Resto = (Soma * 10) % 11;

      if ((Resto == 10) || (Resto == 11))  Resto = 0;
      if (Resto != parseInt(strCPF.substring(9, 10)) ) return false;

    Soma = 0;
      for (i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (12 - i);
      Resto = (Soma * 10) % 11;

      if ((Resto == 10) || (Resto == 11))  Resto = 0;
      if (Resto != parseInt(strCPF.substring(10, 11) ) ) return false;
      return true;
  }

  VerificaSiglaClube(SiglaClube:string, SiglaClube2:string = "sigla"){

    return this.clienteService.VerificaEmail().pipe(
      delay(3000),
      map((dados: {clubes : any[]}) => dados.clubes),
      tap(console.log),
      map((dados: {siglaClube : string}[]) => dados.filter(v => v.siglaClube.toUpperCase() === SiglaClube.toUpperCase() && v.siglaClube.toUpperCase() != SiglaClube2.toUpperCase())),
      tap(console.log ),
      map(dados => dados.length > 0),
      tap(console.log)
    )
  }

  ConsultaCEP(cep :string){

    if (cep.length > 7 ){
      this.clienteService.ConsultaCEP(cep).subscribe(( p : Endereco) => {
          this.clienteForm = this.formBuilder.group({
            UF : p.UF,
            Localidade : p.Localidade,
            Logradouro : p.Logradouro,
            Bairro : p.Bairro,
          })
      });
    }
  }


  podeDesativar() {
    return true;
  }

  SalvarCliente(cliente: Cliente){

    let msgSuccess = "Clube inserido com sucesso";
    let msgErro = "Erro ao incluir clube. Tente novamente";
    let msgQuestãoTitulo = "Confirmação de Inclusão"
    let msgQuestaoCorpo = "Você realmente deseja inserir este clube?"
    let msgBotao = "Inserir"
    if (this.clienteForm.value.Id_Cli != null){
      msgSuccess = "Clube alterado com sucesso";
      msgErro = "Erro ao atualizar clube. Tente novamente"
      msgQuestãoTitulo = "Confirmação de Alteração"
      msgQuestaoCorpo = "Você realmente deseja alterar este clube?"
      msgBotao = "Alterar"
    }

    cliente.OBJ_PESSOA.DhIns = formatDate(this.myDate,"yyyy-MM-dd","en-US");


    const result$ = this.alertService.showConfirm(msgQuestãoTitulo,msgQuestaoCorpo,"Fechar",msgBotao);
    result$.asObservable()
      .pipe(
        take(1),
        switchMap(result => result ? this.clienteService.SalvarCliente(cliente) : EMPTY)
      ).subscribe(
        success => {
                    this.alertService.showAlertSuccess(msgSuccess);
                    this.router.navigate(['clientes'])
                    },
        error =>  {
                  this.alertService.showAlertDanger(msgErro) ;
                  }
      )

  }

}
