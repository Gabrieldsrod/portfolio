import { Injectable, signal, inject, PLATFORM_ID, effect } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly platformId = inject(PLATFORM_ID);
  
  readonly isDarkMode = signal<boolean>(true);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      const savedTheme = localStorage.getItem('portfolio_theme');
      if (savedTheme) {
        this.isDarkMode.set(savedTheme === 'dark');
      } else {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        this.isDarkMode.set(prefersDark);
      }

      effect(() => {
        const dark = this.isDarkMode();
        const root = document.documentElement;
        if (dark) {
          root.classList.add('dark');
          localStorage.setItem('portfolio_theme', 'dark');
        } else {
          root.classList.remove('dark');
          localStorage.setItem('portfolio_theme', 'light');
        }
      });
    }
  }

  toggleTheme(): void {
    this.isDarkMode.update(dark => !dark);
  }
}
