import { ComponentFixture, TestBed } from '@angular/core/testing'
import { RandomImagePageComponent } from './random-image-page.component'
import { catchError, EMPTY, finalize, take, tap, timeout } from 'rxjs'
import { HttpClientModule } from '@angular/common/http'

describe('RandomImagePageComponent', () => {
    let component: RandomImagePageComponent
    let fixture: ComponentFixture<RandomImagePageComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HttpClientModule],
            declarations: [RandomImagePageComponent]
        }).compileComponents()

        fixture = TestBed.createComponent(RandomImagePageComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })

    it('should load the spinner on initialization', () => {
        const spinnerElement: Element | null = fixture.nativeElement.querySelector('#spinnerIcon')
        expect(spinnerElement).toBeTruthy()
    })

    // learn marble testing -- not sure how to test otherwise
    // https://medium.com/angular-in-depth/how-to-test-observables-a00038c7faad
    it('should load an image upon page load', async () => {
        await new Promise<void>(
            (resolve) => {
                component.imageLoaded$.pipe(
                    timeout(2000),
                    catchError((err, caught) => {
                        resolve()
                        console.log('error')
                        return EMPTY
                    }),
                    take(1),
                    finalize(() => resolve())
                ).subscribe()
            }
        )
        expect(component.imageSource).toBeTruthy()
    })

    it('should not show the image update string on initialization', () => {
        const imageLastUpdatedElement: Element | null = fixture.nativeElement.querySelector('#imageLastUpdatedText')
        expect(imageLastUpdatedElement).toBeFalsy()
    })

    it('should show the time since the last image was loaded', () => {

        // test a few seconds
        component.timeSinceLastImageUpdate = Date.now()
        expect(component.getImageUpdateString()).toBe('a few seconds')

        // test one minute
        component.timeSinceLastImageUpdate = Date.now() - (60 * 1000)
        expect(component.getImageUpdateString()).toBe('1 minute')

        // test five minutes
        component.timeSinceLastImageUpdate = Date.now() - (5 * 60 * 1000)
        expect(component.getImageUpdateString()).toBe('5 minutes')
    })
})
