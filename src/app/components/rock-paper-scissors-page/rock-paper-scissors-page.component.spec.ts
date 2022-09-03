import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'

import { RockPaperScissorsPageComponent } from './rock-paper-scissors-page.component'

describe('RockPaperScissorsPageComponent', () => {
    let component: RockPaperScissorsPageComponent
    let fixture: ComponentFixture<RockPaperScissorsPageComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports:[FontAwesomeModule],
            declarations: [RockPaperScissorsPageComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        })
            .compileComponents()

        fixture = TestBed.createComponent(RockPaperScissorsPageComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })

    it('should show three buttons for the user: rock, paper, and scissors', () => {
        for (let moveOption of ['rock', 'paper', 'scissors']) {
            const button = fixture.nativeElement.querySelector(`#moveBtn_player_${moveOption}`) as HTMLButtonElement
            expect(button).toBeTruthy()
        }
    })

    it('should show three "no-click" buttons for the CPU: rock, paper, and scissors', () => {
        for (let moveOption of ['rock', 'paper', 'scissors']) {
            const button = fixture.nativeElement.querySelector(`#moveBtn_cpu_${moveOption}`) as HTMLButtonElement
            expect(button).toBeTruthy()
            expect(button.classList.contains('no-click')).toBeTrue()
        }
    })

    it('should display "pick a move" on initialization', () => {
        const label = fixture.nativeElement.querySelector('#resultsLabel') as HTMLDivElement
        expect(label.innerHTML.includes(component.resultsLabels.undecided)).toBeTruthy()
    })

    it('should have base selection state as "undecided" for both', () => {
        expect(component.getIconNameForIcon(component.playerMove)).toBe('none')
        expect(component.getIconNameForIcon(component.computerMove)).toBe('none')
    })

    it('should correctly calculate a player win', async () => {

        component.playerMove = component.moves.paper
        component.computerMove = component.moves.rock

        component.calculateWinner()

        expect(component.winner).toBe('player')
    })

    it('should correctly calculate a computer win', () => {

        component.playerMove = component.moves.rock
        component.computerMove = component.moves.paper

        component.calculateWinner()

        expect(component.winner).toBe('computer')
    })

    it('should correctly calculate a draw', () => {

        component.playerMove = component.moves.paper
        component.computerMove = component.moves.paper

        component.calculateWinner()

        expect(component.winner).toBe('draw')
    })
})
