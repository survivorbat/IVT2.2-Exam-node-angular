import Film from "./Film";
import Room from "./Room";

export default class Showing {
    private _id: String;
    private _specialties: Array<String>;
    private _price: Number;
    private _ticketSold: Number;
    private _film: Film;
    private _room: Room;
    private _date: Date;

	public get price(): Number {
		return this._price;
	}

	public set price(value: Number) {
		this._price = value;
	}

	public get ticketSold(): Number {
		return this._ticketSold;
	}

	public set ticketSold(value: Number) {
		this._ticketSold = value;
	}

	public get specialties(): Array<String> {
		return this._specialties;
	}

	public set specialties(value: Array<String>) {
		this._specialties = value;
	}

	public get room(): Room {
		return this._room;
	}

	public set room(value: Room) {
		this._room = value;
	}

	public get film(): Film {
		return this._film;
	}

	public set film(value: Film) {
		this._film = value;
	}

	public get date(): Date {
		return this._date;
	}

	public set date(value: Date) {
		this._date = value;
	}

	public get id(): String {
		return this._id;
	}

	public set id(value: String) {
		this._id = value;
	}

}