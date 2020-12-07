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
JOIN    ItemVend IV ON PD.Id_Ped = IV.Id_Ped
JOIN    Frm_Ped FP ON FP.Id_Ped = PD.Id_Ped
JOIN    ItemPag IP ON IP.Id_Frp = FP.Id_Frp
JOIN    CLIENTE C ON C.Id_Cli = PD.Id_Cli
JOIN	  PESSOA P ON C.IDPESSOA = P.IDPESSOA
JOIN    PessoaEndereco PE ON PE.IdPessoa = P.IdPessoa
JOIN    Endereco E ON E.IdEndereco = PE.IdEndereco
JOIN	  PessoaTelefone T ON P.IdPessoa = T.IdPessoa
JOIN	  Telefone F ON F.IdTelefone = T.IdTelefone
WHERE   PD.Id_Ped = 4412

SELECT  PD.Id_Ped, PD.Versao, PD.DtPed, P.Nome, PD.Observ,
        PD.Situacao, PD.DescrSituacao, PD.Entrega, PD.Per_Ent,
        M.Descr, VP.Nome, IV.Produto, IV.Quantid, IV.Valuni,
        IV.Tp_Frete,
        FP.FormaPag, FP.Tot_Parc, FP.Val_Fin AS XXX, --TOTPARC
        IP.Num_Parc, IP.Document, IP.Dt_Venc, IP.Agencia, IP.Praca, IP.Agencia, IP.Num_Cheq, IP.Val_ARec,
        F.CodDdd, F.Numero, F.Ramal,
        E.CEP, E.UF, E.Localidade, E.Logradouro, E.Numero, E.Complemento,E.Bairro, E.PontoReferencia

FROM    CapaVend PD
JOIN    ItemVend IV ON PD.Id_Ped = IV.Id_Ped
JOIN    Frm_Ped FP ON FP.Id_Ped = PD.Id_Ped
JOIN    ItemPag IP ON IP.Id_Frp = FP.Id_Frp
JOIN    CLIENTE C ON C.Id_Cli = PD.Id_Cli
JOIN	  PESSOA P ON C.IDPESSOA = P.IDPESSOA
JOIN    PessoaEndereco PE ON PE.IdPessoa = P.IdPessoa
JOIN    Endereco E ON E.IdEndereco = PE.IdEndereco
JOIN	  PessoaTelefone T ON P.IdPessoa = T.IdPessoa
JOIN	  Telefone F ON F.IdTelefone = T.IdTelefone
LEFT JOIN    Midia M ON M.IdMidia = PD.IdMidia
LEFT JOIN    Vend_Ped VP ON VP.Id_Ped = PD.Id_Ped
WHERE   PD.Id_Ped = 4412


SELECT * FROM Vend_Ped
