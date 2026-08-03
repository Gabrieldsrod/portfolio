import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Project } from '../../models/project.model';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project-card.component.html'
})
export class ProjectCardComponent {
  @Input({ required: true }) project!: Project;

  readonly lang = inject(LanguageService);
  imageFailed = false;

  get displayImageUrl(): string {
    if (this.imageFailed) {
      return 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80';
    }
    const url = this.project.imageUrl;
    if (url && !url.startsWith('http') && !url.startsWith('/')) {
      return '/' + url;
    }
    return url;
  }

  onImageError(): void {
    this.imageFailed = true;
  }

  get projectTitle(): string {
    const current = this.lang.currentLang();
    return this.project.title[current] || this.project.title.pt;
  }

  get projectDescription(): string {
    const current = this.lang.currentLang();
    return this.project.description[current] || this.project.description.pt;
  }
}
