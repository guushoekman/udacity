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

var Place = function (data) {
  this.title = ko.observable(data.title);
  this.lat = ko.observable(data.lat);
  this.lng = ko.observable(data.lng);
  this.page = ko.observable(data.page);
  this.marker = ko.observable();
  this.description = ko.observable('');
};


var viewModel = function(){
  // Make this accessible
  var self = this;

  // Create an array of all places
  // Credit https://www.udacity.com/course/viewer#!/c-ud989-nd/l-3406489055/e-3464818693/m-3464818694
  this.placeList = ko.observableArray([]);

  // Call the Place constructor
  // Create Place objects for each item in locations & store them in the above array
  // Credit https://www.udacity.com/course/viewer#!/c-ud989-nd/l-3406489055/e-3464818693/m-3464818694
  markers.forEach(function (placeItem) {
    self.placeList.push(new Place(placeItem));
  });

  placeList().forEach(function(location) {
    $.ajax({
      type: "GET",
      url: "https://en.wikipedia.org/w/api.php?action=opensearch&search=" + location.page() + "&limit=1&format=json" + "&origin=*",
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: function(data, textStatus, jqXHR) {
        // console.log(location.description());
        wikiDescription = data[2][0];
        // console.log(asfd);
      },
      error: function(errorMessage) {
      }
    });

    var url = "https://en.wikipedia.org/wiki/" + location.page()
    var marker = L.marker([location.lat(), location.lng()]).bindPopup(location.title()).addTo(map)
    .on('popupopen', function() {
      $(this._icon).addClass("move-marker")
      $(this._shadow).addClass("move-marker")
      map.setView([location.lat(), location.lng()])
    })
    .on('popupclose', function() {
      $(this._icon).removeClass("move-marker")
      $(this._shadow).removeClass("move-marker")
      map.fitBounds([[-33.9245,18.4169],[-33.92955,18.42832]])
    });
    marker.on('mouseover', function(){
      marker._popup.setContent(
        "<h2>" + location.title() + "</h2><p>" + wikiDescription + "</p><p><a target='_blank' href='https://en.wikipedia.org/wiki/" + location.page() + "'>Article on Wikipedia</a>"
      );
    });
  });

  self.visible = ko.observableArray();

  // All markers are visible by default before any user input
  self.placeList().forEach(function (place) {
    self.visible.push(place);
  });

  self.userInput = ko.observable('');

  // self.filter = function () {
  //   // Set all markers and places to not visible.
  //   var searchInput = self.userInput().toLowerCase();
  //   self.visible.removeAll();
  //   self.markers().forEach(function (place) {
  //     console.log(this);
  //     place.marker.setVisible(false);
  //     // Compare the name of each place to user input
  //     // If user input is included in the name, set the place and marker as visible
  //     if (place.name().toLowerCase().indexOf(searchInput) !== -1) {
  //       self.visible.push(place);
  //     }
  //   });
  //   self.visible().forEach(function (place) {
  //     place.marker.setVisible(true);
  //   });
  // };

};

ko.applyBindings(viewModel);