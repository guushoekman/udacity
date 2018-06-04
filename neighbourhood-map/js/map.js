var markers = [
  {
    title: "Castle of Good Hope",
    lat: -33.92587,
    lng: 18.42771,
    page: "Castle_of_Good_Hope",
    description: '',
  },
  {
    title: "District Six Museum",
    lat: -33.927723,
    lng: 18.4236726,
    page: "District_Six_Museum",
    description: '',
  },
  {
    title: "Slave Lodge",
    lat: -33.92506,
    lng: 18.420393,
    page: "Slave_Lodge,_Cape_Town",
    description: '',
  },
  {
    title: "Houses of Parliament",
    lat: -33.92658,
    lng: 18.41886,
    page: "Houses_of_Parliament,_Cape_Town",
    description: '',
  },
  {
    title: "Iziko South African National Gallery",
    lat: -33.928980,
    lng: 18.417180,
    page: "Iziko_South_African_National_Gallery",
    description: '',
  }
];

var map;
function initMap() {
  map = L.map('map').fitBounds([[-33.9245,18.4169],[-33.92955,18.42832]]);

  L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/attribution">CARTO</a>'
  }).addTo(map);

  ko.applyBindings(viewModel);
}

var viewModel = function(){
  var Place = function(data) {
    this.title = data.title;
    this.lat = data.lat;
    this.lng = data.lng;
    this.page = data.page;
    this.description = data.description;
    this.wiki = "https://en.wikipedia.org/wiki/" + data.page;
  };

  var self = this;
  this.placeList = ko.observableArray([]);

  markers.forEach(function (placeItem) {
    self.placeList.push(new Place(placeItem));
  });

  placeList().forEach(function(location) {
    var lGroup = L.layerGroup().addTo(map);
    var marker = L.marker([location.lat, location.lng]).bindPopup("<h2>" + location.title + "</h2>").addTo(lGroup)

    location.marker = marker;

    location.marker.on('popupopen', function() {
      $.ajax({
        type: "GET",
        url: "https://en.wikipedia.org/w/api.php?action=opensearch&search=" + location.page + "&limit=1&format=json&origin=*",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data, textStatus, jqXHR) {
          location.marker.getPopup().setContent("<h2>" + location.title + "</h2><p>" + data[2][0] + "</p><p><a href='" + location.wiki + "'>More on Wikipedia</a>");
        },
        error: function() {
          location.marker.getPopup().setContent("<h2>" + location.title + "</h2><p>Could not load summary, please follow the link below to read more about this location.</p><p><a href='" + location.wiki + "'>More on Wikipedia</a>");
        }
      });
      $(this._icon).addClass("move-marker")
      $(this._shadow).addClass("move-marker")
      map.setView([location.lat, location.lng])
    })
    .on('popupclose', function() {
      $(this._icon).removeClass("move-marker")
      $(this._shadow).removeClass("move-marker")
      map.fitBounds([[-33.9245,18.4169],[-33.92955,18.42832]])
    });
  });

  // Filter markers per user input

  // Array containing only the markers based on search
  self.visible = ko.observableArray();

  // All markers are visible by default before any user input
  self.placeList().forEach(function(location) {
    self.visible.push(location);
  });

  // Track user input
  self.userInput = ko.observable('');

  self.filter = function () {
    // remove all markers from visible array
    self.visible.removeAll();
    var searchInput = self.userInput().toLowerCase();

    self.placeList().forEach(function(location) {
      // remove all layers from map
      map.removeLayer(location.marker);
      // compare user input with title of locations
      // if location title contains user input, show marker
      if (location.title.toLowerCase().indexOf(searchInput) !== -1) {
        self.visible.push(location);
      }
    });
    self.visible().forEach(function (location) {
      map.addLayer(location.marker);
    });
  };
};

function leafletError() {
  $("#leaflet-error").show();
}