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
        }).compileComponents()

        fixture = TestBed.createComponent(RandomPictureCardComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })

    it('should load the spinner on initialization', () => {
        const componentElement: HTMLElement = fixture.nativeElement
        const spinnerElement: Element | null = componentElement.querySelector('#spinner-icon')
        expect(spinnerElement).toBeTruthy()
    })

    it('should load an image after clicking the button', () => {
        // this is terrible -- need to learn marble testing
        component.getNewPicture()

        // make sure the image source is cleared out
        expect(component.imageSource).toBeNull()

        // run for 3 seconds looking for the loaded picture
        const intervalMs = 500
        const maxIntervals = 3000 / intervalMs
        let intervalCount = 0
        const intervalId = setInterval(() => {
            if (component.imageSource || intervalCount > maxIntervals) {
                clearInterval(intervalId)
                
                // now see if we have the image? -- BAD
                expect(component.imageSource).toBeTruthy()
            }
            intervalCount++
        }, intervalMs)
    })
})
