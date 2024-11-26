class TrackObject {
    constructor({ id, href, name, preview_url, uri, artistsName, albumName }) {
        this.id = id;
        this.href = href;
        this.name = name;
        this.preview_url = preview_url;
        this.uri = uri;
        this.artistsName = artistsName;
        this.albumName = albumName;
    }
}

export default TrackObject;