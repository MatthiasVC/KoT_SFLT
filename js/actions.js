$(document).ready(loadMap());

$("#fieldTable td").hover(function() {
	 $(this).css('background-color', '#fsf8aa');
}, function () {
    $(this).css('background-color', '#ffffff');
});

function loadMap()
{
	var table = document.getElementById("fieldTable");

	for (i = 0; i < table.rows.length; i++) {
		for (j = 0; j < table.rows[0].cells.length; j++) {
			var cellContent = table.rows[i].cells[j].innerHTML;
			if (cellContent == "")
				cellContent = "<img src='/images/totem.png' alt='TOTEM'/>";
			else if (cellContent == "CHEST")
				cellContent = "<svg src='/images/chestBottom.svg' alt='CHEST'/>
			<svg src='/images/chestTop.svg' alt='CHEST'/>"
		}
	}
}
