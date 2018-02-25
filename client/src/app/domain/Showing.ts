import Film from "./Film";
import Room from "./Room";

export default class Showing {
    _id: string;
    specialties: Array<string>;
    price: Number;
    ticketSold: Number;
    film: Film;
    room: Room;
    date: Date;
}