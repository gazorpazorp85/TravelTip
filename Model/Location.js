let nextId = 0;

class Location {
    constructor(latitude, longitude) {
        this.id = nextId++,
        this.lat = latitude,
        this.long = longitude
    }
}