import { Component, OnInit } from '@angular/core'
import { faHand, faHandBackFist, faHandScissors, faQuestion } from '@fortawesome/free-solid-svg-icons'
import { IconDefinition } from '@fortawesome/fontawesome-common-types'
import { preserveOrder } from 'src/libs/helper-functions'
import { find } from 'lodash'

type PossibleMove = 'rock' | 'paper' | 'scissors' | 'none'
type PossibleWinner = 'player' | 'computer' | 'draw' | 'undecided'
const GAME_RESET_INTERVAL_MS = 3000

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
        none: faQuestion
    }

    playerMove: IconDefinition = this.moves.none
    computerMove: IconDefinition = this.moves.none
    winner: PossibleWinner = 'undecided'

    resultsLabels: Record<PossibleWinner, string> = {
        undecided: 'Pick a Move',
        player: 'Player Wins ^_^',
        computer: 'CPU Wins @_@',
        draw: 'It\'s a Draw!'
    }

    constructor() { }

    ngOnInit(): void { }

    // would rather have used a record but a readonly map gives the correct type
    // for the return from the keyvalue pipe in the html
    getMoveMap(): ReadonlyMap<PossibleMove, IconDefinition> {
        return new Map(
            Object.entries(this.moves)
        ) as ReadonlyMap<PossibleMove, IconDefinition>
    }

    selectMove(move: IconDefinition) {
        this.playerMove = move
        this.selectComputerMove()
        this.calculateWinner()
        this.startResetTimer()
    }

    selectComputerMove(): void {
        const index = Math.floor(Math.random() * 3)
        this.computerMove = Object.values(this.moves)[index]
    }

    calculateWinner(): void {
        if (this.playerMove == this.moves.none || this.computerMove == this.moves.none) {
            this.winner = 'undecided'

        } else if (this.playerMove == this.computerMove) {
            this.winner = 'draw'

        } else if (
            // all player winning moves
            (this.playerMove == this.moves.rock && this.computerMove == this.moves.scissors)
            || (this.playerMove == this.moves.paper && this.computerMove == this.moves.rock)
            || (this.playerMove == this.moves.scissors && this.computerMove == this.moves.paper)
        ) {
            this.winner = 'player'

        } else {
            // else computer wins
            this.winner = 'computer'
        }
    }

    resetGame(): void {
        this.playerMove = this.moves.none
        this.computerMove = this.moves.none
        this.winner = 'undecided'
    }

    /**
     * Uses IIFE because I don't want timeoutId as a class variable
     */
    startResetTimer = (
        () => {
            let timeoutId: ReturnType<typeof setTimeout>

            return () => {
                clearTimeout(timeoutId)

                timeoutId = setTimeout(() => {
                    this.resetGame()
                }, GAME_RESET_INTERVAL_MS)
            }
        }
    )()

    getIconNameForIcon(icon: IconDefinition): PossibleMove {
        for (const key in this.moves) {
            if (Object.prototype.hasOwnProperty.call(this.moves, key)) {
                const currentIcon = this.moves[key as PossibleMove]
                if (currentIcon == icon) {
                    return key as PossibleMove
                }
            }
        }
        return 'none'
    }
}
