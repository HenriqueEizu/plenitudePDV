import { Usuario } from './../usuario/usuario.model';

import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalService, ModalDirective } from 'ngx-bootstrap/modal';
import { BehaviorSubject, EMPTY, Observable } from 'rxjs';
import { delay, map, switchMap, take, tap, filter } from 'rxjs/operators';
import { AlertModalService } from '../shared/alertmodal/alertmodal.service';

import { UsuarioService } from '../usuario/usuario.service';
import { ClientesService } from './../clientes/clientes.service';
import { Cliente, Endereco, Estado, Telefone } from './../clientes/clientes.model';
import { Midia, Pedido,Periodo,Vendedor, ItensPedido, Estoque, ItensEstoque,RetornoPedido, FormaPagamento, ItemPagamento } from './pedidos.model';
import { PedidosService } from './pedidos.service';
import { formatDate } from '@angular/common';

import { AnyAaaaRecord } from 'dns';
import { StringLiteralType } from 'typescript';

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

  @ViewChild('AlterarFormaPagtoModal') public AlterarFormaPagtoModal:ModalDirective;

  private blnDataEntrega = new BehaviorSubject<any>(false);

  get isDataEntrega() {
    return this.blnDataEntrega.asObservable(); // {2}
  }

  // get _IdVendedor(): Observable<boolean> {return this.blnDataEntrega.asObservable();}
  // set _IdVendedor(p : number) {this.IdVendedor = p; }
  // get isDataEntrega() {
  //   return this.blnDataEntrega.asObservable(); // {2}
  // }

  public mask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]

  estados : Estado[];
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
  dataMinima : Date;
  labelCliente : string;
  labelCpfCliente : string = "CPF/CNPJ"
  dataEntregaDigitada : Date;
  itensPedido : ItensPedido[];
  itensPedidoAlteracao : ItensPedido = null;
  lstFormaPagto : FormaPagamento[];
  lstItensPagto : ItemPagamento[];
  formaPagto : FormaPagamento = null;
  itemPagto : ItemPagamento = null;
  estoques : Estoque[];
  formaPagtoDominio : FormaPagamento[];
  blnCriterio : Boolean = false;
  itensEstoque : ItensEstoque[];
  qtdItensPesquisa : number = 0;
  blnHabilitaInserirItensEstqoue : boolean = false;
  blnDesabilitaCampos : string = null;
  strDesabilitaCliente : string = null;
  blnDesabilitaBotoes : boolean = false;
  nNumeroIped : number ;
  totalPedido : number ;
  totalPago : number ;
  usuarioLogado : Usuario;
  blnGravaFormaPagto : Boolean = true;
  blnOutraFormas : Boolean = true;
  blnCheques : Boolean = true;
  blnAutorizacao : Boolean = true;
  strOperacaoFormaPagto : string = null;
  currFormapagto;



  @Output() increaseQty = new EventEmitter<ItensEstoque>()
  @Output() decreaseQty = new EventEmitter<ItensEstoque>()
  @Input() IdMidia : number;
  @ViewChild('val_Fin2') val_Fin2Input: ElementRef;
  @ViewChild('id_Forma') id_FormaInput: ElementRef;
  @ViewChild('cheque') chequeInput: ElementRef;
  @ViewChild('banco') bancoInput: ElementRef;
  @ViewChild('agencia') agenciaInput: ElementRef;
  @ViewChild('praca') pracaInput: ElementRef;
  @ViewChild('autorizacao') autorizacaoInput: ElementRef;
  @ViewChild('NumParcelas') NumParcelasInput: ElementRef;
  @ViewChild('ValorParcela') ValorParcelaInput: ElementRef;

  @ViewChild('CEP') CEPInput: ElementRef;
  @ViewChild('Uf') UfInput: ElementRef;
  @ViewChild('Cidade') CidadeInput: ElementRef;
  @ViewChild('Logradouro') LogradouroInput: ElementRef;
  @ViewChild('NumeroCasa') NumeroCasaInput: ElementRef;
  @ViewChild('Complemento') ComplementoInput: ElementRef;
  @ViewChild('Bairro') BairroInput: ElementRef;
  @ViewChild('PtoReferencia') PtoReferenciaInput: ElementRef;









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
    // this.dataMin = this.ConvertDataJson(d);
    // console.log(this.dataMin)
    // d.setDate(d.getDate() + 31);
    // this.dataMinima = d;
    // // this.dataMinima.setDate(this.dataMin) + 31;
    // d.setDate(d.getDate() + parseInt("31"));
    // console.log("dadadadadaddadad")
    // console.log(d);


    this.PopulaPeriodo();

    this.loginService.usuarioCacheFunc.subscribe((u : Usuario) =>{
      this.usuarioLogado = u
    });

    this.clienteService.GetAllEstados().subscribe((es : Estado[]) => {
      console.log(es);
      this.estados = es;
      });



    this.pedidoService.GetAllVendedores().subscribe((vd : Vendedor[]) => {
      this.vendedores = vd;
      });

    this.pedidoService.GetAllEstoques().subscribe((vd : Estoque[]) => {
      this.estoques = vd;
      });

    this.pedidoService.GetAllFormaPagamentoDominio().subscribe((fp : FormaPagamento[]) => {
      this.formaPagtoDominio = fp;
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
      this.pedido.entrega = this.ConvertDataJson(this.pedido.entrega,0);
      this.data = formatDate(this.pedido.dtPed,"dd/MM/yyyy","en-US");
      this.dataMinima = this.ConvertDataJson(this.pedido.entrega,31);
      console.log("ffffffffffffffffffffffffffffffffffffffffffff");
      console.log(this.pedido)

    }



    this.pedidoService.GetItensPedido(this.nNumeroIped == null ? 0 : this.nNumeroIped).subscribe((ie : ItensPedido[]) => {
      this.itensPedido = ie;
      this.totalPedido = ie.reduce((sum, current) => sum + current.valtot, 0);
      this.itensPedidoAlteracao = ie[0]
    });

    this.pedidoService.GetFormaPagamento(this.nNumeroIped == null ? 0 : this.nNumeroIped).subscribe((ie : FormaPagamento[]) => {
      this.lstFormaPagto = ie;
      console.log(ie);
      this.formaPagto = ie[0];
      this.totalPago = ie.reduce((sum, current) => sum + current.val_Fin, 0);
      this.pedidoService.GetItensPagamento(ie[0].id_Frp == null ? 0 : ie[0].id_Frp).subscribe((ip : ItemPagamento[]) => {
          this.lstItensPagto = ip;
          this.itemPagto = ip[0];
        });

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
      entregaMinima: this.formBuilder.control(this.pedido.entrega == null ? this.dataMin : this.dataMinima),
      CEP: this.formBuilder.control(this.pedido.endereco.cep),
      Uf: this.formBuilder.control(this.pedido.endereco.uf),
      Cidade: this.formBuilder.control(this.pedido.endereco.localidade),
      NumeroCasa: this.formBuilder.control(this.pedido.endereco.numero),
      Complemento: this.formBuilder.control(this.pedido.endereco.complemento),
      Logradouro: this.formBuilder.control(this.pedido.endereco.logradouro),
      Bairro: this.formBuilder.control(this.pedido.endereco.bairro),
      PtoReferencia: this.formBuilder.control(this.pedido.endereco.pontoReferencia),
      // Entrega : this.formBuilder.control(this.pedido.Entrega == null ? this.dataMin : this.pedido.Entrega,[Validators.required,this.ValidaDataEntrega3(this.pedido)]),
    },{validator:PedidosComponent.ValidaMidia});


  }


  ConvertDataJson(data : Date, addDay : number) : any{

    var result : string;
    var strAno : string;
    var strMes : string;
    var strDia : string;





    if (addDay > 0){
      var intAno = data["year"]
      var intMes = data["month"]
      var intDia = data["day"]
      var d = new Date(intAno,intMes,intDia);
      d.setDate(d.getDate() + 31)
      result = formatDate(d,"dd/MM/yyyy","en-US");
      strAno = String(result).substr(6,4);
      strMes = String(result).substr(3,2);
      strDia = String(result).substr(0,2);
    }
    else{
      console.log(data);
      result = formatDate(data,"dd/MM/yyyy","en-US");
      console.log(result);
      strAno = String(result).substr(6,4);
      strMes = String(result).substr(3,2);
      strDia = String(result).substr(0,2);
    }

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
        this.totalPedido = ie.reduce((sum, current) => sum + current.valtot, 0);
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

  IncluirFormaPagamentoModal(){
    var strvalor : string;
    var valorAmortizar : number;

    valorAmortizar = this.totalPedido - this.totalPago;

    this.strOperacaoFormaPagto = "Incluir";
    this.ResetFormaPagamento();

    if (String(valorAmortizar).indexOf(".") > -1)
      strvalor = "R$ " + String(valorAmortizar).replace(".",",");
    else
      strvalor = "R$ " + String(valorAmortizar) + ",00";

    this.NumParcelasInput.nativeElement.value = "1";
    this.ValorParcelaInput.nativeElement.value = strvalor;
    this.AlterarFormaPagtoModal.show();
  }

  SalvarFormaPagamento(formaPagto : FormaPagamento){
    formaPagto.usrIns = this.usuarioLogado.usuario;
    console.log(this.usuarioLogado);
    formaPagto.id_Usr = this.usuarioLogado.id_Usr;

    let tipoPagto = this.formaPagtoDominio.filter(c=> c.id_Forma == this.id_FormaInput.nativeElement.value);
    var itempagto = new ItemPagamento();
    formaPagto.id_Forma = tipoPagto[0].id_Forma;
    formaPagto.tp_Pagto = tipoPagto[0].tp_Pagto;
    formaPagto.aut_Cart = this.autorizacaoInput.nativeElement.value;
    formaPagto.tot_Parc = this.NumParcelasInput.nativeElement.value;
    formaPagto.val_Fin = Number(String(this.val_Fin2Input.nativeElement.value).replace('R$','').replace(',','.'));
    itempagto.agencia = this.agenciaInput.nativeElement.value;
    itempagto.banco = this.bancoInput.nativeElement.value;
    itempagto.praca = this.pracaInput.nativeElement.value;
    itempagto.num_Cheq = this.chequeInput.nativeElement.value;
    itempagto.num_Parc = Number(this.NumParcelasInput.nativeElement.value);
    itempagto.valor = Number(String(this.ValorParcelaInput.nativeElement.value).replace('R$','').replace(',','.'));
    this.pedidoService.IncluirFormaPagamento(formaPagto,itempagto).subscribe(
      success => {
        this.pedidoService.GetItensPedido(this.nNumeroIped).subscribe((ie : ItensPedido[]) => {
        this.totalPedido = ie.reduce((sum, current) => sum + current.valtot, 0);
          this.itensPedido = ie;
        });
        this.pedidoService.GetFormaPagamento(this.nNumeroIped).subscribe((fp : FormaPagamento[]) => {
          this.totalPago = fp.reduce((sum, current) => sum + current.val_Fin, 0);
            this.lstFormaPagto = fp;
          });

        this.router.navigate(['pedido/' + this.nNumeroIped]);
        this.alertService.showAlertSuccess("Item inserido com sucesso");
        },
      error =>  {
            this.alertService.showAlertDanger("Erro ao inserir item de pedido") ;
            }
    );

    this.AlterarFormaPagtoModal.hide();
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


  ExcluirFormaPagamento(fp : FormaPagamento){
    console.log(fp);
    var strMessage : string;
    strMessage = "Gostaria realmente você deseja exlcluir a forma de pagamento *** " + fp.formaPag + " *** do pedido " + this.nNumeroIped  + " ?";
    var result$ = this.alertService.showConfirm("Confirmação Exclusão",strMessage,"Fechar","Excluir")
    result$.asObservable()
      .pipe(
        take(1),
        switchMap(result => result ? this.pedidoService.ExcluirFormaPagamento(fp) : EMPTY)
      ).subscribe(
        success => {
                    this.pedidoService.GetFormaPagamento(this.nNumeroIped).subscribe((fp : FormaPagamento[]) => {
                      this.lstFormaPagto = fp;
                      this.totalPago = fp.reduce((sum, current) => sum + current.val_Fin, 0);
                      this.pedidoService.GetItensPagamento(fp[0].id_Frp).subscribe((ip : ItemPagamento[]) => {
                        this.lstItensPagto = ip;
                      });
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

  AlterarFormaPagamentoModal(formaPagto : FormaPagamento){
    this.formaPagto = formaPagto;
    this.pedidoService.GetItensPagamento(formaPagto.id_Frp).subscribe((ip : ItemPagamento[]) => {
      let itensPagto = ip;
      var strvalor : string;
      var numValor : number;
      var strValorFin : string;

      numValor = this.totalPedido - this.totalPago;
      if (String(numValor).indexOf(".") > -1)
        strvalor = "R$ " + String(numValor).replace(".",",");
      else
        strvalor = "R$ " + String(numValor) + ",00";

      if (String(itensPagto[0].valor).indexOf(".") > -1)
        strValorFin = "R$ " + String(formaPagto.val_Fin).replace(".",",");
      else
        strValorFin = "R$ " + String(formaPagto.val_Fin) + ",00";

      this.val_Fin2Input.nativeElement.value = strvalor;
      this.id_FormaInput.nativeElement.value = formaPagto.id_Forma;
      this.autorizacaoInput.nativeElement.value = formaPagto.aut_Cart;
      this.NumParcelasInput.nativeElement.value = itensPagto[0].num_Parc;
      this.chequeInput.nativeElement.value = itensPagto[0].num_Cheq;
      this.bancoInput.nativeElement.value = itensPagto[0].banco;
      this.agenciaInput.nativeElement.value = itensPagto[0].agencia;
      this.pracaInput.nativeElement.value = itensPagto[0].praca;
      this.NumParcelasInput.nativeElement.value = formaPagto.tot_Parc;
      this.ValorParcelaInput.nativeElement.value = strValorFin;

    });
    this.strOperacaoFormaPagto = "Alterar";
    this.AlterarFormaPagtoModal.show();
  }

  AlterarFormapagamentoFechar(){
    this.AlterarFormaPagtoModal.hide();
  }

  SelecionarFormaPagamento(fp : FormaPagamento){
    if (fp.id_Frp != null){
      this.currFormapagto = fp.formaPag;
      this.pedidoService.GetItensPagamento(fp.id_Frp == null ? 0 : fp.id_Frp).subscribe((ip : ItemPagamento[]) => {
        this.lstItensPagto = ip;
      });
    }

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

  SetarValidacaoGravacao(){

    var strvalor : string;
    var valorAmortizar : number;
    var numParcMinimo : number;
    var numParcMaximo : number;
    var numeroParc  : number;

    this.blnGravaFormaPagto  = true;
    this.blnOutraFormas  = true;
    this.blnCheques  = true;
    this.blnAutorizacao  = true;

    console.log("entrou no A ***************")
    if (this.id_FormaInput == undefined)
      return true;

    console.log("entrou no AAAAA ***************")

    let tipoPagto = this.formaPagtoDominio.filter(c=> c.id_Forma == this.id_FormaInput.nativeElement.value);

    let valorFinan = Number(String(this.val_Fin2Input.nativeElement.value).replace("R$","").replace(",","."))

    console.log(tipoPagto[0].tp_Pagto + " - tipo pagamento");

    if (valorFinan > (this.totalPedido - this.totalPago)){
      this.blnGravaFormaPagto = true;
      return;
    }
    if (valorFinan == 0){
      this.blnGravaFormaPagto = true;
      return;
    }

    this.blnGravaFormaPagto  = false;

    switch (tipoPagto[0].tp_Pagto){

      case "Q": //cheque
        console.log("passou pelo cheque")
        this.blnCheques = false;
        if (this.chequeInput.nativeElement.value == ""){
          this.blnGravaFormaPagto = true;
          return;
        }
        else if (this.agenciaInput.nativeElement.value == ""){
          this.blnGravaFormaPagto = true;
          return;
        }
        else if (this.bancoInput.nativeElement.value == ""){
          this.blnGravaFormaPagto = true;
          return;
        }
        else if (this.pracaInput.nativeElement.value == ""){
          this.blnGravaFormaPagto = true;
          return;
        }
        break;
      case "D": //debito
        // validar campo autorização
        console.log("passou pelo debito")
        this.blnAutorizacao = false;
        if (this.autorizacaoInput.nativeElement.value == ""){
          this.blnGravaFormaPagto = true;
          return;
        }
        break;

      case "C": //debito
      // validar campo autorização

        if (numeroParc == 0){
          this.blnGravaFormaPagto = true;
          return;
        }
        console.log("passou pelo credito")
        this.blnAutorizacao = false;
        var forPgto = this.formaPagtoDominio.filter(c=> c.id_Forma == this.id_FormaInput.nativeElement.value);
        numParcMinimo = forPgto[0].numMinParcelas;
        numParcMaximo = forPgto[0].numMaxParcelas;
        numeroParc = Number(this.NumParcelasInput.nativeElement.value);

        console.log(numParcMinimo +  " parc min")
        console.log(numParcMaximo +  " parc max")
        console.log(numeroParc +  " nº parc ")

        if ((numeroParc => numParcMinimo > 1) && (numeroParc <= numParcMaximo) ) {
          console.log("passou pelo credito cccccccccccccccccc")
          this.blnOutraFormas = false;
          valorAmortizar = (this.totalPedido - this.totalPago) / numeroParc;
          if (String(valorAmortizar.toFixed(2)).indexOf(".") > -1)
            strvalor = "R$ " + String(valorAmortizar.toFixed(2)).replace(".",",");
          else
            strvalor = "R$ " + String(valorAmortizar.toFixed(2)) + ",00";

          this.ValorParcelaInput.nativeElement.value = strvalor;

        }

        if (numParcMaximo == 1 )
          this.blnOutraFormas = true;

        if (numeroParc > numParcMaximo){
          this.blnGravaFormaPagto = true;
          this.blnOutraFormas = false
        }


        if (this.autorizacaoInput.nativeElement.value == ""){
          this.blnGravaFormaPagto = true;
          return;
        }

        if (numParcMaximo > 1 && numeroParc == 1)
          this.blnGravaFormaPagto = true;
          return;

        break;
    }

    this.blnGravaFormaPagto = false;
  }

  ResetFormaPagamento(){
    var strvalor : string;
    var valorAmortizar : number;

    valorAmortizar = this.totalPedido - this.totalPago;
    if (String(valorAmortizar).indexOf(".") > -1)
      strvalor = "R$ " + String(valorAmortizar).replace(".",",");
    else
      strvalor = "R$ " + String(valorAmortizar) + ",00";

    this.val_Fin2Input.nativeElement.value = strvalor;
    this.id_FormaInput.nativeElement.value ="";
    this.chequeInput.nativeElement.value ="";
    this.bancoInput.nativeElement.value ="";
    this.agenciaInput.nativeElement.value ="";
    this.pracaInput.nativeElement.value ="";
    this.autorizacaoInput.nativeElement.value ="";
    this.NumParcelasInput.nativeElement.value ="";
  }

  ConsultaCEP(cep :string){
    if (cep.length > 7 ){
      this.clienteService.ConsultaCEP(cep).subscribe(( p : Endereco) => {
        // this.clienteForm.patchValue({ logradouro: p.logradouro});
        // this.clienteForm.patchValue({ uf: p.uf});
        // this.clienteForm.patchValue({ localidade: p.localidade});
        // this.clienteForm.patchValue({ bairro: p.bairro});
      });
    }
    return true;
  }

  OpenCity(evt,cityName) {

    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
  }



}
