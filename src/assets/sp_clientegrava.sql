
Declare
 @IdCliente   int,
 @IndFisJur   char(1),
@Nome         varchar(60),
@Apelido         varchar(60),
@CnpjCpf         varchar(60),
@IEstRG         varchar(60),
@OrgEmisRg         varchar(60),
@DtEmisRg         datetime,
@EMail         varchar(60),
@cXmlFones      nvarchar(max),
@Contato         varchar(60),
@EndLogradouro         varchar(60),
@EndNumero         varchar(60),
@EndComplemento         varchar(60),
@EndBairro         varchar(60),
@EndLocalidade         varchar(60),
@EndCodMuni         varchar(60),
@EndUF         varchar(60),
@EndCEP         varchar(60),
@EndCodPais         varchar(60),
@EndPontoReferencia         varchar(60),
@IdUsuario    int,
  @Ok             Bit ,         
 @MensErro       VarChar(500), 
 @Id_Usr         Int,
 @Usuario        Varchar(30)

Exec dbo.[Sp_ClienteGrava]
   @IdCliente = @IdCliente OutPut,
   @IndFisJur   = 'F',
  @Nome   = 'usuario teste Telefone',
  @Apelido   = 'teste',
  @CnpjCpf   = '48544219837',
  @IEstRG    = '1131331',
  @OrgEmisRg   = 'ssp',
  @DtEmisRg    = '2000-010-03',
  @EMail    = 'ddddd@gmail.com',
  @cXmlFones   = '<row><IdTelefone>0</IdTelefone><codddi>55</codddi><codddd>11</codddd><numero>111111111</numero><ramal>1111</ramal><indusofone>F</indusofone><ordenador>1</ordenador></row>',
  @Contato   = 'wewewwe',
  @EndLogradouro   = 'rua x ',
  @EndNumero   = '123',
  @EndComplemento   = 'complemento y',
  @EndBairro   = 'bairro z',
  @EndLocalidade   = 'São Paulo',
  @EndCodMuni   = '1',
  @EndUF    = 'SP',
  @EndCEP = '04134000',
  @EndCodPais   = '55',
  @EndPontoReferencia   = 'assfffsfsa',
  @IdUsuario   = '4',
 @Ok             = @Ok        OutPut  ,
 @MensErro       = @MensErro  OutPut

Select @Ok, @MensErro, @Id_Usr, @Usuario

--select * from cliente




