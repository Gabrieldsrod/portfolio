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
          pt: "Agendo - Gerenciador Inteligente de Cronograma de Estudos",
          en: "Agendo - Smart Study Schedule Manager"
        },
        description: {
          pt: "Plataforma web criada para resolver o problema de organização nos estudos através da distribuição automática de disciplinas por prioridade, dificuldade e horários disponíveis, otimizando o aprendizado e a consistência com algoritmos inteligentes de pesos.",
          en: "Web platform engineered to solve study organization challenges by automatically distributing subjects based on priority, difficulty, and available time slots, optimizing learning consistency through intelligent weighting algorithms."
        },
        technologies: ["Java 21", "Spring Boot", "React", "TypeScript", "Vite", "Tailwind CSS", "PostgreSQL", "Docker", "Swagger", "GitHub Actions", "CI/CD"],
        imageUrl: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1200&q=80",
        githubUrl: "https://github.com/luizamantovani/Projeto-Desenvolvimento-Web",
        deployUrl: "",
        featured: true
      },
      {
        id: 2,
        title: {
          pt: "Sistema de Gestão para CT",
          en: "Training Center Management System (ERP)"
        },
        description: {
          pt: "Plataforma ERP desenvolvida para otimizar e automatizar a administração de Centros de Treinamento, centralizando o controle de alunos, planos familiares e gestão financeira com motor transacional para garantir consistência em recálculos de faturamento e trocas de titulares.",
          en: "Full-stack ERP platform engineered to streamline Training Center administration by centralizing student records, family plans, and financial management with a transactional engine for billing accuracy and seamless account transitions."
        },
        technologies: ["Java 21", "Spring Boot", "React", "TypeScript", "Vite", "PostgreSQL", "Docker", "Swagger"],
        imageUrl: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80",
        githubUrl: "https://github.com/Gabrieldsrod/gestao-ct",
        deployUrl: "",
        featured: true
      },
      {
        id: 3,
        title: {
          pt: "MyWay - Mapa de Acessibilidade",
          en: "MyWay - Accessibility Map App"
        },
        description: {
          pt: "Aplicação mobile e portal geoespacial desenvolvido para mapear, catalogar e compartilhar pontos com acessibilidade urbana na cidade, facilitando a navegação e promovendo a inclusão social através de consultas de localização em tempo real.",
          en: "Mobile application and geospatial portal developed to map, catalog, and share urban accessibility spots across the city, facilitating navigation and social inclusion through real-time location queries."
        },
        technologies: ["TypeScript", "Node.js", "Express", "React Native", "PostgreSQL", "PostGIS", "Drizzle ORM"],
        imageUrl: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1200&q=80",
        githubUrl: "https://github.com/luizamantovani/UPX4_MapaDeAcessibilidade",
        deployUrl: "",
        featured: true
      },
      {
        id: 4,
        title: {
          pt: "AcquaEnergy - Monitoramento Sustentável",
          en: "AcquaEnergy - Sustainable IoT Monitoring"
        },
        description: {
          pt: "Sistema IoT sustentável projetado para incentivar o consumo consciente de água e energia durante o banho, utilizando sensores de presença para telemetria em tempo real e relatórios de conscientização ambiental.",
          en: "Sustainable IoT system designed to foster conscious water and energy usage during showers, utilizing presence sensors for real-time telemetry and environmental awareness reporting."
        },
        technologies: ["ESP32", "C", "IoT", "JavaScript", "HTML/CSS"],
        imageUrl: "https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1200&q=80",
        githubUrl: "https://github.com/Gabrieldsrod/acqua-energy",
        deployUrl: "",
        featured: true
      },
      {
        id: 5,
        title: {
          pt: "EcoLume - Armadilha Solar Automatizada",
          en: "EcoLume - Automated Solar Mosquito Trap"
        },
        description: {
          pt: "Iniciativa de saúde pública e automação sustentável que combate arboviroses (dengue, zika e chikungunya) por meio de armadilhas solares autônomas de captura do Aedes aegypti e portal web de conscientização comunitária e monitoramento de bateria.",
          en: "Public health and sustainable automation initiative fighting mosquito-borne diseases via autonomous solar Aedes aegypti traps paired with a community awareness web portal and battery telemetry."
        },
        technologies: ["ESP32", "C", "JavaScript", "HTML5", "CSS3", "Painel Solar", "IoT", "Mobile Web"],
        imageUrl: "https://images.unsplash.com/photo-1508873696983-2df515122519?auto=format&fit=crop&w=1200&q=80",
        githubUrl: "https://github.com/Gabrieldsrod/EcoLume",
        deployUrl: '',
        featured: true
      },
      {
        id: 6,
        title: {
          pt: "Controle de Mesas de Cacheta",
          en: "Cacheta Card Game Table Controller"
        },
        description: {
          pt: "Aplicativo nativo desenvolvido para otimizar a organização de partidas e torneios de jogos de cartas, automatizando a cronometragem de rodadas, cálculo instantâneo de pontuações e histórico de jogos com armazenamento seguro.",
          en: "Native application developed to streamline card game matches and tournament organization, automating round timers, instant score calculations, and match history with secure storage."
        },
        technologies: ["Java", "Android Studio", "SQLite"],
        imageUrl: "https://images.unsplash.com/photo-1511193311914-0346f16efe90?auto=format&fit=crop&w=1200&q=80",
        githubUrl: "https://github.com/Gabrieldsrod/controle-cacheta",
        deployUrl: '',
        featured: false
      }
    ];
  }
}
