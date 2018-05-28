var map = L.map('map').fitBounds([[-33.9245,18.4169],[-33.92955,18.42832]]);

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
  {
    title: "District Six Museum",
    lat: -33.927723,
    lng: 18.4236726,
    url: "https://en.wikipedia.org/wiki/District_Six_Museum",
    id: "nav1",
    boolTest: true
  },
  {
    title: "Slave Lodge",
    lat: -33.92506,
    lng: 18.420393,
    url: "https://en.wikipedia.org/wiki/Slave_Lodge,_Cape_Town",
    id: "nav2",
    boolTest: true
  },
  {
    title: "Houses of Parliament",
    lat: -33.92658,
    lng: 18.41886,
    url: "https://en.wikipedia.org/wiki/Houses_of_Parliament,_Cape_Town",
    id: "nav3",
    boolTest: true
  },
  {
    title: "Iziko South African National Gallery",
    lat: -33.928980,
    lng: 18.417180,
    url: "https://en.wikipedia.org/wiki/Iziko_South_African_National_Gallery",
    id: "nav4",
    boolTest: true
  }
];

$(markers).each(function() {
  $.ajax({
    url: this.url,
    data: queryData,
    dataType: 'json',
    type: 'POST',
    headers: { 'Api-User-Agent': 'Example/1.0' },
    success: function(data) {
      console.log(data);
    }
  });
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