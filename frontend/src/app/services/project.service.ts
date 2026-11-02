import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { Project } from '../models/project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private readonly http = inject(HttpClient);
  private readonly jsonUrl = 'assets/data/projects.json';

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.jsonUrl).pipe(
      catchError(error => {
        console.error('Erro ao carregar os projetos:', error);
        return of(this.getFallbackProjects());
      })
    );
  }

  private getFallbackProjects(): Project[] {
    return [
      {
        id: 1,
        title: {
          pt: "NFCareVet - Gestão Hospitalar Veterinária com NFC",
          en: "NFCareVet - NFC Veterinary Hospital Management"
        },
        description: {
          pt: "Plataforma para gestão hospitalar veterinária à beira-leito, concebida com arquitetura backend completa em NestJS, Prisma e PostgreSQL. Implementa controle de acesso RBAC, leitura instantânea de prontuários via tags NFC, motor transacional para prescrições médicas e suporte a cabeçalhos de idempotência para sincronização segura em rotinas offline.",
          en: "Bedside veterinary hospital management platform featuring a robust RESTful API built with NestJS, Prisma, and PostgreSQL. Features role-based access control (RBAC), instant patient record retrieval via NFC tags, transactional prescription processing, and idempotency headers for reliable offline synchronization."
        },
        technologies: ["NestJS", "TypeScript", "Prisma", "PostgreSQL", "Docker", "JWT", "Swagger", "RESTful API"],
        imageUrl: "/assets/images/nfcarevet.webp",
        githubUrl: "https://github.com/gabrieldsrod/NFCareVet",
        deployUrl: "https://nfcarevet.gabrieldsrod.dev.br",
        videoDemoUrl: "",
        featured: true,
        category: "backend"
      },
      {
        id: 2,
        title: {
          pt: "Sistema de Gestão para CT",
          en: "Training Center Management System (ERP)"
        },
        description: {
          pt: "Sistema ERP completo para administração de Centros de Treinamento e academias, desenvolvido com Java 21 e Spring Boot. Centraliza a gestão de alunos, planos familiares e faturamento recorrente, utilizando motor transacional para assegurar consistência financeira em recálculos de mensalidades e trocas de titularidade.",
          en: "Full-stack ERP system for Training Centers and athletic facilities, built with Java 21 and Spring Boot. Centralizes student enrollment, family plan subscriptions, and recurring billing, utilizing a transactional engine to guarantee financial consistency across billing recalculations and account transfers."
        },
        technologies: ["Java 21", "Spring Boot", "React", "TypeScript", "Vite", "Tailwind CSS", "PostgreSQL", "Docker", "Swagger"],
        imageUrl: "/assets/images/gestao-ct.png",
        githubUrl: "https://github.com/Gabrieldsrod/gestao-ct",
        deployUrl: "",
        videoDemoUrl: "",
        featured: true,
        category: "backend"
      },
      {
        id: 3,
        title: {
          pt: "Agendo - Gerenciador Inteligente de Cronograma de Estudos",
          en: "Agendo - Smart Study Schedule Manager"
        },
        description: {
          pt: "Plataforma web para planejamento acadêmico adaptativo, desenvolvida com Spring Boot, React e PostgreSQL. Distribui disciplinas automaticamente através de algoritmos de pesos baseados em prioridade, nível de dificuldade e tempo disponível, integrando esteira de CI/CD automatizada via GitHub Actions.",
          en: "Adaptive academic schedule planning platform built with Spring Boot, React, and PostgreSQL. Automatically balances study subjects using weighted scoring based on priority, difficulty, and time availability, supported by automated CI/CD pipelines via GitHub Actions."
        },
        technologies: ["Java 21", "Spring Boot", "React", "TypeScript", "Vite", "Tailwind CSS", "PostgreSQL", "Docker", "Swagger", "GitHub Actions", "CI/CD"],
        imageUrl: "/assets/images/agendo.png",
        githubUrl: "https://github.com/luizamantovani/Projeto-Desenvolvimento-Web",
        deployUrl: "",
        videoDemoUrl: "",
        featured: true,
        category: "fullstack"
      },
      {
        id: 4,
        title: {
          pt: "MyWay - Mapa de Acessibilidade",
          en: "MyWay - Accessibility Map App"
        },
        description: {
          pt: "Aplicativo mobile e portal geoespacial para mapeamento colaborativo de acessibilidade urbana. Desenvolvido com React Native e PostgreSQL/PostGIS, permite localizar, cadastrar e consultar rotas acessíveis e pontos adaptados na cidade em tempo real, promovendo inclusão e mobilidade urbana.",
          en: "Mobile app and geospatial platform for collaborative urban accessibility mapping. Built with React Native, PostgreSQL, and PostGIS, enabling real-time discovery and registration of accessible city routes and infrastructure to foster inclusive urban mobility."
        },
        technologies: ["React Native", "TypeScript", "PostgreSQL", "PostGIS", "Mobile"],
        imageUrl: "/assets/images/my-way.png",
        githubUrl: "https://github.com/luizamantovani/UPX4_MapaDeAcessibilidade",
        deployUrl: "",
        videoDemoUrl: "https://youtu.be/mrEebpdq9mQ?si=prbe3G0S6GgLsGbo",
        featured: true,
        category: "mobile"
      },
      {
        id: 5,
        title: {
          pt: "Portfólio Profissional",
          en: "Professional Portfolio"
        },
        description: {
          pt: "Aplicação web moderna e de alta performance desenvolvida em Angular 21 com Server-Side Rendering (SSR) e arquitetura reativa por Signals. Conta com suporte nativo a múltiplos idiomas (PT/EN), alternância dinâmica de tema (Dark/Light), design responsivo com Tailwind CSS v4 e deploy em contêiner Docker.",
          en: "Modern, high-performance web application engineered in Angular 21 with Server-Side Rendering (SSR) and Signals-based state management. Features native bilingual support (PT/EN), dynamic theme switching, responsive design with Tailwind CSS v4, and Docker containerized deployment."
        },
        technologies: ["Angular 21", "TypeScript", "Tailwind CSS", "SSR", "HTML5", "Docker"],
        imageUrl: "/assets/images/portfolio.webp",
        githubUrl: "https://github.com/Gabrieldsrod/portfolio",
        deployUrl: "https://gabrieldsrod.dev.br",
        videoDemoUrl: "",
        featured: true,
        category: "frontend"
      },
      {
        id: 6,
        title: {
          pt: "EcoLume - Armadilha Solar Automatizada",
          en: "EcoLume - Automated Solar Mosquito Trap"
        },
        description: {
          pt: "Sistema autônomo de combate a arboviroses combinando armadilha solar inteligente e portal web de conscientização. Desenvolvido com microcontrolador ESP32 e firmware em C/C++, implementa telemetria de nível de bateria, captura automatizada de vetores e monitoramento ambiental sustentável.",
          en: "Autonomous vector control system combining a solar-powered smart trap with an environmental awareness portal. Powered by an ESP32 microcontroller with C/C++ firmware, featuring battery telemetry, automated mosquito capture mechanisms, and sustainable operation."
        },
        technologies: ["ESP32", "C/C++", "IoT", "Painel Solar", "JavaScript", "HTML5/CSS3"],
        imageUrl: "/assets/images/eco-lume.jpg",
        githubUrl: "https://github.com/Gabrieldsrod/EcoLume",
        deployUrl: "",
        videoDemoUrl: "https://youtu.be/3HZcfjDJ0Jg?si=Jhhmww4fwH2tS8rw",
        featured: false,
        category: "iot"
      },
      {
        id: 7,
        title: {
          pt: "AcquaEnergy - Monitoramento Sustentável",
          en: "AcquaEnergy - Sustainable IoT Monitoring"
        },
        description: {
          pt: "Dispositivo IoT para monitoramento em tempo real do consumo de água e energia elétrica durante banhos. Construído com microcontrolador ESP32 e sensores de presença e fluxo, oferece telemetria instantânea, alertas de limite de consumo e estimativas de impacto ambiental.",
          en: "IoT smart metering device for real-time telemetry of water and electrical energy consumption during showers. Built with ESP32 microcontrollers and environmental sensors, providing immediate usage feedback, quota alerts, and sustainability metrics."
        },
        technologies: ["ESP32", "C/C++", "IoT", "Sensores", "JavaScript"],
        imageUrl: "/assets/images/acqua-energy.png",
        githubUrl: "https://github.com/Gabrieldsrod/acqua-energy",
        deployUrl: "",
        videoDemoUrl: "https://youtu.be/sXAoivzwp-M?si=Yp5VTHXqVHsTD0Nv",
        featured: false,
        category: "iot"
      },
      {
        id: 8,
        title: {
          pt: "Controle de Mesas de Cacheta",
          en: "Cacheta Card Game Table Controller"
        },
        description: {
          pt: "Aplicativo Android nativo desenvolvido em Java para organização e arbitragem de partidas e torneios de Cacheta. Automatiza cronometragem de turnos, validação de pontuações em tempo real e persistência local de histórico de jogos com SQLite.",
          en: "Native Android application built in Java for managing matches and tournament tables for the Cacheta card game. Automates turn timers, real-time score calculations, and local match history persistence using SQLite."
        },
        technologies: ["Java", "Android Studio", "SQLite"],
        imageUrl: "/assets/images/cacheta.png",
        githubUrl: "https://github.com/Gabrieldsrod/controle-cacheta",
        deployUrl: "",
        videoDemoUrl: "",
        featured: false,
        category: "mobile"
      }
    ];
  }
}
