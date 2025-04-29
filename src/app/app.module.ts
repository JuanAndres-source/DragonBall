import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // <-- AJOUT ICI

import { AppRoutingModule } from './app.routes';
import { AppComponent } from './app.component';
import { CharactersComponent } from './characters/characters.component';
import { CharactersDetailsComponent } from './characters-details/characters-details.component';
import { PlanetsComponent } from './planets/planets.component';
import { PlanetsDetailsComponent } from './planets-details/planets-details.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CharactersComponent,
    CharactersDetailsComponent,
    PlanetsComponent,
    PlanetsDetailsComponent,
    ContactComponent
     // <-- Ton component contact
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HomeComponent,
    CharactersComponent,
    CharactersDetailsComponent,
    PlanetsComponent,
    PlanetsDetailsComponent,
    ContactComponent  // <-- N'OUBLIE PAS DE L'AJOUTER ICI !
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
