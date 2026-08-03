# 🚀 Portfólio Pessoal - Gabriel Rodrigues

[![Live Demo](https://img.shields.io/badge/demo-gabrieldsrod.dev.br-red?style=for-the-badge&logo=googlechrome)](https://gabrieldsrod.dev.br)
[![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)](https://angular.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)

Bem-vindo ao repositório do meu portfólio pessoal e profissional! Desenvolvido com **Angular**, **Tailwind CSS v4** e **TypeScript**, a aplicação foi projetada para oferecer uma experiência moderna, performática e interativa aos visitantes.

🌐 **Acesse online:** [gabrieldsrod.dev.br](https://gabrieldsrod.dev.br)

---

## ✨ Destaques & Funcionalidades

- 🎨 **Design Moderno & Temas (Dark / Light Mode):** Alternância fluida entre tema claro e escuro com persistência de preferência do usuário.
- 🌐 **Internacionalização (i18n):** Suporte nativo a múltiplos idiomas (Português e Inglês).
- ⚡ **Hero Interativo com Partículas:** Efeito visual dinâmico com HTML5 Canvas e animações fluidas.
- 📂 **Vitrine de Projetos:** Exibição detalhada de projetos com filtros dinâmicos por categoria/tecnologia.
- 📄 **Download de CV:** Botão direto para visualização e download do currículo em PDF.
- 📱 **100% Responsivo & PWA Ready:** Otimizado para dispositivos móveis, tablets e desktops com suporte a Service Worker.
- 🚀 **SSR (Server-Side Rendering):** Renderização no lado do servidor com `@angular/ssr` para melhor performance e SEO.

---

## 🛠️ Tecnologias Utilizadas

### Frontend
- **Framework:** Angular 21 (Componentes Standalone, Signals)
- **Estilização:** Tailwind CSS v4 & PostCSS
- **Linguagem:** TypeScript
- **Testes:** Vitest & JSDOM

### Infraestrutura & Deploy
- **Containerização:** Docker & Docker Compose
- **Web Server / Proxy Reverso:** Nginx
- **HTTPS / SSL:** Let's Encrypt / Certbot

---

## 📁 Estrutura do Projeto

```text
portfolio/
├── frontend/                 # Código-fonte da aplicação Angular
│   ├── public/               # Arquivos estáticos (imagens, ícones, PDF do CV)
│   ├── src/
│   │   └── app/
│   │       ├── components/   # Componentes (Hero, About, Projects, Contact, Header, Footer)
│   │       ├── models/       # Interfaces e modelos de dados
│   │       └── services/     # Serviços (LanguageService, ThemeService, ProjectService)
│   ├── angular.json          # Configurações do Angular CLI
│   └── package.json          # Dependências do projeto
├── docker-compose.yml        # Configuração do Docker Compose para deploy
├── nginx-proxy.conf.example  # Exemplo de configuração do Nginx no Host
└── DEPLOYMENT.md             # Guia completo de hospedagem e deploy em produção
```

---

## 🔧 Como Rodar o Projeto Localmente

### Pré-requisitos
- **Node.js** (versão 20 ou superior recomendada)
- **npm** (incluso com Node.js)

### Passos

1. **Clonar o repositório:**
   ```bash
   git clone https://github.com/Gabrieldsrod/portfolio.git
   cd portfolio/frontend
   ```

2. **Instalar as dependências:**
   ```bash
   npm install
   ```

3. **Iniciar o servidor de desenvolvimento:**
   ```bash
   npm start
   # ou
   ng serve
   ```

4. **Acessar no navegador:**
   Abra [http://localhost:4200](http://localhost:4200) para visualizar a aplicação.

---

## 🧪 Comandos Úteis

No diretório `frontend/`:

- `npm start` – Inicia o servidor local de desenvolvimento (`http://localhost:4200`).
- `npm run build` – Compila o projeto otimizado para produção na pasta `dist/`.
- `npm test` – Executa a suíte de testes unitários com Vitest.

---

## 🐳 Deploy e Hospedagem

O projeto conta com suporte completo para execução via **Docker** e deploy em servidor/VM (ex: Ubuntu/Debian) com **Nginx** como Proxy Reverso.

Para detalhes completos de como fazer o deploy na sua própria máquina virtual, consulte o guia dedicado em [DEPLOYMENT.md](DEPLOYMENT.md).

---

## 📞 Contato

- **Website:** [gabrieldsrod.dev.br](https://gabrieldsrod.dev.br)
- **LinkedIn:** [linkedin.com/in/gabrieldsrod](https://www.linkedin.com/in/gabrieldsrod/)
- **GitHub:** [github.com/Gabrieldsrod](https://github.com/Gabrieldsrod)
- **E-mail:** gabrieldsrodrigues19@gmail.com

---

© Gabriel Rodrigues.
