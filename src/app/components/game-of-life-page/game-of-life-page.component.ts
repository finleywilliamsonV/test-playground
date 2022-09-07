import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core'
import { Colors } from '../../../styles/colors.const'


@Component({
    selector: 'app-game-of-life-page',
    templateUrl: './game-of-life-page.component.html',
    styleUrls: ['./game-of-life-page.component.scss']
})
export class GameOfLifePageComponent implements OnInit, AfterViewInit {

    @ViewChild('mainCanvas')
    set canvasRef(ref: ElementRef<HTMLCanvasElement>) {
        this.canvas = ref.nativeElement
    }

    canvas!: HTMLCanvasElement

    constructor() { }

    ngOnInit(): void { }

    ngAfterViewInit(): void {
        this.render()
    }


    render(): void {
        const ctx = this.canvas?.getContext('2d')
        if (ctx) {

            requestAnimationFrame(this.render)

            ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

            // draw background
            ctx.fillStyle = Colors.orchid
            ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)

        } else {
            throw new Error('Something has gone wrong, could not find canvas context.')
        }
    }

    drawGrid() {
        // https://stackoverflow.com/questions/11735856/draw-a-grid-on-an-html-5-canvas-element
    }

}
