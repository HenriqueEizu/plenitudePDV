
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalService, ModalDirective } from 'ngx-bootstrap/modal';
import { BehaviorSubject, EMPTY, Observable } from 'rxjs';
import { delay, map, switchMap, take, tap } from 'rxjs/operators';
import { AlertModalService } from '../shared/alertmodal/alertmodal.service';

import { UsuarioService } from '../usuario/usuario.service';
import { ClientesService } from './../clientes/clientes.service';
import { Cliente, Telefone } from './../clientes/clientes.model';
import { Midia, Pedido,Periodo,Vendedor, ItensPedido, Estoque, ItensEstoque,RetornoPedido } from './pedidos.model';
import { PedidosService } from './pedidos.service';
import { formatDate } from '@angular/common';
import { AnyAaaaRecord } from 'dns';

const sendRequest = function(value) {
  const validEmail = "test@dx-email.com";
  return new Promise((resolve) => {
      setTimeout(function() {
          resolve(value === validEmail);
      }, 1000);
  });
}

@Component({
  selector: 'ppl-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {

  @ViewChild('childModal') public childModal:ModalDirective;

  private blnDataEntrega = new BehaviorSubject<any>(false);

  get isDataEntrega() {
    return this.blnDataEntrega.asObservable(); // {2}
  }

  // get _IdVendedor(): Observable<boolean> {return this.blnDataEntrega.asObservable();}
  // set _IdVendedor(p : number) {this.IdVendedor = p; }
  // get isDataEntrega() {
  //   return this.blnDataEntrega.asObservable(); // {2}
  // }

  pedidoForm: FormGroup;
  events: Array<string> = [];
  dataSource: Pedido[];
  lstVendedor : Vendedor[];
  active = 1;
  panelOpenState = true;
  patternDDD: any = /\d{2}/;
  FonePattern: any = /\d{9}/;
  RamalPattern: any = /\d{4}/;
  datePattern: any = /^\s*(3[01]|[12][0-9]|0?[1-9])\/(1[012]|0?[1-9])\/((?:19|20)\d{2})\s*$/;
  pedido : Pedido;
  clientes : Cliente[];
  periodo : Periodo[] ;
  midias : Midia[];
  vendedores : Vendedor[];
  cliente : any;
  idcli : any;
  idEndereco : any;
  idEnderecoTipo : any;
  idPessoa : any;
  data : string;
  dataMin : any;
  labelCliente : string;
  labelCpfCliente : string = "CPF/CNPJ"
  dataEntregaDigitada : Date;
  itensPedido : ItensPedido[];
  itensPedidoAlteracao : ItensPedido = null;
  estoques : Estoque[];
  blnCriterio : Boolean = false;
  itensEstoque : ItensEstoque[];
  qtdItensPesquisa : number = 0;
  blnHabilitaInserirItensEstqoue : boolean = false;
  blnDesabilitaCampos : string = null;
  strDesabilitaCliente : string = null;
  blnDesabilitaBotoes : boolean = true;
  nNumeroIped : number ;

  @Output() increaseQty = new EventEmitter<ItensEstoque>()
  @Output() decreaseQty = new EventEmitter<ItensEstoque>()
  @Input() IdMidia : number;

  constructor(private pedidoService: PedidosService
    ,private loginService: UsuarioService
    ,private clienteService : ClientesService
    , private router: Router
    , private formBuilder : FormBuilder
     , private modalService: BsModalService
    ,private alertService: AlertModalService
    ,private route: ActivatedRoute) { }

  ngOnInit(): void {

    let strAno : string;
    let strMes : string;
    let strDia : string;

    var d = new Date(); // date is now 2013-01-31

    this.data = formatDate(d,"dd/MM/yyyy","en-US");
    this.dataMin = this.ConvertDataJson(d);
    this.PopulaPeriodo();

    this.pedidoService.GetAllVendedores().subscribe((vd : Vendedor[]) => {
      this.vendedores = vd;
      });

    this.pedidoService.GetAllEstoques().subscribe((vd : Estoque[]) => {
      this.estoques = vd;
      });

    this.pedidoService.GetAllMidia().subscribe((md : Midia[]) => {
      this.midias = md;
      });



    this.pedido = this.route.snapshot.data['pedido'];



    if (this.pedido.id_Ped != null){
      this.nNumeroIped = this.pedido.id_Ped;
      this.labelCpfCliente = "Cliente"
      this.strDesabilitaCliente = "true";
      this.blnDesabilitaCampos = this.pedido.situacao == 1 ? null :  "true";
      this.blnDesabilitaBotoes = false
      if (this.pedido.entrega != null)
      this.pedido.entrega = this.ConvertDataJson(this.pedido.entrega);
      this.data = formatDate(this.pedido.dtPed,"dd/MM/yyyy","en-US");
    }



    this.pedidoService.GetItensPedido(this.nNumeroIped == null ? 0 : this.nNumeroIped).subscribe((ie : ItensPedido[]) => {
      this.itensPedido = ie;
      console.log("chegou aqui ffffffffffffffff");
      console.log(ie);
      this.itensPedidoAlteracao = ie[0]
    });

    this.pedidoForm = this.formBuilder.group({
      id_Ped : [this.pedido.id_Ped],
      id_Cli : this.formBuilder.control(this.pedido.id_Cli),
      nome_Cli : this.formBuilder.control(this.pedido.nome_Cli,[Validators.required],[this.ValidaCliente.bind(this)]),
      versao : [this.pedido.versao == null ? 1 : this.pedido.versao],
      dtPed  : [this.data ],
      descrSituacao : [this.pedido.descrSituacao],
      dtNascimento : this.formBuilder.control(this.pedido.entrega),
      idMidia : this.formBuilder.control(this.pedido.idMidia,[Validators.required]),
      obsMidia : this.formBuilder.control(this.pedido.obsMidia),
      observ : this.formBuilder.control(this.pedido.observ),
      idVendedor : this.formBuilder.control(this.pedido.vendedor.idVendedor,[Validators.required]),
      per_Ent : this.formBuilder.control(this.pedido.per_Ent == null ? "T" : this.pedido.per_Ent),
      entrega : this.formBuilder.control(this.pedido.entrega == null ? this.dataMin : this.pedido.entrega,[Validators.required,this.ValidaDataEntrega]),
      // Entrega : this.formBuilder.control(this.pedido.Entrega == null ? this.dataMin : this.pedido.Entrega,[Validators.required,this.ValidaDataEntrega3(this.pedido)]),
    },{validator:PedidosComponent.ValidaMidia});


  }

  ConvertDataJson(data : Date) : any{

    var result : string;
    var strAno : string;
    var strMes : string;
    var strDia : string;

    result = formatDate(data,"dd/MM/yyyy","en-US");
    strAno = String(result).substr(6,4);
    strMes = String(result).substr(3,2);
    strDia = String(result).substr(0,2);

    return {year: Number(strAno), month: Number(strMes), day: Number(strDia) };

  }

  ConvertStringDate(data : string) : Date{

    var d = new Date();
    var nAno : number;
    var nMes : number;
    var nDia : number;

    nAno = Number(data.substr(6,4));
    nMes = Number(data.substr(3,2));
    nDia = Number(data.substr(0,2));

    d.setDate(nDia);
    d.setMonth(nMes);
    d.setFullYear(nAno);

    return d;

  }

  AtribuiValor(criterio : string){
    if (criterio.length > 0)
      this.blnCriterio = true;
    else
      this.blnCriterio = false;
  }

  VerificaCliente(cpf:string){

    return this.clienteService.GetClienteCPF(cpf).pipe(
      delay(3000),
      // map((dados: {cpf : any}) => dados.cpf),
      // tap(console.log),
      // map((dados: {cpfValid : any}) => dados.cpfValid == "false" ),
      // tap(console.log ),
      // map(dados ),
      // tap(console.log)
    )
  }

  podeDesativar() {
    return true;
  }

  ValidaDataEntrega3(pedido : Pedido): ValidatorFn {

      return (control: AbstractControl): ValidationErrors | null => {

      let strAno : number;
      let strMes : number;
      let strDia : number;
      var d = new Date();


      strAno = pedido.entrega["year"];
      strMes = pedido.entrega["month"];
      strDia = pedido.entrega["day"];

      // console.log(strAno);
      // console.log(strMes);
      // console.log(strDia);

      var dateDig = new Date(Number(strAno),Number(strMes) - 1,Number(strDia),23);

        console.log(dateDig);
        console.log(d)

      if(dateDig < d)
      {
        console.log("passsi aaaaaa");
        return { 'ValidaDataEntrega': true, 'dataEntrega': true };
      }else{
        console.log("passsi xxxxxxxxxx");
        return null;
      }


    }
  }

  ValidaDataEntrega(formControl : FormControl){
    let strAno : string;
    let strMes : string;
    let strDia : string;
    var d = new Date();


    if (formControl.value != null)
    {
      strAno = formControl.value.year;
      strMes = formControl.value.month;
      strDia = formControl.value.day;

      var dateDig = new Date(Number(strAno),Number(strMes) - 1,Number(strDia),23);

      console.log(formControl.value);
      console.log(dateDig);
      console.log(d);

      if(dateDig < d)
      {
        return {
          dataEntrega: true
          }
      }else{
        return null;
      }
    }

    // if (formControl.value < this.datapedido)
    // {
    //   var blnDataEntrega$ = new BehaviorSubject<boolean>(false);
    //   return blnDataEntrega$.asObservable().pipe(
    //     delay(3000),
    //     map(e => e == false ? {DataEntregaValid: false} : null ),
    //     tap(console.log)
    //   )
    // }
    // this.blnDataEntrega.next({dataEntrega: true});
    // return this.blnDataEntrega.pipe(
    //   delay(3000),
    //    map(e => e.dataEntrega == true ? {dataEntrega: true} : null ),
    //    tap(console.log)
    // )

    // var blnDataEntrega$ = new BehaviorSubject<boolean>(true);
    // return blnDataEntrega$.asObservable().subscribe(
    //   delay(3000),
    //   tap(console.log),
    //   map(e => e == true  ? {dataEntrega: true} : null )
    // )
  }



  static ValidaMidia(group: AbstractControl):{[key:string]: boolean}{
    const idMidia = group.get('idMidia').value;
    const DescMidia = group.get('obsMidia').value;
    if ((DescMidia == null || DescMidia== "") && idMidia == "6")
      return { midia: true}

    return null;
  }


  ValidaCliente(formControl : FormControl)
  {
    return this.VerificaCliente(formControl.value).pipe(
      tap((c) => {
        if (c == null){
          return;
        }
        if ( c.id_Cli != null ){
          this.cliente = c.obJ_PESSOA.nome
          this.idcli  = c.id_Cli
          this.idEndereco  = c.obJ_PESSOA.idEndereco
          this.idEnderecoTipo  = "";
          this.labelCliente = "Cliente:"
        }else{
          if (this.pedido.id_Ped == null){
            var result$ = this.alertService.showConfirm("Cliente inexistente","Gostaria de ser direcionado para tela de Cadastro?","Fechar","+ Cliente")
            result$.asObservable().pipe(
              take(1),
              switchMap(result => result ? this.router.navigate(['cliente']) : EMPTY)
            ).subscribe()
          }
        };
      }),
      map(e =>
        {
          if (e == null){return null;}
          e.id_Cli == null ? this.pedido.id_Ped == null ? {clienteNotValid: null} : true : true} ),
      tap(console.log)
    );
  }

  PopulaPeriodo(){
    var f = new Periodo();
    var f1 = new Periodo();
    this.periodo = [f,f1];
    f.idPeriodo = "M";
    f.descricao = "MANHÃ";
    this.periodo[0] = f;
    f1.idPeriodo = "T";
    f1.descricao = "TARDE";
    this.periodo[1] = f1;
  }

  asyncValidation(params) {
    return sendRequest(params.value);
  }

  logEvent(eventName) {
    this.events.unshift(eventName);
  }

  public findInvalidControls() {
    const invalid = [];
    const controls = this.pedidoForm.controls;
    for (const name in controls) {
        if (controls[name].invalid) {
            invalid.push(name);
        }
    }
    alert(invalid);
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

  inserirTelefone(e){
    this.lstVendedor = e;
  }

  ConsultarItensEstoque(Id_Alm : HTMLInputElement, palavraChave : HTMLInputElement){

    let blnIsNumeric : Boolean;
    let strCriterio : string;
    document.body.style.cursor  = 'wait';
    this.pedidoService.GetItensEstoque(Id_Alm.value,palavraChave.value, String(this.nNumeroIped)).subscribe((es : ItensEstoque[]) => {
      if (es.length == 0)
      {
        this.itensEstoque = null;
        // this.total = 5;
        // this.currentPage = 1;
        // this.itemsPerPage = 5;
        // this.pageSize
        this.alertService.showAlertDanger("Nenhum item encontrado") ;
      }
      else{
        this.itensEstoque = es
        this.qtdItensPesquisa = es.length
        this.alertService.showAlertSuccess("Encontrados " + this.qtdItensPesquisa + " itens.") ;
      }
    });

    document.body.style.cursor  = 'default';

    return false;

  }

  emitIncreaseQty(item: ItensEstoque){
    if (item.qtd > item.qtdPedido)
      item.qtdPedido = item.qtdPedido + 1;
    this.increaseQty.emit(item)
    this.blnHabilitaInserirItensEstqoue = this.itensEstoque.filter(c => c.qtdPedido > 0).length > 0
    console.log(item)
  }

  emitDecreaseQty(item: ItensEstoque){
    if (item.qtdPedido > 0)
      item.qtdPedido = item.qtdPedido - 1;
    this.decreaseQty.emit(item)
    this.blnHabilitaInserirItensEstqoue = this.itensEstoque.filter(c => c.qtdPedido > 0).length > 0
    console.log(item)
  }

  SalvarItensEstoque(itens : ItensEstoque[] ){

    var intCtr : number;
    var lstItensEstoque : ItensEstoque[];
    lstItensEstoque = itens.filter(c => c.qtdPedido > 0)
    for(intCtr = 0; intCtr <= lstItensEstoque.length - 1;intCtr++){
      lstItensEstoque[intCtr].id_Ped = this.nNumeroIped;
    }
    this.pedidoService.IncluirItemEstoquePedido(lstItensEstoque).subscribe(
      success => {
        this.pedidoService.GetItensPedido(this.nNumeroIped).subscribe((ie : ItensPedido[]) => {
          this.itensPedido = ie;
        });
        this.router.navigate(['pedido/' + this.nNumeroIped]);
        this.alertService.showAlertSuccess("Item inserido com sucesso");
        },
      error =>  {
            this.alertService.showAlertDanger("Erro ao inserir item de pedido") ;
            }
    );
  }

  ExcluirItemPedido(ip : ItensPedido){
    var strMessage : string;
    strMessage = "Gostaria realmente exlcluir do pedido o item *** " + ip.produto.substring(0,60) + " *** do pedido " + this.nNumeroIped  + " ?";
    var result$ = this.alertService.showConfirm("Confirmação Exclusão",strMessage,"Fechar","Excluir")
    result$.asObservable()
      .pipe(
        take(1),
        switchMap(result => result ? this.pedidoService.ExcluirItemPedido(ip.id_IPv) : EMPTY)
      ).subscribe(
        success => {
                    this.pedidoService.GetItensPedido(this.nNumeroIped).subscribe((ie : ItensPedido[]) => {
                      this.itensPedido = ie;
                    });
                    this.router.navigate(['pedido/' + this.nNumeroIped]);
                    this.alertService.showAlertSuccess("Item do pedido excluído com sucesso");
                    },
        error =>  {
                  this.alertService.showAlertDanger("Erro ao excluir item de pedido") ;
                  }
      )
  }

  public showChildModal(itemPedido : ItensPedido):void {
    this.itensPedidoAlteracao = itemPedido;
    this.childModal.show();

  }

  public hideChildModal():void {
    this.childModal.hide();
   }

  SalvarPedido(pedido: Pedido){

    // var pessoaSalva = new Pessoa();
    // var enderecoCliente = new Endereco();
    // var lstEnderecoCliente = [];
    var instvendedor = new Vendedor();
    var retPedido : RetornoPedido;

    console.log(pedido);

    if (this.pedido.id_Ped == null){
      pedido.id_Cli = this.idcli;
      pedido.idEnderecoEntrega = this.idEndereco;
      pedido.tipo = this.idEnderecoTipo;
      pedido.nome_Cli = this.cliente;
      pedido.dtPed = new Date(Date.now());
      pedido.id_Ped = 0;
    }




    let dateString = pedido["entrega"]["year"] + "-" + pedido["entrega"]["month"] + "-" + pedido["entrega"]["day"];

    let newDate = new Date(dateString);

    pedido.entrega = newDate;


    instvendedor.idVendedor = pedido["idVendedor"];
    pedido.vendedor = instvendedor;
    pedido.tipo = "P";
    pedido.obs_Fin = "";
    pedido.idFoneEntrega = 0;

    console.log(pedido);

    let msgSuccess = "Pedido inserido com sucesso";
    let msgErro = "Erro ao incluir Pedido. Tente novamente";
    let msgQuestãoTitulo = "Confirmação de Inclusão"
    let msgQuestaoCorpo = "Você realmente deseja inserir este Pedido?"
    let msgBotao = "Inserir"
    if (this.pedido.id_Ped != null){
      msgSuccess = "Pedido alterado com sucesso";
      msgErro = "Erro ao atualizar Pedido. Tente novamente"
      msgQuestãoTitulo = "Confirmação de Alteração"
      msgQuestaoCorpo = "Você realmente deseja alterar este Pedido?"
      msgBotao = "Alterar"
    }

    const result$ = this.alertService.showConfirm(msgQuestãoTitulo,msgQuestaoCorpo,"Fechar",msgBotao);
    result$.asObservable()
      .pipe(
        take(1),
        switchMap(result => result ? this.pedidoService.SalvarPedido(pedido) : EMPTY)
      ).subscribe(
        success => {
                    console.log(success.ok);
                    console.log("jjjjj");
                    if (success.ok == "1"){
                      this.alertService.showAlertSuccess(msgSuccess) ;
                      // this.router.navigate(['pedidos'])
                    }
                    else{
                      this.alertService.showAlertDanger(success.mensErro) ;
                    }
                    },
        error =>  {
                  console.log(error);
                  this.alertService.showAlertDanger(msgErro) ;
                  }
      )

  }


}
