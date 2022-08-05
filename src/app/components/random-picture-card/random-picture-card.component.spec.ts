import { ComponentFixture, TestBed } from '@angular/core/testing'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { RandomPictureCardComponent } from './random-picture-card.component'

describe('RandomPictureCardComponent', () => {
  let component: RandomPictureCardComponent
  let fixture: ComponentFixture<RandomPictureCardComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [RandomPictureCardComponent]
    })
      .compileComponents()

    fixture = TestBed.createComponent(RandomPictureCardComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
