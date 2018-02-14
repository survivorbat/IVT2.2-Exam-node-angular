import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShowingsComponent } from './components/pages/showings/showings.component';
import { FilmsComponent } from './components/pages/films/films.component';
import { LocationsComponent } from './components/pages/locations/locations.component';
import { InfoComponent } from './components/pages/info/info.component';
import { AdminComponent } from './components/pages/admin/admin.component';
import { FilmComponent } from './components/pages/film/film.component';
import { LocationComponent } from './components/pages/location/location.component';

const routes: Routes = [
  { path: '', redirectTo: 'showings', pathMatch: 'full' },
  { path: 'showings', component: ShowingsComponent, pathMatch: 'full' },
  { path: 'films', component: FilmsComponent, pathMatch: 'full' },
  { path: 'films/:id', component: FilmComponent, pathMatch: 'full' },
  { path: 'locations', component: LocationsComponent, pathMatch: 'full' },
  { path: 'locations/:id', component: LocationComponent, pathMatch: 'full' },
  { path: 'info', component: InfoComponent, pathMatch: 'full' },
  { path: 'admin', component: AdminComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule]
})
export class AppRoutingModule {}