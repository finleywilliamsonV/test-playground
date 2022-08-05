import { HttpClient } from '@angular/common/http'
import { Component, OnDestroy, OnInit } from '@angular/core'
import { Subject, Subscription, switchMap, tap } from 'rxjs'

const RANDOM_IMAGE_URL = 'https://picsum.photos/300/200'

type ParsedImage = string | ArrayBuffer | null

@Component({
    selector: 'app-random-picture-card',
    templateUrl: './random-picture-card.component.html',
    styleUrls: ['./random-picture-card.component.scss']
})
export class RandomPictureCardComponent implements OnInit, OnDestroy {

    imageSource!: ParsedImage
    getNewPicture$: Subject<void> = new Subject<void>()
    getNewPictureSub!: Subscription | null

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
        this.getNewPictureSub = this.getNewPicture$
            .pipe(
                switchMap(() => this.http.get(
                    RANDOM_IMAGE_URL,
                    {
                        responseType: 'blob'
                    }
                )),
                switchMap(this.createImageFromBlob),
                tap((parsedImage: ParsedImage) => this.imageSource = parsedImage)
            )
            .subscribe()
    }

    getNewPicture(): void {
        this.getNewPicture$.next()
    }

    private createImageFromBlob(image: Blob): Subject<ParsedImage> {
        const reader$ = new Subject<string | ArrayBuffer | null>

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
