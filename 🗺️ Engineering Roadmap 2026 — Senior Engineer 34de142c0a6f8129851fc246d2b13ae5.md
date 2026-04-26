# 🗺️ Engineering Roadmap 2026 — Senior Engineer

<aside>
🎯 Objetivo: Tornar-me Senior Engineer capaz de definir tech direction, liderar equipas e navegar a era AI sem perder aptidão técnica. ~1h/dia, ~9 meses.

</aside>

<aside>
🛠️ Stack de partida: Node.js · TypeScript · React · Express · PostgreSQL · Electron

</aside>

---

# 📦 Projeto Paralelo — Fio Condutor

Construir um AI Meeting Assistant: uma app que grava reuniões, transcreve com Whisper, gera sumários com LLMs, guarda em PostgreSQL, e tem uma UI em React. Vai crescer a cada fase, incorporando os conceitos aprendidos. Serve de portfólio e prova concreta de aprendizagem.

---

# Fase 1 — Escalabilidade & System Design (Maio–Junho 2026)

<aside>
💡 Foco: entender como sistemas crescem e falham. A maioria dos bugs de produção são problemas de escala que não foram pensados no design inicial.

</aside>

## O que aprender

- System Design fundamentals: load balancing, caching (Redis), CDN, message queues (conceito)
    - [ ]  Ler: system-design-primer — secções de Load Balancing e Caching
    - [ ]  Instalar Redis localmente e fazer cache de uma rota do projeto paralelo
    - [ ]  Desenhar diagrama de como escalarias a tl;dv para 10x utilizadores
    - [ ]  Estudar CAP theorem e perceber o trade-off consistency vs. availability
    - [ ]  Implementar cache invalidation com TTL e testar edge cases
- PostgreSQL avançado: indexes, EXPLAIN ANALYZE, connection pooling (pgBouncer), N+1 queries
    - [ ]  Correr EXPLAIN ANALYZE numa query do projeto e perceber o output
    - [ ]  Criar índices adequados e medir diferença de performance
    - [ ]  Identificar e corrigir pelo menos 3 N+1 queries
    - [ ]  Configurar pgBouncer ou equivalente (connection pooling) no projeto
    - [ ]  Estudar diferença entre índices B-tree, GIN e GiST — quando usar cada um
- Node.js performance: event loop profundo, streams, worker threads, memory leaks
    - [ ]  Ver: "What the heck is the event loop anyway?" (JSConf) — se ainda não viste
    - [ ]  Usar Node.js --prof para fazer profiling de um endpoint lento
    - [ ]  Implementar uma operação de ficheiros com streams em vez de readFile
    - [ ]  Criar um worker thread para uma operação CPU-intensive no projeto
    - [ ]  Detectar e resolver um memory leak com --inspect e Chrome DevTools
- REST API design: idempotência, rate limiting, pagination patterns, versioning
    - [ ]  Adicionar rate limiting à API do projeto (ex: express-rate-limit)
    - [ ]  Implementar cursor-based pagination numa rota de listagem
    - [ ]  Garantir que todas as rotas POST/PUT são idempotentes com idempotency keys
    - [ ]  Definir estratégia de versioning da API (v1/) e documentar no README
- Testing strategy: pirâmide de testes, integration tests com real DB, contract testing
    - [ ]  Desenhar a pirâmide de testes do projeto: quantos unit, integration, e2e?
    - [ ]  Escrever integration tests que correm contra PostgreSQL real (não mock)
    - [ ]  Atingir 70%+ de cobertura nas rotas críticas do projeto
    - [ ]  Explorar Testcontainers para DB em testes de CI

## Recursos

- Livro: "Designing Data-Intensive Applications" — Kleppmann (capítulos 1-4)
- Site: system-design-primer (GitHub) — ler 1 tópico por sessão
- Prática: adicionar Redis cache e PostgreSQL otimizado ao projeto paralelo

## Milestone — estou pronto quando:

- [ ]  Consigo desenhar num quadro branco como escalaria a tl;dv para 10x utilizadores
- [ ]  Identifico e corrijo pelo menos 3 N+1 queries no projeto paralelo com EXPLAIN ANALYZE
- [ ]  Consigo explicar trade-offs de caching (TTL, invalidation, stampede) sem consultar notas

---

# Fase 2 — Arquitectura & Padrões (Julho–Agosto 2026)

<aside>
💡 Foco: escrever código que outros engenheiros conseguem manter e evoluir. Séniors não só escrevem bom código — definem como o código deve ser escrito.

</aside>

## O que aprender

- SOLID, DRY, YAGNI — aplicados, não decorados
    - [ ]  Encontrar 1 violação de cada princípio SOLID no código da tl;dv e documentar
    - [ ]  Refatorar um módulo aplicando SRP (Single Responsibility) — medir antes/depois
    - [ ]  Identificar onde YAGNI foi violado (over-engineering) no projeto paralelo
- Domain-Driven Design (DDD) — conceitos core: entities, aggregates, bounded contexts
    - [ ]  Ler: "Domain-Driven Design Distilled" — Vaughn Vernon (versão curta do livro grande)
    - [ ]  Mapear os bounded contexts do projeto paralelo (ex: auth, meetings, transcriptions)
    - [ ]  Implementar pelo menos 1 aggregate com lógica de domínio encapsulada
    - [ ]  Criar um ubiquitous language glossário para o projeto
- Clean Architecture / Hexagonal Architecture — separação de concerns no Node.js
    - [ ]  Estruturar o projeto paralelo em camadas: domain / application / infrastructure
    - [ ]  Criar ports & adapters: a lógica de negócio não depende de Express nem PostgreSQL
    - [ ]  Escrever testes de domínio sem nenhuma dependência externa (zero mocks de infra)
    - [ ]  Conseguir trocar o ORM sem tocar na lógica de negócio — testar esta independência
- Frontend scalability: React patterns (compound components, render props), state management em escala, micro-frontends (conceito)
    - [ ]  Implementar Compound Components pattern numa UI do projeto
    - [ ]  Auditar state management da app: o que está no server state vs. client state?
    - [ ]  Adicionar React Query (ou similar) para server state — eliminar useEffect fetch patterns
    - [ ]  Ler sobre micro-frontends — perceber quando faz sentido (spoiler: raramente)
- ADR (Architecture Decision Records) — como documentar decisões técnicas
    - [ ]  Ler 5 exemplos de ADRs reais em projetos open-source (GitHub: adr-log)
    - [ ]  Escrever ADR #001: escolha do stack do projeto paralelo (incluindo alternativas rejeitadas)
    - [ ]  Escrever ADR #002: decisão de arquitectura mais difícil do projeto
    - [ ]  Propor introduzir ADRs na tl;dv — apresentar o conceito à equipa
- Code review como ferramenta de ensino — não só encontrar bugs, mas elevar a equipa
    - [ ]  Fazer 10 code reviews na tl;dv focando em ensinar, não só aprovar
    - [ ]  Em cada review: incluir pelo menos 1 comentário que explique o porquê, não o quê
    - [ ]  Escrever guia interno: "Como fazemos code reviews nesta equipa"

## Recursos

- Livro: "Clean Architecture" — Uncle Bob (foco nos capítulos de componentes)
- Refactoring: pegar em código real do trabalho e refatorar com os padrões aprendidos
- Escrever o primeiro ADR para o projeto paralelo

## Milestone — estou pronto quando:

- [ ]  Refatorei uma parte do projeto paralelo para Clean Architecture e consegui explicar o porquê a um colega
- [ ]  Escrevi pelo menos 2 ADRs com trade-offs reais
- [ ]  Fiz um code review que ensinou algo — não só apontou erros

---

# Fase 3 — AI Engineering (Setembro–Outubro 2026)

<aside>
💡 Foco: usar AI como multiplicador de força, não muleta. Saber quando usar, quando não usar, e definir padrões para a equipa.

</aside>

## O que aprender

- LLM fundamentals: tokens, context window, temperatura, system prompts — sem magia negra
    - [ ]  Ler: Anthropic Prompt Engineering Guide (docs.anthropic.com) — do início ao fim
    - [ ]  Experimentar: como temperatura afecta outputs — testar com o mesmo prompt em 0.0, 0.5, 1.0
    - [ ]  Calcular o custo de uma feature LLM antes de a construir (tokens × preço)
    - [ ]  Perceber context window limits e como estruturar prompts para maximizar qualidade
- RAG (Retrieval-Augmented Generation): embeddings, vector search, chunking strategies
    - [ ]  Perceber o que são embeddings — visualizar com t-SNE ou UMAP
    - [ ]  Implementar vector search simples com pgvector (já tens PostgreSQL!)
    - [ ]  Definir chunking strategy para as transcrições do projeto (por frase? por minuto?)
    - [ ]  Construir endpoint "pesquisar em reuniões antigas" usando RAG
    - [ ]  Medir qualidade dos resultados — testar com perguntas reais
- AI Agents: tool use, multi-step reasoning, quando agentes valem a pena vs. simples LLM call
    - [ ]  Implementar tool use: agente que consulta a DB para responder perguntas sobre reuniões
    - [ ]  Construir um agente multi-step que extrai action items de uma transcrição
    - [ ]  Documentar: quando um agente é over-engineering vs. simples LLM call chega
    - [ ]  Testar failure modes: o que acontece quando o agente entra em loop ou falha?
- Anthropic SDK / OpenAI API: function calling, streaming, prompt caching, batch processing
    - [ ]  Implementar streaming de respostas LLM na UI do projeto (Server-Sent Events)
    - [ ]  Adicionar prompt caching para reduzir custos em system prompts longos
    - [ ]  Usar function calling para estruturar output (ex: extrair structured data de texto)
    - [ ]  Comparar custo/qualidade entre Claude Haiku vs Sonnet para cada use case do projeto
- AI no desenvolvimento: usar Copilot/Claude sem degradar skills — regra: entender tudo o que aceitas
    - [ ]  Regra pessoal: nunca aceitar código gerado por AI sem conseguir explicar linha a linha
    - [ ]  Implementar 1 feature completa sem AI — medir dificuldade e o que aprendeste
    - [ ]  Identificar 3 casos onde AI ajuda genuinamente vs 3 onde cria dívida técnica
- Definir guias de uso de AI para a equipa — o que acelera vs. o que cria dívida técnica
    - [ ]  Escrever: "Quando usar AI na tl;dv" — com exemplos concretos de bom e mau uso
    - [ ]  Definir: quais features devem e NÃO devem ser construídas com AI
    - [ ]  Criar checklist de code review para PRs que incluem AI/LLM
    - [ ]  Apresentar o guia à equipa e recolher feedback

## Recursos

- Anthropic docs (prompt engineering guide + tool use) — leitura obrigatória
- Projeto: adicionar transcrição Whisper + sumário Claude ao projeto paralelo
- Projeto: implementar RAG para pesquisar reuniões antigas

## Milestone — estou pronto quando:

- [ ]  Implementei RAG funcional no projeto paralelo — consegues explicar cada passo
- [ ]  Escrevi um guia de AI para a equipa com exemplos concretos de bom e mau uso
- [ ]  Consegues construir uma feature AI completa sem Claude Code (só para provar que consegues)

---

# Fase 4 — DevOps & Observabilidade (Novembro 2026)

<aside>
💡 Foco: saber o que acontece ao código depois de fazer deploy. Séniors não dizem "funciona na minha máquina".

</aside>

## O que aprender

- Docker: containers, multi-stage builds, docker-compose para dev local
    - [ ]  Containerizar o projeto paralelo (Dockerfile + .dockerignore)
    - [ ]  Criar multi-stage build: imagem de dev vs produção (tamanho importa)
    - [ ]  docker-compose com app + PostgreSQL + Redis — um comando para tudo
    - [ ]  Perceber: como funciona layer caching? Como ordenar Dockerfile para builds rápidos?
- CI/CD: GitHub Actions — pipelines de build, test, deploy automáticos
    - [ ]  Criar GitHub Actions workflow: lint + test em cada PR
    - [ ]  Adicionar build Docker + push para registry no merge para main
    - [ ]  Deploy automático para staging em cada push (Fly.io, Railway ou Render — gratuitos)
    - [ ]  Implementar rollback automático se health check falhar após deploy
- Observabilidade: structured logging, distributed tracing (OpenTelemetry), métricas
    - [ ]  Substituir console.log por structured logging (Pino ou Winston) com níveis
    - [ ]  Adicionar correlation ID em todos os requests (para rastrear cross-service)
    - [ ]  Instrumentar com OpenTelemetry e enviar traces para Jaeger (local)
    - [ ]  Criar dashboard simples: latência p50/p95, error rate, throughput
- Feature flags: deploy separado de release, rollout gradual
    - [ ]  Implementar feature flag simples (env var ou DB config) no projeto
    - [ ]  Fazer deploy de uma feature "escondida" atrás de flag — depois activar sem redeploy
    - [ ]  Perceber: como a tl;dv faz feature flags? Propor melhorias se necessário

## Milestone — estou pronto quando:

- [ ]  Projeto paralelo tem CI/CD completo — commit → deploy automático com testes
- [ ]  Consigo diagnosticar um problema de produção usando só logs e traces (sem debugger)

---

# Fase 5 — Liderança Técnica (Dezembro 2026)

<aside>
💡 Foco: multiplicar o impacto através da equipa. Sénior não é o que mais sabe — é o que faz a equipa funcionar melhor.

</aside>

## O que aprender

- Tech specs: como escrever um RFC/design doc que gera consenso
    - [ ]  Ler 5 RFCs/design docs de empresas tech (Stripe, Shopify, etc. têm blogs públicos)
    - [ ]  Escrever tech spec para a próxima feature grande na tl;dv antes de começar a codar
    - [ ]  Incluir na spec: problema, solução proposta, alternativas rejeitadas, riscos, métricas de sucesso
    - [ ]  Conseguir aprovação da equipa na spec — iterar com base no feedback
- Estimativas: como estimar com incerteza, comunicar riscos a não-técnicos
    - [ ]  Ler: "Hofstadter's Law" e "Cone of Uncertainty" — calibrar expectativas sobre estimativas
    - [ ]  Estimar as próximas 5 tasks antes de começar — comparar com tempo real depois
    - [ ]  Aprender a comunicar: "X dias, assumindo que Y não bloqueia" em vez de "não sei"
    - [ ]  Praticar dar estimativas a não-técnicos (PM, CEO) sem jargão
- Mentoring: como fazer pair programming que ensina vs. que faz
    - [ ]  Fazer pair programming com 1 colega júnior — deixar conduzir, fazer perguntas em vez de dar respostas
    - [ ]  Identificar o maior bloqueio de crescimento de 1 colega — ajudar a superá-lo
    - [ ]  Ter 1-on-1 informal com membros da equipa — perceber o que os frustra tecnicamente
- Tech radar: framework para avaliar novas tecnologias (Adopt/Trial/Assess/Hold)
    - [ ]  Estudar: ThoughtWorks Technology Radar (edição mais recente)
    - [ ]  Criar tech radar para a tl;dv: classificar cada tecnologia em Adopt/Trial/Assess/Hold
    - [ ]  Justificar cada classificação com dados ou experiências concretas
    - [ ]  Apresentar o radar à equipa e usar para guiar decisões futuras
- Algoritmos aplicados: não LeetCode por LeetCode — identificar onde algoritmos melhoram código real (trees, graphs, sorting em contexto)
    - [ ]  Identificar 3 lugares no código onde um algoritmo melhor faria diferença real
    - [ ]  Estudar: Big O notation aplicado — não decorar, perceber intuitivamente
    - [ ]  Resolver 10 problemas no LeetCode/Exercism — foco em graphs e trees (úteis no mundo real)
    - [ ]  Optimizar 1 query/algoritmo real na tl;dv com o conhecimento adquirido

## Milestone — estou pronto quando:

- [ ]  Escrevi um tech spec completo para uma feature real e consegui alinhar a equipa com ele
- [ ]  Fiz uma tech talk interna sobre algo aprendido neste roadmap
- [ ]  Criei um tech radar para a equipa com justificações para cada decisão

---

# Fase Bónus — Segunda Linguagem: Go (se sobrar energia)

Go é pragmático: curva rápida vindo de TypeScript, muito usado em tooling e backends de alta performance. Não é prioridade — só avançar aqui se as fases 1-5 estiverem sólidas. 2-3 semanas de Go básico já dá perspetiva nova sobre concorrência e tipos.

---

# Regras do Jogo

1. 1h/dia > 7h ao fim de semana — consistência bate intensidade
2. Não avançar de fase sem fechar os milestones — velocidade falsa cria buracos
3. Cada conceito tem de aparecer no projeto paralelo — sem prática real, não conta
4. AI é ferramenta, não substituto — regra: se não consegues explicar o código, não o aceitas
5. Sair da zona de conforto é o ponto — se tá fácil, estás a fazer errado