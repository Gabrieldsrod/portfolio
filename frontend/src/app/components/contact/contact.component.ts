import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../services/language.service';
import { AnalyticsService } from '../../services/analytics.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact.component.html'
})
export class ContactComponent {
  readonly lang = inject(LanguageService);
  private readonly analytics = inject(AnalyticsService);
  readonly copied = signal(false);

  trackSocial(platform: 'github' | 'linkedin' | 'email', action: 'link' | 'copy' = 'link'): void {
    this.analytics.trackSocialClick(platform, 'contact', action);
  }

  copyEmail(): void {
    const email = 'gabrieldsrodrigues19@gmail.com';
    this.trackSocial('email', 'copy');
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(email);
    }
    this.copied.set(true);
    setTimeout(() => this.copied.set(false), 3000);
  }
}
