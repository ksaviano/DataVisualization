function readyMenuDiv() {
	console.log("menuDiv load: readyMenuDiv()");
	
	$("#piechartBtn").click(function(evt) {
		$("#mainDiv").load("piecharts.html #piechartsDiv", function() {
			readyPiechartsDiv();
		});
	});
	
	$("#bargraphsBtn").click(function(evt) {
		$("#mainDiv").load("bargraphs.html #bargraphsDiv", function() {
			readyBargraphsDiv();
		});
	});
	
	$("#choroplethBtn").click(function(evt) {
		
	});
	
	$("#loaddataBtn").click(function(evt) {
		$("#mainDiv").load("dataload.html #dataloadDiv", function() {
			readyDataloadDiv();
		});
	});
}