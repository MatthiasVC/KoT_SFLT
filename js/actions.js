$(document).ready(function() {
	
	$("#stageSelect").on("change", function() {
		loadAllMaps();
	});
	
	var selectedCell;
	var hasImg = true;
	
	var maps;
	
	var possibleMaps = [1, 2, 3, 4, 5, 6];
	var internalMap = ["T", "T", "T", "T", "T", "T", "T", "T", 
						"T", "T", "T", "T", "T", "T", "T", "T", 
						"0", "T", "T", "T", "T", "T", "T", "C", 
						"T", "T", "T", "T", "T", "T", "T", "T", 
						"T", "T", "T", "T", "T", "T", "T", "T"];
	

	function updateInternalMap() {
		$("#fieldTable td").each(function() {
			var value = $(this).html();
			var x = this.cellIndex;
			var y = this.parentNode.rowIndex;
			var outp;
			if (value.indexOf("totem") >= 0) {
				outp = "T";
			}
			else if (value.indexOf("rock") >= 0) {
				outp = "R";
			}
			else if (value.indexOf("chest") >= 0) {
				outp = "C";
			}
			else {
				outp = "O";
			}
			var key = x + y*8;
			internalMap[key] = outp;
		});
		
		updatePossibleMaps();
	}
	
	function loadAllMaps() {
		$.getJSON("https://raw.githubusercontent.com/MatthiasVC/KoT_SFLT/master/json/allMaps.json", function(json) {
			var selectedStage =$("#stageSelect").find(":selected").text();
			selectedStage = selectedStage.replace(/\s+/g, '');
			maps = json[selectedStage];
		});
	}
	
	function updatePossibleMaps() {
		$.each(maps, function (key, data) {
			var equal = true;
			for(var i = 0; i < internalMap.length; i++) {
				if (!equalOrUnknown(internalMap[i], data[i])) {
					equal = false;
				}
			}
			if (!equal) {
				possibleMaps = $.grep(possibleMaps, function(value) {
					return value !== parseInt(key);
				});
			}
			else {
				if (!(possibleMaps.indexOf(parseInt(key)) >=0)) {
					possibleMaps.push(parseInt(key));
				}
			}
		});
		var mapC = "maps";
		if (possibleMaps.length === 1) {
			mapC = "map";
			displayOnlyRemainingMap();
		}
		var str = "You have " + possibleMaps.length + " " + mapC + " still possible";
		$("#amountOfMapsPossible").text(str);
	}
	
	function equalOrUnknown(actualVal, dataVal) {
		var ac = actualVal, da;
		for (var key in dataVal) {
			da = dataVal[key];
		}
		if (ac === "S" || da === "0" || ac === "0" || ac === "C" || da === "C" || ac === "T") {
			return true;
		}
		if (ac === da) {
			return true;
		}
		return false;
	}
	
	function displayOnlyRemainingMap() {
		var solutionMap = maps[possibleMaps[0]];
		var i = 0;
		var values = [];
		
		$("#resultTable").css("display", "block");
		for (var key in solutionMap)
			for (var val in solutionMap[key])
				values.push(solutionMap[key][val]);
		$("#resultTable td").each(function() {
			if (values[i] == "R") {
				$(this).html("<img src='../images/rock.png' alt='ROCK'/>");
			}
			i++;
		});
	}
	
	// Fill in all fields with visual
	$("#fieldTable td").each(function() {
		var value = $(this).html();
		if (value == "CHEST") {
			$(this).html("<img src='../images/chest.png' alt='CHEST'/>");
		}
		else if (value == "") {
			$(this).html("<img src='../images/totem.png' alt='TOTEM'/>");
		}
	});
	
	// Add context menu on positon
	$('#fieldTable td').mousedown(function() {
		if (maps == null) {
			return;
		}
		selectedCell = $(this);
		if (selectedCell.children().length !== 0) {
			hasImg = true;
		}
		else {
			hasImg = false;
		}
		if ($(this).hasClass('unChangable')) {
			return;
		}
		$('#contextMenu').css({'top':mouseY,'left':mouseX}).fadeIn(200);
	});
	
	$('#quit').mousedown(function() {
		$('#contextMenu').css({'display':'none'});
	});
	
	$('#list li').mousedown(function() {
		var value = $(this).html();
		if (hasImg) {
			if (value === "Rock") {
				selectedCell.children('img').attr({src:"../images/rock.png", alt:"ROCK"});
			}
			else if (value === "Open") {
				selectedCell.children('img').parent().html("");
			}
			else {
				selectedCell.children('img').attr({src:"../images/totem.png", alt:"TOTEM"});
			}
		}
		else {
			if (value === "Rock") {
				selectedCell.html("<img src='../images/rock.png' alt='ROCK'/>");
			}
			else if (value === "Open") {
			}
			else {
				selectedCell.html("<img src='../images/totem.png' alt='TOTEM'/>");
			}
		}
		$('#contextMenu').css({'display':'none'});
		updateInternalMap();
	});
});

// Remember mouse position
var mouseX;
var mouseY;
$(document).mousemove( function(e) {
   mouseX = e.pageX; 
   mouseY = e.pageY;
});  

