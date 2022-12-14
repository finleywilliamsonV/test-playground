import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PageTitleComponent } from './components/page-title/page-title.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { WelcomePageComponent } from './components/welcome-page/welcome-page.component';
import { RandomImagePageComponent } from './components/random-image-page/random-image-page.component';
import { RockPaperScissorsPageComponent } from './components/rock-paper-scissors-page/rock-paper-scissors-page.component';
import { GameOfLifePageComponent } from './components/game-of-life-page/game-of-life-page.component';

@NgModule({
  declarations: [
    AppComponent,
    PageTitleComponent,
    NavBarComponent,
    WelcomePageComponent,
    RandomImagePageComponent,
    RockPaperScissorsPageComponent,
    GameOfLifePageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
