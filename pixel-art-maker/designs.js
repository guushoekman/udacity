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
  pixelCanvas.css("background-color", "#ffffff");
};

$(document).ready(function(){
  $("#submit").click(function(evt) {
    var height, width;
    width = $("#input_width").val();
    height = $("#input_height").val();
    evt.preventDefault();
    makeGrid(width, height);
  });

  $("#pixel_canvas").click(function(evt) {
    var color = $("#colorPicker").val();
    $(evt.target).css("background-color", color);
  });
});