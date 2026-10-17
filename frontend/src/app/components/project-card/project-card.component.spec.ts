import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectCardComponent } from './project-card.component';
import { Project } from '../../models/project.model';

describe('ProjectCardComponent', () => {
  let component: ProjectCardComponent;
  let fixture: ComponentFixture<ProjectCardComponent>;

  const projectWithoutVideo: Project = {
    id: 1,
    title: { pt: 'Projeto Sem Vídeo', en: 'Project Without Video' },
    description: { pt: 'Descrição', en: 'Description' },
    technologies: ['Angular'],
    imageUrl: '/test.png',
    githubUrl: 'https://github.com/test',
    deployUrl: '',
    videoDemoUrl: '',
    featured: false
  };

  const projectWithVideo: Project = {
    id: 2,
    title: { pt: 'Projeto Com Vídeo', en: 'Project With Video' },
    description: { pt: 'Descrição', en: 'Description' },
    technologies: ['Angular', 'Java'],
    imageUrl: '/test.png',
    githubUrl: 'https://github.com/test',
    deployUrl: '',
    videoDemoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    featured: true
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectCardComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectCardComponent);
    component = fixture.componentInstance;
  });

  it('should not show video demo button when videoDemoUrl is empty', () => {
    component.project = projectWithoutVideo;
    fixture.detectChanges();

    expect(component.videoDemoUrl).toBeUndefined();
    const compiled = fixture.nativeElement as HTMLElement;
    const button = compiled.querySelector('button');
    expect(button).toBeNull();
  });

  it('should show video demo button and emit openVideo when clicked', () => {
    component.project = projectWithVideo;
    fixture.detectChanges();

    expect(component.videoDemoUrl).toBe('https://www.youtube.com/watch?v=dQw4w9WgXcQ');

    let emittedProject: Project | undefined;
    component.openVideo.subscribe(p => (emittedProject = p));

    const compiled = fixture.nativeElement as HTMLElement;
    const button = compiled.querySelector('button');
    expect(button).not.toBeNull();
    button?.click();

    expect(emittedProject).toEqual(projectWithVideo);
  });
});
