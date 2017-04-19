$(document).ready(function() {

	var allPages = {};

	if (Object.keys(allPages).length == 0)
		$("#contentList").append("<li>No pages yet.</li>");

	for (var page in allPages) {
		$("#contentList").append("<li><a href=" + allPages[page] + ">" + page + "</a></li>");
	}
});

