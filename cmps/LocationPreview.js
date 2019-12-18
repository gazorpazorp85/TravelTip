class LocationPreview {
    constructor(location) {
        this.location = location;
    }
    onShowSavedLocation = () => {
        showSavedLocation(this.location);
    }

    onDeleteLocation = () => {
        deleteLocation(this.location);
        renderLocations();
    }

    render() {
        const { location } = this;

        const elDiv = document.createElement('div');
        elDiv.innerHTML = `<div> ${location.id}</div>
                            <div>${location.lat}</div>
                            <div>${location.long}</div>
                            <button class="show">show</button>
                            <button class="update">Update</button>
                            <button class="delete">delete</button>`
        elDiv.querySelector('.show').onclick = this.onShowSavedLocation;
        elDiv.querySelector('.delete').onclick = this.onDeleteLocation;
        return elDiv;
    }
}

