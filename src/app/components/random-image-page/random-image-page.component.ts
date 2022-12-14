import { HttpClient } from '@angular/common/http'
import { catchError, interval, race, Subject, Subscription, switchMap, tap, timeout } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { IconDefinition } from '@fortawesome/fontawesome-common-types'

type ParsedImage = string | ArrayBuffer | null

@Component({
    selector: 'app-random-image-page',
    templateUrl: './random-image-page.component.html',
    styleUrls: ['./random-image-page.component.scss']
})
export class RandomImagePageComponent implements OnInit {

    faSpinner: IconDefinition = faSpinner

    imageWidth: number = 600
    imageHeight: number = 400
    imageRequestUrls = [
        `https://picsum.photos/${this.imageWidth}/${this.imageHeight}`,
        `https://random.imagecdn.app/${this.imageWidth}/${this.imageHeight}`
    ]

    imageSource!: ParsedImage
    getNewImage$: Subject<void> = new Subject<void>()
    imageLoaded$: Subject<ParsedImage> = new Subject<ParsedImage>()
    getNewImageSub: Subscription | undefined

    timeSinceLastImageUpdate!: number
    imageLastUpdatedString: string = ''
    updateImageLastUpdated$: Subject<void> = new Subject<void>()
    updateImageLastUpdatedSub: Subscription | undefined

    constructor(
        private http: HttpClient
    ) { }

    ngOnInit(): void {
        this.setupPicRequestObs()
        this.setupImageLastUpdatedObs()
        this.getNewImage()
    }

    ngOnDestroy(): void {
        this.getNewImageSub?.unsubscribe()
    }

    setupPicRequestObs(): void {

        // not really necessary but lorem picsum was taking a bit long for requests
        // decided a backup wouldn't hurt :)
        const imageRequestRace = race(
            this.imageRequestUrls.map(
                (url) =>
                    this.http.get(url, { responseType: 'blob' })
            )
        )

        this.getNewImageSub = this.getNewImage$
            .pipe(
                tap(() => this.imageSource = null),
                switchMap(() => imageRequestRace),
                catchError((err: { message?: string }, caught) => {
                    console.error('Error with http request:', err.message ?? 'no message provided')
                    return caught
                }),
                switchMap(this.createImageFromBlob),
                tap((parsedImage: ParsedImage) => {
                    this.imageSource = parsedImage
                    this.imageLoaded$.next(parsedImage)
                    this.restartImageUpdateTimer()
                })
            )
            .subscribe()
    }

    getNewImage(): void {
        this.getNewImage$.next()
    }

    private createImageFromBlob(image: Blob): Subject<ParsedImage> {
        const reader$ = new Subject<ParsedImage>()

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

    restartImageUpdateTimer(): void {
        this.imageLastUpdatedString = ''
        this.timeSinceLastImageUpdate = Date.now()
        this.updateImageLastUpdated$.next()
    }

    setupImageLastUpdatedObs(): void {
        this.updateImageLastUpdatedSub = this.updateImageLastUpdated$
            .pipe(
                switchMap(() => interval(1000)),
                tap(() => {
                    this.imageLastUpdatedString = `Last updated ${this.getImageUpdateString()} ago.`
                }),
            )
            .subscribe()
    }

    getImageUpdateString(): string {
        const minutes = Math.floor((Date.now() - this.timeSinceLastImageUpdate) / 1000 / 60)
        if (minutes < 1) {
            return 'a few seconds'
        } else if (minutes == 1) {
            return '1 minute'
        } else {
            return `${minutes} minutes`
        }
    }

}
