# CineScore

Este projeto descreve o desenvolvimento de uma aplicação web focada em fornecer recomendações personalizadas de filmes e séries, visando facilitar a escolha de conteúdos alinhados com as preferências dos usuários. Com o crescimento das plataformas de streaming, a vasta gama de opções disponíveis tornou a escolha do que assistir um desafio significativo para muitos usuários. A proposta busca resolver esse problema utilizando algoritmos que analisam preferências individuais, otimizando o tempo de busca e melhorando a experiência de entretenimento. Como resultado, espera-se melhorar a satisfação dos usuários e reduzir a taxa de churn, um indicador crucial para a retenção em plataformas de streaming.

## Integrantes

* Brenda Evers
* Isabella Luiza Dias dos Santos
* Islayder Jackson Ribeiro de Oliveira
* Leandro Alencar Pereira Clemente
* Lucas Valente Alves
* Victor Rafael de Neiva Machado

## Professor

* Aline Norberta de Brito
* Eveline Alonso Veloso
* Juliana Amaral Baroni de Carvalho

## Instruções de utilização

### 1. Instalação de Dependências
Para executar o sistema, você precisará instalar as seguintes dependências em sua máquina:

1. **Java Development Kit (JDK)**:
   - Baixe e instale o [Java JDK 21](https://www.oracle.com/java/technologies/javase/jdk21-downloads.html).

2. **Spring Boot**:
   - O Spring Boot é integrado ao projeto, então não é necessário instalá-lo separadamente. Verifique se você tem o `Maven` ou `Gradle` configurado para gerenciar dependências.

3. **PostgreSQL**:
   - Baixe e instale o [PostgreSQL](https://www.postgresql.org/download/).
   - Configure um banco de dados no PostgreSQL para a aplicação.

4. **pgAdmin**:
   - Baixe e instale o [pgAdmin](https://www.pgadmin.org/download/), uma interface gráfica para gerenciar bancos de dados PostgreSQL.

5. **IDE para Backend (Eclipse ou NetBeans)**:
   - Abra o projeto na sua IDE de escolha e certifique-se de ter o suporte ao Spring Boot configurado.

6. **Visual Studio Code (VSCode) para Frontend**:
   - Instale o [VSCode](https://code.visualstudio.com/) e adicione extensões úteis, como "Live Server" para executar o frontend.

### 2. Configuração do Projeto

1. **Configuração do Banco de Dados**:
   - No arquivo `application.properties` ou `application.yml` do backend (em `src/main/resources`), ajuste as propriedades do banco de dados para refletir sua configuração do pgAdmin:
     ```properties
     spring.datasource.url=jdbc:postgresql://localhost:5432/seu_banco_de_dados
     spring.datasource.username=seu_usuario
     spring.datasource.password=sua_senha
     spring.datasource.driver-class-name=org.postgresql.Driver
     spring.jpa.hibernate.ddl-auto=update
     ```

2. **Alterar Senha do Banco de Dados**:
   - Verifique se a senha do banco de dados está corretamente configurada no código-fonte e substitua pelo seu usuário do pgAdmin ou PostgreSQL.

### 3. Executando a Aplicação
1. **Backend (Spring Boot)**:
   - Abra o projeto na sua IDE (Eclipse ou NetBeans).
   - Compile e execute o backend. Normalmente, você pode fazer isso clicando com o botão direito do mouse no projeto e selecionando "Run as" > "Spring Boot App".

2. **Frontend (VSCode)**:
   - Abra a pasta do frontend no VSCode.
   - Execute o servidor local para testar a interface com a extensão "Live Server". Clique com o botão direito em `index.html` e selecione "Open with Live Server".

### 4. Funcionalidades do Sistema
- **Cadastro e Login**: O sistema permite que os usuários se cadastrem e façam login para acessar funcionalidades exclusivas.
- **Visualização de Filmes**: Clique em um card de filme para abrir um popup com mais informações.
- **Listas de Favoritos**: Adicione e visualize filmes favoritos.
- **Edição de Senha**: Os usuários podem alterar sua senha na tela de perfil.
- **Logout**: A funcionalidade de logout estará disponível como padrão para garantir que o usuário saia da sessão.

### 5. Considerações Finais
- Certifique-se de que todas as dependências estão instaladas e configuradas corretamente antes de executar o projeto.
- Verifique o console da IDE para mensagens de erro e logs, que podem ajudar na solução de problemas durante a execução.
---

## Histórico de Versões

### Indicadores de Desempenho
- **0.8.1**  
  - **CHANGE**: Atualização das documentações para incluir os indicadores de desempenho.  
- **0.8.0**  
  - Implementação dos indicadores de desempenho do sistema.  
- **0.0.8**  
  - Trabalho inicial na modelagem dos indicadores de desempenho.  

### Processo 4: Gerenciar Feedback
- **0.7.1**  
  - **CHANGE**: Atualização das documentações do Processo 4 (Gerenciar Feedback).  
- **0.7.0**  
  - Implementação das funcionalidades de:  
    - Comentar.  
    - Dar like ou deslike.  
- **0.0.7**  
  - Trabalho inicial na modelagem das funcionalidades relacionadas ao Processo 4 (Gerenciar Feedback).  

### Processo 3: Gerenciar Recomendações
- **0.6.1**  
  - **CHANGE**: Atualização das documentações do Processo 3 (Gerenciar Recomendações).  
- **0.6.0**  
  - Implementação das funcionalidades de:  
    - Visualizar listas de recomendações para filmes e séries.  
- **0.0.6**  
  - Trabalho inicial na modelagem das funcionalidades relacionadas ao Processo 3 (Gerenciar Recomendações).  

### Processo 2: Gerenciar Favoritos
- **0.5.1**  
  - **CHANGE**: Atualização das documentações para o Processo 2 (Gerenciar Favoritos).  
- **0.5.0**  
  - Implementação das funcionalidades de:  
    - Visualizar listas de filmes e séries.  
    - Visualizar lista de favoritos.  
    - Visualizar detalhes.  
    - Adicionar filmes e séries aos favoritos.  
- **0.0.5**  
  - Trabalho inicial na modelagem das funcionalidades relacionadas ao Processo 2 (Gerenciar Favoritos).  

### Processo 1: Gerenciar Usuários
- **0.4.1**  
  - **CHANGE**: Atualização das documentações para o Processo 1 (Gerenciar Usuários).  
- **0.4.0**  
  - Implementação das funcionalidades de:  
    - Efetuar login.  
    - Efetuar cadastro.  
    - Configurar conta.  
- **0.0.4**  
  - Trabalho inicial na modelagem das funcionalidades relacionadas ao Processo 1 (Gerenciar Usuários).  

### Modelo de Dados
- **0.3.1**  
  - **CHANGE**: Atualização da documentação do modelo de dados. Código permaneceu inalterado.  
- **0.3.0**  
  - Finalização da documentação do modelo de dados para o sistema.  
- **0.0.3**  
  - Trabalho inicial na modelagem do modelo de dados.  

### Modelagem de Processos de Negócio
- **0.2.1**  
  - **CHANGE**: Atualização das documentações. Código permaneceu inalterado.  
- **0.2.0**  
  - Expansão e detalhamento da modelagem dos processos de negócio.  
- **0.0.2**  
  - Trabalho inicial na documentação de modelagem de processos.  

### Estrutura Inicial
- **0.1.1**  
  - **CHANGE**: Atualização das documentações. Código permaneceu inalterado.  
- **0.1.0**  
  - Criação da visão geral dos processos de negócio e estrutura básica da documentação.  
- **0.0.1**  
  - Trabalho inicial na modelagem do processo de negócio.  

---
