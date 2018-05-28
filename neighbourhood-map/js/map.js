var map = L.map('map').fitBounds([[-33.9245,18.4169],[-33.92955,18.42832]]);

L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/attribution">CARTO</a>'
}).addTo(map);

var markers = [
  {
    title: "Castle of Good Hope",
    lat: -33.92587,
    lng: 18.42771,
    page: "Castle_of_Good_Hope",
    id: "nav0",
    boolTest: true
  },
  {
    title: "District Six Museum",
    lat: -33.927723,
    lng: 18.4236726,
    page: "District_Six_Museum",
    id: "nav1",
    boolTest: true
  },
  {
    title: "Slave Lodge, Cape Town",
    lat: -33.92506,
    lng: 18.420393,
    page: "Slave_Lodge,_Cape_Town",
    id: "nav2",
    boolTest: true
  },
  {
    title: "Houses of Parliament, Cape Town",
    lat: -33.92658,
    lng: 18.41886,
    page: "Houses_of_Parliament,_Cape_Town",
    id: "nav3",
    boolTest: true
  },
  {
    title: "Iziko South African National Gallery",
    lat: -33.928980,
    lng: 18.417180,
    page: "Iziko_South_African_National_Gallery",
    id: "nav4",
    boolTest: true
  }
];

$(markers).each(function() {
  var url = "https://en.wikipedia.org/wiki/" + this.page
  L.marker([this.lat, this.lng]).addTo(map)
  .bindPopup("<a target='_blank' href='" + url + "'>" + this.title + "</a>")
  .on('popupopen', function() {
    $(this._icon).addClass("move-marker")
    $(this._shadow).addClass("move-marker")
  })
  .on('popupclose ', function() {
    $(this._icon).removeClass("move-marker")
    $(this._shadow).removeClass("move-marker")
  });
  $.ajax({
    type: "GET",
    url: "https://en.wikipedia.org/w/api.php?action=query&titles=" + this.page + "&prop=pageimages&format=json&formatversion=2&origin=*",
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function (data, textStatus, jqXHR) {
      console.log(data.query.pages[0].thumbnail.source)
    },
    error: function (errorMessage) {
    }
  });
});

