'use strict'

let gLocations = [];

function addLocation(latitude, longitude) {
    gLocations.push(new Location(latitude, longitude));
    return gLocations;
}

function getLocations() {
    return gLocations;
}

function deleteLocation(location) {
    let idx = getLocationIndex(location);
    gLocations.splice(idx,1);
    return gLocations;
}

function getLocationIndex(location) {
    return gLocations.findIndex((gLocation) => gLocation.id === location.id);
}