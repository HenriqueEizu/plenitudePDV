import { Usuario } from './../usuario/usuario.model';
export class Pessoa {

  public idPessoa	: number;
  get _IdPessoa(): number {return this.idPessoa;}
  set _IdPessoa(p : number) {this.idPessoa = p; }

  public lstTelefone: string;
  get _lstTelefone(): string {return this.lstTelefone;}
  set _lstTelefone(p : string) {this.lstTelefone = p; }

  public idPessoaEndereco : number[];
  get _IdPessoaEndereco(): number[] {return this.idPessoaEndereco;}
  set _IdPessoaEndereco(p : number[]) {this.idPessoaEndereco = p; }

  public idEndereco : number[];
  get _IdEndereco(): number[] {return this.idEndereco;}
  set _IdEndereco(p : number[]) {this.idEndereco = p; }

  public obJ_ENDERECO : Endereco;
  get _OBJ_ENDERECO(): Endereco {return this.obJ_ENDERECO;}
  set _OBJ_ENDERECO(p : Endereco) {this.obJ_ENDERECO = p; }

  public OBJ_PESSOAENDERECO : PessoaEndereco;
  get _OBJ_PESSOAENDERECO(): PessoaEndereco {return this.OBJ_PESSOAENDERECO;}
  set _OBJ_PESSOAENDERECO(p : PessoaEndereco) {this.OBJ_PESSOAENDERECO = p; }

  public indFisJur	: string;
  get _IndFisJur(): string {return this.indFisJur;}
  set _IndFisJur(p : string) {this.indFisJur = p; }

  public nome	: string;
  get _Nome(): string {return this.nome;}
  set _Nome(p : string) {this.nome = p; }

  public apelido	: string;
  get _Apelido(): string {return this.apelido;}
  set _Apelido(p : string) {this.apelido = p; }

  public cnpjCpf	: string;
  get _CnpjCpf(): string {return this.cnpjCpf;}
  set _CnpjCpf(p : string) {this.cnpjCpf = p; }

  public iEstRG	: string;
  get _IEstRG(): string {return this.iEstRG;}
  set _IEstRG(p : string) {this.iEstRG = p; }

  public orgEmisRg	: string;
  get _OrgEmisRg(): string {return this.orgEmisRg;}
  set _OrgEmisRg(p : string) {this.orgEmisRg = p; }

  public dtEmisRg	: Date;
  get _DtEmisRg(): Date {return this.dtEmisRg;}
  set _DtEmisRg(p : Date) {this.dtEmisRg = p; }

  public dtNascimento	: string;
  get _DtNascimento(): string {return this.dtNascimento;}
  set _DtNascimento(p : string) {this.dtNascimento = p; }

  public estCivil	: string;
  get _EstCivil(): string {return this.estCivil;}
  set _EstCivil(p : string) {this.estCivil = p; }

  public eMail	: string;
  get _EMail(): string {return this.eMail;}
  set _EMail(p : string) {this.eMail = p; }

  public homePage	: string;
  get _HomePage(): string {return this.homePage;}
  set _HomePage(p : string) {this.homePage = p; }

  public natural	: string;
  get _Natural(): string {return this.natural;}
  set _Natural(p : string) {this.natural = p; }

  public usrIns	: string;
  get _UsrIns(): string {return this.usrIns;}
  set _UsrIns(p : string) {this.usrIns = p; }

  public dhIns	: Date;
  get _DhIns(): Date {return this.dhIns;}
  set _DhIns(p : Date) {this.dhIns = p; }

  public usrUpd	: string;
  get _UsrUpd(): string {return this.usrUpd;}
  set _UsrUpd(p : string) {this.usrUpd = p; }

  public dhUpd	: Date;
  get _DhUpd(): Date {return this.dhUpd;}
  set _DhUpd(p : Date) {this.dhUpd = p; }
}


export interface PessoaTelefone{
  IdPessoa	: number,
  IdTelefone	: number,
  IndUsoFone	: string,
  Sequencia	: number,
}

export class Telefone{

  public idTelefone	: number;
  get _IdTelefone(): number {return this.idTelefone;}
  set _IdTelefone(p : number) {this.idTelefone = p; }

  public codDdi	: string;
  get _CodDdi(): string {return this.codDdi;}
  set _CodDdi(p : string) {this.codDdi = p; }

  public codDdd	: string;
  get _CodDdd(): string {return this.codDdd;}
  set _CodDdd(p : string) {this.codDdd = p; }

  public numero	: string;
  get _Numero(): string {return this.numero;}
  set _Numero(p : string) {this.numero = p; }

  public ramal	: string;
  get _Ramal(): string {return this.ramal;}
  set _Ramal(p : string) {this.ramal = p; }

  public indTipoFone	: string;
  get _IndTipoFone(): string {return this.indTipoFone;}
  set _IndTipoFone(p : string) {this.indTipoFone = p; }

}

export interface TipoTelefone{
  IndTipoFone : string,
  DescTipoTelefone : string
}

export interface PessoaEndereco{
  IdPessoaEndereco : number,
  IdPessoa : number,
  IdEndereco : number,
  IndTipoEndereco : string
}

export class Endereco{

  public idEndereco	: number;
  get _IdEndereco(): number {return this.idEndereco;}
  set _IdEndereco(p : number) {this.idEndereco = p; }

  public logradouro	: string;
  get _Logradouro(): string {return this.logradouro;}
  set _Logradouro(p : string) {this.logradouro = p; }

  public numero	: string;
  get _Numero(): string {return this.numero;}
  set _Numero(p : string) {this.numero = p; }

  public complemento	: string;
  get _Complemento(): string {return this.complemento;}
  set _Complemento(p : string) {this.complemento = p; }

  public bairro	: string;
  get _Bairro(): string {return this.bairro;}
  set _Bairro(p : string) {this.bairro = p; }

  public localidade	: string;
  get _Localidade(): string {return this.localidade;}
  set _Localidade(p : string) {this.localidade = p; }

  public codMuni	: string;
  get _CodMuni(): string {return this.codMuni;}
  set _CodMuni(p : string) {this.codMuni = p; }

  public codPais	: string;
  get _CodPais(): string {return this.codPais;}
  set _CodPais(p : string) {this.codPais = p; }

  public uf	: string;
  get _UF(): string {return this.uf;}
  set _UF(p : string) {this.uf = p; }

  public cep	: string;
  get _CEP(): string {return this.cep;}
  set _CEP(p : string) {this.cep = p; }

  public pontoReferencia	: string;
  get _PontoReferencia(): string {return this.pontoReferencia;}
  set _PontoReferencia(p : string) {this.pontoReferencia = p; }

}

export interface Estado {
  uf : string,
  estado : string
}

export interface Cliente {

   idCliente	: number;
   id_Cli	: number;
   id_Cli_Lj	: number;
   idPessoa	: number;
   obJ_PESSOA	: Pessoa;
   contato	: string;
   profEmpresa	: string;
   profCargo	: string;
   profProfissao	: string;
   profSalario	: number;
   profDtAdmissao	: Date;
   banCodBanco	: string;
   banNomeBanco	: string;
   banDtInicioBanco	: Date;
   banAgencia	: string;
   banNumConta	: string;
   banChequeEspecial	: boolean;
   idUsuario	: number;
  // public usuario	: Usuario;
  // get _usuario(): Usuario {return this.usuario;}
  // set _usuario(p : Usuario) {this.usuario = p; }

}



// export class Cliente {

//   public IdCliente	: number;
//   get _IdCliente(): number {return this.IdCliente;}
//   set _IdCliente(p : number) {this.IdCliente = p; }

//   public Id_Cli	: number;
//   get _Id_Cli(): number {return this.Id_Cli;}
//   set _Id_Cli(p : number) {this.Id_Cli = p; }

//   public Id_Cli_Lj	: number;
//   get _Id_Cli_Lj(): number {return this.Id_Cli_Lj;}
//   set _Id_Cli_Lj(p : number) {this.Id_Cli_Lj = p; }

//   public IdPessoa	: number;
//   get _IdPessoa(): number {return this.IdPessoa;}
//   set _IdPessoa(p : number) {this.IdPessoa = p; }

//   public OBJ_PESSOA	: Pessoa;
//   get _OBJ_PESSOA(): Pessoa {return this.OBJ_PESSOA;}
//   set _OBJ_PESSOA(p : Pessoa) {this.OBJ_PESSOA = p; }

//   public Contato	: string;
//   get _Contato(): string {return this.Contato;}
//   set _Contato(p : string) {this.Contato = p; }

//   public ProfEmpresa	: string;
//   get _ProfEmpresa(): string {return this.ProfEmpresa;}
//   set _ProfEmpresa(p : string) {this.ProfEmpresa = p; }

//   public ProfCargo	: string;
//   get _ProfCargo(): string {return this.ProfCargo;}
//   set _ProfCargo(p : string) {this.ProfCargo = p; }

//   public ProfProfissao	: string;
//   get _ProfProfissao(): string {return this.ProfProfissao;}
//   set _ProfProfissao(p : string) {this.ProfProfissao = p; }

//   public ProfSalario	: number;
//   get _ProfSalario(): number {return this.ProfSalario;}
//   set _ProfSalario(p : number) {this.ProfSalario = p; }

//   public ProfDtAdmissao	: Date;
//   get _ProfDtAdmissao(): Date {return this.ProfDtAdmissao;}
//   set _ProfDtAdmissao(p : Date) {this.ProfDtAdmissao = p; }

//   public BanCodBanco	: string;
//   get _BanCodBanco(): string {return this.BanCodBanco;}
//   set _BanCodBanco(p : string) {this.BanCodBanco = p; }

//   public BanNomeBanco	: string;
//   get _BanNomeBanco(): string {return this.BanNomeBanco;}
//   set _BanNomeBanco(p : string) {this.BanNomeBanco = p; }

//   public BanDtInicioBanco	: Date;
//   get _BanDtInicioBanco(): Date {return this.BanDtInicioBanco;}
//   set _BanDtInicioBanco(p : Date) {this.BanDtInicioBanco = p; }

//   public BanAgencia	: string;
//   get _BanAgencia(): string {return this.BanAgencia;}
//   set _BanAgencia(p : string) {this.BanAgencia = p; }

//   public BanNumConta	: string;
//   get _BanNumConta(): string {return this.BanNumConta;}
//   set _BanNumConta(p : string) {this.BanNumConta = p; }

//   public BanChequeEspecial	: string;
//   get _BanChequeEspecial(): string {return this.BanChequeEspecial;}
//   set _BanChequeEspecial(p : string) {this.BanChequeEspecial = p; }

//   public IdUsuario	: number;
//   get _IdUsuario(): number {return this.IdUsuario;}
//   set _IdUsuario(p : number) {this.IdUsuario = p; }

//   // public usuario	: Usuario;
//   // get _usuario(): Usuario {return this.usuario;}
//   // set _usuario(p : Usuario) {this.usuario = p; }

// }

export class Filtro{
  private _campo: string;
  private _desc_campo: string;

    get campo(): string {
        return this._campo;
    }

    set campo(p : string) {
        this._campo = p;
    }

    get desc_campo(): string {
      return this._desc_campo;
    }

    set desc_campo(p : string) {
        this._desc_campo = p;
    }
}
