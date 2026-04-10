# n8n-nodes-rdstation-crm-v1

Node community para [n8n](https://n8n.io) que integra o **RD Station CRM** aos seus fluxos de trabalho via **API v1** — utilizando apenas um token de API, sem necessidade de OAuth ou planos adicionais do RD Station Marketing.

> **Por que API v1?** A versão 2 da API usa OAuth2, que exige um plano do RD Station Marketing (produto separado do CRM). Esta integração usa a API v1, acessível a qualquer conta do RD Station CRM com um simples token de API.

---

## Instalação

### Via interface do n8n (recomendado)

1. Acesse **Configurações → Nodes da Comunidade**
2. Clique em **Instalar**
3. Digite `n8n-nodes-rdstation-crm-v1` e confirme

### Via npm (instâncias self-hosted)

```bash
cd ~/.n8n/custom
npm install n8n-nodes-rdstation-crm-v1
```

---

## Credenciais

Este node utiliza autenticação por **Token de API**:

1. No RD Station CRM, acesse **Configurações → Integrações → Token de API**
2. Copie o seu token de API
3. No n8n, crie uma nova credencial **RD Station CRM API**
4. Cole o token e salve

---

## Recursos e Operações

### Deal (Negociação)
| Operação | Descrição |
|----------|-----------|
| Create | Cria uma nova negociação |
| Get | Busca uma negociação pelo ID |
| Get Many | Lista negociações (com filtros e paginação) |
| Update | Atualiza uma negociação |

**Filtros disponíveis:** nome, status ganho/perdido, etapa, funil, campanha, fonte, responsável, datas

**Campos extras:** vinculação a contato existente pelo ID

---

### Contact (Contato)
| Operação | Descrição |
|----------|-----------|
| Create | Cria um novo contato |
| Get | Busca um contato pelo ID |
| Get Many | Lista contatos (com filtros) |
| Update | Atualiza um contato |

**Campos:** nome, e-mails, telefones (com tipo), cargo, empresa, data de nascimento, redes sociais (Facebook, LinkedIn, Twitter, Instagram, Skype)

---

### Organization (Empresa)
| Operação | Descrição |
|----------|-----------|
| Create | Cria uma nova empresa |
| Get | Busca uma empresa pelo ID |
| Get Many | Lista empresas |
| Update | Atualiza uma empresa |

**Campos:** nome, site, endereço, cidade, estado, país, telefone, e-mail, redes sociais

---

### Task (Tarefa)
| Operação | Descrição |
|----------|-----------|
| Create | Cria uma nova tarefa |
| Get | Busca uma tarefa pelo ID |
| Get Many | Lista tarefas (com filtros) |
| Update | Atualiza uma tarefa |

**Tipos:** Ligação, E-mail, Reunião, Tarefa, Almoço, Visita, WhatsApp
**Filtros:** tipo, status de conclusão, responsável, negociação, contato, data de vencimento

---

### Product (Produto)
| Operação | Descrição |
|----------|-----------|
| Create | Cria um novo produto |
| Get | Busca um produto pelo ID |
| Get Many | Lista produtos |
| Update | Atualiza um produto |

---

### Deal Product (Produto da Negociação)
| Operação | Descrição |
|----------|-----------|
| Create | Adiciona um produto a uma negociação |
| Get Many | Lista todos os produtos de uma negociação |
| Update | Atualiza um produto na negociação |
| Delete | Remove um produto da negociação |

---

### Activity (Anotação)
| Operação | Descrição |
|----------|-----------|
| Create | Cria uma anotação em uma negociação |
| Get Many | Lista anotações (filtro por negociação) |

---

### Custom Field (Campo Personalizado)
| Operação | Descrição |
|----------|-----------|
| Create | Cria um campo personalizado |
| Get | Busca um campo personalizado pelo ID |
| Get Many | Lista campos personalizados (filtro por entidade) |
| Update | Atualiza um campo personalizado |
| Delete | **Exclui** um campo personalizado |

**Entidades:** Deal, Contact, Organization
**Tipos:** Texto, Número, Data, Seleção, Checkbox, URL

---

### Deal Pipeline (Funil de Vendas)
| Operação | Descrição |
|----------|-----------|
| Create | Cria um funil |
| Get | Busca um funil pelo ID |
| Get Many | Lista funis |
| Update | Atualiza um funil |

---

### Deal Stage (Etapa do Funil)
| Operação | Descrição |
|----------|-----------|
| Create | Cria uma etapa (requer funil) |
| Get | Busca uma etapa pelo ID |
| Get Many | Lista etapas (filtro por funil) |
| Update | Atualiza uma etapa |

---

### Campaign (Campanha)
| Operação | Descrição |
|----------|-----------|
| Create | Cria uma campanha |
| Get | Busca uma campanha pelo ID |
| Get Many | Lista campanhas |
| Update | Atualiza uma campanha |

---

### Source (Fonte de Negociação)
| Operação | Descrição |
|----------|-----------|
| Create | Cria uma fonte de negociação |
| Get | Busca uma fonte pelo ID |
| Get Many | Lista fontes |
| Update | Atualiza uma fonte |

---

### Lost Reason (Motivo de Perda)
| Operação | Descrição |
|----------|-----------|
| Create | Cria um motivo de perda |
| Get Many | Lista motivos de perda |

---

### User (Usuário) — somente leitura
| Operação | Descrição |
|----------|-----------|
| Get | Busca um usuário pelo ID |
| Get Many | Lista todos os usuários |

---

### Team (Equipe) — somente leitura
| Operação | Descrição |
|----------|-----------|
| Get | Busca uma equipe pelo ID |
| Get Many | Lista todas as equipes |

---

## Exemplos de Uso

### Criar uma negociação e adicionar um produto

```
1. RD Station CRM → Recurso: Deal → Operação: Create
   - Nome: "Proposta Empresa ABC"
   - Campos Adicionais: etapa, funil, responsável

2. RD Station CRM → Recurso: Deal Product → Operação: Create
   - ID da Negociação: {{ $json.id }}  (do nó anterior)
   - ID do Produto: "uuid-do-produto"
   - Quantidade: 5
   - Preço: 199.90
```

### Criar uma negociação vinculada a um contato existente

```
1. RD Station CRM → Recurso: Deal → Operação: Create
   - Nome: "Proposta Empresa ABC"
   - Campos Adicionais → ID do Contato: "uuid-do-contato"
```

### Buscar contatos por e-mail

```
1. RD Station CRM → Recurso: Contact → Operação: Get Many
   - Filtros → E-mail: "cliente@empresa.com"
```

### Registrar uma anotação em uma negociação

```
1. RD Station CRM → Recurso: Activity → Operação: Create
   - ID da Negociação: "uuid-da-negociacao"
   - Texto: "Reunião realizada, cliente interessado."
```

---

## Compatibilidade

- **n8n:** 1.0.0 ou superior
- **Node.js:** 18.0.0 ou superior
- **RD Station CRM API:** v1

---

## Recursos

- [Documentação da API RD Station CRM v1](https://developers.rdstation.com/reference/crm-v1-introducao-e-requisitos)
- [RD Station CRM](https://www.rdstation.com/crm/)
- [Documentação do n8n](https://docs.n8n.io)
- [Fórum da Comunidade n8n](https://community.n8n.io)

---

## Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para abrir uma issue ou pull request no [GitHub](https://github.com/eliel-alves/n8n-nodes-rdstation-crm).

---

## Licença

[MIT](LICENSE)

---

*Desenvolvido com ❤️ para a comunidade n8n por [Eliel Alves](mailto:elielalves.dev@gmail.com)*
