function readyDataloadDiv() {
	console.log("mainDiv load: readyDataloadDiv()");
	
	$("#selectBtn").click(function(evt) {
		var file = $("#selectBox").val();
		members = $.csv.toArray(file);
	});
	
	$("#selectHelpBtn").click(function(evt) {
		$("#selectHelpDiv").toggle();
	});
}