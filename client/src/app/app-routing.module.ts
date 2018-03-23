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

import { FilmsComponent as AdminFilms }  from './components/pages/admin/films/films.component';
import { ShowingsComponent as AdminShowings }  from './components/pages/admin/showings/showings.component';
import { RoomsComponent as AdminRooms }  from './components/pages/admin/rooms/rooms.component';
import { LocationsComponent as AdminLocations }  from './components/pages/admin/locations/locations.component';
import { TicketsComponent as AdminTickets }  from './components/pages/admin/tickets/tickets.component';

const routes: Routes = [
  { path: '', redirectTo: 'showings', pathMatch: 'full' },
  { path: 'showings', component: ShowingsComponent},
  { path: 'showings/:id', component: ShowingComponent},
  { path: 'films', component: FilmsComponent},
  { path: 'films/:id', component: FilmComponent},
  { path: 'locations', component: LocationsComponent},
  { path: 'locations/:id', component: LocationComponent},
  { path: 'rooms/:id', component: RoomComponent},
  { path: 'info', component: InfoComponent},
  { path: 'admin', component: AdminComponent, 
    children: [
      { path: '', redirectTo: 'films', pathMatch: 'full'},
      { path: 'films', component: AdminFilms },
      { path: 'showings', component: AdminShowings },
      { path: 'locations', component: AdminLocations },
      { path: 'rooms', component: AdminRooms },
      { path: 'tickets', component: AdminTickets }
    ]
  },
  { path: 'test', component: RoomlistComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule]
})
export class AppRoutingModule {}