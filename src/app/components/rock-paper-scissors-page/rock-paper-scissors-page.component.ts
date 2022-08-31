import { Component, OnInit } from '@angular/core'
import { faHand, faHandBackFist, faHandScissors } from '@fortawesome/free-solid-svg-icons'
import { IconDefinition } from '@fortawesome/fontawesome-common-types'
import { preserveOrder } from 'src/libs/helper-functions'

type PossibleMove = 'rock' | 'paper' | 'scissors'
type Player = 'user' | 'cpu'

@Component({
    selector: 'app-rock-paper-scissors-page',
    templateUrl: './rock-paper-scissors-page.component.html',
    styleUrls: ['./rock-paper-scissors-page.component.scss']
})
export class RockPaperScissorsPageComponent implements OnInit {

    preserveOrder = preserveOrder

    moves: Record<PossibleMove, IconDefinition> = {
        rock: faHandBackFist,
        paper: faHand,
        scissors: faHandScissors,
    } as const

    playerMove!: PossibleMove
    cpuMove!: PossibleMove

    constructor() { }

    ngOnInit(): void {
    }

}
