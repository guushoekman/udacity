// creates the grid, called when clicking on submit, width and height variables are defined in next function
function makeGrid(width, height) {
  var pixelCanvas, grid;
  pixelCanvas = $("#pixel_canvas");
  if (pixelCanvas.children().length) {
    pixelCanvas.empty();
  }
  for(var i = 0; i < height; i++) {
    grid += "<tr>";
    for (var j = 0; j < width; j++) {
      grid += "<td></td>";
    }
    grid += "</tr>";
  }
  pixelCanvas.html(grid);
};

// takes the entered width and height input from user to determine the number of rows and columns
$(document).ready(function(){
  $("#submit").click(function(event) {
    var height, width;
    width = $("#input_width").val();
    height = $("#input_height").val();
    event.preventDefault();
    makeGrid(width, height);
  });

  // changes the colour of a square to the colour the user has selected
  $("#pixel_canvas td").click(function(event) {
    var color = $("#colorPicker").val();
    $(event.target).css("background-color", color);
  });
});