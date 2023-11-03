import styled from "styled-components";

const FormAddEscola = styled.div`
    background-color: #D9D9D9;
    display: grid; 
    grid-template-columns: 3fr 1fr; 
    grid-template-rows: 1fr 5fr; 
    margin: 2em;
    border-radius: 8px;
    overflow-x: auto;

    & > div:nth-child(1) {
        grid-column: 1 / span 2;
        grid-row: 1;
    } 

    & > form:nth-child(2) {
        grid-column: 1;
        grid-row: 2;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 1em;
        padding: 2em;

        color: #030200;
    }

    & > div:nth-child(3) {
        grid-column: 2;
        grid-row: 2;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        padding: 1em 2em;
    }
`

import { React, useState } from 'react'
import TitleTopo from  '../../components/pagina_admin/ThirdColumn/TitleTopo'
import DescricaoSobInput from '../../components/form/DescricaoSobInput'
import Input from '../../components/form/Input'
import Button from '../../components/Button'
import LinhaAbaixoTitle from "../../components/pagina_admin/ThirdColumn/LinhaAbaixoTitle";
import { validateCNPJ, validateEmail, validateSenha } from "../../validations/validaDadosCadastro";
import DescricaoDadoIncorreto from "../../components/form/DadoIncorreto";

const AddEscola = () => {

    const [ formData, setFormData ] = useState({
        nome: "",
        email: "",
        cnpj: "",
        senha: ""
    })

    const [erros, setErros] = useState({
        nome: { temErros: false, mensagem: "" },
        email: { temErros: false, mensagem: "" },
        cnpj: { temErros: false, mensagem: "" },
        senha: { temErros: false, mensagem: "" }
      });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value
        });
      };

      const verificaPreenchimentoCampos = (name) => {
        if (name == "nome") {
          if (formData.nome.trim() === '') {
            setErros({ ...erros, nome: { temErros: true, mensagem: 'Campo obrigatório.'}})
          } else {
            setErros({...erros, nome:({ temErros: false})})
          }
        } else if (name == "email") {
            if (formData.email.trim() == '') {
              setErros({ ...erros, email: { temErros: true, mensagem: 'Campo obrigatório.'}})
            }else if (!validateEmail(formData.email)){
                setErros({ ...erros, email: { temErros: true, mensagem: 'Email inválido.'}})
            } else {
              setErros({...erros, email:({ temErros: false})})
            }
        } else  if (name == "cnpj") {
            if (formData.cnpj.trim() == '') {
              setErros({ ...erros, cnpj: { temErros: true, mensagem: 'Campo obrigatório.'}})
            }else if (!validateCNPJ(formData.cnpj)){
                setErros({ ...erros, cnpj: { temErros: true, mensagem: 'CNPJ inválido.'}})
            } else {
              setErros({...erros, cnpj:({ temErros: false})})
            }
        }else if (name == "senha") {
            if (formData.senha.trim() == '') {
              setErros({ ...erros, senha: { temErros: true, mensagem: 'Campo obrigatório.'}})
            }else if (!validateSenha(formData.senha)){
                setErros({ ...erros, senha: { temErros: true, mensagem: 'Senha deve ter pelo menos 8 caracteres, contendo pelo menos uma letra maíuscula, um número e um símbolo.'}})
            } else {
              setErros({...erros, senha:({ temErros: false})})
            }
          }
      }

  return (
    <FormAddEscola>
        <div>
            <TitleTopo>Adicionar Escola</TitleTopo>
            <LinhaAbaixoTitle />
        </div>
        <form>
            <DescricaoSobInput>Nome da Instituição</DescricaoSobInput>
            <Input 
            style={{width: '70%'}}
            type="text"
            name="nome"
            onChange={handleInputChange}
            onBlur={(e) => verificaPreenchimentoCampos(e.target.name)}
            />
            {erros.nome.temErros && <DescricaoDadoIncorreto>{erros.nome.mensagem}</DescricaoDadoIncorreto>}
            <DescricaoSobInput>Email</DescricaoSobInput>
            <Input 
            style={{width: '70%'}}
            type="email"
            name="email"
            onChange={handleInputChange}
            onBlur={(e) => verificaPreenchimentoCampos(e.target.name)}
            />
            {erros.email.temErros && <DescricaoDadoIncorreto>{erros.email.mensagem}</DescricaoDadoIncorreto>}
            <DescricaoSobInput>CNPJ</DescricaoSobInput>
            <Input 
            style={{width: '40%'}}
            type="text"
            name="cnpj"
            onChange={handleInputChange}
            onBlur={(e) => verificaPreenchimentoCampos(e.target.name)}
            />
            {erros.cnpj.temErros && <DescricaoDadoIncorreto>{erros.cnpj.mensagem}</DescricaoDadoIncorreto>}
            <DescricaoSobInput>Senha</DescricaoSobInput>
            <Input 
            style={{width: '40%'}}
            type="password"
            name="senha"
            onChange={handleInputChange}
            onBlur={(e) => verificaPreenchimentoCampos(e.target.name)}
            />
            {erros.senha.temErros && <DescricaoDadoIncorreto>{erros.senha.mensagem}</DescricaoDadoIncorreto>}
        </form>
        <div>
            <Button>Adicionar</Button>
        </div>
   </FormAddEscola>
  )
}

export default AddEscola
