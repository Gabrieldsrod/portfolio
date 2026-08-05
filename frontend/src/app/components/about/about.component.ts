import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../services/language.service';

interface TechItem {
  name: string;
  category: 'backend' | 'frontend' | 'devopsDb';
  iconSvg?: string;
  badge: string;
}

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html'
})
export class AboutComponent {
  readonly lang = inject(LanguageService);

  readonly backendTechs = [
    'Java', 'Spring Boot', 'Node.js', 'TypeScript', 'JavaScript', 'C',
  ];

  readonly frontendTechs = [
    'React', 'React Native', 'TypeScript', 'HTML', 'CSS', 
  ];

  readonly devopsTechs = [
    'PostgreSQL', 'SQLite', 'Docker', 'Linux', 'ESP32 & IoT'
  ];

  readonly learningTechs = [
    'Angular', 'NestJS', 'Redis'
  ];

  isPrimary(tech: string): boolean {
    return ['Java', 'Spring Boot', 'PostgreSQL', 'Docker'].includes(tech);
  }
}
