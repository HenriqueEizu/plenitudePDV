import { element } from 'protractor';
import { TipoTelefone } from './clientes.model';
import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import {FormGroup, FormBuilder, Validators, AbstractControl,AsyncValidatorFn,ValidationErrors, FormControl } from '@angular/forms'
import { formatDate,DatePipe,registerLocaleData} from "@angular/common";
import {Observable, EMPTY, Subject, BehaviorSubject} from 'rxjs'
import {Router, ActivatedRoute} from '@angular/router'
import localeBR from "@angular/common/locales/br";
import { delay, map, tap, filter, take, switchMap } from 'rxjs/operators';
import { IFormCanDeactivate } from '../guards/form-deactivate';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
registerLocaleData(localeBR, "br");

import { Cliente, Pessoa, Endereco, Telefone, Estado } from '../clientes/clientes.model';
import { ClientesService } from './../clientes/clientes.service';
import { AlertModalService } from '../shared/alertmodal/alertmodal.service';
import { UsuarioService } from '../usuario/usuario.service';
import { Usuario } from '../usuario/usuario.model';

const sendRequest = function(value) {
  const validEmail = "test@dx-email.com";
  return new Promise((resolve) => {
      setTimeout(function() {
          resolve(value === validEmail);
      }, 1000);
  });
}

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
  // cepPattern = /^([\d]{2})([\d]{3})([\d]{3})|^[\d]{2}.[\d]{3}-[\d]{3}/
  cepPattern = /^([\d]{2})([\d]{3})([\d]{3})|^[\d]{2}.[\d]{3}[\d]{3}/
  message: String;
  clenteExiste : Observable<Cliente>;
  fileToUpload: File = null;
  myDate = new Date();
  cliente : any;
  pessoa : any;

  estados : Estado[];
  usuarioLogado : Usuario = null;
  events: Array<string> = [];
  dataSource: Telefone[];
  tiposTelefone : TipoTelefone[];
  patternDDD: any = /\d{2}/;
  FonePattern: any = /\d{9}/;
  RamalPattern: any = /\d{4}/;
  lstTelefone : Telefone[];
  _validacpf: Observable<boolean>;

  constructor(private clienteService: ClientesService
    ,private loginService: UsuarioService
    , private router: Router
    , private formBuilder : FormBuilder
     , private modalService: BsModalService
    ,private alertService: AlertModalService
    ,private route: ActivatedRoute) {

      this.tiposTelefone = clienteService.getTipoTelefone();
     }



  ngOnInit(): void {

    this.clienteService.GetAllEstados().subscribe((es : Estado[]) => {
      this.estados = es;
      });

    this.loginService.usuarioCacheFunc.subscribe((u : Usuario) =>{
      this.usuarioLogado = u
    });

    this.cliente = this.route.snapshot.data['cliente'];

    // if (this.cliente != null){
      this.clienteService.GetTelefonePorIdCliente(this.cliente.Id_Cli).subscribe((es : Telefone[]) => {
        this.dataSource = es;
        });
    // }
    console.log(this.cliente.Id_Cli);
    console.log("hhhhhhhhhhhh");
    if (this.cliente.Id_Cli != null){

      // this.cliente.OBJ_PESSOA.DtNascimento
      const [year, month, day] = this.cliente.OBJ_PESSOA.DtNascimento.split('-');
      const obj = { year: parseInt(year), month: parseInt(month), day:
      parseInt(day.split(' ')[0].trim()) };
      this.cliente.OBJ_PESSOA.DtNascimento = obj; //{year: 2017, month: 5, day: 13};
      // console.log(obj)
    }

    // this.cliente.OBJ_PESSOA.DtNascimento = {year: 2017, month: 5, day: 13};



    this.clienteForm = this.formBuilder.group({
      Id_Cli : [this.cliente.Id_Cli],
      CnpjCpf : this.formBuilder.control(this.cliente.OBJ_PESSOA.CnpjCpf,[Validators.required, Validators.minLength(11),Validators.maxLength(14)],[this.ValidaCnpjCpf.bind(this)]),
      IEstRG : this.formBuilder.control(this.cliente.OBJ_PESSOA.IEstRG,[Validators.required, Validators.minLength(2),Validators.maxLength(18)]),
      // IndFisJur : this.formBuilder.control(this.cliente.OBJ_PESSOA.IndFisJur,[Validators.required, Validators.minLength(1),Validators.maxLength(1)]),
      IdPessoa : [this.cliente.OBJ_PESSOA.IdPessoa],
      Nome : this.formBuilder.control(this.cliente.OBJ_PESSOA.Nome,[Validators.required, Validators.minLength(2),Validators.maxLength(60)]),
      Apelido : this.formBuilder.control(this.cliente.OBJ_PESSOA.Apelido,[Validators.required, Validators.minLength(2),Validators.maxLength(20)]),
      OrgEmisRg : this.formBuilder.control(this.cliente.OBJ_PESSOA.OrgEmisRg,[Validators.required, Validators.minLength(2),Validators.maxLength(6)]),
      EstCivil : this.formBuilder.control(this.cliente.OBJ_PESSOA.EstCivil,[Validators.required, Validators.minLength(1),Validators.maxLength(30)]),
      DtNascimento : this.formBuilder.control(this.cliente.OBJ_PESSOA.DtNascimento),
      ProfProfissao : this.formBuilder.control(this.cliente.ProfProfissao,[Validators.required, Validators.minLength(2),Validators.maxLength(30)]),
      DhIns : this.formBuilder.control(this.cliente.OBJ_PESSOA.DhIns),
      IdPessoaEndereco : [this.cliente.OBJ_PESSOA.IdPessoaEndereco],
      IdEndereco : [this.cliente.OBJ_PESSOA.IdEndereco],
      CEP : this.formBuilder.control(this.cliente.OBJ_PESSOA.OBJ_ENDERECO.CEP ,[Validators.required,Validators.pattern(this.cepPattern),this.ConsultaCEP.bind(this)]),
      UF : this.formBuilder.control(this.cliente.OBJ_PESSOA.OBJ_ENDERECO.UF,[Validators.required]),
      Localidade : this.formBuilder.control(this.cliente.OBJ_PESSOA.OBJ_ENDERECO.Localidade,[Validators.required, Validators.minLength(2),Validators.maxLength(60)]),
      Logradouro : this.formBuilder.control(this.cliente.OBJ_PESSOA.OBJ_ENDERECO.Logradouro,[Validators.required, Validators.minLength(2),Validators.maxLength(60)]),
      Numero : this.formBuilder.control(this.cliente.OBJ_PESSOA.OBJ_ENDERECO.Numero,[Validators.required, Validators.minLength(2),Validators.maxLength(8),Validators.pattern(this.numberPattern)]),
      Complemento : this.formBuilder.control(this.cliente.OBJ_PESSOA.OBJ_ENDERECO.Complemento,[Validators.required, Validators.minLength(2),Validators.maxLength(40)]),
      Bairro : this.formBuilder.control(this.cliente.OBJ_PESSOA.OBJ_ENDERECO.Bairro,[Validators.required, Validators.minLength(2),Validators.maxLength(40)]),
      EMail : this.formBuilder.control(this.cliente.OBJ_PESSOA.EMail,[Validators.required, Validators.pattern(this.emailPattern)]),
      Contato : this.formBuilder.control(this.cliente.Contato,[Validators.required, Validators.minLength(2),Validators.maxLength(40)]),
    });
  }

  asyncValidation(params) {
    return sendRequest(params.value);
  }

  public findInvalidControls() {
    const invalid = [];
    const controls = this.clienteForm.controls;
    for (const name in controls) {
        if (controls[name].invalid) {
            invalid.push(name);
        }
    }
    alert(invalid);
  }

  VerificaCnpjCpf(cpf:string){

    return this.clienteService.ValidaCnpjCpf(cpf).pipe(
      delay(3000),
      map((dados: {cpf : any}) => dados.cpf),
      // tap(console.log),
      // map((dados: {cpfValid : any}) => dados.cpfValid == "false" ),
      // tap(console.log ),
      map(dados => dados.cpfValid == false),
      tap(console.log)
    )
  }


  ValidaCnpjCpf(formControl : FormControl)
  {
    return this.VerificaCnpjCpf(formControl.value).pipe(
      tap(console.log),
      map(e => e == true ? {cpfNotValid: true} : null ),
      tap(console.log)
    );
  }

  ConsultaCEP(cep :string){
    if (cep.length > 7 ){
      this.clienteService.ConsultaCEP(cep).subscribe(( p : Endereco) => {
        this.clienteForm.patchValue({ Logradouro: p.Logradouro});
        this.clienteForm.patchValue({ UF: p.UF});
        this.clienteForm.patchValue({ Localidade: p.Localidade});
        this.clienteForm.patchValue({ Bairro: p.Bairro});
      });
    }
    return true;
  }

  podeDesativar() {
    return true;
  }

  logEvent(eventName) {
    this.events.unshift(eventName);
  }

  inserirTelefone(e){
    this.lstTelefone = e;
  }

  onEditorPreparing(e) {
    if (e.dataField == 'DDD') {
        e.editorName = 'dxTextBox';
        e.editorOptions.mask = '00';
    }
    if (e.dataField == 'Numero') {
      e.editorName = 'dxTextBox';
      e.editorOptions.mask = '00000-0000';

    }
  }

  clearEvents() {
      this.events = [];
  }

  SalvarCliente(cliente: Cliente){

    var pessoaSalva = new Pessoa();
    var enderecoCliente = new Endereco();
    // var lstEnderecoCliente = [];


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

    enderecoCliente.CEP = cliente["CEP"];
    enderecoCliente.Complemento = cliente["Complemento"];
    enderecoCliente.Logradouro = cliente["Logradouro"];
    enderecoCliente.Bairro = cliente["Bairro"];
    enderecoCliente.UF = cliente["UF"];
    enderecoCliente.Numero = cliente["Numero"];
    enderecoCliente.Localidade = cliente["Localidade"];
    enderecoCliente.CodMuni = "1";
    enderecoCliente.CodPais = "55";
    enderecoCliente.PontoReferencia = "";



      // lstEnderecoCliente.push(new Endereco());
      // lstEnderecoCliente[i] = enderecoCliente;
    pessoaSalva.IdPessoa = cliente["IdPessoa"];
    pessoaSalva.IdPessoaEndereco = cliente["IdPessoaEndereco"];
    pessoaSalva.Nome = cliente["Nome"];
    pessoaSalva.Apelido = cliente["Apelido"];
    pessoaSalva.CnpjCpf = cliente["CnpjCpf"];
    pessoaSalva.IEstRG = cliente["IEstRG"];
    pessoaSalva.OrgEmisRg = cliente["OrgEmisRg"];
    pessoaSalva.DtEmisRg = cliente["DtEmisRg"];
    pessoaSalva.DtNascimento = cliente["DtNascimento"]["year"] + "-" + cliente["DtNascimento"]["month"] + "-" + cliente["DtNascimento"]["day"];
    pessoaSalva.EstCivil = cliente["EstCivil"];
    pessoaSalva.EMail = cliente["EMail"];
    pessoaSalva.HomePage = cliente["HomePage"];
    pessoaSalva.Natural = cliente["Natural"];
    pessoaSalva.lstTelefone = this.lstTelefone;
    pessoaSalva.DhIns = this.myDate;
    pessoaSalva.IndFisJur = String(cliente["CnpjCpf"]).length > 11 ? "J" : "F" ;
    if (pessoaSalva.lstTelefone == undefined)
      pessoaSalva.lstTelefone = this.dataSource;



    cliente.OBJ_PESSOA = pessoaSalva;
    cliente.OBJ_PESSOA.OBJ_ENDERECO = enderecoCliente;
    cliente.IdUsuario = this.usuarioLogado.Id_Usr;
    cliente.ProfSalario = 1111;
    cliente.BanCodBanco = "1";
    cliente.BanNomeBanco = "llll"
    cliente.BanNumConta = "55"
    cliente.BanAgencia = "kkk"
    cliente.BanChequeEspecial = true;




    console.log(cliente);
    console.log(this.dataSource);

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
