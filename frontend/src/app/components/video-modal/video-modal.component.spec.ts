import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VideoModalComponent } from './video-modal.component';
import { Project } from '../../models/project.model';

describe('VideoModalComponent', () => {
  let component: VideoModalComponent;
  let fixture: ComponentFixture<VideoModalComponent>;

  const mockProject: Project = {
    id: 1,
    title: { pt: 'Projeto Teste', en: 'Test Project' },
    description: { pt: 'Descrição', en: 'Description' },
    technologies: ['Angular', 'TypeScript'],
    imageUrl: '/test.png',
    githubUrl: 'https://github.com/test/repo',
    deployUrl: 'https://test.dev',
    videoDemoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    featured: true
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VideoModalComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(VideoModalComponent);
    component = fixture.componentInstance;
    component.project = mockProject;
    fixture.detectChanges();
  });

  it('should create the video modal', () => {
    expect(component).toBeTruthy();
  });

  it('should extract the YouTube video ID and construct embed url', () => {
    expect(component.videoId).toBe('dQw4w9WgXcQ');
    expect(component.safeEmbedUrl).toBeTruthy();
  });

  it('should extract video ID from short youtu.be format', () => {
    const shortProject: Project = {
      ...mockProject,
      videoDemoUrl: 'https://youtu.be/dQw4w9WgXcQ?t=10'
    };
    component.project = shortProject;
    component.ngOnInit();
    expect(component.videoId).toBe('dQw4w9WgXcQ');
  });

  it('should extract video ID from YouTube shorts format', () => {
    const shortsProject: Project = {
      ...mockProject,
      videoDemoUrl: 'https://www.youtube.com/shorts/dQw4w9WgXcQ'
    };
    component.project = shortsProject;
    component.ngOnInit();
    expect(component.videoId).toBe('dQw4w9WgXcQ');
  });

  it('should emit closeModal when close() is called', () => {
    let closed = false;
    component.closeModal.subscribe(() => (closed = true));
    component.close();
    expect(closed).toBe(true);
  });

  it('should close on Escape keydown', () => {
    let closed = false;
    component.closeModal.subscribe(() => (closed = true));
    component.onEscape();
    expect(closed).toBe(true);
  });
});
