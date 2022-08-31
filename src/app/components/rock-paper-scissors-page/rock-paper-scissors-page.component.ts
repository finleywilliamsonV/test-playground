import { Component, OnInit } from '@angular/core'
import { faHand, faHandBackFist, faHandScissors } from '@fortawesome/free-solid-svg-icons'
import { IconDefinition } from '@fortawesome/fontawesome-common-types'

@Component({
    selector: 'app-rock-paper-scissors-page',
    templateUrl: './rock-paper-scissors-page.component.html',
    styleUrls: ['./rock-paper-scissors-page.component.scss']
})
export class RockPaperScissorsPageComponent implements OnInit {

    faRock: IconDefinition = faHandBackFist
    faPaper: IconDefinition = faHand
    faScissors: IconDefinition = faHandScissors

    constructor() { }

    ngOnInit(): void {
    }

}
