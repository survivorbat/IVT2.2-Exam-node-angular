import { BrowserModule } from '@angular/platform-browser';
import { NgModule, TemplateRef } from '@angular/core';
import { FormsModule }  from '@angular/forms';
import { HttpClientModule, HttpClient }    from '@angular/common/http';
import { AppRoutingModule }     from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ContentComponent } from './components/content/content.component';
import { NavComponent } from './components/nav/nav.component';
import { FilmsService } from './services/films.service';
import { LocationsService } from './services/locations.service';
import { ShowingsComponent } from './components/pages/showings/showings.component';
import { FilmsComponent } from './components/pages/films/films.component';
import { LocationsComponent } from './components/pages/locations/locations.component';
import { InfoComponent } from './components/pages/info/info.component';
import { AdminComponent } from './components/pages/admin/admin.component';
import { FilmComponent } from './components/pages/film/film.component';
import { LocationComponent } from './components/pages/location/location.component';
import { RoomsService } from './services/rooms.service';
import { FilmlistComponent } from './components/datadisplay/filmlist/filmlist.component';
import { LocationlistComponent } from './components/datadisplay/locationlist/locationlist.component';
import { RoomlistComponent } from './components/datadisplay/roomlist/roomlist.component';
import { ShowinglistComponent } from './components/datadisplay/showinglist/showinglist.component';
import { ShowingsService } from './services/showingservice.service';
import { ShowingComponent } from './components/pages/showing/showing.component';
import { NewticketComponent } from './components/forms/newticket/newticket.component';
import { RepeatDirective } from './directives/repeat.directive';
import { RoomComponent } from './components/pages/room/room.component';
import { UserComponent } from './components/pages/user/user.component';
import { NewuserComponent } from './components/forms/newuser/newuser.component';
import { LoginComponent } from './components/forms/login/login.component';
import { UserService } from './services/user.service';
import { TicketService } from './services/ticket.service';
import { TicketlistComponent } from './components/datadisplay/ticketlist/ticketlist.component';
import { NewfilmComponent } from './components/forms/newfilm/newfilm.component';
import { NewshowingComponent } from './components/forms/newshowing/newshowing.component';
import { NewlocationComponent } from './components/forms/newlocation/newlocation.component';
import { NewroomComponent } from './components/forms/newroom/newroom.component';
import { EditfilmComponent } from './components/forms/editfilm/editfilm.component';
import { EditshowingComponent } from './components/forms/editshowing/editshowing.component';
import { EditlocationComponent } from './components/forms/editlocation/editlocation.component';
import { EditroomComponent } from './components/forms/editroom/editroom.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ContentComponent,
    NavComponent,
    ShowingsComponent,
    FilmsComponent,
    LocationsComponent,
    InfoComponent,
    AdminComponent,
    FilmComponent,
    LocationComponent,
    FilmlistComponent,
    LocationlistComponent,
    RoomlistComponent,
    ShowinglistComponent,
    ShowingComponent,
    NewticketComponent,
    RepeatDirective,
    RoomComponent,
    UserComponent,
    NewuserComponent,
    LoginComponent,
    TicketlistComponent,
    NewfilmComponent,
    NewshowingComponent,
    NewlocationComponent,
    NewroomComponent,
    EditfilmComponent,
    EditshowingComponent,
    EditlocationComponent,
    EditroomComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [FilmsService, LocationsService, RoomsService, ShowingsService, UserService, TicketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
