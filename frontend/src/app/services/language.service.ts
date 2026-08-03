import { Injectable, signal, computed, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type Language = 'pt' | 'en';

export interface Translations {
  nav: {
    about: string;
    stack: string;
    projects: string;
    contact: string;
  };
  hero: {
    status: string;
    greeting: string;
    name: string;
    role: string;
    summary: string;
    ctaProjects: string;
    ctaCv: string;
  };
  about: {
    badge: string;
    title: string;
    subtitle: string;
    p1: string;
    p2: string;
    card1Title: string;
    card1Sub: string;
    card2Title: string;
    card2Sub: string;
    card3Title: string;
    card3Sub: string;
    snippetRole: string;
    snippetTagline: string;
  };
  stack: {
    badge: string;
    title: string;
    subtitle: string;
    backend: string;
    frontend: string;
    devopsDb: string;
    learning: string;
    learningBadge: string;
  };
  projects: {
    badge: string;
    title: string;
    subtitle: string;
    filterAll: string;
    filterFeatured: string;
    viewCode: string;
    viewDeploy: string;
    noProjects: string;
  };
  contact: {
    badge: string;
    title: string;
    subtitle: string;
    emailLabel: string;
    locationLabel: string;
    locationValue: string;
    availabilityLabel: string;
    availabilityValue: string;
    connectLinkedIn: string;
    connectGitHub: string;
    connectEmail: string;
    connectWhatsApp: string;
  };
  footer: {
    rights: string;
    builtWith: string;
  };
}

const DICTIONARY: Record<Language, Translations> = {
  pt: {
    nav: {
      about: 'Sobre Mim',
      stack: 'Habilidades',
      projects: 'Projetos',
      contact: 'Contato'
    },
    hero: {
      status: 'Estagiário de Tecnologia no FIT',
      greeting: 'Olá, meu nome é',
      name: 'Gabriel da Silva Rodrigues',
      role: 'Estagiário de Tecnologia no FIT | Desenvolvedor Fullstack (Foco em Backend)',
      summary: 'Desenvolvedor Fullstack com foco principal em Backend, especializado em criar APIs robustas, arquiteturas escaláveis e microsserviços com Java e Spring Boot, além de interfaces frontend reativas e ecossistemas IoT.',
      ctaProjects: 'Ver Projetos',
      ctaCv: 'Baixar CV'
    },
    about: {
      badge: 'Sobre Mim',
      title: 'Construindo tecnologia com foco em inovação & sustentabilidade',
      subtitle: 'Estagiário no FIT & Cursando Engenharia da Computação na FACENS',
      p1: 'Atualmente atuando como Estagiário de Tecnologia no FIT - Flextronics Instituto de Tecnologia e cursando Engenharia da Computação na FACENS, busco constante evolução conectando conceitos teóricos com a construção diária de sistemas práticos.',
      p2: 'Com atuação Fullstack e forte direcionamento para desenvolvimento Backend e arquitetura de software, possuo sólida experiência em ecossistemas Java (Spring Boot), Node.js, TypeScript e React, além de bancos de dados relacionais (PostgreSQL), conteinerização com Docker e soluções IoT com ESP32.',
      card1Title: 'FACENS',
      card1Sub: 'Eng. da Computação (2024 - Presente)',
      card2Title: 'FIT',
      card2Sub: 'Estágio em Tech (Jun/2026 - Presente)',
      card3Title: '+5 Projetos',
      card3Sub: 'Mobile, Web & IoT',
      snippetRole: 'Desenvolvedor Fullstack (Foco em Backend)',
      snippetTagline: 'Tecnologia & Sustentabilidade'
    },
    stack: {
      badge: 'Tecnologias & Skills',
      title: 'Minha Stack Tecnológica',
      subtitle: 'Linguagens, frameworks e ferramentas que utilizo no meu dia a dia de estudos e projetos.',
      backend: 'Backend & Linguagens',
      frontend: 'Frontend & Mobile',
      devopsDb: 'Banco de Dados & Ferramentas',
      learning: 'Atualmente Aprendendo',
      learningBadge: 'Em Foco'
    },
    projects: {
      badge: 'Portfólio',
      title: 'Projetos em Destaque',
      subtitle: 'Conheça meus projetos do GitHub em automação, IoT, aplicações web e mobile.',
      filterAll: 'Todos',
      filterFeatured: 'Destaques',
      viewCode: 'Código Fonte',
      viewDeploy: 'Demo / Live',
      noProjects: 'Nenhum projeto encontrado.'
    },
    contact: {
      badge: 'Redes Sociais & Contato',
      title: 'Vamos nos Conectar?',
      subtitle: 'Sinta-se à vontade para me mandar uma mensagem, acompanhar meus projetos no GitHub ou se conectar no LinkedIn!',
      emailLabel: 'E-mail Principal',
      locationLabel: 'Localização',
      locationValue: 'Brasil',
      availabilityLabel: 'Status Atual',
      availabilityValue: 'Estagiário de Tecnologia no FIT',
      connectLinkedIn: 'Conectar no LinkedIn',
      connectGitHub: 'Ver Repositórios no GitHub',
      connectEmail: 'Enviar E-mail Direto',
      connectWhatsApp: 'Enviar Mensagem no WhatsApp'
    },
    footer: {
      rights: 'Todos os direitos reservados.',
      builtWith: 'Desenvolvido com Angular 19 & Tailwind CSS v4'
    }
  },
  en: {
    nav: {
      about: 'About Me',
      stack: 'Skills',
      projects: 'Projects',
      contact: 'Contact'
    },
    hero: {
      status: 'Technology Intern at FIT',
      greeting: "Hello, I'm",
      name: 'Gabriel da Silva Rodrigues',
      role: 'Technology Intern at FIT | Fullstack Developer (Backend Focused)',
      summary: 'Software Engineering student & Fullstack Developer with a primary focus on Backend engineering, specializing in building robust APIs, scalable architectures, and microservices with Java and Spring Boot, as well as reactive frontend apps and IoT solutions.',
      ctaProjects: 'Explore Projects',
      ctaCv: 'Download Resume'
    },
    about: {
      badge: 'About Me',
      title: 'Engineering technology with focus on innovation & sustainability',
      subtitle: 'Technology Intern at FIT & Computer Engineering Student at FACENS',
      p1: 'Currently working as a Technology Intern at FIT - Flextronics Institute of Technology while pursuing Computer Engineering at FACENS, I constantly bridge academic theory with hands-on software development to deliver real-world solutions.',
      p2: 'Working as a Fullstack Developer with a primary focus on Backend engineering and clean software architecture, I have solid experience across Java (Spring Boot), Node.js, TypeScript, and React, alongside relational databases (PostgreSQL), Docker containerization, and ESP32 IoT integrations.',
      card1Title: 'FACENS',
      card1Sub: 'Computer Eng. (2024 - Present)',
      card2Title: 'FIT',
      card2Sub: 'Tech Intern (Jun/2026 - Present)',
      card3Title: '5+ Projects',
      card3Sub: 'Mobile, Web & IoT',
      snippetRole: 'Fullstack Developer (Backend Focused)',
      snippetTagline: 'Technology & Sustainability'
    },
    stack: {
      badge: 'Technologies & Skills',
      title: 'Tech Stack & Ecosystem',
      subtitle: 'Languages, frameworks, and tools I use daily for projects and software engineering.',
      backend: 'Backend & Languages',
      frontend: 'Frontend & Mobile',
      devopsDb: 'Databases & Tools',
      learning: 'Currently Learning',
      learningBadge: 'In Focus'
    },
    projects: {
      badge: 'Portfolio',
      title: 'Featured Projects',
      subtitle: 'Discover my GitHub projects spanning automation, IoT, web, and mobile apps.',
      filterAll: 'All',
      filterFeatured: 'Featured',
      viewCode: 'Source Code',
      viewDeploy: 'Live Demo',
      noProjects: 'No projects found.'
    },
    contact: {
      badge: 'Social Networks & Contact',
      title: "Let's Connect",
      subtitle: "Feel free to reach out, follow my GitHub repositories, or connect on LinkedIn!",
      emailLabel: 'Primary Email',
      locationLabel: 'Location',
      locationValue: 'Brazil',
      availabilityLabel: 'Current Status',
      availabilityValue: 'Technology Intern at FIT',
      connectLinkedIn: 'Connect on LinkedIn',
      connectGitHub: 'Explore GitHub Repositories',
      connectEmail: 'Send Direct Email',
      connectWhatsApp: 'Message on WhatsApp'
    },
    footer: {
      rights: 'All rights reserved.',
      builtWith: 'Engineered with Angular 19 & Tailwind CSS v4'
    }
  }
};

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private readonly platformId = inject(PLATFORM_ID);
  
  readonly currentLang = signal<Language>('pt');

  readonly t = computed<Translations>(() => DICTIONARY[this.currentLang()]);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      const savedLang = localStorage.getItem('portfolio_lang') as Language;
      if (savedLang === 'pt' || savedLang === 'en') {
        this.currentLang.set(savedLang);
      } else {
        const browserLang = navigator.language.toLowerCase();
        if (browserLang.startsWith('en')) {
          this.currentLang.set('en');
        }
      }
    }
  }

  setLanguage(lang: Language): void {
    this.currentLang.set(lang);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('portfolio_lang', lang);
    }
  }

  toggleLanguage(): void {
    const nextLang: Language = this.currentLang() === 'pt' ? 'en' : 'pt';
    this.setLanguage(nextLang);
  }
}
