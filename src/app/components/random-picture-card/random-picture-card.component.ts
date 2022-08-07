import { HttpClient } from '@angular/common/http'
import { catchError, interval, map, Subject, Subscription, switchMap, tap, timer } from 'rxjs'
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

    faSpinner: IconDefinition = faSpinner

    imageWidth: number = 600
    imageHeight: number = 200
    imageRequestUrl = `https://picsum.photos/${this.imageWidth}/${this.imageHeight}`

    imageSource!: ParsedImage
    getNewPicture$: Subject<void> = new Subject<void>()
    getNewPictureSub!: Subscription | null

    imageLastUpdated!: number
    imageLastUpdatedString: string = ''
    updateImageLastUpdated$: Subject<void> = new Subject<void>()
    updateImageLastUpdatedSub!: Subscription | null

    constructor(
        private http: HttpClient
    ) { }

    ngOnInit(): void {
        this.setupPicRequestObs()
        this.setupImageLastUpdatedObs()
        this.getNewPicture()
    }

    ngOnDestroy(): void {
        this.getNewPictureSub?.unsubscribe()
    }

    setupPicRequestObs(): void {
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
                tap((parsedImage: ParsedImage) => {
                    this.imageSource = parsedImage
                    this.restartImageUpdateTimer()
                })
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

    restartImageUpdateTimer(): void {
        this.imageLastUpdatedString = ''
        this.imageLastUpdated = Date.now()
        this.updateImageLastUpdated$.next()
    }

    setupImageLastUpdatedObs(): void {
        this.updateImageLastUpdatedSub = this.updateImageLastUpdated$
            .pipe(
                switchMap(() => interval(1000)),
                tap((seconds) => {
                    this.imageLastUpdatedString = `Last updated ${this.getImageUpdateString()} ago.`
                }),
            )
            .subscribe()
    }

    getImageUpdateString(): string {
        const minutes = Math.floor((Date.now() - this.imageLastUpdated) / 1000 / 60)
        if (minutes < 1) {
            return 'a few seconds'
        } else if (minutes == 1) {
            return '1 minute'
        } else {
            return `${minutes} minutes`
        }
    }
}
