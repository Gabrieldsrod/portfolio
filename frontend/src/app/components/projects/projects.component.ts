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
  template: `
    <section id="projects" class="py-20 relative bg-zinc-100/50 dark:bg-zinc-900/30 border-t border-zinc-200/60 dark:border-zinc-800/60 transition-colors duration-300">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Header & Filter Tabs -->
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          
          <div class="max-w-2xl space-y-3">
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-red-600/10 text-red-600 dark:text-red-500 text-xs font-mono font-semibold uppercase tracking-wider">
              <span>// {{ lang.t().projects.badge }}</span>
            </div>
            <h2 class="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
              {{ lang.t().projects.title }}
            </h2>
            <p class="text-zinc-600 dark:text-zinc-400 text-base sm:text-lg">
              {{ lang.t().projects.subtitle }}
            </p>
          </div>

          <!-- Filter Pill Switcher -->
          <div class="inline-flex p-1 rounded-xl bg-zinc-200/80 dark:bg-zinc-800/80 border border-zinc-300/60 dark:border-zinc-700/60 text-xs font-semibold self-start md:self-auto">
            <button
              (click)="activeFilter.set('all')"
              type="button"
              [class.bg-white]="activeFilter() === 'all'"
              [class.dark:bg-zinc-900]="activeFilter() === 'all'"
              [class.text-red-600]="activeFilter() === 'all'"
              [class.dark:text-red-500]="activeFilter() === 'all'"
              [class.shadow-sm]="activeFilter() === 'all'"
              class="px-4 py-2 rounded-lg text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-all cursor-pointer">
              {{ lang.t().projects.filterAll }} ({{ projects().length }})
            </button>

            <button
              (click)="activeFilter.set('featured')"
              type="button"
              [class.bg-white]="activeFilter() === 'featured'"
              [class.dark:bg-zinc-900]="activeFilter() === 'featured'"
              [class.text-red-600]="activeFilter() === 'featured'"
              [class.dark:text-red-500]="activeFilter() === 'featured'"
              [class.shadow-sm]="activeFilter() === 'featured'"
              class="px-4 py-2 rounded-lg text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-all cursor-pointer">
              {{ lang.t().projects.filterFeatured }} ({{ featuredCount() }})
            </button>
          </div>

        </div>

        <!-- Projects Grid -->
        <div *ngIf="filteredProjects().length > 0; else noProjectsTemplate" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <app-project-card
            *ngFor="let project of filteredProjects()"
            [project]="project">
          </app-project-card>
        </div>

        <!-- Empty State -->
        <ng-template #noProjectsTemplate>
          <div class="text-center py-16 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800">
            <p class="text-zinc-500 dark:text-zinc-400">
              {{ lang.t().projects.noProjects }}
            </p>
          </div>
        </ng-template>

      </div>
    </section>
  `
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
