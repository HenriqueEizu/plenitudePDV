export class Pessoa {

  public IdPessoa	: number;
  get _IdPessoa(): number {return this.IdPessoa;}
  set _IdPessoa(p : number) {this.IdPessoa = p; }

  public lstTelefone: Telefone[];
  get _lstTelefone(): Telefone[] {return this.lstTelefone;}
  set _lstTelefone(p : Telefone[]) {this.lstTelefone = p; }

  public IdPessoaEndereco : number[];
  get _IdPessoaEndereco(): number[] {return this.IdPessoaEndereco;}
  set _IdPessoaEndereco(p : number[]) {this.IdPessoaEndereco = p; }

  public OBJ_ENDERECO : Endereco;
  get _OBJ_ENDERECO(): Endereco {return this.OBJ_ENDERECO;}
  set _OBJ_ENDERECO(p : Endereco) {this.OBJ_ENDERECO = p; }

  public IndFisJur	: string;
  get _IndFisJur(): string {return this.IndFisJur;}
  set _IndFisJur(p : string) {this.IndFisJur = p; }

  public Nome	: string;
  get _Nome(): string {return this.Nome;}
  set _Nome(p : string) {this.Nome = p; }

  public Apelido	: string;
  get _Apelido(): string {return this.Apelido;}
  set _Apelido(p : string) {this.Apelido = p; }

  public CnpjCpf	: string;
  get _CnpjCpf(): string {return this.CnpjCpf;}
  set _CnpjCpf(p : string) {this.CnpjCpf = p; }

  public IEstRG	: string;
  get _IEstRG(): string {return this.IEstRG;}
  set _IEstRG(p : string) {this.IEstRG = p; }

  public OrgEmisRg	: string;
  get _OrgEmisRg(): string {return this.OrgEmisRg;}
  set _OrgEmisRg(p : string) {this.OrgEmisRg = p; }

  public DtEmisRg	: Date;
  get _DtEmisRg(): Date {return this.DtEmisRg;}
  set _DtEmisRg(p : Date) {this.DtEmisRg = p; }

  public DtNascimento	: string;
  get _DtNascimento(): string {return this.DtNascimento;}
  set _DtNascimento(p : string) {this.DtNascimento = p; }

  public EstCivil	: string;
  get _EstCivil(): string {return this.EstCivil;}
  set _EstCivil(p : string) {this.EstCivil = p; }

  public EMail	: string;
  get _EMail(): string {return this.EMail;}
  set _EMail(p : string) {this.EMail = p; }

  public HomePage	: string;
  get _HomePage(): string {return this.HomePage;}
  set _HomePage(p : string) {this.HomePage = p; }

  public Natural	: string;
  get _Natural(): string {return this.Natural;}
  set _Natural(p : string) {this.Natural = p; }

  public UsrIns	: string;
  get _UsrIns(): string {return this.UsrIns;}
  set _UsrIns(p : string) {this.UsrIns = p; }

  public DhIns	: Date;
  get _DhIns(): Date {return this.DhIns;}
  set _DhIns(p : Date) {this.DhIns = p; }

  public UsrUpd	: string;
  get _UsrUpd(): string {return this.UsrUpd;}
  set _UsrUpd(p : string) {this.UsrUpd = p; }

  public DhUpd	: Date;
  get _DhUpd(): Date {return this.DhUpd;}
  set _DhUpd(p : Date) {this.DhUpd = p; }
}

export interface PessoaTelefone{
  IdPessoa	: number,
  IdTelefone	: number,
  IndUsoFone	: string,
  Sequencia	: number,
}

export interface Telefone{
  IdTelefone	: number,
  CodDdi	: string,
  CodDdd	: string,
  Numero	: string,
  Ramal	: string,
  IndTipoFone	: string
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

  public IdEndereco	: number;
  get _IdEndereco(): number {return this.IdEndereco;}
  set _IdEndereco(p : number) {this.IdEndereco = p; }

  public Logradouro	: string;
  get _Logradouro(): string {return this.Logradouro;}
  set _Logradouro(p : string) {this.Logradouro = p; }

  public Numero	: string;
  get _Numero(): string {return this.Numero;}
  set _Numero(p : string) {this.Numero = p; }

  public Complemento	: string;
  get _Complemento(): string {return this.Complemento;}
  set _Complemento(p : string) {this.Complemento = p; }

  public Bairro	: string;
  get _Bairro(): string {return this.Bairro;}
  set _Bairro(p : string) {this.Bairro = p; }

  public Localidade	: string;
  get _Localidade(): string {return this.Localidade;}
  set _Localidade(p : string) {this.Localidade = p; }

  public CodMuni	: string;
  get _CodMuni(): string {return this.CodMuni;}
  set _CodMuni(p : string) {this.CodMuni = p; }

  public CodPais	: string;
  get _CodPais(): string {return this.CodPais;}
  set _CodPais(p : string) {this.CodPais = p; }

  public UF	: string;
  get _UF(): string {return this.UF;}
  set _UF(p : string) {this.UF = p; }

  public CEP	: string;
  get _CEP(): string {return this.CEP;}
  set _CEP(p : string) {this.CEP = p; }

  public PontoReferencia	: string;
  get _PontoReferencia(): string {return this.PontoReferencia;}
  set _PontoReferencia(p : string) {this.PontoReferencia = p; }

}

export interface Estado {
  UF : string,
  Estado : string
}

export interface Cliente {
  IdCliente	: number,
  Id_Cli	: number,
  Id_Cli_Lj	: number,
  IdPessoa	: number,
  OBJ_PESSOA : Pessoa,
  Contato	: string,
  ProfEmpresa	: string,
  ProfCargo	: string,
  ProfProfissao	: string,
  ProfSalario	: number,
  ProfDtAdmissao	: Date
  BanCodBanco	: string,
  BanNomeBanco	: string,
  BanDtInicioBanco	: Date
  BanAgencia	: string,
  BanNumConta	: string,
  BanChequeEspecial	: boolean,
  IdUsuario : number
}

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
