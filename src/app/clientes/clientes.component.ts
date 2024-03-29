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
import { BsModalRef, BsModalService, ModalDirective } from 'ngx-bootstrap/modal';
registerLocaleData(localeBR, "br");

import { Cliente, Pessoa, Endereco, Telefone, Estado } from '../clientes/clientes.model';
import { ClientesService } from './../clientes/clientes.service';
import { AlertModalService } from '../shared/alertmodal/alertmodal.service';
import { UsuarioService } from '../usuario/usuario.service';
import { Usuario } from '../usuario/usuario.model';
import { stringify } from '@angular/compiler/src/util';

var o2x = require('object-to-xml');

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

  @ViewChild('telefoneModal') public telefoneModal:ModalDirective;
  @ViewChild('codddd') coddddInput: ElementRef;
  @ViewChild('numero') numeroInput: ElementRef;
  @ViewChild('ramal') ramalInput: ElementRef;
  @ViewChild('indTipoFone') IndTipoFoneInput: ElementRef;
  @ViewChild('ordenacao') ordenacaoInput: ElementRef;

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
  ordenacaoFone = [];

  estados : Estado[];
  usuarioLogado : Usuario = null;
  events: Array<string> = [];
  coltelefones: Telefone[];
  tiposTelefone : TipoTelefone[];
  patternDDD: any = /\d{2}/;
  FonePattern: any = /\d{9}/;
  RamalPattern: any = /\d{4}/;
  lstTelefone : Telefone[];
  _validacpf: Observable<boolean>;
  blnInserirTelefone : boolean = false;
  fone : Telefone;
  idTelefone : number = 0;
  ordenador : number= 0;
  blnEditarTelefone : boolean = false;

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


    this.PopulaParcela()

    this.clienteService.GetAllEstados().subscribe((es : Estado[]) => {
      console.log(es);
      this.estados = es;
      });

    this.loginService.usuarioCacheFunc.subscribe((u : Usuario) =>{
      this.usuarioLogado = u
    });

    this.cliente = this.route.snapshot.data['cliente'];

    console.log(this.cliente);
    console.log("hhhhhhhhhhhhhhhhh");
    console.log(this.cliente.obJ_PESSOA.cnpjCpf);

    // if (this.cliente != null){
      this.clienteService.GetTelefonePorIdCliente(this.cliente.id_Cli).subscribe((es : Telefone[]) => {
        console.log("***************telefone")
        console.log(es)
        this.coltelefones = es;
        });
    // }
    if (this.cliente.id_Cli != null){

      // this.cliente.OBJ_PESSOA.DtNascimento
      const [year, month, day] = this.cliente.obJ_PESSOA.dtNascimento.split('-');
      const obj = { year: parseInt(year), month: parseInt(month), day:
      parseInt(day.split(' ')[0].trim()) };
      this.cliente.obJ_PESSOA.dtNascimento = obj; //{year: 2017, month: 5, day: 13};
      // console.log(obj)
    }

    // this.cliente.OBJ_PESSOA.DtNascimento = {year: 2017, month: 5, day: 13};

    console.log(this.cliente);

    this.clienteForm = this.formBuilder.group({
      id_Cli : [this.cliente.id_Cli],
      cnpjCpf : this.formBuilder.control(this.cliente.obJ_PESSOA.cnpjCpf,[Validators.required, Validators.minLength(11),Validators.maxLength(14)],[this.ValidaCnpjCpf.bind(this)]),
      IEstRG : this.formBuilder.control(this.cliente.obJ_PESSOA.iEstRG,[Validators.required, Validators.minLength(2),Validators.maxLength(18)]),
      // IndFisJur : this.formBuilder.control(this.cliente.OBJ_PESSOA.IndFisJur,[Validators.required, Validators.minLength(1),Validators.maxLength(1)]),
      idPessoa : [this.cliente.obJ_PESSOA.idPessoa],
      idCliente : [this.cliente.idCliente],
      nome : this.formBuilder.control(this.cliente.obJ_PESSOA.nome,[Validators.required, Validators.minLength(2),Validators.maxLength(60)]),
      apelido : this.formBuilder.control(this.cliente.obJ_PESSOA.apelido,[Validators.required, Validators.minLength(2),Validators.maxLength(20)]),
      orgEmisRg : this.formBuilder.control(this.cliente.obJ_PESSOA.orgEmisRg,[Validators.required, Validators.minLength(2),Validators.maxLength(6)]),
      estCivil : this.formBuilder.control(this.cliente.obJ_PESSOA.estCivil,[Validators.required]),
      dtNascimento : this.formBuilder.control(this.cliente.obJ_PESSOA.dtNascimento),
      profProfissao : this.formBuilder.control(this.cliente.profProfissao),
      dhIns : this.formBuilder.control(this.cliente.obJ_PESSOA.dhIns),
      idPessoaEndereco : [this.cliente.obJ_PESSOA.idPessoaEndereco],
      idEndereco : [this.cliente.obJ_PESSOA.idEndereco],
      cep : this.formBuilder.control(this.cliente.obJ_PESSOA.obJ_ENDERECO.cep ,[Validators.required,Validators.pattern(this.cepPattern),this.ConsultaCEP.bind(this)]),
      uf : this.formBuilder.control(this.cliente.obJ_PESSOA.obJ_ENDERECO.uf,[Validators.required]),
      localidade : this.formBuilder.control(this.cliente.obJ_PESSOA.obJ_ENDERECO.localidade,[Validators.required, Validators.minLength(2),Validators.maxLength(60)]),
      logradouro : this.formBuilder.control(this.cliente.obJ_PESSOA.obJ_ENDERECO.logradouro,[Validators.required, Validators.minLength(2),Validators.maxLength(60)]),
      numero : this.formBuilder.control(this.cliente.obJ_PESSOA.obJ_ENDERECO.numero,[Validators.required, Validators.minLength(2),Validators.maxLength(8),Validators.pattern(this.numberPattern)]),
      complemento : this.formBuilder.control(this.cliente.obJ_PESSOA.obJ_ENDERECO.complemento),
      bairro : this.formBuilder.control(this.cliente.obJ_PESSOA.obJ_ENDERECO.bairro,[Validators.required, Validators.minLength(2),Validators.maxLength(40)]),
      eMail : this.formBuilder.control(this.cliente.obJ_PESSOA.eMail,[Validators.required, Validators.pattern(this.emailPattern)]),
      contato : this.formBuilder.control(this.cliente.contato,[Validators.required, Validators.minLength(2),Validators.maxLength(40)]),
    });
  }

  asyncValidation(params) {
    return sendRequest(params.value);
  }

  PopulaParcela(){
    var i : number;
    var ctr : number = 0;
    console.log("Popula parcelas ****************")
    this.ordenacaoFone = [];
    for (i = 1; i <= 10; i++){
      this.ordenacaoFone.push(i);
      ctr++;
    }
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

    return this.clienteService.ValidaCnpjCpf(cpf, this.cliente.id_Cli).pipe(
      delay(3000),
      // map(e => e.cpfNotValid == false ? {cpfNotValid: false} : null ),
      // map((dados: {cpfValid : any}) => dados.cpfValid),
      // tap(console.log),
      // map((dados: {cpfValid : any}) => dados.cpfValid == "false" ),
      // tap(console.log ),
      // map(dados => dados.cpfValid == false),
      // tap(console.log)
    )
  }


  ValidaCnpjCpf(formControl : FormControl)
  {
    return this.VerificaCnpjCpf(formControl.value).pipe(
      // tap(console.log),
      map(e => e.cpfNotValid == true ? {cpfNotValid: true} : null ),
      tap(console.log)
    );
  }

  ConsultaCEP(cep :string){
    if (cep.length > 7 ){
      this.clienteService.ConsultaCEP(cep).subscribe(( p : Endereco) => {
        this.clienteForm.patchValue({ logradouro: p.logradouro});
        this.clienteForm.patchValue({ uf: p.uf});
        this.clienteForm.patchValue({ localidade: p.localidade});
        this.clienteForm.patchValue({ bairro: p.bairro});
      });
    }
    return true;
  }

  podeDesativar() {
    return true;
  }

  ValidarGravacao(){

    this.blnInserirTelefone = true;
    if (this.coddddInput.nativeElement.value == "")
      this.blnInserirTelefone = false

    if (this.numeroInput.nativeElement.value == "")
      this.blnInserirTelefone = false

  }

  SalvarTelefone(){
      var telefone = new Telefone;

      telefone.idTelefone = this.idTelefone == 0 ? this.coltelefones.length + 1 : this.idTelefone;
      telefone.codddd = String(this.coddddInput.nativeElement.value).trim();
      telefone.numero = String(this.numeroInput.nativeElement.value).trim();
      telefone.ramal = String(this.ramalInput.nativeElement.value).trim();
      telefone.indusofone = this.IndTipoFoneInput.nativeElement.value;
      telefone.descTipoFone = this.tiposTelefone.filter(c=> c.IndTipoFone == this.IndTipoFoneInput.nativeElement.value)[0].DescTipoTelefone
      telefone.ordenador = this.ordenacaoInput.nativeElement.value;;

      if (this.blnEditarTelefone == true) {
        const telefoneAlt = this.coltelefones.findIndex(c=> c.idTelefone === telefone.idTelefone);
        this.coltelefones.splice(telefoneAlt,1)
        console.log(this.coltelefones);
      }
      this.coltelefones.push(telefone);
      this.coltelefones = this.coltelefones.sort((a,b)  => {
        return a.ordenador- b.ordenador;
      });
      this.blnEditarTelefone = false;
      this.hideTelefoneModal()

  }

  // logEvent(eventName) {
  //   this.events.unshift(eventName);
  // }

  // inserirTelefone(e){
  //   this.lstTelefone = e;
  // }

  // onEditorPreparing(e) {
  //   if (e.dataField == 'codddd') {
  //       e.editorName = 'dxTextBox';
  //       e.editorOptions.mask = '00';
  //   }
  //   if (e.dataField == 'numero') {
  //     e.editorName = 'dxTextBox';
  //     e.editorOptions.mask = '00000-0000';
  //   }
  // }

  // clearEvents() {
  //     this.events = [];
  // }

  TransformaListaTelefone(lstTelefone : Telefone[]): string{
    i : Number;
    let ListaTelefone : string;
    ListaTelefone = "";
    for(var i = 0; i<= lstTelefone.length -1; i++){
      ListaTelefone += "[" + lstTelefone[i].codddd  + ",";
      ListaTelefone += lstTelefone[i].codddi + ",";
      ListaTelefone += Number(lstTelefone[i].idTelefone) > 10000 ? Number(lstTelefone[i].idTelefone) - 10000 + "," : lstTelefone[i].idTelefone + ",";
      ListaTelefone += lstTelefone[i].indusofone + ",";
      ListaTelefone += lstTelefone[i].numero  + ",";
      ListaTelefone += lstTelefone[i].ramal ;

      console.log("jjjjjjjjjjjjjjjj")
      console.log(Number(lstTelefone[i].idTelefone) > 10000 ? "iiiii" : "kkkkkkkkkk")

    }

    console.log("coleção telefone")
    console.log(ListaTelefone);


    return ListaTelefone;
  }

  public showTelefoneModal():void {

    this.idTelefone = 0;
    this.blnEditarTelefone = false;
    this.coddddInput.nativeElement.value = "";
    this.numeroInput.nativeElement.value = "";
    this.ramalInput.nativeElement.value = "";
    this.telefoneModal.show();

  }

  EditarTelefoneModal(fone : Telefone){

    var foneCarregado : Telefone;

    this.blnEditarTelefone = true;
    this.fone = fone;
    foneCarregado = this.coltelefones.filter(c=> c.idTelefone == fone.idTelefone)[0]
    this.idTelefone = foneCarregado.idTelefone;
    this.coddddInput.nativeElement.value = foneCarregado.codddd;
    this.numeroInput.nativeElement.value = foneCarregado.numero;
    this.ramalInput.nativeElement.value = foneCarregado.ramal;
    this.IndTipoFoneInput.nativeElement.value = foneCarregado.indusofone
    this.ordenacaoInput.nativeElement.value = foneCarregado.ordenador;
    this.ValidarGravacao();
    this.telefoneModal.show();
  }

  RemoveItemtelefone(tl : Telefone): boolean{

    this.coltelefones = this.coltelefones.filter(c=> c.idTelefone != tl.idTelefone) ;
    return true;

  }

  ExcluirTelefone(tl : Telefone){
    var strMessage : string;
    strMessage = "Gostaria realmente exlcluir o telefone *** " + tl.codddd + "   " + tl.numero + " *** do cliente ?";
    var result$ = this.alertService.showConfirm("Confirmação Exclusão",strMessage,"Fechar","Excluir")
    result$
      .pipe(
        take(1),
        switchMap(async (result) => result ? this.RemoveItemtelefone(tl) : EMPTY)
      ).subscribe(
        success => {
                    this.alertService.showAlertSuccess("Telefone excluído com sucesso");
                    },
        error =>  {
                  this.alertService.showAlertDanger("Erro ao excluir telefone do cliente") ;
                  }
      )
  }


  public hideTelefoneModal():void {
    this.telefoneModal.hide();
   }

  SalvarCliente(cliente: Cliente){

    var pessoaSalva = new Pessoa();
    var enderecoCliente = new Endereco();
    // var lstEnderecoCliente = [];

    console.log(this.TransformaListaTelefone(this.coltelefones))


    let msgSuccess = "Cliente inserido com sucesso";
    let msgErro = "Erro ao incluir cliente. Tente novamente";
    let msgQuestãoTitulo = "Confirmação de Inclusão"
    let msgQuestaoCorpo = "Você realmente deseja inserir este cliente?"
    let msgBotao = "Inserir"
    console.log("ggggggggggggggggggggg")
    console.log(this.clienteForm)
    console.log("ggggggggggggggggggggg")
    if (this.cliente.id_Cli != null){
      msgSuccess = "Cliente alterado com sucesso";
      msgErro = "Erro ao atualizar cliente. Tente novamente"
      msgQuestãoTitulo = "Confirmação de Alteração"
      msgQuestaoCorpo = "Você realmente deseja alterar este cliente?"
      msgBotao = "Alterar"
    }

    enderecoCliente.cep = cliente["cep"];
    enderecoCliente.complemento = cliente["complemento"];
    enderecoCliente.logradouro = cliente["logradouro"];
    enderecoCliente.bairro = cliente["bairro"];
    enderecoCliente.uf = cliente["uf"];
    enderecoCliente.numero = cliente["numero"];
    enderecoCliente.localidade = cliente["localidade"];
    enderecoCliente.codMuni = "1";
    enderecoCliente.codPais = "55";
    enderecoCliente.pontoReferencia = "";



      // lstEnderecoCliente.push(new Endereco());
      // lstEnderecoCliente[i] = enderecoCliente;
    pessoaSalva.idPessoa = cliente["idPessoa"];
    pessoaSalva.idPessoaEndereco = cliente["idPessoaEndereco"];
    pessoaSalva.idEndereco =  cliente["idEndereco"];
    pessoaSalva.nome = cliente["nome"];
    pessoaSalva.apelido = cliente["apelido"];
    pessoaSalva.cnpjCpf = cliente["cnpjCpf"];
    pessoaSalva.iEstRG = cliente["IEstRG"];
    pessoaSalva.orgEmisRg = cliente["orgEmisRg"];
    pessoaSalva.dtEmisRg = cliente["dtEmisRg"];
    pessoaSalva.dtNascimento = cliente["dtNascimento"]["year"] + "-" + cliente["dtNascimento"]["month"] + "-" + cliente["dtNascimento"]["day"];
    pessoaSalva.estCivil = cliente["estCivil"];
    pessoaSalva.eMail = cliente["eMail"];
    pessoaSalva.homePage = cliente["homePage"];
    pessoaSalva.natural = cliente["natural"];
    pessoaSalva.lstTelefone = this.TransformaListaTelefone(this.coltelefones);
    pessoaSalva.dhIns = this.myDate;
    pessoaSalva.indFisJur = String(cliente["cnpjCpf"]).length > 11 ? "J" : "F" ;
    // if (pessoaSalva.lstTelefone == undefined)
    //   pessoaSalva.lstTelefone = this.dataSource;



    cliente.obJ_PESSOA = pessoaSalva;
    cliente.idCliente = cliente["idCliente"] == null ? 0 : cliente["idCliente"] = "" ? 0 : cliente["idCliente"];
    cliente.obJ_PESSOA.obJ_ENDERECO = enderecoCliente;
    cliente.idUsuario = this.usuarioLogado["id_Usr"];
    cliente.profSalario = 1111;
    cliente.profProfissao = cliente["profProfissao"];
    cliente.banCodBanco = "1";
    cliente.banNomeBanco = "llll"
    cliente.banNumConta = "55"
    cliente.banAgencia = "kkk"
    cliente.banChequeEspecial = true;




    console.log(this.usuarioLogado);
    console.log(this.coltelefones);

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
