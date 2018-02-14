export default class Film {
    _id: String;
    title: String;
    subtitle: String;
    year: Number;
    duration: Number;
    coverPicture: String;
    media: String[];
    popularity: Number;
    stars: String[];
    writers: String[];
    directors: String[];
    setId(id: String){
        this._id=id;
    }
}