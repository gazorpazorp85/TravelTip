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

// function getPlaceByText() {

//     let prmRes = axios.get(`https://maps.googleapis.com/maps/api/js?key=AIzaSyBG9ilTxQ0yEVAEA7Flkd-3RqvEqt6F52A/place/textsearch/output?`)
// }

function getPlaceByCoordinates(latitude, longitude) {
    console.log(latitude, longitude);
    let prmRes = axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyBG9ilTxQ0yEVAEA7Flkd-3RqvEqt6F52A`);
        return prmRes.then(result => result.data.results[0].formatted_address);
}