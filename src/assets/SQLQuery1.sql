SELECT P.CNPJCPF, P.IESTRG, P.INDFISJUR , c.Id_Cli,
        p.Nome,p.Apelido,p.OrgEmisRg, p.EstCivil,
        p.DtNascimento, c.ProfProfissao, p.DhIns,
        E.CEP, E.UF, E.LOCALIDADE,E.LOGRADOURO,
        E.NUMERO, E.COMPLEMENTO, E.BAIRRO,
        p.EMail,c.Contato
        , f.CodDdd ,f.Numero, f.Ramal
        ,c.Id_Cli
FROM	CLIENTE C
JOIN	PESSOA P ON C.IDPESSOA = P.IDPESSOA
JOIN  PessoaEndereco PE ON PE.IdPessoa = P.IdPessoa
JOIN  Endereco E ON E.IdEndereco = PE.IdEndereco
JOIN	PessoaTelefone T ON P.IdPessoa = T.IdPessoa
JOIN	Telefone F ON F.IdTelefone = T.IdTelefone
where   c.Id_Cli = 3
select * from	Pessoa
select * from	PessoaEndereco
select * from	PessoaTelefone


select * from Usuario

SELECT  DISTINCT PD.Id_Ped, P.Nome,PD.DtPed, PD.Entrega, PD.Situacao, PD.DescrSituacao, PD.Tipo, PD.DescrTipo
FROM    CapaVend PD
--JOIN    ItemVend IV ON PD.Id_Ped = IV.Id_Ped
--JOIN    Frm_Ped FP ON FP.Id_Ped = PD.Id_Ped
--JOIN    ItemPag IP ON IP.Id_Frp = FP.Id_Frp
JOIN    CLIENTE C ON C.Id_Cli = PD.Id_Cli
JOIN	  PESSOA P ON C.IDPESSOA = P.IDPESSOA
--JOIN    PessoaEndereco PE ON PE.IdPessoa = P.IdPessoa
--JOIN    Endereco E ON E.IdEndereco = PE.IdEndereco
--JOIN	  PessoaTelefone T ON P.IdPessoa = T.IdPessoa
--JOIN	  Telefone F ON F.IdTelefone = T.IdTelefone
WHERE   PD.Id_Ped = 4412

SELECT  pd.*, PD.Id_Ped, PD.Versao, PD.DtPed, P.Nome, PD.Observ,
        PD.Situacao, PD.DescrSituacao, PD.Entrega, PD.Per_Ent,
        M.Descr, VP.Nome, IV.Produto, IV.Quantid, IV.Valuni,
        IV.Tp_Frete,
        FP.FormaPag, FP.Tot_Parc, FP.Val_Fin AS XXX, --TOTPARC
        IP.Num_Parc, IP.Document, IP.Dt_Venc, IP.Agencia, IP.Praca, IP.Agencia, IP.Num_Cheq, IP.Val_ARec,
        F.CodDdd, F.Numero, F.Ramal,
        E.CEP, E.UF, E.Localidade, E.Logradouro, E.Numero, E.Complemento,E.Bairro, E.PontoReferencia

FROM    CapaVend PD
LEFT JOIN    ItemVend IV ON PD.Id_Ped = IV.Id_Ped
LEFT JOIN    Frm_Ped FP ON FP.Id_Ped = PD.Id_Ped
LEFT JOIN    ItemPag IP ON IP.Id_Frp = FP.Id_Frp
LEFT JOIN    CLIENTE C ON C.Id_Cli = PD.Id_Cli
LEFT JOIN	  PESSOA P ON C.IDPESSOA = P.IDPESSOA
LEFT JOIN    PessoaEndereco PE ON PE.IdPessoa = P.IdPessoa
LEFT JOIN    Endereco E ON E.IdEndereco = PE.IdEndereco
LEFT JOIN	  (SELECT TOP 1 * FROM PessoaTelefone) T ON P.IdPessoa = T.IdPessoa
LEFT JOIN	  Telefone F ON F.IdTelefone = T.IdTelefone
LEFT JOIN    Midia M ON M.IdMidia = PD.IdMidia
LEFT JOIN    Vend_Ped VP ON VP.Id_Ped = PD.Id_Ped
WHERE   PD.Id_Ped = 4412


SELECT  DISTINCT PD.Id_Ped, P.Nome,PD.DtPed, PD.Entrega, PD.Situacao, PD.DescrSituacao, PD.Tipo, PD.DescrTipo  FROM    CapaVend PD  JOIN    
CLIENTE C ON C.Id_Cli = PD.Id_Cli  JOIN PESSOA P ON C.IDPESSOA = P.IDPESSOA  WHERE   PD.Id_Ped = 1949612

SELECT DISTINCT IDVENDEDOR, NOME FROM VEND_PED ORDER BY NOME

select *
FROM    CapaVend PD
left JOIN    ItemVend IV ON PD.Id_Ped = IV.Id_Ped
left JOIN    Frm_Ped FP ON FP.Id_Ped = PD.Id_Ped
left JOIN    ItemPag IP ON IP.Id_Frp = FP.Id_Frp
left JOIN    CLIENTE C ON C.Id_Cli = PD.Id_Cli
left JOIN	  PESSOA P ON C.IDPESSOA = P.IDPESSOA
left JOIN    PessoaEndereco PE ON PE.IdPessoa = P.IdPessoa
left JOIN    Endereco E ON E.IdEndereco = PE.IdEndereco
left JOIN	  PessoaTelefone T ON P.IdPessoa = T.IdPessoa
left JOIN	  Telefone F ON F.IdTelefone = T.IdTelefone
WHERE   PD.Id_Ped = 1950912

numero pedido 1949812

Sp_GridPedidoFrp 4412

Sp_GridPedidoFrp 4412

sp_gridsitensfabricar 4412

Sp_GridItensFabricar 4412

EXEC Sp_GridPedidoItens 1950912

EXEC Sp_LojasPesquisaEstoque   26, 'SOFA FLORIDA'

Sp_LojasPesquisaEstoque  11, 'SOFA FLORIDA'

Select * From   ItemVend

SELECT  C.ID_CLI, P.NOME, P.CNPJCPF, P.IESTRG, P.INDFISJUR , PE.IdEndereco, PE.IndTipoEndereco,p.*
FROM	CLIENTE C 
JOIN	PESSOA P ON C.IDPESSOA = P.IDPESSOA
JOIN  PessoaEndereco PE ON PE.IdPessoa = P.IdPessoa
JOIN  Endereco E ON E.IdEndereco = PE.IdEndereco

declare @Ok VarChar(500)
declare @MensErro VarChar(500)

 exec Sp_PedidoItemEstqInsere '1950912', 449988, 1, @Ok, @MensErro


 delete from ItemVend where Id_Ped = 1950912

 insert into Vend_Ped values(1950912,211,'GISELE CARVALHO')


