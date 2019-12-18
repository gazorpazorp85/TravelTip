'use strict'

let map, marker;

function initMap() {

    map = new google.maps.Map(document.querySelector('.map-container'), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 17
    });

    var elMyLocationControlDiv = document.createElement('div');
    elMyLocationControlDiv.classList.add('my-location-button');
    elMyLocationControlDiv.classList.add('pointer');
    elMyLocationControlDiv.title = 'Return to current location';
    elMyLocationControlDiv.addEventListener('click', () => { getPosition() })
    map.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(elMyLocationControlDiv);

    map.addListener("click", function (event) {
        let latitude = event.latLng.lat();
        let longitude = event.latLng.lng();
        onShowSwall(latitude, longitude);
    });

    marker = new google.maps.Marker({
        map: map,
        position: { lat: -34.397, lng: 150.644 },
        icon: { url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png" }
    });

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            marker.setPosition(pos);
            map.setCenter(pos);
            showCurrLocation(pos.lat, pos.lng);
        });
    }
}

function getPosition() {
    navigator.geolocation.getCurrentPosition(showLocation);
}

function showLocation(position) {
    initMap(position.coords.latitude, position.coords.longitude);
}

function showSavedLocation(location) {
    map.setCenter(new google.maps.LatLng(location.lat, location.long));
    map.setZoom(17);
}

function onShowSwall(latitude, longitude) {
    Swal.fire({
        title: 'Save Location',
        type: 'question',
        showConfirmButton: 'true',
        confirmButtonText: 'Sure',
        showCancelButton: 'true',
        cancelButtonText: 'No, thanks',
        animation: true,
        allowEnterKey: true,
    })
        .then(result => {
            if (result.value) {
                Swal.fire(
                    'Location saved.',
                    'success'
                );
                addLocation(latitude, longitude);
                showCurrLocation(latitude, longitude);
                renderLocations();
            }
        });
};