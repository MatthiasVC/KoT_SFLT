$(document).load(loadMap());

function loadMap()
{
	$(".navigation div a").html("lel");
	var table = $("#fieldTable");

	for (var i = 0; i < table.rows.length; i++) {
		for (var j = 0; j < table.rows[0].cells.length; j++) {
			var cellContent = table.rows[i].cells[j].innerHTML;
			if (cellContent === "") {
				cellContent = "<img src='images/totem.png' alt='TOTEM'/>";
			}
			else if (cellContent === "CHEST") {
				cellContent = "<img src='images/chest.png' alt='CHEST'/>";
			}
		}
	}
}

$('#fieldTable td').hover(function() {
	$(this).css('background-color', '#E521D8')
}, function() {
  $(this).css('background-color', '#000000')
});

