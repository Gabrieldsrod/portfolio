import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  private readonly platformId = inject(PLATFORM_ID);

  /**
   * Dispara um evento personalizado para o Google Analytics 4 (GA4).
   * @param eventName Nome do evento (ex: 'project_click', 'social_click')
   * @param params Propriedades opcionais do evento
   */
  trackEvent(eventName: string, params: Record<string, any> = {}): void {
    if (isPlatformBrowser(this.platformId) && typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('event', eventName, params);
    }
  }

  trackProjectClick(projectName: string, linkType: 'github' | 'deploy' | 'video', targetUrl?: string): void {
    this.trackEvent('project_click', {
      project_name: projectName,
      link_type: linkType,
      target_url: targetUrl || ''
    });
  }

  trackSocialClick(platform: 'github' | 'linkedin' | 'email', location: 'hero' | 'contact' | 'footer' | 'header', action: 'link' | 'copy' = 'link'): void {
    this.trackEvent('social_click', {
      platform,
      location,
      action
    });
  }
}
