'use strict'

var map, infoWindow;

function initMap() {

    map = new google.maps.Map(document.querySelector('.map-container'), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 17
    });

    var elMyLocationControlDiv = document.createElement('div');
    elMyLocationControlDiv.classList.add('my-location-button');
    elMyLocationControlDiv.classList.add('pointer');
    elMyLocationControlDiv.title = 'Return to current location';
    elMyLocationControlDiv.addEventListener('click', () => {getPosition()})
    map.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(elMyLocationControlDiv);

    map.addListener("click", function (event) {
        var latitude = event.latLng.lat();
        var longitude = event.latLng.lng();
        onShowSwall(latitude, longitude);
    });

    infoWindow = new google.maps.InfoWindow;

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            infoWindow.setPosition(pos);
            infoWindow.setContent('Location found.');
            infoWindow.open(map);
            map.setCenter(pos);
        }, function () {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }

}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
}

function getPosition() {
    navigator.geolocation.getCurrentPosition(showLocation, handleLocationError);
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
                renderLocations();
            }
        });
};