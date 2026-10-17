import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Project } from '../../models/project.model';
import { LanguageService } from '../../services/language.service';
import { AnalyticsService } from '../../services/analytics.service';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project-card.component.html'
})
export class ProjectCardComponent {
  @Input({ required: true }) project!: Project;
  @Output() openVideo = new EventEmitter<Project>();

  readonly lang = inject(LanguageService);
  private readonly analytics = inject(AnalyticsService);
  imageFailed = false;

  get videoDemoUrl(): string | undefined {
    const url = this.project.videoDemoUrl || this.project.videoDemo;
    return url && url.trim().length > 0 ? url.trim() : undefined;
  }

  get deployUrl(): string | undefined {
    return this.project.deployUrl || this.project.liveUrl;
  }

  onProjectClick(type: 'github' | 'deploy' | 'video'): void {
    const targetUrl = type === 'github' ? this.project.githubUrl : (type === 'deploy' ? this.deployUrl : this.videoDemoUrl);
    this.analytics.trackProjectClick(this.projectTitle, type, targetUrl);
  }

  onVideoClick(): void {
    this.onProjectClick('video');
    this.openVideo.emit(this.project);
  }

  get displayImageUrl(): string {
    if (this.imageFailed) {
      return 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80';
    }
    const url = this.project.imageUrl || this.project.image;
    if (url && !url.startsWith('http') && !url.startsWith('/')) {
      return '/' + url;
    }
    return url || '';
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
