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
    copyEmail: string;
    emailCopied: string;
    linkedinDesc: string;
    githubDesc: string;
    emailDesc: string;
    clickToCopy: string;
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
      greeting: 'Olá, eu sou',
      name: 'Gabriel da Silva Rodrigues',
      role: 'Desenvolvedor Fullstack (Foco em Backend)',
      summary: 'Desenvolvedor Fullstack com foco em Java e Spring Boot. Atualmente estagiário no FIT, onde auxilio no desenvolvimento de APIs, aplicações web e integrações com IoT.',
      ctaProjects: 'Ver Projetos',
      ctaCv: 'Baixar Currículo'
    },
    about: {
      badge: 'Sobre Mim',
      title: 'Desenvolvimento backend, sistemas web e projetos práticos',
      subtitle: 'Estagiário de Tecnologia no FIT & Cursando Engenharia da Computação na FACENS',
      p1: 'Sou estagiário de tecnologia no FIT (Flextronics Instituto de Tecnologia) e estudante de Engenharia da Computação na FACENS. No meu dia a dia, escrevo código para resolver problemas reais e aplico na prática o que aprendo durante meus estudos.',
      p2: 'Meu foco principal é no ecossistema Java com Spring Boot para construção de APIs e serviços backend robustos. Também trabalho com TypeScript, React, Node.js, PostgreSQL, Docker, Linux e integração com microcontroladores ESP32 com C++.',
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
      subtitle: 'Linguagens, frameworks e ferramentas que utilizo no meu dia a dia de trabalho e projetos.',
      backend: 'Backend & Linguagens',
      frontend: 'Frontend & Mobile',
      devopsDb: 'Banco de Dados & Ferramentas',
      learning: 'Atualmente Aprendendo',
      learningBadge: 'Em Foco'
    },
    projects: {
      badge: 'Portfólio',
      title: 'Projetos em Destaque',
      subtitle: 'Alguns dos projetos que desenvolvi em backend, web, mobile e automação IoT.',
      filterAll: 'Todos',
      filterFeatured: 'Destaques',
      viewCode: 'Código Fonte',
      viewDeploy: 'Demo / Live',
      noProjects: 'Nenhum projeto encontrado.'
    },
    contact: {
      badge: 'Redes Sociais & Contato',
      title: 'Vamos conversar?',
      subtitle: 'Quer trocar uma ideia sobre tecnologia, projetos ou oportunidades? Entre em contato!',
      emailLabel: 'E-mail Principal',
      locationLabel: 'Localização',
      locationValue: 'Brasil',
      availabilityLabel: 'Status Atual',
      availabilityValue: 'Estagiário de Tecnologia no FIT',
      connectLinkedIn: 'Conectar no LinkedIn',
      connectGitHub: 'Ver Repositórios no GitHub',
      connectEmail: 'Enviar pelo Gmail',
      connectWhatsApp: 'Enviar Mensagem no WhatsApp',
      copyEmail: 'Copiar Endereço de E-mail',
      emailCopied: 'E-mail Copiado!',
      linkedinDesc: 'Acompanhe minha trajetória profissional e se conecte comigo no LinkedIn.',
      githubDesc: 'Confira meus repositórios, projetos pessoais e código-fonte no GitHub.',
      emailDesc: 'Mande uma mensagem direta por e-mail para falarmos sobre oportunidades ou projetos.',
      clickToCopy: 'Clique para copiar'
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
      role: 'Fullstack Developer (Backend Focused)',
      summary: 'Fullstack Developer focused on Java and Spring Boot. Currently a Technology Intern at FIT, helping develop APIs, web applications, and IoT integrations.',
      ctaProjects: 'Explore Projects',
      ctaCv: 'Download Resume'
    },
    about: {
      badge: 'About Me',
      title: 'Backend engineering, web systems, and practical projects',
      subtitle: 'Technology Intern at FIT & Computer Engineering Student at FACENS',
      p1: 'I am a Technology Intern at FIT (Flextronics Institute of Technology) and a Computer Engineering student at FACENS. Daily, I write code to solve real-world problems and put software development concepts into practice.',
      p2: 'My main focus is the Java ecosystem with Spring Boot for building robust APIs and backend services. I also work with TypeScript, React, Node.js, PostgreSQL, Docker, Linux, and ESP32 IoT microcontrollers with C++.',
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
      title: 'Tech Stack & Tools',
      subtitle: 'Languages, frameworks, and tools I use daily for software development.',
      backend: 'Backend & Languages',
      frontend: 'Frontend & Mobile',
      devopsDb: 'Databases & Tools',
      learning: 'Currently Learning',
      learningBadge: 'In Focus'
    },
    projects: {
      badge: 'Portfolio',
      title: 'Featured Projects',
      subtitle: 'Projects I built covering backend services, web applications, mobile, and IoT.',
      filterAll: 'All',
      filterFeatured: 'Featured',
      viewCode: 'Source Code',
      viewDeploy: 'Live Demo',
      noProjects: 'No projects found.'
    },
    contact: {
      badge: 'Social Networks & Contact',
      title: "Let's Talk",
      subtitle: 'Want to talk about tech, projects, or work opportunities? Reach out!',
      emailLabel: 'Primary Email',
      locationLabel: 'Location',
      locationValue: 'Brazil',
      availabilityLabel: 'Current Status',
      availabilityValue: 'Technology Intern at FIT',
      connectLinkedIn: 'Connect on LinkedIn',
      connectGitHub: 'Explore GitHub Repositories',
      connectEmail: 'Send via Gmail',
      connectWhatsApp: 'Message on WhatsApp',
      copyEmail: 'Copy Email Address',
      emailCopied: 'Email Copied!',
      linkedinDesc: 'Connect with me on LinkedIn to follow my career updates.',
      githubDesc: 'Explore my repositories, open-source work, and code samples on GitHub.',
      emailDesc: 'Send a direct email to discuss work opportunities or software projects.',
      clickToCopy: 'Click to copy'
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
