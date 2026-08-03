import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectService } from '../../services/project.service';
import { LanguageService } from '../../services/language.service';
import { ProjectCardComponent } from '../project-card/project-card.component';
import { Project } from '../../models/project.model';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, ProjectCardComponent],
  templateUrl: './projects.component.html'
})
export class ProjectsComponent implements OnInit {
  private readonly projectService = inject(ProjectService);
  readonly lang = inject(LanguageService);

  readonly projects = signal<Project[]>([]);
  readonly activeFilter = signal<'all' | 'featured'>('all');

  readonly featuredCount = computed(() => this.projects().filter(p => p.featured).length);

  readonly filteredProjects = computed(() => {
    const list = this.projects();
    if (this.activeFilter() === 'featured') {
      return list.filter(p => p.featured);
    }
    return list;
  });

  ngOnInit(): void {
    this.projectService.getProjects().subscribe(data => {
      this.projects.set(data);
    });
  }
}
