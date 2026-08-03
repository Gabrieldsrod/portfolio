import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact.component.html'
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
