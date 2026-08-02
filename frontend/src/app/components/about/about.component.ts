import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../services/language.service';

interface TechItem {
  name: string;
  category: 'backend' | 'frontend' | 'devopsDb';
  iconSvg?: string;
  badge: string;
}

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- About Section -->
    <section id="about" class="py-20 relative bg-zinc-100/50 dark:bg-zinc-900/30 border-y border-zinc-200/60 dark:border-zinc-800/60 transition-colors duration-300">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Header -->
        <div class="max-w-3xl space-y-3 mb-12">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-red-600/10 text-red-600 dark:text-red-500 text-xs font-mono font-semibold uppercase tracking-wider">
            <span>// {{ lang.t().about.badge }}</span>
          </div>
          <h2 class="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
            {{ lang.t().about.title }}
          </h2>
          <p class="text-zinc-600 dark:text-zinc-400 text-base sm:text-lg">
            {{ lang.t().about.subtitle }}
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <!-- Left Column: Bio Paragraphs & Highlights -->
          <div class="lg:col-span-7 space-y-6 text-zinc-700 dark:text-zinc-300 leading-relaxed text-base sm:text-lg">
            <p class="bg-white dark:bg-zinc-900/80 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
              {{ lang.t().about.p1 }}
            </p>
            <p class="bg-white dark:bg-zinc-900/80 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
              {{ lang.t().about.p2 }}
            </p>

            <!-- Profile Highlight Cards -->
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              
              <!-- Card 1: Academic (FACENS Link) -->
              <a href="https://facens.br" target="_blank" rel="noopener noreferrer" class="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-2 hover:border-red-600/60 dark:hover:border-red-500/60 transition-colors group block" title="Visitar site da FACENS">
                <div class="flex items-center justify-between">
                  <div class="p-2 rounded-lg bg-red-600/10 text-red-600 dark:text-red-500 group-hover:scale-105 transition-transform w-fit">
                    <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path d="M12 14l9-5-9-5-9 5 9 5z" />
                      <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                    </svg>
                  </div>
                  <svg class="w-4 h-4 text-zinc-400 group-hover:text-red-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </div>
                <div>
                  <h4 class="text-sm font-bold text-zinc-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-500 transition-colors flex items-center gap-1">
                    <span>{{ lang.t().about.card1Title }}</span>
                  </h4>
                  <p class="text-xs font-medium text-zinc-500 dark:text-zinc-400">{{ lang.t().about.card1Sub }}</p>
                </div>
              </a>

              <!-- Card 2: Role (FIT Link) -->
              <a href="https://www.fit-tecnologia.org.br" target="_blank" rel="noopener noreferrer" class="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-2 hover:border-red-600/60 dark:hover:border-red-500/60 transition-colors group block" title="Visitar site do FIT">
                <div class="flex items-center justify-between">
                  <div class="p-2 rounded-lg bg-red-600/10 text-red-600 dark:text-red-500 group-hover:scale-105 transition-transform w-fit">
                    <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <svg class="w-4 h-4 text-zinc-400 group-hover:text-red-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </div>
                <div>
                  <h4 class="text-sm font-bold text-zinc-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-500 transition-colors flex items-center gap-1">
                    <span>{{ lang.t().about.card2Title }}</span>
                  </h4>
                  <p class="text-xs font-medium text-zinc-500 dark:text-zinc-400">{{ lang.t().about.card2Sub }}</p>
                </div>
              </a>

              <!-- Card 3: Projects -->
              <div class="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-2 hover:border-red-600/40 dark:hover:border-red-500/40 transition-colors">
                <div class="p-2 rounded-lg bg-red-600/10 text-red-600 dark:text-red-500 w-fit">
                  <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <div>
                  <h4 class="text-sm font-bold text-zinc-900 dark:text-white">{{ lang.t().about.card3Title }}</h4>
                  <p class="text-xs font-medium text-zinc-500 dark:text-zinc-400">{{ lang.t().about.card3Sub }}</p>
                </div>
              </div>

            </div>
          </div>

          <!-- Right Column: Visual Avatar / Engineering Badge -->
          <div class="lg:col-span-5 flex justify-center">
            <div class="relative w-full max-w-sm aspect-square rounded-3xl p-1 bg-gradient-to-b from-red-600/30 via-zinc-400/20 to-zinc-900/40 shadow-2xl flex items-center justify-center">
              <div class="w-full h-full rounded-[22px] bg-zinc-900 p-8 flex flex-col justify-between relative overflow-hidden text-zinc-100">
                <!-- Background Grid Accent -->
                <div class="absolute inset-0 opacity-10 bg-[radial-gradient(#dc2626_1px,transparent_1px)] [background-size:16px_16px]"></div>
                
                <div class="flex items-center justify-between relative z-10">
                  <span class="px-3 py-1 rounded-full bg-red-600/20 border border-red-500/30 text-red-400 text-xs font-mono font-semibold">
                    TECH INTERN
                  </span>
                  <span class="w-3 h-3 rounded-full bg-emerald-500"></span>
                </div>

                <div class="space-y-2 relative z-10 my-auto py-6">
                  <div class="font-mono text-xs text-red-400">class ComputerEngineer &#123;</div>
                  <div class="pl-4 font-mono text-xs text-zinc-400">name = "Gabriel da Silva Rodrigues";</div>
                  <div class="pl-4 font-mono text-xs text-zinc-400">university = "FACENS";</div>
                  <div class="pl-4 font-mono text-xs text-zinc-400">targetRole = "Desenvolvedor Backend / Fullstack";</div>
                  <div class="pl-4 font-mono text-xs text-zinc-400">technologies = ["Java", "Spring Boot", "TypeScript", "React", "PostgreSQL", "ESP32"];</div>
                  <div class="font-mono text-xs text-red-400">&#125;</div>
                </div>

                <div class="pt-4 border-t border-zinc-800 text-xs text-zinc-400 flex items-center justify-between relative z-10">
                  <span>Tecnologia & Sustentabilidade</span>
                  <span class="font-mono text-red-500 font-bold">v4.0</span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>

    <!-- Stack Section -->
    <section id="stack" class="py-20 relative bg-zinc-50 dark:bg-[#09090B] transition-colors duration-300">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Header -->
        <div class="max-w-3xl space-y-3 mb-16">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-red-600/10 text-red-600 dark:text-red-500 text-xs font-mono font-semibold uppercase tracking-wider">
            <span>// {{ lang.t().stack.badge }}</span>
          </div>
          <h2 class="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
            {{ lang.t().stack.title }}
          </h2>
          <p class="text-zinc-600 dark:text-zinc-400 text-base sm:text-lg">
            {{ lang.t().stack.subtitle }}
          </p>
        </div>

        <!-- Tech Stack Grid Categories -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <!-- Category 1: Backend & APIs -->
          <div class="p-6 rounded-2xl bg-white dark:bg-zinc-900/90 border border-zinc-200 dark:border-zinc-800/80 shadow-sm space-y-6 hover:border-red-600/40 dark:hover:border-red-500/40 transition-all">
            <div class="flex items-center gap-3">
              <div class="p-3 rounded-xl bg-red-600/10 text-red-600 dark:text-red-500">
                <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                </svg>
              </div>
              <h3 class="text-xl font-bold text-zinc-900 dark:text-white">
                {{ lang.t().stack.backend }}
              </h3>
            </div>

            <div class="flex flex-wrap gap-2">
              <span *ngFor="let item of backendTechs"
                    class="px-3 py-1.5 rounded-lg text-xs font-semibold bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-200/80 dark:border-zinc-700/60 hover:border-red-600 dark:hover:border-red-500 transition-colors">
                {{ item }}
              </span>
            </div>
          </div>

          <!-- Category 2: Frontend & UI -->
          <div class="p-6 rounded-2xl bg-white dark:bg-zinc-900/90 border border-zinc-200 dark:border-zinc-800/80 shadow-sm space-y-6 hover:border-red-600/40 dark:hover:border-red-500/40 transition-all">
            <div class="flex items-center gap-3">
              <div class="p-3 rounded-xl bg-red-600/10 text-red-600 dark:text-red-500">
                <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 class="text-xl font-bold text-zinc-900 dark:text-white">
                {{ lang.t().stack.frontend }}
              </h3>
            </div>

            <div class="flex flex-wrap gap-2">
              <span *ngFor="let item of frontendTechs"
                    class="px-3 py-1.5 rounded-lg text-xs font-semibold bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-200/80 dark:border-zinc-700/60 hover:border-red-600 dark:hover:border-red-500 transition-colors">
                {{ item }}
              </span>
            </div>
          </div>

          <!-- Category 3: DevOps & DB -->
          <div class="p-6 rounded-2xl bg-white dark:bg-zinc-900/90 border border-zinc-200 dark:border-zinc-800/80 shadow-sm space-y-6 hover:border-red-600/40 dark:hover:border-red-500/40 transition-all">
            <div class="flex items-center gap-3">
              <div class="p-3 rounded-xl bg-red-600/10 text-red-600 dark:text-red-500">
                <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                </svg>
              </div>
              <h3 class="text-xl font-bold text-zinc-900 dark:text-white">
                {{ lang.t().stack.devopsDb }}
              </h3>
            </div>

            <div class="flex flex-wrap gap-2">
              <span *ngFor="let item of devopsTechs"
                    class="px-3 py-1.5 rounded-lg text-xs font-semibold bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-200/80 dark:border-zinc-700/60 hover:border-red-600 dark:hover:border-red-500 transition-colors">
                {{ item }}
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  `
})
export class AboutComponent {
  readonly lang = inject(LanguageService);

  readonly backendTechs = [
    'Java', 'Spring Boot', 'Node.js', 'NestJs', 'TypeScript', 'JavaScript', 'C',
  ];

  readonly frontendTechs = [
    'React', 'React Native', 'Angular', 'TypeScript', 'HTML', 'CSS', 
  ];

  readonly devopsTechs = [
    'PostgreSQL', 'SQLite', 'Docker', 'ESP32 & IoT'
  ];
}
