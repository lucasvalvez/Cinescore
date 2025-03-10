# CineScore


**Brenda Evers, brenda18_evers@outlook.com**

**Isabella Luiza Dias dos Santos, isabellamg2017@gmail.com**

**Islayder Jackson Ribeiro de Oliveira, islayderjack@gmail.com**

**Leandro Alencar Pereira Clemente, leandro130333.dev@gmail.com**

**Lucas Valente Alves, lucasvalves35@gmail.com**

**Victor Rafael de Neiva Machado, victor.machado886@gmail.com**

---

Professores:

**Aline Norberta de Brito**

**Eveline Alonso Veloso**

**Juliana Amaral Baroni de Carvalho**

---

_Curso de Engenharia de Software_

_Instituto de Informática e Ciências Exatas – Pontifícia Universidade Católica de Minas Gerais (PUC MINAS), Belo Horizonte – MG – Brasil_

---

_**Resumo**_

Este projeto apresenta o desenvolvimento de uma aplicação web projetada para oferecer recomendações personalizadas de filmes e séries, baseada nas interações dos usuários, como os likes atribuídos aos conteúdos. Diante do crescimento exponencial das plataformas de streaming, a ampla gama de opções disponíveis tornou a escolha do que assistir um desafio comum. Para abordar essa dificuldade, o sistema utiliza algoritmos de recomendação que analisam as preferências individuais dos usuários por meio de seus likes, identificando padrões e sugerindo conteúdos alinhados aos seus gostos. Essa abordagem não apenas reduz o tempo necessário para encontrar algo interessante, mas também enriquece a experiência de entretenimento. Além disso, o sistema tem o potencial de contribuir para a retenção de usuários em plataformas de streaming ao aumentar a satisfação e diminuir a taxa de abandono (churn rate), um indicador fundamental para o sucesso dessas plataformas.

---


## 1. Introdução
Este relatório detalha o desenvolvimento de uma aplicação web para recomendações personalizadas de filmes e séries, visando otimizar a escolha de conteúdo alinhado às preferências individuais dos usuários.

### 1.1 Contextualização

---

Com a ascensão das plataformas de streaming, o mercado de entretenimento foi profundamente transformado, oferecendo acesso a uma vasta gama de filmes e séries. Nesse cenário, surgiram diversos serviços e sites especializados para ajudar os usuários a encontrar conteúdo relevante, como [IMDb](https://www.imdb.com), [Rotten Tomatoes](https://www.rottentomatoes.com) e [Metacritic](https://www.metacritic.com), que fornecem resenhas e classificações.

Além das soluções estabelecidas, iniciativas que buscam oferecer recomendações mais personalizadas e inovadoras estão se apliando no mercado. A competição é intensa, com muitos serviços utilizando inteligência artificial e algoritmos avançados para aprimoração da experiência na descoberta de conteúdo.

Essa evolução do mercado demonstra uma crescente demanda por abordagens que ofereçam uma experiência de entretenimento ainda mais ajustada às preferências individuais dos usuários.

---

### 1.2 Problema

As empresas de streaming vêm enfrentando desafios crescentes para oferecer recomendações relevantes e personalizadas aos usuários, visando minimizar o tempo gasto na escolha de conteúdo.

A ausência de recomendações eficazes pode gerar frustração no usuário, que muitas vezes acaba não escolhendo nenhum conteúdo ou gastando um tempo excessivo para decidir o que assistir. Essa situação pode resultar na perda de assinantes, em grande parte devido à insuficiência de sistemas de recomendação que não se baseiam propriamente nas preferências individuais de cada cliente.

---

### 1.3 Objetivo geral

Desenvolver um sistema que oferece recomendações personalizadas de filmes e séries, com base nas opiniões e nas avaliações dos usuários, oferecendo uma experiência mais satisfatória e selecionada com os interesses individuais.

#### 1.3.1 Objetivos específicos

#### 1. **Saber o que o usuário aprecia**
- Obter as preferências do usuário em relação à gênero, direção, atores, duração, classificação indicatória, plataforma de streaming.

#### 2. **Oferecer recomendações de títulos personalizadas**
- Apresentar títulos que se encaixem nas preferências.
- Otimizar tempo de busca por filmes e séries

#### 3. **Buscar por filmes ou séries desejadas**
- Permitir que o usuário busque por filmes ou séries que tenha interesse.
- Possibilitar o uso de filtros para realizar estas buscas.
- Apresentar resultados que compreendam as condições informadas.

#### 4. **Feedback de usuários**
- Permitir que usuários compartilhem opiniões e críticas sobre os títulos.
- Permitir interação entre usuários. 
- Restringir feedbacks ofensivos.

### 1.4 Justificativas

Com o crescimento dos serviços de streaming, surgiram novas implicações, especialmente nas recomendações de filmes e séries. Imagine uma família se preparando para um evento especial, como uma reunião de Natal ou até mesmo um aniversário, mas que acaba enfrentando dificuldades para encontrar um filme que todos gostem. O tempo perdido procurando por algo que agrade a todos pode transformar a experiência em algo tedioso, prejudicando o evento e gerando desapontamento.

Da mesma forma, a falta de recomendações eficazes em plataformas de streaming pode levar a uma situação frustrante para os usuários. Estudos mostram que essa dificuldade contribui para uma taxa de churn significativa. De acordo com a Digital Content Next, 66% dos usuários de streaming se frustram com a busca por conteúdo, e a taxa de churn chega a 25% para aqueles que gastam mais de 10 minutos sem sucesso. A insuficiência dos sistemas de recomendação, que não se baseiam adequadamente nas preferências individuais, resulta em uma experiência insatisfatória, levando os assinantes a abandonar a plataforma e afetando negativamente a retenção e a sustentabilidade financeira das empresas de streaming. Levando em consideração esses dois principais fatores, escolhemos criar um software capaz de solucionar o problema da escolha de filmes e séries.

> **Taxa de churn:** O churn é uma das métricas mais importantes para as empresas, pois avalia quanto de receita ou de clientes a empresa perdeu em um determinado período de tempo. Entender esse índice é essencial para que a empresa continue crescendo de forma sustentável e escalável.

---

## 2. Participantes do processo

### Perfis dos Usuários-Chave

#### 1. **Usuário Geral**
- **Idade:** acima de 13 anos.
- **Gênero:** Diversificado.
- **Aspectos Culturais:** Interesse em filmes e séries variados.
- **Educação:** Ensino básico.
- **Papel:** Recebe recomendações do site, descobre, avalia e oferece feedbacks;

#### 2. **Administrador**
- **Idade:** Acima de 18 anos.
- **Gênero:** Diversificado.
- **Aspectos Culturais:** Responsabilidade e julgamento moral.
- **Educação:** Ensino médio completo.
- **Papel:** Responsável pela atualização e cadastro de títulos.
  
## 3. Modelagem do processo de negócio

### 3.1. Análise da situação atual

Há, atualmente, ferramentas de avaliações e recomendações que oferecem uma variedade de recursos que possibilitam uma escolha mais alinhada aos interesses de seus usuários.

- **Coleta de preferências:** Ao se cadastrar, o usuário responde a uma lista de preferências baseadas em gênero, classificação indicativa e plataforma de streaming. Esta resolução se baseia na coleta de preferências do Pinterest.

- **[IMDb] Disponibilização de informações:** Oferece informações detalhadas de filmes e séries, como direção, elenco, gêneros, data de lançamento e outros detalhes.

- **Oferecimento de recomendações:** Com a lista de preferências preenchida, o sistema utiliza destes metadados para aprimorar a lista de resultados de recomendações e pesquisa com base nas informações detalhadas de filmes e séries.
  
- **Otimização de pesquisa:** Os usuários buscam filmes e séries usando termos e filtros, por exemplo gênero e data de lançamento. O sistema retorna uma lista de resultados com base nos critérios fornecidos e nas preferências do usuário.

---

### 3.2. Descrição geral da proposta de solução

A proposta é desenvolver uma aplicação web para fornecer recomendações personalizadas de filmes e séries, com o objetivo de otimizar a busca por conteúdo e melhorar a experiência do usuário. O sistema analisará as preferências dos usuários, oferecendo sugestões alinhadas aos seus interesses.


#### 3.2.1. Limitações:

**Atualização de Dados:** A necessidade de manutenção contínua para garantir que as informações estejam sempre atualizadas e precisas. 

**Dependência de Dados:** A eficácia da recomendação é diretamente proporcional à quantidade e qualidade dos dados disponíveis. Dados insuficientes ou imprecisos podem limitar a personalização. 

**Privacidade:** É essencial gerenciar dados pessoais com cuidado para garantir conformidade com regulamentações e proteger a privacidade dos usuários.

#### 3.2.2. Ligações com Estratégias e Objetivos do Negócio:

**Melhoria da Experiência do Usuário:** Ao oferecer recomendações mais relevantes, a aplicação reduz o tempo de busca e aumenta a satisfação do usuário. 

**Redução da Taxa de Churn:** A personalização e a relevância das recomendações aumentam a satisfação e retenção de assinantes, reduzindo a taxa de churn. 

**Competitividade:** A oferta de uma experiência de recomendação personalizada destaca a plataforma em um mercado competitivo, atraindo e retendo usuários.

---

### 3.3. Modelagem dos processos

[PROCESSO 1 - GERENCIAR USUÁRIOS](processo_1.md "Detalhamento do Processo 1.")

[PROCESSO 2 - GERENCIAR FAVORITOS](processo_2.md "Detalhamento do Processo 2.")

[PROCESSO 3 - GERENCIAR RECOMENDAÇÕES](processo_3.md "Detalhamento do Processo 3.")

[PROCESSO 4 - GERENCIAR FEEDBACK](processo_4.md "Detalhamento do Processo 4.")

---

## 4. Projeto da solução

_O documento a seguir apresenta o detalhamento do projeto da solução. São apresentadas duas seções que descrevem, respectivamente: modelo relacional e tecnologias._

[Projeto da solução](solution-design.md "Detalhamento do projeto da solução: modelo relacional e tecnologias.")

---

## 5. Indicadores de desempenho

_O documento a seguir apresenta os indicadores de desempenho dos processos._

[Indicadores de desempenho dos processos](performance-indicators.md)

---

## 6. Interface do sistema

_A sessão a seguir apresenta a descrição do produto de software desenvolvido._ 

[Documentação da interface do sistema](interface.md)

---

## 7. Conclusão

O desenvolvimento do CineScore permitiu entender de forma prática como a tecnologia pode melhorar a forma como consumimos conteúdo digital. Usando algoritmos de recomendação, conseguimos identificar os gostos e preferências dos usuários, oferecendo sugestões personalizadas para facilitar a escolha de filmes e séries.

Os resultados mostraram que a combinação de aprendizado de máquina com uma interface fácil de usar realmente melhora a experiência do usuário, ajudando a reduzir o tempo que as pessoas gastam procurando o que assistir. Além disso, o projeto enfatizou a importância de um design focado nas necessidades do usuário e de testar constantemente as funcionalidades com base no retorno deles.

Observações Pessoais:

"Participar do desenvolvimento da CineScore foi uma experiência desafiadora. Aplicar novos conhecimentos ao longo do período em tempo de aprendizado abriu aberturas para dúvidas, questionamentos e reformulações de pensamento. Foi um período turbulento, porém esclarecedor. O trabalho em equipe demonstrou sua tamanha importância ao ser responsável por diminuir o peso das tarefas. Mando um agredecimento e um forte abraço a todos os membros desta equipe que, apesar das adversidades, demonstraram interesse e se esforçaram para contribuir com o projeto."

(Brenda Evers)

"Foi surpreendente ver como as nossas decisões de design afetaram diretamente a usabilidade da aplicação, tornando-a mais intuitiva e fácil de usar para os usuários. A cada nova implementação, conseguíamos perceber o impacto positivo na experiência do usuário, o que tornou o processo ainda mais incentivador."

(Isabella Luiza Dias dos Santos)

"Trabalhar no CineScore foi um grande desafio que me tirou da zona de conforto e me fez pensar em como tornar a experiência do usuário realmente especial. Um dos maiores obstáculos foi ajustar os algoritmos para que as recomendações fossem relevantes, mas também imprevisíveis o suficiente para surpreender o usuário. Ver a evolução do sistema e ouvir o feedback positivo foi o que realmente fez tudo valer a pena."

(Islayder Jackson Ribeiro de Oliveira)

"Um dos momentos mais desafiadores para mim foi encontrar o equilíbrio perfeito entre a complexidade dos algoritmos de recomendação e a simplicidade da interface. Às vezes, parecia que estávamos lutando contra o tempo e os detalhes técnicos, mas quando conseguimos resolver um problema complicado, a sensação de conquista foi indescritível. Aprendi muito sobre a importância de testar e iterar com base em feedback real, o que nos ajudou a criar uma experiência mais personalizada."

(Leandro Alencar Pereira Clemente)

"Minha maior lição foi entender que, para criar algo que realmente funcione, precisamos colocar o usuário no centro de todas as decisões. Tivemos que repensar muitas vezes a abordagem inicial e ajustar o design para que a plataforma fosse não só funcional, mas intuitiva. Essa experiência me fez perceber como pequenas mudanças podem ter um grande impacto no modo como as pessoas interagem com a tecnologia."

(Lucas Valente Alves)

"Trabalhar em um sistema de recomendação me mostrou como essa tecnologia pode expandir horizontes, ajudando os usuários a descobrir filmes e séries que talvez nunca encontrassem sozinhos. É gratificante saber que estamos criando uma ferramenta que não apenas facilita escolhas, mas também apresenta novas histórias e experiências aos usuários."

(Victor Rafael de Neiva Machado)

Sugestões para Estudos Futuros:

  - Integração com Redes Sociais: Permitir que os usuários compartilhem suas recomendações e interajam com outros perfis.
  - Integração com novas APIs: Expandir a variedade do catálogo ao conectar com mais plataformas de streaming para oferecer recomendações ainda mais diversificadas.
  - Aplicativo Mobile: Expandir a experiência para dispositivos móveis, utilizando frameworks.

# REFERÊNCIAS

**[1.1]** - _INTERNET MOVIE DATABASE. IMDb. Disponível em: https://www.imdb.com. Acesso em: 3 set. 2024._

**[1.2]** - _ROTTEN TOMATOES. Rotten Tomatoes. Disponível em: https://www.rottentomatoes.com. Acesso em: 3 set. 2024._

**[1.3]** - _METACRITIC. Metacritic. Disponível em: https://www.metacritic.com. Acesso em: 3 set. 2024._

**[1.4]** - _SUTHERLAND, Jeffrey Victor. **Scrum: a arte de fazer o dobro do trabalho na metade do tempo**. 2. ed. rev. São Paulo, SP: Leya, 2016. 236, [4] p. ISBN 9788544104514._

**[1.5]** - _RUSSELL, Stuart J.; NORVIG, Peter. **Inteligência artificial**. Rio de Janeiro: Elsevier, c2013. xxi, 988 p. ISBN 9788535237016._

**[3.2.3.3]** - _GOOGLE. Google Analytics. Disponível em: https://developers.google.com/analytics?hl=pt-br. Acesso em: 9 set. 2024.



# APÊNDICES

_Atualizar os links e adicionar novos links para que a estrutura do código esteja corretamente documentada._

## Apêndice A - Código fonte

[Código do front-end](../src/front) -- repositório do código do front-end

[Código do back-end](../src/back)  -- repositório do código do back-end


## Apêndice B - Apresentação final


[Slides da apresentação final](presentations/)


[Vídeo da apresentação final](video/)






