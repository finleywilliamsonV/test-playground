import { Component, OnInit } from '@angular/core'
import { faHand, faHandBackFist, faHandScissors, faQuestion } from '@fortawesome/free-solid-svg-icons'
import { IconDefinition } from '@fortawesome/fontawesome-common-types'
import { preserveOrder } from 'src/libs/helper-functions'

type PossibleMove = 'rock' | 'paper' | 'scissors' | 'none'
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
    winner: 'player' | 'computer' | 'draw' | 'undecided' = 'undecided'
    resultsLabel!: string

    constructor() { }

    ngOnInit(): void {
        this.calculateResultsLabel()
    }

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
        this.calculateResultsLabel()
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
        this.calculateResultsLabel()
    }

    calculateResultsLabel(): void {
        if (this.winner == 'undecided') {
            this.resultsLabel = 'Pick a Move'
        } else if (this.winner == 'player') {
            this.resultsLabel = 'Player Wins ^_^'
        } else if (this.winner == 'computer') {
            this.resultsLabel = 'CPU Wins @_@'
        } else if (this.winner == 'draw') {
            this.resultsLabel = 'It\'s a Draw!'
        }
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
}
