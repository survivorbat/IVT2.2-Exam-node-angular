import Location from "./Location";

export default class Room {
    _id: string;
    location: Location;
    rows: number;
    columns: number;
	name: string;
	chairs: number;
}