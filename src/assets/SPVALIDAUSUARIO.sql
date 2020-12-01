
Declare
  @Ok             Bit          
, @MensErro       VarChar(500) 
, @Id_Usr         Int
, @Usuario        Varchar(30)

Exec dbo.[Sp_ValidaUsuario]
  @Login          = 'LOJAFABRICA'
, @Senha          = '10189'
, @Id_Usr         = @Id_Usr    OutPut 
, @Usuario        = @Usuario   OutPut 
, @Ok             = @Ok        OutPut  
, @MensErro       = @MensErro  OutPut

Select @Ok, @MensErro, @Id_Usr, @Usuario

SELECT * FROM USUARIO
