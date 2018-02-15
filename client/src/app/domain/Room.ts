import Location from "./Location";

export default class Room {
    private _id: String;
    private _location: Location;
    private _rows: number;
    private _columns: number;
	private _name: String;
	private _chairs: number;

    public get chairs(): number {
        return this._rows*this._columns;
    }
    
	public get id(): String {
		return this._id;
	}

	public set id(value: String) {
		this._id = value;
	}

	public get name(): String {
		return this._name;
	}

	public set name(value: String) {
		this._name = value;
	}

	public get columns(): number {
		return this._columns;
	}

	public set columns(value: number) {
		this._columns = value;
	}
    
	public get location(): Location {
		return this._location;
	}

	public set location(value: Location) {
		this._location = value;
	}
}