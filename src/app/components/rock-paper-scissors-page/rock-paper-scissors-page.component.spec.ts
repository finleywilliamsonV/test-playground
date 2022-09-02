import { ComponentFixture, TestBed } from '@angular/core/testing'

import { RockPaperScissorsPageComponent } from './rock-paper-scissors-page.component'

describe('RockPaperScissorsPageComponent', () => {
    let component: RockPaperScissorsPageComponent
    let fixture: ComponentFixture<RockPaperScissorsPageComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [RockPaperScissorsPageComponent]
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
            console.log('button.classList:', button.classList)
            expect(button.classList.contains('no-click')).toBeTrue()
        }
    })

    it('should display "pick a move" on initialization', () => {
        const label = fixture.nativeElement.querySelector('#results-label') as HTMLDivElement
        expect(label.innerHTML.includes(component.resultsLabels.undecided))
    })

    it('should have base selection state as "undecided" for both', () => {
        expect(component.getIconNameForIcon(component.playerMove)).toBe('none')
        expect(component.getIconNameForIcon(component.computerMove)).toBe('none')
    })

    it('should correctly display a player win', () => {

        component.playerMove = component.moves.paper
        component.computerMove = component.moves.rock

        component.calculateWinner()

        const label = fixture.nativeElement.querySelector('#results-label') as HTMLDivElement
        console.log('label.innerHTML:', label.innerHTML)
        expect(label.innerHTML.includes(component.resultsLabels.player)).toBeTruthy()
    })

    it('should correctly display a computer win', () => {

        component.playerMove = component.moves.rock
        component.computerMove = component.moves.scissors

        component.calculateWinner()

        const label = fixture.nativeElement.querySelector('#results-label') as HTMLDivElement
        expect(label.innerHTML.includes(component.resultsLabels.computer)).toBeTruthy()
    })

    it('should correctly display a draw', () => {

        component.playerMove = component.moves.paper
        component.computerMove = component.moves.paper

        component.calculateWinner()

        const label = fixture.nativeElement.querySelector('#results-label') as HTMLDivElement
        expect(label.innerHTML.includes(component.resultsLabels.draw)).toBeTruthy()
    })
})
