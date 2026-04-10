# n8n-nodes-rdstation-crm

Community node for [n8n](https://n8n.io) that integrates **RD Station CRM** into your workflows via the **API v1** — using only an API token, sem necessidade de OAuth ou planos adicionais do RD Station Marketing.

> **Por que API v1?** A versão 2 da API usa OAuth2, que exige um plano do RD Station Marketing (produto separado do CRM). Esta integração usa a API v1, acessível a qualquer conta do RD Station CRM com um simples token de API.

---

## Installation

### Via n8n UI (recommended)

1. Go to **Settings → Community Nodes**
2. Click **Install**
3. Enter `n8n-nodes-rdstation-crm` and confirm

### Via npm (self-hosted)

```bash
cd ~/.n8n/custom
npm install n8n-nodes-rdstation-crm
```

---

## Credentials

This node uses **API Token** authentication:

1. In RD Station CRM, go to **Configurações → Integrações → Token de API**
2. Copy your API token
3. In n8n, create a new **RD Station CRM API** credential
4. Paste the token and save

---

## Resources & Operations

### Deal (Negociação)
| Operation | Description |
|-----------|-------------|
| Create | Create a new deal |
| Get | Get a deal by ID |
| Get Many | List deals (with filters and pagination) |
| Update | Update a deal |

**Filters:** name, win/loss status, stage, pipeline, campaign, source, owner, dates

---

### Contact (Contato)
| Operation | Description |
|-----------|-------------|
| Create | Create a new contact |
| Get | Get a contact by ID |
| Get Many | List contacts (with filters) |
| Update | Update a contact |

**Fields:** name, emails, phones (with type), job title, organization, birthday, social profiles (Facebook, LinkedIn, Twitter, Instagram, Skype)

---

### Organization (Empresa)
| Operation | Description |
|-----------|-------------|
| Create | Create a new organization |
| Get | Get an organization by ID |
| Get Many | List organizations |
| Update | Update an organization |

**Fields:** name, website, address, city, state, country, phone, email, social profiles

---

### Task (Tarefa)
| Operation | Description |
|-----------|-------------|
| Create | Create a new task |
| Get | Get a task by ID |
| Get Many | List tasks (with filters) |
| Update | Update a task |

**Types:** Call, Email, Meeting, Task, Lunch, Visit, WhatsApp
**Filters:** type, completion status, owner, deal, contact, due date

---

### Product (Produto)
| Operation | Description |
|-----------|-------------|
| Create | Create a new product |
| Get | Get a product by ID |
| Get Many | List products |
| Update | Update a product |

---

### Deal Product (Produto na Negociação)
| Operation | Description |
|-----------|-------------|
| Create | Add a product to a deal |
| Get Many | List all products in a deal |
| Update | Update a product in a deal |
| Delete | Remove a product from a deal |

---

### Activity (Anotação)
| Operation | Description |
|-----------|-------------|
| Create | Create an activity/note on a deal |
| Get Many | List activities (filter by deal) |

---

### Custom Field (Campo Personalizado)
| Operation | Description |
|-----------|-------------|
| Create | Create a custom field |
| Get | Get a custom field by ID |
| Get Many | List custom fields (filter by entity) |
| Update | Update a custom field |
| Delete | **Delete** a custom field |

**Entities:** Deal, Contact, Organization
**Types:** Text, Number, Date, Select, Checkbox, URL

---

### Deal Pipeline (Funil de Vendas)
| Operation | Description |
|-----------|-------------|
| Create | Create a pipeline |
| Get | Get a pipeline by ID |
| Get Many | List pipelines |
| Update | Update a pipeline |

---

### Deal Stage (Etapa do Funil)
| Operation | Description |
|-----------|-------------|
| Create | Create a stage (requires pipeline) |
| Get | Get a stage by ID |
| Get Many | List stages (filter by pipeline) |
| Update | Update a stage |

---

### Campaign (Campanha)
| Operation | Description |
|-----------|-------------|
| Create | Create a campaign |
| Get | Get a campaign by ID |
| Get Many | List campaigns |
| Update | Update a campaign |

---

### Source (Fonte de Negociação)
| Operation | Description |
|-----------|-------------|
| Create | Create a deal source |
| Get | Get a source by ID |
| Get Many | List sources |
| Update | Update a source |

---

### Lost Reason (Motivo de Perda)
| Operation | Description |
|-----------|-------------|
| Create | Create a lost reason |
| Get Many | List lost reasons |

---

### User (Usuário) — read-only
| Operation | Description |
|-----------|-------------|
| Get | Get a user by ID |
| Get Many | List all users |

---

### Team (Equipe) — read-only
| Operation | Description |
|-----------|-------------|
| Get | Get a team by ID |
| Get Many | List all teams |

---

## Usage Examples

### Create a deal and add a product

```
1. RD Station CRM → Resource: Deal → Operation: Create
   - Name: "Proposta Empresa ABC"
   - Additional Fields: stage, pipeline, owner

2. RD Station CRM → Resource: Deal Product → Operation: Create
   - Deal ID: {{ $json.id }}  (from previous node)
   - Product ID: "product-uuid"
   - Amount: 5
   - Price: 199.90
```

### Search contacts by email

```
1. RD Station CRM → Resource: Contact → Operation: Get Many
   - Filters → Email: "cliente@empresa.com"
```

### Log an activity on a deal

```
1. RD Station CRM → Resource: Activity → Operation: Create
   - Deal ID: "deal-uuid"
   - Notes: "Reunião realizada, cliente interessado."
```

---

## Compatibility

- **n8n:** 1.0.0 or later
- **Node.js:** 18.0.0 or later
- **RD Station CRM API:** v1

---

## Resources

- [RD Station CRM API v1 Documentation](https://developers.rdstation.com/reference/crm-v1-introducao-e-requisitos)
- [RD Station CRM](https://www.rdstation.com/crm/)
- [n8n Documentation](https://docs.n8n.io)
- [n8n Community Forum](https://community.n8n.io)

---

## Contributing

Contributions are welcome! Feel free to open an issue or pull request on [GitHub](https://github.com/eliel-alves/n8n-nodes-rdstation-crm).

---

## License

[MIT](LICENSE)

---

*Built with ❤️ for the n8n community by [Eliel Alves](mailto:elielalves.dev@gmail.com)*
