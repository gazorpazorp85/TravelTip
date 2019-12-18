'use strict'

function init() {
    initMap();
    renderLocations();
}

function renderLocations() {

    let locations = getLocations();

    let elLocationTable = document.querySelector('.location-table');
    elLocationTable.innerHTML = '';

    locations.forEach(location => {
        const locationPreview = new LocationPreview(location);
        const elDiv = locationPreview.render();
        elLocationTable.append(elDiv);
    });
}

// function searchLocation() {
//     let elLocationInput = document.querySelector('.location-input');
//     elLocationInput.addListener("keyup", getPlaceByText()

// }

function showCurrLocation(latitude, longitude) {
    let elAddress = document.querySelector('.address');
    getPlaceByCoordinates(latitude, longitude)
        .then(res => elAddress.innerHTML = res);
}