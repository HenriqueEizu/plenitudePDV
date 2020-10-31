export interface Pessoa {
  IdPessoa	: number,
  IdTelefone1 : number,
  OBJ_TELEFONE1 : Telefone,
  IdTelefone2 : number,
  OBJ_TELEFONE2 : Telefone,
  IdTelefone3 : number,
  OBJ_TELEFONE3 : Telefone,
  IdEndereco : number,
  OBJ_ENDERECO : Endereco,
  IndFisJur	: string,
  Nome	: string,
  Apelido	: string,
  CnpjCpf	: string,
  IEstRG	: string,
  OrgEmisRg	: string,
  DtEmisRg	: Date,
  DtNascimento	: Date,
  EstCivil	: string,
  EMail	: string,
  HomePage	: string,
  Natural	: string,
  UsrIns	: string,
  DhIns	: string,
  UsrUpd	: string,
  DhUpd	: Date
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

export interface PessoaEndereco{
  IdPessoaEndereco : number,
  IdPessoa : number,
  IdEndereco : number,
  IndTipoEndereco : string
}

export interface Endereco{
  IdEndereco	: number,
  Logradouro	: string,
  Numero	: string,
  Complemento	: string,
  Bairro	: string,
  Localidade	: string,
  CodMuni	: string,
  UF	: string,
  CEP	: string,
  CodPais	: string,
  PontoReferencia	: string
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
  BanChequeEspecial	: boolean
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
