var map = L.map('map').fitBounds([[-33.8955,18.3527],[-33.9923,18.5188]]);

L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/attribution">CARTO</a>'
}).addTo(map);

var markers = [
  {
    title: "Castle of Good Hope",
    lat: -33.92587,
    lng: 18.42771,
    url: "https://en.wikipedia.org/wiki/Castle_of_Good_Hope",
    id: "nav0",
    boolTest: true
  },
];

$(markers).each(function() {
  L.marker([this.lat, this.lng]).addTo(map)
    .bindPopup("<a target='_blank' href='" + this.url + "'>" + this.title + "</a>")
    .on('popupopen', function() {
      $(this._icon).addClass("move-marker")
      $(this._shadow).addClass("move-marker")
    })
    .on('popupclose ', function() {
      $(this._icon).removeClass("move-marker")
      $(this._shadow).removeClass("move-marker")
    });
});

// $.ajax({
//   url: remoteUrlWithOrigin,
//   data: queryData,
//   dataType: 'json',
//   type: 'POST',
//   headers: { 'Api-User-Agent': 'Example/1.0' },
//   success: function(data) {
//      // do something with data
//   }
// });