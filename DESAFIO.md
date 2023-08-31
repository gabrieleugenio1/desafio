
# Desafio

**Perguntas**

- **Qual foi a maior dificuldade que enfrentou ao realizar o teste:** Minha principal dificuldade foi garantir que minha implementação fosse sólida e atendesse a todos os requisitos, considerando que eu não pude realizar testes automatizados, incluindo testes unitários e de integração. Dependendo exclusivamente de testes manuais, tive que ser minucioso em cada cenário para identificar possíveis problemas e me certificar de que tudo estava funcionando conforme o esperado.

- **Descreva a funcionalidade e o motivo da utilização das bibliotecas escolhidas por você para concluir o desafio:**

  - **Swagger:** Utilizei o Swagger para criar uma documentação clara e interativa das rotas da API. Isso facilita o entendimento das funcionalidades disponíveis e permitindo testar as rotas diretamente no navegador.

  - **Class-Validator:** Optei pelo Class-Validator para garantir que os parâmetros e os dados do corpo das requisições estejam corretos e atendam às validações necessárias. Isso ajuda a manter a integridade dos dados recebidos.

  - **fs/promises:** Escolhi a biblioteca fs/promises para manipulação segura de arquivos e pastas, garantindo um processo confiável de salvamento e leitura de imagens.

  - **mime-types:** A escolha do mime-types permitiu verificar se o tipo de arquivo é uma imagem antes de processá-lo, contribuindo para a segurança e consistência dos uploads.

- **Como você se vê daqui a 5 anos:** Daqui a 5 anos, me vejo em um cenário em que encontro um equilíbrio entre minha carreira e meus interesses pessoais. Planejo estar em uma posição onde possa aproveitar a flexibilidade do trabalho remoto para explorar novos lugares e culturas, nutrindo minha paixão por viagens, estando financeiramente bem e em busca de uma melhor qualidade de vida.


## Variáveis de Ambiente

Para rodar este projeto, é necessário adicionar as seguintes variáveis de ambiente no seu `.env` ou renomear o arquivo `.env.example` para `.env` e configurar as variáveis de acordo.

- `DATABASE_URL`: URL do MongoDB
- `PORT`: Porta do servidor (opcional)

## Instalação

Para começar a utilizar o projeto, siga os passos abaixo:

1. Na pasta do projeto, abra um terminal.
2. Execute o comando abaixo para instalar as dependências:
   
   ```bash
   npm install
   ```
3. Escolha qual forma deseja inicializar: Produção ou Desenvolvedor(auto-refresh)
    ```bash
   npm run start
    ```
    
   ```bash     
   npm run start:dev 
   
## Tecnologias Utilizadas

Node.js, NestJS, MongoDB


    
## Documentação da API
### Documentação no Swagger está em inglês no endpoint: /api
- # Cardápio
  #### Criar um cardápio
    ```http
      POST /menu
    ```

    | Corpo   | Tipo       | Descrição                           |
    | :---------- | :--------- | :---------------------------------- |
    | `Turno` | `enum["DIURNO", "NOTURNO"]` | **Obrigatório**. Podendo cadastrar só um deles ou ambos |

  #### Retorna todos os cardápios
  ```http
    GET /menu
  ```


    #### Retornar de acordo com o horário. Diurno: 06h entre 18h
  ```http
    GET /menu/shift
  ```
    #### Retornar todos os cardápios com os produtos
  ```http
    GET /menu/products
  ```


    #### Retornar o cardápio pelo id
  ```http
    GET /menu/{id}
  ```
    | Parâmetro   | Tipo       | Descrição                           |
    | :---------- | :--------- | :---------------------------------- |
    | `id` | `string` | **Obrigatório**. Retornando o cardápio |

    #### Retornar todos os cardápios com os produtos
  ```http
    GET /menu/{id}/products
  ```
    | Parâmetro   | Tipo       | Descrição                           |
    | :---------- | :--------- | :---------------------------------- |
    | `id` | `string` | **Obrigatório**. Retornando o cardápio com os produtos|

  

    #### Modificar o cardápio 

    ```http
      PUT /menu/${id}
    ```
    **Obs:** Só é possível modificar se não houver o turno que deseja

    | Parâmetro   | Tipo       | Descrição                                   |
    | :---------- | :--------- | :------------------------------------------ |
    | `id`      | `string` | **Obrigatório**. O ID do cardápio que deseja modificar|
    
     | Corpo   | Tipo       | Descrição                                   |
    | :---------- | :--------- | :------------------------------------------ |
    | `shift`      | `enum["DIURNO","NOTURNO"]` | **Obrigatório**. |
    
    #### Deletar o cardápio 

    ```http
      DELETE /menu/${id}
    ```
    **Obs:** Deletar o cardápio apagará em cascada a associação com os produtos
    | Parâmetro   | Tipo       | Descrição                                   |
    | :---------- | :--------- | :------------------------------------------ |
    | `id`      | `string` | **Obrigatório**. O ID do cardápio que deseja deletar| 

- # Categoria

    #### Criar uma nova categoria 
    ```http
      POST /category
    ```
    | Corpo   | Tipo       | Descrição                                   |
    | :---------- | :--------- | :------------------------------------------ |
    | `name`      | `string` | **Obrigatório**. Nome da categoria

    #### Listar todas as categorias 
    ```http
      GET /category
    ```

    #### Listar todas as categorias com os seus produtos
    ```http
      GET /category/products
    ```
    #### Retorna o categorias pelo id
    ```http
      GET /category/{id}
    ```
    | Parâmetro   | Tipo       | Descrição                                   |
    | :---------- | :--------- | :------------------------------------------ |
    | `id`      | `string` | **Obrigatório**. O ID da categoria que deseja buscar| 


    #### Retorna o categorias pelo id com os seus produtos
    ```http
      GET /category/{id}/products
    ```
    | Parâmetro   | Tipo       | Descrição                                   |
    | :---------- | :--------- | :------------------------------------------ |
    | `id`      | `string` | **Obrigatório**. O ID da categoria que deseja buscar| 

    #### Modificar a categoria pelo id
    ```http
      PUT /category/{id}
    ```
    | Parâmetro   | Tipo       | Descrição                                   |
    | :---------- | :--------- | :------------------------------------------ |
    | `id`      | `string` | **Obrigatório**. O ID da categoria que deseja modificar| 

    #### Deletar a categoria pelo id
    **Obs:** Só é possível deletar a categoria se não houver produtos nela
    ```http
      DELETE /category/{id}
    ```
    
    | Parâmetro   | Tipo       | Descrição                                   |
    | :---------- | :--------- | :------------------------------------------ |
    | `id`      | `string` | **Obrigatório**. O ID da categoria que deseja deletar| 


- # Produtos
  #### Criar produto
  ```http
    POST /product
  ```


    | Corpo   | Tipo       | Descrição                                   |
    | :---------- | :--------- | :------------------------------------------ |
    | `name`      | `string` | **Obrigatório**. O nome do produto 
    | `price` | `number` | **Obrigatório**. O valor do produto
    | `image` | `binary` | Imagem do Produto
    | `description` | `string` | Descrição do produto
    | `categoryId` | `string` | **Obrigatório**. ID da categoria
    
  #### Listar produtos
  ```http
    GET /product
  ```

  #### Listar produtos com as categorias
  ```http
    GET /product/category
  ```

  #### Listar produto pelo id
  ```http
    GET /product/{id}
  ```
  | Parâmetro   | Tipo       | Descrição                                   |
    | :---------- | :--------- | :------------------------------------------ |
    | `id`      | `string` | **Obrigatório**. O ID do produto| 

  #### Listar produto pelo id com sua categoria
  ```http
    GET /product/{id}/category
  ```
  | Parâmetro   | Tipo       | Descrição                                   |
    | :---------- | :--------- | :------------------------------------------ |
    | `id`      | `string` | **Obrigatório**. O ID do produto| 

    #### Atualizar produto
  ```http
    PUT /product/{id}
  ```
  | Parâmetro   | Tipo       | Descrição                                   |
    | :---------- | :--------- | :------------------------------------------ |
    | `id`      | `string` | **Obrigatório**. O ID do produto| 

    | Corpo   | Tipo       | Descrição                                   |
    | :---------- | :--------- | :------------------------------------------ |
    | `name`      | `string` | O nome do produto 
    | `price` | `number` | O valor do produto
    | `image` | `binary` | Imagem do Produto
    | `description` | `string` | Descrição do produto
    | `categoryId` | `string` | ID da categoria

    #### Deletar o produto 

    ```http
      DELETE /product/${id}
    ```
    **Obs:** Deletar o produto apagará em cascada a associação com o cardápio 
    | Parâmetro   | Tipo       | Descrição                                   |
    | :---------- | :--------- | :------------------------------------------ |
    | `id`      | `string` | **Obrigatório**. O ID do produto que deseja deletar| 

- # CardapioProduto
  #### Criar produto
  ```http
    POST /menu-product/{menuId}/add-product
  ```
    | Parâmetro   | Tipo       | Descrição                                   |
    | :---------- | :--------- | :------------------------------------------ |
    | `menuId`      | `string` | **Obrigatório**. O ID do cardápio que deseja inserir| 

    | Corpo   | Tipo       | Descrição                                   |
    | :---------- | :--------- | :------------------------------------------ |
    | `ProductIds` | `string[]` | ID dos produtos

  #### Listar todos os produtos com o cardápio
  ```http
    GET /menu-product/{menuId}/products
  ```
    | Parâmetro   | Tipo       | Descrição                                   |
    | :---------- | :--------- | :------------------------------------------ |
    | `menuId`      | `string` | **Obrigatório**.O ID do cardápio que deseja visualizar| 

  #### Deletar vários produtos no cardápio
  ```http
    DELETE /menu-product/{menuId}/remove-product
  ```
    | Parâmetro   | Tipo       | Descrição                                   |
    | :---------- | :--------- | :------------------------------------------ |
    | `menuId`      | `string` | **Obrigatório**.O ID do cardápio que deseja remover os produtos| 
    
    | Corpo   | Tipo       | Descrição                                   |
    | :---------- | :--------- | :------------------------------------------ |
    | `ProductIds` | `string[]` | ID dos produtos

  #### Deletar todos os produtos associado ao cardápio
  ```http
    DELETE /menu-product/{menuId}/remove-all-product
  ```
  | Parâmetro   | Tipo       | Descrição                                   |
    | :---------- | :--------- | :------------------------------------------ |
    | `menuId`      | `string` | **Obrigatório**.O ID do cardápio que deseja remover todos os produtos| 
    
