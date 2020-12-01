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
