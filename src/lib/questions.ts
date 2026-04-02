export interface Question {
  n: number;
  tema: string;
  nivel: string;
  enunciado: string;
  opcoes: string[];
  gabarito: number;
}

export const questions: Question[] = [
  {
    n: 1,
    tema: "NeonDB",
    nivel: "Básico",
    enunciado: "O NeonDB é classificado como qual tipo de banco de dados?",
    opcoes: [
      "Banco de dados NoSQL orientado a documentos",
      "Banco de dados relacional baseado em PostgreSQL com arquitetura serverless",
      "Banco de dados de grafos",
      "Sistema de cache em memória como Redis",
      "Sistema de arquivos distribuídos na nuvem",
    ],
    gabarito: 1,
  },
  {
    n: 2,
    tema: "NeonDB",
    nivel: "Básico",
    enunciado: "Qual linguagem de consulta é utilizada pelo NeonDB?",
    opcoes: [
      "MongoDB Query Language (MQL)",
      "GraphQL",
      "SQL (baseado em PostgreSQL)",
      "Cypher",
      "OQL (Object Query Language)",
    ],
    gabarito: 2,
  },
  {
    n: 3,
    tema: "NeonDB",
    nivel: "Intermediário",
    enunciado:
      "Qual das seguintes opções representa uma vantagem do NeonDB em relação a um PostgreSQL tradicional instalado localmente?",
    opcoes: [
      "Não suporta transações ACID",
      "Não permite criação de índices nas tabelas",
      "Possui escalonamento automático e recurso de branch de banco de dados",
      "Só funciona em ambiente local sem acesso externo",
      "Não aceita conexões de aplicações web",
    ],
    gabarito: 2,
  },
  {
    n: 4,
    tema: "NeonDB",
    nivel: "Intermediário",
    enunciado: "O que é um 'branch' no contexto do NeonDB?",
    opcoes: [
      "Uma tabela especial para armazenar backups automáticos",
      "Um tipo de índice avançado para acelerar consultas",
      "Uma cópia isolada do banco de dados usada para testes ou desenvolvimento sem afetar o banco principal",
      "Um usuário com permissões de administrador",
      "Uma view materializada do banco de dados",
    ],
    gabarito: 2,
  },
  {
    n: 5,
    tema: "Diagrama de Caso de Uso",
    nivel: "Básico",
    enunciado:
      "No diagrama de caso de uso (UML), o que representa um Ator?",
    opcoes: [
      "Uma função interna do sistema",
      "Um banco de dados conectado ao sistema",
      "Uma entidade externa (usuário ou sistema) que interage com o sistema em desenvolvimento",
      "Um servidor de aplicação",
      "Um processo interno de processamento de dados",
    ],
    gabarito: 2,
  },
  {
    n: 6,
    tema: "Diagrama de Caso de Uso",
    nivel: "Básico",
    enunciado:
      "Como é representado visualmente um Caso de Uso no diagrama UML?",
    opcoes: [
      "Por um retângulo com o nome do caso",
      "Por uma elipse (oval) contendo o nome do caso de uso",
      "Por um losango (diamante)",
      "Por um círculo com um X dentro",
      "Por um triângulo apontando para cima",
    ],
    gabarito: 1,
  },
  {
    n: 7,
    tema: "Diagrama de Caso de Uso",
    nivel: "Intermediário",
    enunciado:
      "O que significa o relacionamento <<include>> entre dois casos de uso?",
    opcoes: [
      "Um caso de uso pode, opcionalmente, ser executado junto com outro",
      "Um caso de uso sempre chama (inclui obrigatoriamente) outro caso de uso ao ser executado",
      "Um ator está excluído de participar de um caso de uso",
      "Dois casos de uso são totalmente independentes entre si",
      "Um caso de uso substitui completamente outro",
    ],
    gabarito: 1,
  },
  {
    n: 8,
    tema: "Diagrama de Caso de Uso",
    nivel: "Intermediário",
    enunciado:
      "Qual é o papel do relacionamento <<extend>> no diagrama de caso de uso?",
    opcoes: [
      "Indica que um caso de uso sempre executa outro obrigatoriamente",
      "Indica que um caso de uso pode, condicionalmente, estender a funcionalidade de outro",
      "Representa herança entre atores do sistema",
      "Define o fluxo principal e único do sistema",
      "Representa um banco de dados externo ao sistema",
    ],
    gabarito: 1,
  },
  {
    n: 9,
    tema: "Query Básica SQL",
    nivel: "Básico",
    enunciado:
      "Qual comando SQL é utilizado para buscar dados de uma tabela?",
    opcoes: ["GET", "FETCH", "SELECT", "FIND", "RETRIEVE"],
    gabarito: 2,
  },
  {
    n: 10,
    tema: "Query Básica SQL",
    nivel: "Básico",
    enunciado:
      "Como se filtra o resultado de uma consulta SQL para retornar apenas registros com uma condição específica?",
    opcoes: [
      "SELECT * FROM tabela FILTER coluna = 'valor'",
      "SELECT * FROM tabela WHERE coluna = 'valor'",
      "SELECT * FROM tabela HAVING coluna = 'valor'",
      "SELECT * FROM tabela IF coluna = 'valor'",
      "SELECT * FROM tabela WHEN coluna = 'valor'",
    ],
    gabarito: 1,
  },
  {
    n: 11,
    tema: "Query Básica SQL",
    nivel: "Básico",
    enunciado:
      "Qual cláusula SQL é usada para ordenar os resultados de uma consulta?",
    opcoes: ["SORT BY", "GROUP BY", "ORDER BY", "ARRANGE BY", "RANK BY"],
    gabarito: 2,
  },
  {
    n: 12,
    tema: "Query Básica SQL",
    nivel: "Intermediário",
    enunciado: "O que faz a cláusula GROUP BY em uma consulta SQL?",
    opcoes: [
      "Ordena os resultados em ordem crescente por padrão",
      "Remove registros duplicados da consulta",
      "Agrupa linhas com valores iguais em uma coluna para uso com funções de agregação (COUNT, SUM, AVG)",
      "Cria uma nova tabela com os resultados da consulta",
      "Define permissões de acesso à tabela consultada",
    ],
    gabarito: 2,
  },
  {
    n: 13,
    tema: "Relacionamento de Tabelas",
    nivel: "Básico",
    enunciado:
      "O que é uma chave primária (PRIMARY KEY) em um banco de dados relacional?",
    opcoes: [
      "Uma senha criptografada para acessar o banco de dados",
      "Um campo que identifica de forma única cada registro dentro de uma tabela",
      "Obrigatoriamente o primeiro campo de qualquer tabela",
      "Um índice criado automaticamente em todas as colunas",
      "Uma tabela especial de controle de acesso",
    ],
    gabarito: 1,
  },
  {
    n: 14,
    tema: "Relacionamento de Tabelas",
    nivel: "Básico",
    enunciado: "O que é uma chave estrangeira (FOREIGN KEY)?",
    opcoes: [
      "Uma chave criptografada usada para segurança dos dados",
      "Um campo em uma tabela que referencia a chave primária de outra tabela, criando um relacionamento",
      "O último campo de qualquer tabela relacional",
      "Uma chave usada exclusivamente em consultas externas ao sistema",
      "Um campo que armazena apenas datas e horários",
    ],
    gabarito: 1,
  },
  {
    n: 15,
    tema: "Relacionamento de Tabelas",
    nivel: "Intermediário",
    enunciado:
      "Qual tipo de relacionamento ocorre quando um registro na tabela A pode se relacionar com vários registros na tabela B, e um registro em B também pode se relacionar com vários em A?",
    opcoes: [
      "1:1 (Um para Um)",
      "1:N (Um para Muitos)",
      "N:M (Muitos para Muitos)",
      "0:1 (Zero ou Um)",
      "N:1 (Muitos para Um)",
    ],
    gabarito: 2,
  },
  {
    n: 16,
    tema: "Relacionamento de Tabelas",
    nivel: "Intermediário",
    enunciado:
      "Para implementar corretamente um relacionamento N:M (Muitos para Muitos) em um banco de dados relacional, é necessário:",
    opcoes: [
      "Criar apenas uma nova coluna em uma das tabelas envolvidas",
      "Criar uma tabela intermediária (associativa) que contém as chaves estrangeiras das duas tabelas",
      "Usar somente índices nas tabelas originais sem modificações",
      "Criar uma view que une as duas tabelas",
      "Usar um campo do tipo ARRAY em uma das tabelas",
    ],
    gabarito: 1,
  },
  {
    n: 17,
    tema: "Diagrama de Classes",
    nivel: "Básico",
    enunciado:
      "No diagrama de classes (UML), o que representa um atributo de uma classe?",
    opcoes: [
      "Um método (comportamento/operação) da classe",
      "Uma característica ou propriedade que descreve o estado de um objeto da classe",
      "Uma herança entre duas classes",
      "Uma interface implementada pela classe",
      "Um relacionamento de dependência entre objetos",
    ],
    gabarito: 1,
  },
  {
    n: 18,
    tema: "Diagrama de Classes",
    nivel: "Básico",
    enunciado:
      "Como é representada a herança (generalização) no diagrama de classes UML?",
    opcoes: [
      "Por uma linha tracejada com seta aberta",
      "Por uma linha sólida com seta aberta (triângulo) apontando para a superclasse (classe pai)",
      "Por um losango preenchido conectando as classes",
      "Por uma linha dupla entre as classes",
      "Por uma seta com um X na ponta",
    ],
    gabarito: 1,
  },
  {
    n: 19,
    tema: "Diagrama de Classes",
    nivel: "Intermediário",
    enunciado:
      "O que representa a multiplicidade '1..*' em um relacionamento no diagrama de classes?",
    opcoes: [
      "Exatamente um objeto, nada mais",
      "No mínimo um objeto, podendo ter mais de um",
      "Zero ou um objeto (opcional)",
      "Qualquer quantidade de objetos, incluindo zero",
      "Exatamente dois objetos sempre",
    ],
    gabarito: 1,
  },
  {
    n: 20,
    tema: "Diagrama de Classes",
    nivel: "Intermediário",
    enunciado:
      "Qual é a principal diferença entre Agregação e Composição no diagrama de classes?",
    opcoes: [
      "Não há diferença prática; são termos sinônimos na UML",
      "Na composição, o objeto parte NÃO pode existir sem o todo; na agregação o objeto parte pode existir de forma independente",
      "Na agregação, o objeto parte não pode existir sem o todo; na composição pode existir independente",
      "Agregação é usada apenas em relacionamentos de herança múltipla",
      "Composição é representada por uma linha tracejada e agregação por linha sólida",
    ],
    gabarito: 1,
  },
];
