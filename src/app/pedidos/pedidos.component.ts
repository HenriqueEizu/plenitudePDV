
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalService, ModalDirective } from 'ngx-bootstrap/modal';
import { BehaviorSubject, EMPTY, Observable } from 'rxjs';
import { delay, map, switchMap, take, tap } from 'rxjs/operators';
import { AlertModalService } from '../shared/alertmodal/alertmodal.service';

import { UsuarioService } from '../usuario/usuario.service';
import { ClientesService } from './../clientes/clientes.service';
import { Cliente } from './../clientes/clientes.model';
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



    if (this.pedido.Id_Ped != null){
      this.nNumeroIped = this.pedido.Id_Ped;
      this.labelCpfCliente = "Cliente"
      this.strDesabilitaCliente = "true";
      this.blnDesabilitaCampos = this.pedido.Situacao == 1 ? null :  "true";
      this.blnDesabilitaBotoes = false
      if (this.pedido.Entrega != null)
      this.pedido.Entrega = this.ConvertDataJson(this.pedido.Entrega);
      this.data = formatDate(this.pedido.DtPed,"dd/MM/yyyy","en-US");
    }

    console.log("chegou aqui");

    this.pedidoService.GetItensPedido(this.nNumeroIped == null ? 0 : this.nNumeroIped).subscribe((ie : ItensPedido[]) => {
      this.itensPedido = ie;
      this.itensPedidoAlteracao = ie[0]
    });

    this.pedidoForm = this.formBuilder.group({
      Id_Ped : [this.pedido.Id_Ped],
      Id_Cli : this.formBuilder.control(this.pedido.Id_Cli),
      Nome_Cli : this.formBuilder.control(this.pedido.Nome_Cli,[Validators.required],[this.ValidaCliente.bind(this)]),
      Versao : [this.pedido.Versao == null ? 1 : this.pedido.Versao],
      DtPed  : [this.data ],
      DescrSituacao : [this.pedido.DescrSituacao],
      DtNascimento : this.formBuilder.control(this.pedido.Entrega),
      IdMidia : this.formBuilder.control(this.pedido.IdMidia,[Validators.required]),
      DescMidia : this.formBuilder.control(this.pedido.DescMidia),
      Observ : this.formBuilder.control(this.pedido.Observ),
      IdVendedor : this.formBuilder.control(this.pedido.vendedor.IdVendedor,[Validators.required]),
      Per_Ent : this.formBuilder.control(this.pedido.Per_Ent == null ? "T" : this.pedido.Per_Ent),
      Entrega : this.formBuilder.control(this.pedido.Entrega == null ? this.dataMin : this.pedido.Entrega,[Validators.required,this.ValidaDataEntrega]),
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


      strAno = pedido.Entrega["year"];
      strMes = pedido.Entrega["month"];
      strDia = pedido.Entrega["day"];

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
    const idMidia = group.get('IdMidia').value;
    const DescMidia = group.get('DescMidia').value;
    console.log(idMidia)
    console.log(DescMidia)
    if ((DescMidia == null || DescMidia== "") && idMidia == "6")
      return { midia: true}

    return null;
  }


  ValidaCliente(formControl : FormControl)
  {
    return this.VerificaCliente(formControl.value).pipe(
      tap((c) => {
        if ( c.cliente != null ){
          this.cliente = c.cliente.Nome
          this.idcli  = c.cliente.Id_Cli
          this.idEndereco  = c.cliente.IdEndereco
          this.idEnderecoTipo  = c.cliente.tipoEndereco
          this.labelCliente = "Cliente:"
        }else{
          if (this.pedido.Id_Ped == null){
            var result$ = this.alertService.showConfirm("Cliente inexistente","Gostaria de ser direcionado para tela de Cadastro?","Fechar","+ Cliente")
            result$.asObservable().pipe(
              take(1),
              switchMap(result => result ? this.router.navigate(['cliente']) : EMPTY)
            ).subscribe()
          }
        };
      }),
      map(e => e.cliente == null ? this.pedido.Id_Ped == null ? {clienteNotValid: null} : true : true ),
      tap(console.log)
    );
  }

  PopulaPeriodo(){
    var f = new Periodo();
    var f1 = new Periodo();
    this.periodo = [f,f1];
    f.IdPeriodo = "M";
    f.Descricao = "MANHÃ";
    this.periodo[0] = f;
    f1.IdPeriodo = "T";
    f1.Descricao = "TARDE";
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
    console.log(Id_Alm.value + " jjjjjjjjjjjjjjjjjjjjjjjj")

    this.pedidoService.GetItensEstoque(Id_Alm.value,palavraChave.value, String(this.nNumeroIped)).subscribe((es : ItensEstoque[]) => {
      if (es[0].Id_Alp == null)
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
      }
    });

    return false;

  }

  emitIncreaseQty(item: ItensEstoque){
    if (item.Qtd > item.QtdPedido)
      item.QtdPedido = item.QtdPedido + 1;
    this.increaseQty.emit(item)
    this.blnHabilitaInserirItensEstqoue = this.itensEstoque.filter(c => c.QtdPedido > 0).length > 0
    console.log(item)
  }

  emitDecreaseQty(item: ItensEstoque){
    if (item.QtdPedido > 0)
      item.QtdPedido = item.QtdPedido - 1;
    this.decreaseQty.emit(item)
    this.blnHabilitaInserirItensEstqoue = this.itensEstoque.filter(c => c.QtdPedido > 0).length > 0
    console.log(item)
  }

  SalvarItensEstoque(itens : ItensEstoque[] ){

    this.pedidoService.IncluirItemEstoquePedido(itens.filter(c => c.QtdPedido > 0)).subscribe(
      success => {
        this.pedidoService.GetItensPedido(this.nNumeroIped).subscribe((ie : ItensPedido[]) => {
          this.itensPedido = ie;
        });
        this.router.navigate(['pedido/' + this.nNumeroIped]);
        },
      error =>  {
            this.alertService.showAlertDanger("Erro ao inserir item de pedido") ;
            }
    );
  }

  ExcluirItemPedido(ip : ItensPedido){
    var strMessage : string;
    strMessage = "Gostaria realmente exlcluir do pedido o item *** " + ip.Produto.substring(0,60) + " *** do pedido " + this.nNumeroIped  + " ?";
    var result$ = this.alertService.showConfirm("Confirmação Exclusão",strMessage,"Fechar","+ Cliente")
    result$.asObservable()
      .pipe(
        take(1),
        switchMap(result => result ? this.pedidoService.ExcluirItemPedido(ip) : EMPTY)
      ).subscribe(
        success => {
                    this.alertService.showAlertSuccess("Item do pedido excluído com sucesso");
                    console.log(success);
                    this.router.navigate(['pedidos'])
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
    var retPedido : RetornoPedido;

    console.log(pedido);

    if (this.pedido.Id_Ped == null){
      pedido.Id_Cli = this.idcli;
      pedido.IdEnderecoEntrega = this.idEndereco;
      pedido.Tipo = this.idEnderecoTipo;
      pedido.Nome_Cli = this.cliente;
    }

    console.log(pedido);

    let msgSuccess = "Pedido inserido com sucesso";
    let msgErro = "Erro ao incluir Pedido. Tente novamente";
    let msgQuestãoTitulo = "Confirmação de Inclusão"
    let msgQuestaoCorpo = "Você realmente deseja inserir este Pedido?"
    let msgBotao = "Inserir"
    if (this.pedido.Id_Ped != null){
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
                    console.log(success["Id_Ped"]);
                    console.log("jjjjjjjjjjjjj");
                    if (msgSuccess["OK"] == "0")
                      this.alertService.showAlertDanger(msgErro) ;
                    else
                      this.router.navigate(['pedidos'])
                    },
        error =>  {
                  console.log(error);
                  this.alertService.showAlertDanger(msgErro) ;
                  }
      )

  }


}
