import { HttpClient } from '@angular/common/http'
import { catchError, Subject, Subscription, switchMap, tap } from 'rxjs'
import { Component, OnDestroy, OnInit } from '@angular/core'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { IconDefinition } from '@fortawesome/fontawesome-common-types'

type ParsedImage = string | ArrayBuffer | null

@Component({
    selector: 'app-random-picture-card',
    templateUrl: './random-picture-card.component.html',
    styleUrls: ['./random-picture-card.component.scss']
})
export class RandomPictureCardComponent implements OnInit, OnDestroy {

    imageWidth: number = 600
    imageHeight: number = 200
    imageRequestUrl = `https://picsum.photos/${this.imageWidth}/${this.imageHeight}`
    
    imageSource!: ParsedImage
    getNewPicture$: Subject<void> = new Subject<void>()
    getNewPictureSub!: Subscription | null

    faSpinner: IconDefinition = faSpinner

    constructor(
        private http: HttpClient
    ) { }

    ngOnInit(): void {
        this.setupPicRequestObs()
        this.getNewPicture()
    }

    ngOnDestroy(): void {
        this.getNewPictureSub?.unsubscribe()
    }

    setupPicRequestObs(): void {
        // https://medium.com/angular-in-depth/how-to-test-observables-a00038c7faad
        this.getNewPictureSub = this.getNewPicture$
            .pipe(
                tap(() => this.imageSource = null),
                switchMap(() => this.http.get(
                    this.imageRequestUrl,
                    {
                        responseType: 'blob'
                    }
                )),
                catchError((err, caught) => {
                    console.error('Error with http request:', err)
                    return caught
                }),
                switchMap(this.createImageFromBlob),
                tap((parsedImage: ParsedImage) => this.imageSource = parsedImage)
            )
            .subscribe()
    }

    getNewPicture(): void {
        this.getNewPicture$.next()
    }

    private createImageFromBlob(image: Blob): Subject<ParsedImage> {
        const reader$ = new Subject<string | ArrayBuffer | null>()

        const reader: FileReader = new FileReader()
        reader.addEventListener("load", () => {
            reader$.next(reader.result)
        }, false)

        if (image) {
            reader.readAsDataURL(image)
        } else {
            throw new Error('Image expected, none found')
        }

        return reader$
    }

}
