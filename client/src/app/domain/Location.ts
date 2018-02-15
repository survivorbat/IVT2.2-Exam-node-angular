export default class Location {
    private _id: String;
    private _name: String;
    private _street: String;
    private _zip: String;
    private _number: Number;
    private _state: String;
    private _city: String;

	public get id(): String {
		return this._id;
	}

	public set id(value: String) {
		this._id = value;
	}

	public get state(): String {
		return this._state;
	}

	public set state(value: String) {
		this._state = value;
	}

	public get street(): String {
		return this._street;
	}

	public set street(value: String) {
		this._street = value;
	}

	public get zip(): String {
		return this._zip;
	}

	public set zip(value: String) {
		this._zip = value;
	}

	public get name(): String {
		return this._name;
	}

	public set name(value: String) {
		this._name = value;
	}

	public get city(): String {
		return this._city;
	}

	public set city(value: String) {
		this._city = value;
	}

	public get number(): Number {
		return this._number;
	}

	public set number(value: Number) {
		this._number = value;
	}
}