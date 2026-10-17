import {
  Component,
  Input,
  Output,
  EventEmitter,
  inject,
  OnInit,
  OnDestroy,
  HostListener,
  PLATFORM_ID
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Project } from '../../models/project.model';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-video-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './video-modal.component.html'
})
export class VideoModalComponent implements OnInit, OnDestroy {
  @Input({ required: true }) project!: Project;
  @Output() closeModal = new EventEmitter<void>();

  readonly lang = inject(LanguageService);
  private readonly sanitizer = inject(DomSanitizer);
  private readonly platformId = inject(PLATFORM_ID);

  safeEmbedUrl: SafeResourceUrl | null = null;
  videoId: string | null = null;
  rawVideoUrl = '';

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.close();
  }

  ngOnInit(): void {
    this.rawVideoUrl = (this.project.videoDemoUrl || this.project.videoDemo || '').trim();
    this.videoId = this.extractYouTubeId(this.rawVideoUrl);
    if (this.videoId) {
      const embedUrl = `https://www.youtube.com/embed/${this.videoId}?autoplay=1&rel=0`;
      this.safeEmbedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
    }

    if (isPlatformBrowser(this.platformId)) {
      document.body.style.overflow = 'hidden';
    }
  }

  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId)) {
      document.body.style.overflow = '';
    }
  }

  close(): void {
    this.closeModal.emit();
  }

  onBackdropClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (target && target.classList.contains('modal-backdrop')) {
      this.close();
    }
  }

  get projectTitle(): string {
    const current = this.lang.currentLang();
    return this.project.title[current] || this.project.title.pt;
  }

  get directYouTubeUrl(): string {
    if (this.videoId) {
      return `https://www.youtube.com/watch?v=${this.videoId}`;
    }
    return this.rawVideoUrl;
  }

  private extractYouTubeId(url: string): string | null {
    if (!url) return null;
    const trimmed = url.trim();
    if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
      return trimmed;
    }
    const regExp = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=|shorts\/)|youtu\.be\/)([^"&?\/\s]{11})/i;
    const match = trimmed.match(regExp);
    return match ? match[1] : null;
  }
}
