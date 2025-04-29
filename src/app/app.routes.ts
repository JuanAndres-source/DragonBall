import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CharactersComponent } from './characters/characters.component';
import { HomeComponent } from './home/home.component';
import { CharactersDetailsComponent } from './characters-details/characters-details.component';
import { PlanetsComponent } from './planets/planets.component';
import { PlanetsDetailsComponent } from './planets-details/planets-details.component';
import { ContactComponent } from './contact/contact.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'characters', component: CharactersComponent },
    { path: 'characters/:id', component: CharactersDetailsComponent },
    { path: 'planets', component: PlanetsComponent },
    { path: 'planets/:id', component: PlanetsDetailsComponent }
  ];
  

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
