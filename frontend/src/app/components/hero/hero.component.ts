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
  templateUrl: './hero.component.html',
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
  }

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
