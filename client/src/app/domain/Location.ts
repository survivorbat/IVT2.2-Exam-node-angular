export default class Location {
    _id: String;
    name: String;
    street: String;
    zip: String;
    number: Number;
    state: String;
    city: String;
    setId(id: String){
        this._id=id;
    }
}