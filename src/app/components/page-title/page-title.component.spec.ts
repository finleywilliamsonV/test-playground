import { ChangeDetectionStrategy } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PageTitleComponent } from './page-title.component';

describe('PageTitleComponent', () => {
  let pageTitleComponent: PageTitleComponent;
  let fixture: ComponentFixture<PageTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageTitleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageTitleComponent);
    pageTitleComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(pageTitleComponent).toBeTruthy();
  });

  it('displays the title', () => {
    const TEST_TITLE = 'Test Title'
    pageTitleComponent.title = TEST_TITLE

    const componentElement: HTMLElement = fixture.nativeElement
    const titleDiv: HTMLDivElement | null = componentElement.querySelector('div#title-container')

    fixture.detectChanges()

    // trim because I like to have my prop bindings on a new line :/
    expect(titleDiv?.innerHTML.trim()).toEqual(TEST_TITLE)
  })
});
