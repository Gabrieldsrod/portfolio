import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="contact" class="py-20 relative bg-zinc-50 dark:bg-[#09090B] border-t border-zinc-200/60 dark:border-zinc-800/60 transition-colors duration-300">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Header -->
        <div class="max-w-3xl space-y-3 mb-16 text-center mx-auto">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-red-600/10 text-red-600 dark:text-red-500 text-xs font-mono font-semibold uppercase tracking-wider">
            <span>// {{ lang.t().contact.badge }}</span>
          </div>
          <h2 class="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
            {{ lang.t().contact.title }}
          </h2>
          <p class="text-zinc-600 dark:text-zinc-400 text-base sm:text-lg">
            {{ lang.t().contact.subtitle }}
          </p>
        </div>

        <!-- Social Networks Interactive Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          
          <!-- 1. LinkedIn Card -->
          <div class="group relative p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-2xl hover:border-blue-600/50 dark:hover:border-blue-500/50 transition-all duration-300 flex flex-col justify-between space-y-6">
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <div class="p-3.5 rounded-2xl bg-blue-600/10 text-blue-600 dark:text-blue-400">
                  <svg class="w-7 h-7 fill-current" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </div>
                <span class="text-xs font-mono px-2.5 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 font-medium">Professional</span>
              </div>

              <div class="space-y-1">
                <h3 class="text-xl font-bold text-zinc-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  LinkedIn
                </h3>
                <p class="text-xs font-mono text-zinc-500 dark:text-zinc-400">/in/gabrieldsrod</p>
              </div>

              <p class="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Acompanhe minha trajetória profissional, conexões e publicações sobre desenvolvimento.
              </p>
            </div>

            <a
              href="https://www.linkedin.com/in/gabrieldsrod/"
              target="_blank"
              rel="noopener noreferrer"
              class="w-full py-3.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-md shadow-blue-600/20 flex items-center justify-center gap-2 transition-all">
              <span>{{ lang.t().contact.connectLinkedIn }}</span>
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>

          <!-- 2. GitHub Card -->
          <div class="group relative p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-2xl hover:border-gray-600/50 dark:hover:border-gray-500/50 transition-all duration-300 flex flex-col justify-between space-y-6">
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <div class="p-3.5 rounded-2xl bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white">
                  <svg class="w-7 h-7 fill-current" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                  </svg>
                </div>
                <span class="text-xs font-mono px-2.5 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 font-medium">Open Source</span>
              </div>

              <div class="space-y-1">
                <h3 class="text-xl font-bold text-zinc-900 dark:text-white group-hover:text-gray-500 dark:group-hover:text-gray-500 transition-colors">
                  GitHub
                </h3>
                <p class="text-xs font-mono text-zinc-500 dark:text-zinc-400">&#64;Gabrieldsrod</p>
              </div>

              <p class="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Confira meus repositórios, commits, projetos pessoais e código fonte de estudos.
              </p>
            </div>

            <a
              href="https://github.com/Gabrieldsrod"
              target="_blank"
              rel="noopener noreferrer"
              class="w-full py-3.5 px-4 rounded-xl bg-zinc-900 dark:bg-zinc-800 hover:bg-gray-600 dark:hover:bg-gray-600 text-white font-semibold text-xs shadow-md transition-all flex items-center justify-center gap-2">
              <span>{{ lang.t().contact.connectGitHub }}</span>
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>

          <!-- 3. E-mail Card -->
          <div class="group relative p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-2xl hover:border-red-600/50 dark:hover:border-red-500/50 transition-all duration-300 flex flex-col justify-between space-y-6">
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <div class="p-3.5 rounded-2xl bg-red-600/10 text-red-600 dark:text-red-500">
                  <svg class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <span class="text-xs font-mono px-2.5 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 font-medium">Direct Mail</span>
              </div>

              <div class="space-y-1">
                <h3 class="text-xl font-bold text-zinc-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-500 transition-colors">
                  E-mail
                </h3>
                <p class="text-xs font-mono text-zinc-500 dark:text-zinc-400 select-all cursor-pointer hover:text-red-600 dark:hover:text-red-500 transition-colors" (click)="copyEmail()" title="Clique para copiar">
                  gabrieldsrodrigues19&#64;gmail.com
                </p>
              </div>

              <p class="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Prefere conversa direta por e-mail? Mande uma mensagem para tratarmos de propostas ou projetos.
              </p>
            </div>

            <div class="space-y-2">
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=gabrieldsrodrigues19@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                class="w-full py-3.5 px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold text-xs shadow-md shadow-red-600/25 flex items-center justify-center gap-2 transition-all">
                <span>{{ lang.t().contact.connectEmail }}</span>
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>

              <button
                type="button"
                (click)="copyEmail()"
                class="w-full py-2.5 px-4 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 font-medium text-xs flex items-center justify-center gap-2 transition-all cursor-pointer">
                <svg *ngIf="!copied()" class="w-4 h-4 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <svg *ngIf="copied()" class="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <span [class.text-emerald-600]="copied()" [class.dark:text-emerald-400]="copied()">
                  {{ copied() ? lang.t().contact.emailCopied : lang.t().contact.copyEmail }}
                </span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  `
})
export class ContactComponent {
  readonly lang = inject(LanguageService);
  readonly copied = signal(false);

  copyEmail(): void {
    const email = 'gabrieldsrodrigues19@gmail.com';
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(email);
    }
    this.copied.set(true);
    setTimeout(() => this.copied.set(false), 3000);
  }
}
