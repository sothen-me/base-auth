# NestJS Base Auth

Esse projeto é uma aplicação básica de autenticação que contem desde o cadastro de usuário até o controle de rotas autenticadas. Foi construido utilizando o framework NestJS e o Prisma ORM para persistência dos dados, já contendo a configuração de um banco SQLite. Possui rota de cadastro, login e `/me` para retornar o usuário logado.

## Construido com

* [NestJS](https://nestjs.com/)
* [Prisma](https://www.prisma.io/)
* [Nodemailer](https://nodemailer.com/about/)
* [Handlebars](https://handlebarsjs.com/)

## Organização
O projeto está organizado utilizando alguns princípios de SOLID e DDD, utilizando injeção de dependência para desacoplar as implementações de modo a diminuir as dependências com ferramentas externas e com o intuito de facilitar a mudança e/ou manutenção

### Organização de arquivos
```
@sothen/base-auth
├── prisma/
│   ├── migrations/
│   │   └── Pasta contendo todas as migrations do projeto
│   ├── srchema.prisma -> Arquivo de configuração do Prisma
├── src/
│   ├── decorators/
│   │   └── Decoradores globais da aplicação
│   ├── domains/
│   │   └── Divisão da aplicação por dominios/modulos
│   │   └── Users
│   ├── helpers/
│   │   └── Pasta de arquivos utilitários compartilhados da aplicação (utils)
│   ├── providers/
│   │   └── Implementações externas e suas abstrações
│   ├── app.module.ts
│   ├── main.ts
├── test/
│   ├── factories/
│   │   └── Centraliza a criação dos elementos compartilhados nos testes
│   ├── providers/
│   │   └── Centraliza os providers de teste
│   ├── repositories/
│   │   └── Centraliza os repositórios de testes
```

## Instalação

Utilize o `npm` para instalar as dependências (ou seu gerenciador de pacotes favorito):

```bash
npm i
```

Utiliza a CLI do prisma para executar a migration de criação da tabela dos usuários:

```bash
npx prisma migrate dev
```

Execute o comando para executar o prisma studio e verificar se a tabela foi criada corretamente:

```bash
npx prisma studio
```

Rode a aplicação

```bash 
npm run start:dev
```

## Rotas pre-definidas
| Método  | Rota | Autenticada | Descrição | 
| ------- | ---- | ----------- | --------- |
| POST | `/users`| Não | Cadastro de usuários | 
| POST | `/auth` | Não | Login no sistema | 
| GET | `/auth/me`| Sim | Informações do usuário logado | 
| POST | `/auth/recover-password`| Sim | Solicitar recuperação de senha | 
| POST | `/auth/reset-password`| Sim | Resetas a senha do usuário | 

## Contribuição
Pull requests são bem vindas. Para mudanças maiores, por favor, abra uma issue primeiro para discutir o que você gostaria de alterar.
Por favor, certifique-se de atualizar/criar os testes dos recursos afetados. 

## Licença
Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE.md](LICENSE) para ver os detalhes