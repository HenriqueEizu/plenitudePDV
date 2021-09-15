Declare
  @Ok             Bit          
, @MensErro       VarChar(500) 
, @Id_Usr         Int
, @Id_Ped		  int
,@Id_Frp	      int
,@Id_Forma		  Int
,@Id_Plano		  Int
,@IdFormaEntrada  Int
,@IdTefOperacao   Int
,@Tot_Parc        Int
,@Val_Fin         Decimal
,@ValorParcela    Decimal
,@Cont_Fin        VarChar(500)
,@Dt_ContF        DateTime
,@Aut_Cart        VarChar(500)
,@Tem_Fret        Bit
,@NumCheque       VarChar(500)
,@Banco           VarChar(500)
,@Agencia         VarChar(500)
,@Praca           VarChar(500)
,@SoValida        Bit


Exec dbo.[Sp_PedidoPlanoInsere]
 @Id_Ped         = 1951112
, @Id_Frp	       = 0 
, @Id_Forma       = 81
, @Id_Plano		  = 0
, @IdFormaEntrada  = 1
, @IdTefOperacao   = 0
, @Tot_Parc         = 2      
, @Val_Fin         = 5640       
, @ValorParcela    = 0 
, @Cont_Fin         = null      
, @Dt_ContF         = null      
, @Aut_Cart         = '2222'
, @Tem_Fret         = 0   
, @NumCheque         = ''     
, @Banco         = ''         
, @Agencia         = ''       
, @Praca         = ''         
, @SoValida          = 1    
, @Id_Usr         = 4
, @Ok             = @Ok        OutPut  
, @MensErro       = @MensErro  OutPut

Select @Ok, @MensErro, @Id_Usr





