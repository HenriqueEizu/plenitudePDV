import { Endereco, Telefone } from './../clientes/clientes.model';
import { Cliente } from '../clientes/clientes.model';

export class Loja {
  public Id_Loja	: number;
  get _Id_Loja(): number {return this.Id_Loja;}
  set _Id_Loja(p : number) {this.Id_Loja = p; }

  public Fantasia	: string;
  get _Fantasia(): string {return this.Fantasia;}
  set _Fantasia(p : string) {this.Fantasia = p; }
}

export class Periodo {
  public idPeriodo	: string;
  get _IdPeriodo(): string {return this.idPeriodo;}
  set _IdPeriodo(p : string) {this.idPeriodo = p; }

  public descricao	: string;
  get _Descricao(): string {return this.descricao;}
  set _Descricao(p : string) {this.descricao = p; }
}

export class Midia {
  public idMidia	: number;
  get _IdMidia(): number {return this.idMidia;}
  set _IdMidia(p : number) {this.idMidia = p; }

  public descMidia	: string;
  get _DescMidia(): string {return this.descMidia;}
  set _DescMidia(p : string) {this.descMidia = p; }
}

export class Vendedor{

  public idVendedor	: number;
  get _IdVendedor(): number {return this.idVendedor;}
  set _IdVendedor(p : number) {this.idVendedor = p; }

  public nome	: string;
  get _Nome(): string {return this.nome;}
  set _Nome(p : string) {this.nome = p; }

  public fantasia	: string;
  get _Fantasia(): string {return this.fantasia;}
  set _Fantasia(p : string) {this.fantasia = p; }

  public senhaLoja	: string;
  get _SenhaLoja(): string {return this.senhaLoja;}
  set _SenhaLoja(p : string) {this.senhaLoja = p; }

}

export interface Estoque{
  id_Alm	: number,
  id_Loja	: number,
  descr	: string,
  padrao	: boolean,
  web_Ve	: boolean,
  ver_Est	: boolean,
  bloq_Est	: boolean,
  empenha	: boolean,
  geraOp	: boolean,
  limiProd	: boolean,
  prazoMinimo	: number
}

export interface ItensEstoque{
  id_Alp	: number,
  produto	: string,
  quantidade	: string,
  preco	: number,
  livre : boolean,
  qtd: number,
  qtdPedido : number,
  id_Ped	: number,
}

export interface FormaPagamento{
  id_Frp	: number,
  id_Ped	: number,
  id_Forma	: number,
  id_Plano	: number,
  formaPag	: string,
  dtLanc	: Date,
  tp_Pagto	: string,
  tot_Parc	: number,
  numMinParcelas : number,
  numMaxParcelas : number,
  valDescFin	: number,
  val_Fin	: number,
  val_Entr	: number,
  val_ARec	: number,
  cont_Fin	: string,
  dt_ContF	: Date,
  aut_Cart	: string,
  tem_Fret	: boolean,
  dt_Venc	: Date,
  dt_Baixa	: Date,
  flCancelado	: boolean,
  dhIns	: Date,
  usrIns	: string
  id_Usr : number
}

export class ItemPagamento{

  public id_Item	: number;
  get _Id_Item(): number {return this.id_Item;}
  set _Id_Item(p : number) {this.id_Item = p; }

  public id_Frp	: number;
  get _Id_Frp(): number {return this.id_Frp;}
  set _Id_Frp(p : number) {this.id_Frp = p; }

  public num_Parc	: number;
  get _Num_Parc(): number {return this.num_Parc;}
  set _Num_Parc(p : number) {this.num_Parc = p; }

  public formaPag	: string;
  get _FormaPag(): string {return this.formaPag;}
  set _FormaPag(p : string) {this.formaPag = p; }

  public document	: string;
  get _Document(): string {return this.document;}
  set _Document(p : string) {this.document = p; }

  public tp_Parc	: string;
  get _Tp_Parc(): string {return this.tp_Parc;}
  set _Tp_Parc(p : string) {this.tp_Parc = p; }

  public valor	: number;
  get _Valor(): number {return this.valor;}
  set _Valor(p : number) {this.valor = p; }

  public plan_Fin	: string;
  get _Plan_Fin(): string {return this.plan_Fin;}
  set _Plan_Fin(p : string) {this.plan_Fin = p; }

  public val_Fin	: number;
  get _Val_Fin(): number {return this.val_Fin;}
  set _Val_Fin(p : number) {this.val_Fin = p; }

  public banco	: string;
  get _Banco(): string {return this.banco;}
  set _Banco(p : string) {this.banco = p; }

  public agencia	: string;
  get _Agencia(): string {return this.agencia;}
  set _Agencia(p : string) {this.agencia = p; }

  public praca	: string;
  get _Praca(): string {return this.praca;}
  set _Praca(p : string) {this.praca = p; }

  public num_Cheq	: string;
  get _Num_Cheq(): string {return this.num_Cheq;}
  set _Num_Cheq(p : string) {this.num_Cheq = p; }

  public val_Cheq	: number;
  get _Val_Cheq(): number {return this.val_Cheq;}
  set _Val_Cheq(p : number) {this.val_Cheq = p; }

  public dt_Venc	: Date;
  get _Dt_Venc(): Date {return this.dt_Venc;}
  set _Dt_Venc(p : Date) {this.dt_Venc = p; }

  public val_ARec	: number;
  get _Val_ARec(): number {return this.val_ARec;}
  set _Val_ARec(p : number) {this.val_ARec = p; }

  public valFrete	: number;
  get _ValFrete(): number {return this.valFrete;}
  set _Val_A_ValFreteRec(p : number) {this.valFrete = p; }

}

export interface Pedido {

  idPedido	: number;
  id_Ped	: number;
  id_Cli	: number;
  cliente	: Cliente;
  vendedor : Vendedor;
  id_Loja	: number;
  loja	: Loja;
  idMidia	: number;
  descMidia : string;
  midia	: Midia;
  flMesmoEndEntrega	: boolean;
  idEnderecoEntrega	: number;
  endereco	: Endereco;
  idFoneEntrega	: number;
  telefone	: Telefone;
  situacao	: number;
  descrSituacao	: string;
  tipo	: string;
  descrTipo	: string;
  dtPed	: Date;
  entrega	: Date;
  tReceb	: Date;
  per_Ent	: string;
  totProd	: number;
  desconto	: number;
  desc_Por	: number
  totPed	: number;
  vlFrete	: number;
  val_Afin	: number;
  entregue	: boolean;
  cup_Fisc	: string;
  tem_Frt	: boolean;
  encerrou	: boolean;
  enviado	: boolean;
  nome_Cli	: string;
  versao	: number;
  codpdv	: string;
  impresso	: boolean;
  env_Mail	: boolean;
  id_PdOri	: number;
  bloq_Est	: boolean;
  prazo_Mp	: number;
  desc_Max	: number;
  nf_Pauli	: boolean;
  temCupom	: boolean;
  numCupom	: string;
  envCupom	: boolean;
  obsMidia	: string;
  observ	: string;
  obs_Fin	: string;
}

export class ItensPedido{

  public id_IPv	: number;
  get _id_IPv(): number {return this.id_IPv;}
  set _id_IPv(p : number) {this.id_IPv = p; }

  public produto	: string;
  get _produto(): string {return this.produto;}
  set _produto(p : string) {this.produto = p; }

  public quantid	: number;
  get _quantid(): number {return this.quantid;}
  set _quantid(p : number) {this.quantid = p; }

  public valuni	: number;
  get _valuni(): number {return this.valuni;}
  set _valuni(p : number) {this.valuni = p; }

  public valtot	: number;
  get _valtot(): number {return this.valtot;}
  set _valtot(p : number) {this.valtot = p; }

  public saida	: string;
  get _saida(): string {return this.saida;}
  set _saida(p : string) {this.saida = p; }

  public tipoFrete	: string;
  get _tipoFrete(): string {return this.tipoFrete;}
  set _tipoFrete(p : string) {this.tipoFrete = p; }

}

export interface RetornoPedido{
  id_Ped : string,
  ok : string,
  mensErro : string,
}

export class RetornoCalculaPedido{

  public id_Ped	: number;
  get _Id_Ped(): number {return this.id_Ped;}
  set _Id_Ped(p : number) {this.id_Ped = p; }

  public entrega	: Date;
  get _entrega(): Date {return this.entrega;}
  set _entrega(p : Date) {this.entrega = p; }

  public saldo	: number;
  get _saldo(): number {return this.saldo;}
  set _saldo(p : number) {this.saldo = p; }

}

export class Parcela{

  public id_Key	: number;
  get _Id_Key(): number {return this.id_Key;}
  set _Id_Key(p : number) {this.id_Key = p; }

  public parcela	: number;
  get _parcela(): number {return this.parcela;}
  set _parcela(p : number) {this.parcela = p; }

}

// export class Pedido {

//   public IdPedido	: number;
//   get _IdPedido(): number {return this.IdPedido;}
//   set _IdPedido(p : number) {this.IdPedido = p; }

//   public Id_Ped	: number;
//   get _Id_Ped(): number {return this.Id_Ped;}
//   set _Id_Ped(p : number) {this.Id_Ped = p; }

//   public Id_Cli	: number;
//   get _Id_Cli(): number {return this.Id_Cli;}
//   set _Id_Cli(p : number) {this.Id_Cli = p; }

//   public cliente	: Cliente;
//   get _cliente(): Cliente {return this.cliente;}
//   set _cliente(p : Cliente) {this.cliente = p; }

//   public Id_Loja	: number;
//   get _Id_Loja(): number {return this.Id_Loja;}
//   set _Id_Loja(p : number) {this.Id_Loja = p; }

//   public loja	: Loja;
//   get _loja(): Loja {return this.loja;}
//   set _loja(p : Loja) {this.loja = p; }

//   public IdMidia	: number;
//   get _IdMidia(): number {return this.IdMidia;}
//   set _IdMidia(p : number) {this.IdMidia = p; }

//   public midia	: Midia;
//   get _midia(): Midia {return this.midia;}
//   set _midia(p : Midia) {this.midia = p; }

//   public FlMesmoEndEntrega	: boolean;
//   get _FlMesmoEndEntrega(): boolean {return this.FlMesmoEndEntrega;}
//   set _FlMesmoEndEntrega(p : boolean) {this.FlMesmoEndEntrega = p; }

//   public IdEnderecoEntrega	: number;
//   get _IdEnderecoEntrega(): number {return this.IdEnderecoEntrega;}
//   set _IdEnderecoEntrega(p : number) {this.IdEnderecoEntrega = p; }

//   public endereco	: Endereco;
//   get _endereco(): Endereco {return this.endereco;}
//   set _endereco(p : Endereco) {this.endereco = p; }

//   public IdFoneEntrega	: number;
//   get _IdFoneEntrega(): number {return this.IdFoneEntrega;}
//   set _IdFoneEntrega(p : number) {this.IdFoneEntrega = p; }

//   public telefone	: Telefone;
//   get _telefone(): Telefone {return this.telefone;}
//   set _telefone(p : Telefone) {this.telefone = p; }

//   public Situacao	: number;
//   get _Situacao(): number {return this.Situacao;}
//   set _Situacao(p : number) {this.Situacao = p; }

//   public DescrSituacao	: number;
//   get _DescrSituacao(): number {return this.DescrSituacao;}
//   set _DescrSituacao(p : number) {this.DescrSituacao = p; }

//   public Tipo	: string;
//   get _Tipo(): string {return this.Tipo;}
//   set _Tipo(p : string) {this.Tipo = p; }

//   public DescrTipo	: string;
//   get _DescrTipo(): string {return this.DescrTipo;}
//   set _DescrTipo(p : string) {this.DescrTipo = p; }

//   public DtPed	: Date;
//   get _DtPed(): Date {return this.DtPed;}
//   set _DtPed(p : Date) {this.DtPed = p; }

//   public Entrega	: Date;
//   get _Entrega(): Date {return this.Entrega;}
//   set _Entrega(p : Date) {this.Entrega = p; }

//   public DtReceb	: Date;
//   get _DtReceb(): Date {return this.DtReceb;}
//   set _DtReceb(p : Date) {this.DtReceb = p; }

//   public Per_Ent	: string;
//   get _Per_Ent(): string {return this.Per_Ent;}
//   set _Per_Ent(p : string) {this.Per_Ent = p; }

//   public TotProd	: number;
//   get _TotProd(): number {return this.TotProd;}
//   set _TotProd(p : number) {this.TotProd = p; }

//   public Desconto	: number;
//   get _Desconto(): number {return this.Desconto;}
//   set _Desconto(p : number) {this.Desconto = p; }

//   public Desc_Por	: number;
//   get _Desc_Por(): number {return this.Desc_Por;}
//   set _Desc_Por(p : number) {this.Desc_Por = p; }

//   public TotPed	: number;
//   get _TotPed(): number {return this.TotPed;}
//   set _TotPed(p : number) {this.TotPed = p; }

//   public VlFrete	: number;
//   get _VlFrete(): number {return this.VlFrete;}
//   set _VlFrete(p : number) {this.VlFrete = p; }

//   public Val_Afin	: number;
//   get _Val_Afin(): number {return this.Val_Afin;}
//   set _Val_Afin(p : number) {this.Val_Afin = p; }

//   public Entregue	: boolean;
//   get _Entregue(): boolean {return this.Entregue;}
//   set _Entregue(p : boolean) {this.Entregue = p; }

//   public Cup_Fisc	: string;
//   get _Cup_Fisc(): string {return this.Cup_Fisc;}
//   set _Cup_Fisc(p : string) {this.Cup_Fisc = p; }

//   public Tem_Frt	: boolean;
//   get _Tem_Frt(): boolean {return this.Tem_Frt;}
//   set _Tem_Frt(p : boolean) {this.Tem_Frt = p; }

//   public Encerrou	: boolean;
//   get _Encerrou(): boolean {return this.Encerrou;}
//   set _Encerrou(p : boolean) {this.Encerrou = p; }

//   public Enviado	: boolean;
//   get _Enviado(): boolean {return this.Enviado;}
//   set _Enviado(p : boolean) {this.Enviado = p; }

//   public Nome_Cli	: string;
//   get _Nome_Cli(): string {return this.Nome_Cli;}
//   set _Nome_Cli(p : string) {this.Nome_Cli = p; }

//   public Versao	: number;
//   get _Versao(): number {return this.Versao;}
//   set _Versao(p : number) {this.Versao = p; }

//   public Codpdv	: string;
//   get _Codpdv(): string {return this.Codpdv;}
//   set _Codpdv(p : string) {this.Codpdv = p; }

//   public Impresso	: boolean;
//   get _Impresso(): boolean {return this.Impresso;}
//   set _Impresso(p : boolean) {this.Impresso = p; }

//   public Env_Mail	: boolean;
//   get _Env_Mail(): boolean {return this.Env_Mail;}
//   set _Env_Mail(p : boolean) {this.Env_Mail = p; }

//   public Id_PdOri	: number;
//   get _Id_PdOri(): number {return this.Id_PdOri;}
//   set _Id_PdOri(p : number) {this.Id_PdOri = p; }

//   public Bloq_Est	: boolean;
//   get _Bloq_Est(): boolean {return this.Bloq_Est;}
//   set _Bloq_Est(p : boolean) {this.Bloq_Est = p; }

//   public Prazo_Mp	: number;
//   get _Prazo_Mp(): number {return this.Prazo_Mp;}
//   set _Prazo_Mp(p : number) {this.Prazo_Mp = p; }

//   public Desc_Max	: number;
//   get _Desc_Max(): number {return this.Desc_Max;}
//   set _Desc_Max(p : number) {this.Desc_Max = p; }

//   public Nf_Pauli	: boolean;
//   get _Nf_Pauli(): boolean {return this.Nf_Pauli;}
//   set _Nf_Pauli(p : boolean) {this.Nf_Pauli = p; }

//   public TemCupom	: boolean;
//   get _TemCupom(): boolean {return this.TemCupom;}
//   set _TemCupom(p : boolean) {this.TemCupom = p; }

//   public NumCupom	: string;
//   get _NumCupom(): string {return this.NumCupom;}
//   set _NumCupom(p : string) {this.NumCupom = p; }

//   public EnvCupom	: boolean;
//   get _EnvCupom(): boolean {return this.EnvCupom;}
//   set _EnvCupom(p : boolean) {this.EnvCupom = p; }

//   public ObsMidia	: string;
//   get _ObsMidia(): string {return this.ObsMidia;}
//   set _ObsMidia(p : string) {this.ObsMidia = p; }

//   public Observ	: string;
//   get _Observ(): string {return this.Observ;}
//   set _Observ(p : string) {this.Observ = p; }

//   public Obs_Fin	: string;
//   get _Obs_Fin(): string {return this.Obs_Fin;}
//   set _Obs_Fin(p : string) {this.Obs_Fin = p; }

// }

