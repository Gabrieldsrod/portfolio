import {
  Component,
  inject,
  signal,
  ElementRef,
  ViewChild,
  AfterViewInit,
  OnDestroy,
  PLATFORM_ID,
  NgZone
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { LanguageService } from '../../services/language.service';
import { ThemeService } from '../../services/theme.service';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseAlpha: number;
  currentAlpha: number;
  alphaSpeed: number;
  colorType: 'red' | 'rose' | 'amber' | 'white';
}

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section #heroSection class="relative min-h-[90vh] flex items-center justify-center pt-28 pb-16 overflow-hidden select-none">
      
      <!-- 1. Technical Dynamic Grid Background Pattern -->
      <div class="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_75%_60%_at_50%_40%,#000_60%,transparent_100%)] pointer-events-none z-0"></div>

      <!-- 2. Interactive Canvas Particles & Constellation Layer -->
      <canvas #heroCanvas class="absolute inset-0 w-full h-full pointer-events-none z-0"></canvas>

      <!-- 3. Animated Gradient Ambient Glow Blobs -->
      <div class="absolute top-1/4 left-1/6 w-96 h-96 sm:w-120 sm:h-120 bg-linear-to-tr from-red-600/20 via-rose-600/15 to-transparent dark:from-red-600/25 dark:via-rose-600/20 rounded-full blur-[120px] pointer-events-none animate-blob-1 z-0"></div>
      <div class="absolute bottom-10 right-1/8 w-80 h-80 sm:w-110 sm:h-110 bg-linear-to-bl from-amber-500/15 via-rose-500/15 to-transparent dark:from-amber-500/20 dark:via-rose-500/15 rounded-full blur-[130px] pointer-events-none animate-blob-2 z-0"></div>
      <div class="absolute -top-12 right-1/4 w-72 h-72 sm:w-96 sm:h-96 bg-linear-to-r from-red-500/10 via-amber-500/10 to-transparent dark:from-red-500/15 dark:via-amber-500/10 rounded-full blur-[100px] pointer-events-none animate-blob-3 z-0"></div>

      <!-- Content Container -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          <!-- LEFT COLUMN: Profile Photo Frame -->
          <div class="lg:col-span-5 flex justify-center order-1 lg:order-1">
            <div class="relative group">
              <!-- Outer Glow Accent Ring -->
              <div class="absolute -inset-1.5 bg-linear-to-r from-red-600 via-rose-500 to-amber-500 rounded-3xl blur-lg opacity-70 group-hover:opacity-100 transition duration-500 animate-pulse-slow"></div>

              <!-- Main Frame Container -->
              <div class="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-88 lg:h-88 rounded-3xl overflow-hidden bg-zinc-900 border-2 border-zinc-800 shadow-2xl flex items-center justify-center">
                <img
                  [src]="profileImageUrl"
                  (error)="onImageError()"
                  alt="Gabriel da Silva Rodrigues"
                  width="352"
                  height="352"
                  loading="eager"
                  fetchpriority="high"
                  decoding="async"
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

              <button
                disabled
                type="button"
                class="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-zinc-100 dark:bg-zinc-900/60 text-zinc-400 dark:text-zinc-500 border border-zinc-200/80 dark:border-zinc-800/60 font-semibold text-sm cursor-not-allowed opacity-60 flex items-center justify-center gap-2"
                title="CV indisponível no momento / Resume currently unavailable">
                <svg class="w-4 h-4 text-zinc-400 dark:text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                <span>{{ lang.t().hero.ctaCv }}</span>
              </button>
            </div>

            <!-- Social Links -->
            <div class="flex items-center justify-center lg:justify-start gap-4 pt-4 text-zinc-600 dark:text-zinc-400">
              <a href="https://github.com/Gabrieldsrod" target="_blank" rel="noopener noreferrer"
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

              <a href="https://mail.google.com/mail/?view=cm&fs=1&to=gabrieldsrodrigues19@gmail.com"
                 target="_blank"
                 rel="noopener noreferrer"
                 (click)="onEmailClick($event)"
                 class="relative p-3 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:text-red-600 dark:hover:text-red-500 hover:border-red-600/40 dark:hover:border-red-500/40 transition-all hover:scale-110"
                 title="gabrieldsrodrigues19@gmail.com">
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span *ngIf="copiedEmail()" class="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-[10px] font-mono font-bold shadow-lg whitespace-nowrap z-20">
                  {{ lang.t().contact.emailCopied }}
                </span>
              </a>
            </div>

          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    @keyframes float1 {
      0%, 100% { transform: translate(0px, 0px) scale(1); }
      33% { transform: translate(45px, -50px) scale(1.12); }
      66% { transform: translate(-30px, 30px) scale(0.92); }
    }
    @keyframes float2 {
      0%, 100% { transform: translate(0px, 0px) scale(1); }
      33% { transform: translate(-50px, 40px) scale(1.1); }
      66% { transform: translate(35px, -35px) scale(0.95); }
    }
    @keyframes float3 {
      0%, 100% { transform: translate(0px, 0px) scale(1); }
      50% { transform: translate(30px, 40px) scale(1.15); }
    }
    @keyframes pulseSlow {
      0%, 100% { opacity: 0.6; }
      50% { opacity: 1; }
    }
    .animate-blob-1 {
      animation: float1 20s ease-in-out infinite alternate;
    }
    .animate-blob-2 {
      animation: float2 24s ease-in-out infinite alternate;
    }
    .animate-blob-3 {
      animation: float3 16s ease-in-out infinite alternate;
    }
    .animate-pulse-slow {
      animation: pulseSlow 4s ease-in-out infinite;
    }
  `]
})
export class HeroComponent implements AfterViewInit, OnDestroy {
  readonly lang = inject(LanguageService);
  readonly theme = inject(ThemeService);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly ngZone = inject(NgZone);

  @ViewChild('heroSection') heroSectionRef!: ElementRef<HTMLElement>;
  @ViewChild('heroCanvas') heroCanvasRef!: ElementRef<HTMLCanvasElement>;

  readonly imageError = signal<boolean>(false);
  readonly copiedEmail = signal<boolean>(false);

  onEmailClick(event: MouseEvent): void {
    const email = 'gabrieldsrodrigues19@gmail.com';
    if (isPlatformBrowser(this.platformId)) {
      if (navigator?.clipboard?.writeText) {
        navigator.clipboard.writeText(email);
      }
      this.copiedEmail.set(true);
      setTimeout(() => this.copiedEmail.set(false), 2500);
    }
  };

  private animFrameId: number | null = null;
  private particles: Particle[] = [];
  private mouseX = -1000;
  private mouseY = -1000;
  private width = 0;
  private height = 0;

  private unbindListeners: (() => void)[] = [];

  get profileImageUrl(): string {
    return this.imageError()
      ? 'https://ui-avatars.com/api/?name=Gabriel+Rodrigues&background=dc2626&color=fff&size=512'
      : '/assets/images/profile.webp';
  }

  onImageError(): void {
    this.imageError.set(true);
  }

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    this.ngZone.runOutsideAngular(() => {
      this.initCanvas();
    });
  }

  ngOnDestroy(): void {
    if (this.animFrameId !== null) {
      cancelAnimationFrame(this.animFrameId);
    }
    this.unbindListeners.forEach(fn => fn());
  }

  private initCanvas(): void {
    const canvas = this.heroCanvasRef?.nativeElement;
    const hero = this.heroSectionRef?.nativeElement;
    if (!canvas || !hero) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      const rect = hero.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      this.width = rect.width;
      this.height = rect.height;
      canvas.width = this.width * dpr;
      canvas.height = this.height * dpr;
      ctx.scale(dpr, dpr);
      this.createParticles();
    };

    resize();

    const resizeObserver = new ResizeObserver(() => resize());
    resizeObserver.observe(hero);
    this.unbindListeners.push(() => resizeObserver.disconnect());

    const onMouseMove = (e: MouseEvent) => {
      const rect = hero.getBoundingClientRect();
      this.mouseX = e.clientX - rect.left;
      this.mouseY = e.clientY - rect.top;
    };

    const onMouseLeave = () => {
      this.mouseX = -1000;
      this.mouseY = -1000;
    };

    hero.addEventListener('mousemove', onMouseMove);
    hero.addEventListener('mouseleave', onMouseLeave);

    this.unbindListeners.push(() => {
      hero.removeEventListener('mousemove', onMouseMove);
      hero.removeEventListener('mouseleave', onMouseLeave);
    });

    this.loop(ctx);
  }

  private createParticles(): void {
    const count = Math.floor(Math.min(this.width, 1400) / 22);
    this.particles = [];
    const colors: ('red' | 'rose' | 'amber' | 'white')[] = ['red', 'rose', 'red', 'amber', 'white'];

    for (let i = 0; i < count; i++) {
      const baseAlpha = Math.random() * 0.45 + 0.25;
      this.particles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: Math.random() * 2 + 1,
        baseAlpha,
        currentAlpha: baseAlpha,
        alphaSpeed: (Math.random() - 0.5) * 0.008,
        colorType: colors[Math.floor(Math.random() * colors.length)]
      });
    }
  }

  private loop(ctx: CanvasRenderingContext2D): void {
    const render = () => {
      ctx.clearRect(0, 0, this.width, this.height);

      const isDark = this.theme.isDarkMode();
      const particleAlphaMultiplier = isDark ? 1 : 0.8;

      // Render lines between nearby particles
      for (let i = 0; i < this.particles.length; i++) {
        const p1 = this.particles[i];

        // Update position
        p1.x += p1.vx;
        p1.y += p1.vy;

        // Wrap around bounds
        if (p1.x < 0) p1.x = this.width;
        if (p1.x > this.width) p1.x = 0;
        if (p1.y < 0) p1.y = this.height;
        if (p1.y > this.height) p1.y = 0;

        // Alpha pulsing
        p1.currentAlpha += p1.alphaSpeed;
        if (p1.currentAlpha > 0.7 || p1.currentAlpha < 0.15) {
          p1.alphaSpeed = -p1.alphaSpeed;
        }

        // Draw connections to other particles
        for (let j = i + 1; j < this.particles.length; j++) {
          const p2 = this.particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 110;

          if (dist < maxDist) {
            const opacity = (1 - dist / maxDist) * 0.22 * particleAlphaMultiplier;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = isDark
              ? `rgba(220, 38, 38, ${opacity})`
              : `rgba(225, 29, 72, ${opacity})`;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }

        // Draw line to mouse cursor
        if (this.mouseX > 0 && this.mouseY > 0) {
          const mdx = p1.x - this.mouseX;
          const mdy = p1.y - this.mouseY;
          const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
          const maxMouseDist = 140;

          if (mdist < maxMouseDist) {
            const mOpacity = (1 - mdist / maxMouseDist) * 0.45 * particleAlphaMultiplier;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(this.mouseX, this.mouseY);
            ctx.strokeStyle = isDark
              ? `rgba(244, 63, 94, ${mOpacity})`
              : `rgba(220, 38, 38, ${mOpacity})`;
            ctx.lineWidth = 1;
            ctx.stroke();

            // Slight repulsion/attraction force towards mouse
            p1.x += (mdx / mdist) * 0.2;
            p1.y += (mdy / mdist) * 0.2;
          }
        }

        // Draw particle dot with glow
        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2);

        let colorRgb = '220, 38, 38'; // red
        if (p1.colorType === 'rose') colorRgb = '244, 63, 94';
        else if (p1.colorType === 'amber') colorRgb = '245, 158, 11';
        else if (p1.colorType === 'white') colorRgb = isDark ? '255, 255, 255' : '120, 113, 108';

        ctx.fillStyle = `rgba(${colorRgb}, ${p1.currentAlpha * particleAlphaMultiplier})`;
        ctx.shadowBlur = p1.radius > 1.8 ? 6 : 0;
        ctx.shadowColor = `rgba(${colorRgb}, 0.6)`;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      this.animFrameId = requestAnimationFrame(render);
    };

    render();
  }
}

