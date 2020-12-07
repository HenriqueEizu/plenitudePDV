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

export class Midia {
  public IdMidia	: number;
  get _IdMidia(): number {return this.IdMidia;}
  set _IdMidia(p : number) {this.IdMidia = p; }

  public Descricao	: string;
  get _Descricao(): string {return this.Descricao;}
  set _Descricao(p : string) {this.Descricao = p; }
}

export interface Pedido {

  IdPedido	: number;
  Id_Ped	: number;
  Id_Cli	: number;
  cliente	: Cliente;
  Id_Loja	: number;
  loja	: Loja;
  IdMidia	: number;
  midia	: Midia;
  FlMesmoEndEntrega	: boolean;
  IdEnderecoEntrega	: number;
  endereco	: Endereco;
  IdFoneEntrega	: number;
  telefone	: Telefone;
  Situacao	: number;
  DescrSituacao	: string;
  Tipo	: string;
  DescrTipo	: string;
  DtPed	: Date;
  Entrega	: Date;
  DtReceb	: Date;
  Per_Ent	: string;
  TotProd	: number;
  Desconto	: number;
  Desc_Por	: number;
  TotPed	: number;
  VlFrete	: number;
  Val_Afin	: number;
  Entregue	: boolean;
  Cup_Fisc	: string;
  Tem_Frt	: boolean;
  Encerrou	: boolean;
  Enviado	: boolean;
  Nome_Cli	: string;
  Versao	: number;
  Codpdv	: string;
  Impresso	: boolean;
  Env_Mail	: boolean;
  Id_PdOri	: number;
  Bloq_Est	: boolean;
  Prazo_Mp	: number;
  Desc_Max	: number;
  Nf_Pauli	: boolean;
  TemCupom	: boolean;
  NumCupom	: string;
  EnvCupom	: boolean;
  ObsMidia	: string;
  Observ	: string;
  Obs_Fin	: string;
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

