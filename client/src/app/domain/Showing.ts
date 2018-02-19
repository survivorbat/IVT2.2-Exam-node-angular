import Film from "./Film";
import Room from "./Room";

export default class Showing {
    _id: String;
    specialties: Array<String>;
    price: Number;
    ticketSold: Number;
    film: Film;
    room: Room;
    date: Date;
}