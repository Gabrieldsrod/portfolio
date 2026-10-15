import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../services/language.service';
import { AnalyticsService } from '../../services/analytics.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html'
})
export class FooterComponent {
  readonly lang = inject(LanguageService);
  private readonly analytics = inject(AnalyticsService);
  readonly currentYear = new Date().getFullYear();

  trackSocial(platform: 'github' | 'linkedin'): void {
    this.analytics.trackSocialClick(platform, 'footer');
  }
}
