export default class Film {
    private _id: String;
    private _title: String;
    private _subtitle: String;
    private _year: Number;
    private _duration: Number;
    private _coverPicture: String;
    private _media: String[];
    private _popularity: Number;
    private _stars: String[];
    private _writers: String[];
    private _directors: String[];

	public get id(): String {
		return this._id;
	}

	public set id(value: String) {
		this._id = value;
	}

	public get subtitle(): String {
		return this._subtitle;
	}

	public set subtitle(value: String) {
		this._subtitle = value;
	}

	public get year(): Number {
		return this._year;
	}

	public set year(value: Number) {
		this._year = value;
	}

	public get coverPicture(): String {
		return this._coverPicture;
	}

	public set coverPicture(value: String) {
		this._coverPicture = value;
	}

	public get media(): String[] {
		return this._media;
	}

	public set media(value: String[]) {
		this._media = value;
	}

	public get popularity(): Number {
		return this._popularity;
	}

	public set popularity(value: Number) {
		this._popularity = value;
	}

	public get stars(): String[] {
		return this._stars;
	}

	public set stars(value: String[]) {
		this._stars = value;
	}

	public get writers(): String[] {
		return this._writers;
	}

	public set writers(value: String[]) {
		this._writers = value;
	}

	public get duration(): Number {
		return this._duration;
	}

	public set duration(value: Number) {
		this._duration = value;
	}

	public get directors(): String[] {
		return this._directors;
	}

	public set directors(value: String[]) {
		this._directors = value;
	}

	public get title(): String {
		return this._title;
	}

	public set title(value: String) {
		this._title = value;
	}
    
}