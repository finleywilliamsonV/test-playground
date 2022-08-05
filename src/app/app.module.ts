import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PageTitleComponent } from './components/page-title/page-title.component';
import { RandomPictureCardComponent } from './components/random-picture-card/random-picture-card.component';

@NgModule({
  declarations: [
    AppComponent,
    PageTitleComponent,
    RandomPictureCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
