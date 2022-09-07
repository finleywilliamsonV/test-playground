import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { RandomImagePageComponent } from './components/random-image-page/random-image-page.component'
import { WelcomePageComponent } from './components/welcome-page/welcome-page.component'
import { RockPaperScissorsPageComponent } from './components/rock-paper-scissors-page/rock-paper-scissors-page.component'
import { GameOfLifePageComponent } from './components/game-of-life-page/game-of-life-page.component'

const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: WelcomePageComponent },
    { path: 'random-image', component: RandomImagePageComponent },
    { path: 'rock-paper-scissors', component: RockPaperScissorsPageComponent },
    { path: 'game-of-life', component: GameOfLifePageComponent },
    { path: '**', redirectTo: '/home'}
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
