import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PageTitleComponent } from './components/page-title/page-title.component';
import { RandomImageCardComponent } from './components/random-image-card/random-image-card.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { WelcomePageComponent } from './components/welcome-page/welcome-page.component';
import { RandomImagePageComponent } from './components/random-image-page/random-image-page.component';

@NgModule({
  declarations: [
    AppComponent,
    PageTitleComponent,
    RandomImageCardComponent,
    NavBarComponent,
    WelcomePageComponent,
    RandomImagePageComponent
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
