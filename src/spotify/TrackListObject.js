import TrackObject from "./TrackObject";

class TrackListObject {
    constructor(response) {
        this._trackList = response.items.map(track => {
            const { id, href, name, preview_url, uri, artists, album } = track;
            const artistsName = artists.map(artist => artist.name);
            const albumName = album.name;
            return new TrackObject({ id, href, name, preview_url, uri, artistsName, albumName });
        });
    }

    get trackList() {
        return this._trackList;
    }
}

export default TrackListObject;