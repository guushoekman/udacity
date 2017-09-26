function makeGrid() {
  var table = document.getElementById("pixel_canvas");
  table.innerHTML = "";
  while(table.rows.length > 0)
    table.deleteRow(0);
  var input_rows = $("#input_height").val();
  var input_cols = $("#input_width").val();
  for (var i = 0; i < input_rows; i++) {
    var row_elem = table.insertRow(i);
    row_elem.setAttribute("class", "row");
    for (var j = 0; j < input_cols; j++) {
      var cell= row_elem.insertCell(j);
      cell.addEventListener('click', function(evt) {
        evt.target.style.backgroundColor = document.getElementById("colorPicker").value;
      });
    }
  }
  return false;
}

$("td").click(function() {
  $(this).css("background-color", $("#colorPicker").val());
});