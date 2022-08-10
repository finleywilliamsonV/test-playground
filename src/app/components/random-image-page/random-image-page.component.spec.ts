import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RandomImagePageComponent } from './random-image-page.component';

describe('RandomImagePageComponent', () => {
  let component: RandomImagePageComponent;
  let fixture: ComponentFixture<RandomImagePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RandomImagePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RandomImagePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
