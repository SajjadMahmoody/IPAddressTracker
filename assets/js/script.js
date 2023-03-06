

$("#currentIp").on("input", (e) => {

    currentIp = e.currentTarget.value;
})

let map = L.map('map').setView([36.5560362, 53.0524079], 6);
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
}).addTo(map);
const locationicon = L.icon({
    iconUrl: './assets/media/images/icon-location.svg',
    iconSize: [35, 35],
    iconAnchor: [15, 15]
});
currentIP();
async function currentIP() {
    try {
        const response = await fetch(`https://geo.ipify.org/api/v2/country,city,vpn?apiKey=at_r1PpLWzTczlDpvOW1soqBDkRL0Pyi&ipAddress`, {
            method: "GET",
        });
        const data = await response.json();


        $("#ipAddress").html(data.ip);
        $("#location").html(data.location.country + "<br/>" + data.location.region);
        $("#timeZone").html(data.location.timezone);
        $("#isp").html(data.isp);
        map.flyTo([data.location.lat, data.location.lng]);
        marker = L.marker([data.location.lat, data.location.lng], { icon: locationicon }).addTo(map);


    } catch (error) {
        Swal.fire("Please turn off your ad Blocker");

        console.error(error);
    }
}


async function doFetch() {
    try {

        const response = await fetch(`https://geo.ipify.org/api/v2/country,city,vpn?apiKey=at_r1PpLWzTczlDpvOW1soqBDkRL0Pyi&ipAddress=${currentIp}`, {
            method: "GET",
        });
        const data = await response.json();
        $("#ipAddress").html(data.ip);
        $("#location").html(data.location.country + "<br/>" + data.location.region);
        $("#timeZone").html(data.location.timezone);
        $("#isp").html(data.isp);
        map.flyTo([data.location.lat, data.location.lng]);
        if (marker) {
            map.removeLayer(marker);
        }
        marker = L.marker([data.location.lat, data.location.lng], { icon: locationicon }).addTo(map);


    } catch (error) {
        console.error(error);
    }
}

$("#frm").on("submit", (e) => {
    e.preventDefault();
    const ipformat = new RegExp("^(([1-9]?\\d|1\\d\\d|2[0-5][0-5]|2[0-4]\\d)\\.){3}([1-9]?\\d|1\\d\\d|2[0-5][0-5]|2[0-4]\\d)$");
    if (ipformat.test($("#currentIp").val())) {
        doFetch();
    }
    else {
        swal(
            'Error!',
            'IP NOT FOUND!',
            'error'
        )
        $("#currentIp").val("");
    }

});