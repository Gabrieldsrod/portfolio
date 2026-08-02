import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="relative min-h-[90vh] flex items-center justify-center pt-28 pb-16 overflow-hidden">
      
      <!-- Background Ambient Glow Effects -->
      <div class="absolute top-1/4 left-1/4 w-112.5 h-112.5 bg-red-600/15 dark:bg-red-600/20 rounded-full blur-[140px] pointer-events-none"></div>
      <div class="absolute -top-10 -right-10 w-80 h-80 bg-rose-500/10 dark:bg-rose-500/10 rounded-full blur-[110px] pointer-events-none"></div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          <!-- LEFT COLUMN: Profile Photo Frame -->
          <div class="lg:col-span-5 flex justify-center order-1 lg:order-1">
            <div class="relative group">
              
              <!-- Outer Glow Accent Ring -->
              <div class="absolute -inset-1.5 bg-linear-to-r from-red-600 via-rose-500 to-amber-500 rounded-3xl blur-lg opacity-70 group-hover:opacity-100 transition duration-500"></div>

              <!-- Main Frame Container -->
              <div class="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-88 lg:h-88 rounded-3xl overflow-hidden bg-zinc-900 border-2 border-zinc-800 shadow-2xl flex items-center justify-center">
                
                <img
                  [src]="profileImageUrl"
                  (error)="onImageError()"
                  alt="Gabriel da Silva Rodrigues"
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />

              </div>
            </div>
          </div>

          <!-- RIGHT COLUMN: Text & CTAs -->
          <div class="lg:col-span-7 space-y-8 text-center lg:text-left order-2 lg:order-2">
            
            <!-- Title & Role -->
            <div class="space-y-3">
              <p class="text-sm uppercase tracking-widest text-red-600 dark:text-red-500 font-mono font-semibold">
                {{ lang.t().hero.greeting }}
              </p>
              <h1 class="text-4xl sm:text-5xl md:text-6xl font-extrabold text-zinc-900 dark:text-white tracking-tight leading-tight">
                {{ lang.t().hero.name }}
              </h1>
              <h2 class="text-xl sm:text-2xl md:text-3xl font-bold bg-linear-to-r from-red-600 via-rose-500 to-amber-500 bg-clip-text text-transparent">
                {{ lang.t().hero.role }}
              </h2>
            </div>

            <!-- Summary Bio -->
            <p class="max-w-2xl mx-auto lg:mx-0 text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
              {{ lang.t().hero.summary }}
            </p>

            <!-- Action Buttons (CTAs) -->
            <div class="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <a
                href="#projects"
                class="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold text-sm shadow-lg shadow-red-600/25 hover:shadow-red-600/40 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2">
                <span>{{ lang.t().hero.ctaProjects }}</span>
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </a>

              <a
                href="assets/cv-gabriel-rodrigues.pdf"
                target="_blank"
                download
                class="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-800 font-semibold text-sm transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center gap-2">
                <svg class="w-4 h-4 text-red-600 dark:text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                <span>{{ lang.t().hero.ctaCv }}</span>
              </a>
            </div>

            <!-- Social Links -->
            <div class="flex items-center justify-center lg:justify-start gap-4 pt-4 text-zinc-600 dark:text-zinc-400">
              <a href="https://github.com/GabrieldsRod" target="_blank" rel="noopener noreferrer"
                 class="p-3 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:text-red-600 dark:hover:text-red-500 hover:border-red-600/40 dark:hover:border-red-500/40 transition-all hover:scale-110"
                 title="GitHub Profile">
                <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                </svg>
              </a>

              <a href="https://www.linkedin.com/in/gabrieldsrod/" target="_blank" rel="noopener noreferrer"
                 class="p-3 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:text-red-600 dark:hover:text-red-500 hover:border-red-600/40 dark:hover:border-red-500/40 transition-all hover:scale-110"
                 title="LinkedIn Profile">
                <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>

              <a href="mailto:gabrieldsrod@gmail.com"
                 class="p-3 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:text-red-600 dark:hover:text-red-500 hover:border-red-600/40 dark:hover:border-red-500/40 transition-all hover:scale-110"
                 title="Send Email">
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  `
})
export class HeroComponent {
  readonly lang = inject(LanguageService);
  readonly imageError = signal<boolean>(false);

  get profileImageUrl(): string {
    return this.imageError()
      ? 'https://ui-avatars.com/api/?name=Gabriel+Rodrigues&background=dc2626&color=fff&size=512'
      : '/assets/images/profile.jpg';
  }

  onImageError(): void {
    this.imageError.set(true);
  }
}
