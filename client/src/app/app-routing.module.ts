import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShowingsComponent } from './components/pages/showings/showings.component';
import { FilmsComponent } from './components/pages/films/films.component';
import { LocationsComponent } from './components/pages/locations/locations.component';
import { InfoComponent } from './components/pages/info/info.component';
import { AdminComponent } from './components/pages/admin/admin.component';
import { FilmComponent } from './components/pages/film/film.component';
import { LocationComponent } from './components/pages/location/location.component';
import { RoomlistComponent } from './components/datadisplay/roomlist/roomlist.component';
import { ShowingComponent } from './components/pages/showing/showing.component';
import { RoomComponent } from './components/pages/room/room.component';
import { UserComponent } from './components/pages/user/user.component';

const routes: Routes = [
  { path: '', redirectTo: 'showings', pathMatch: 'full' },
  { path: 'showings', component: ShowingsComponent, pathMatch: 'full' },
  { path: 'showings/:id', component: ShowingComponent, pathMatch: 'full' },
  { path: 'films', component: FilmsComponent, pathMatch: 'full' },
  { path: 'films/:id', component: FilmComponent, pathMatch: 'full' },
  { path: 'locations', component: LocationsComponent, pathMatch: 'full' },
  { path: 'locations/:id', component: LocationComponent, pathMatch: 'full' },
  { path: 'rooms/:id', component: RoomComponent, pathMatch: 'full' },
  { path: 'info', component: InfoComponent, pathMatch: 'full' },
  { path: 'admin', component: AdminComponent, pathMatch: 'full' },
  { path: 'test', component: RoomlistComponent, pathMatch: 'full' },
  { path: 'users', component: UserComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule]
})
export class AppRoutingModule {}