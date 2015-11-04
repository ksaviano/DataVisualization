var chartables = [];
	
function readyDataloadDiv() {
	console.log("mainDiv load: readyDataloadDiv()");
	if(isAPIAvailable()) {
      $('#files').bind('change', handleFileSelect);
    }

	function isAPIAvailable() {
		return true;
	}
	
	function handleFileSelect(evt) {
		var files = evt.target.files; // FileList object
		var file = files[0];
	
		// read the file metadata
		$("#dispfilename").html(file.name);
		$("#dispfiletype").html(file.type);
		$("#dispfilesize").html(file.size);
		$("#displastmod").html((file.lastModifiedDate.toLocaleDateString()));
	
		// read the file contents
		loadMemberArray(file);
	}
	
}	

	  
function loadMemberArray(file) {
	var reader = new FileReader();
	var headerrow = "<tr>";
	reader.readAsText(file);
	reader.onload = function(event){
		var csv = event.target.result;
		var data = $.csv.toArrays(csv);
		
		for(var i = 0; i < data.length; i++) {	
			var c, s, z, country, camp, g, cond, cont, r;
			for(var j = 0; j < data[i].length; j++) {
				if(i == 0) {
					headerrow += "<th>" + data[0][j] + "</th>";
					continue;
				} else {
					if(j == 0) { var sd = data[i][j]; }
					else if(j == 1) { c = data[i][j]; }
					else if(j == 2) { s = data[i][j]; }
					else if(j == 3) { z = data[i][j]; }
					else if(j == 4) { country = data[i][j]; }
					else if(j == 5) { camp = data[i][j]; }
					else if(j == 6) { g = data[i][j]; }
					else if(j == 7) { cond = data[i][j]; }
					else if(j == 8) { cont = data[i][j]; }
					else if(j == 9) { r = data[i][j]; }
					else { console.log("ERROR PARSING DATA!"); }
				}
			}
			if(i == 0) { $("#contents").append(headerrow); $("#headerDiv").data("headerrow", headerrow); continue; }		
			var tempMember = new Member();
			tempMember.importMember(sd, c, s, z, country, camp, g, cond, cont, r);
			members.push(tempMember);
		}
		reader.onerror = function(){ alert('Unable to read ' + file.fileName); };
	}
			alert("Data loaded into system.");
}

// function parsedatafordisp(headerrow) {
// 	//	if field is a date, get data in years (if < 1 year, separate by month)
// 	//	if field is a number, check if there are less than 10 unique entries -- if more than 10 can they be summed up?
// 	//	if field is a string, check if there are less than 10 unique entries
// 	// 	build hashmap for each viable field
	
// 	var testsubject = members[0];
// 	for(var i = 0; i < testsubject.length; i++) {					//	i = step through fields in data
// 		var fieldname = headerrow[i];
// 		var hashmap = [];
// 		var count = 0;
// 		if(!isNaN(Date.parse(testsubject[i]))) {					//	working with a date field
// 			for(var j = 0; j < members.length; j++) {				//	j = step through rows of data
// 				var y = members[i][j].getFullYear();				
// 				for(var k = 0; k < hashmap.length; k++) {			//	k = step through items in hashmap
// 					if(hashmap[k].label == y) {
// 						hashmap[k].count += 1;
// 					} else {
// 						hashmap.push( { label: y, count: 1, enabled: true });
// 					}
// 				} // end k
// 			} // end j
// 			chartables.push( { label: fieldname, data: hashmap, enabled: true });
// 			console.log(chartables);
// 		} 	// 	end date
// 	}	//	end i
// }	//	end parsedatafordisp()

  
	$("#selectHelpBtn").click(function(evt) {
		console.log("dataload.js selectHtlpBtn (Help) clicked.");
		$("#selectHelpDiv").toggle();
	});	
	
	function populateByString(x) {
	var hashmap = [];
	var y;
	for(var i = 0; i < members.length; i++) {
		switch(x) {
			case 1:
				y = members[i].startDate.getFullYear();
				break;
			case 5:
				y = members[i].country;
				break;
			case 6:
				y = members[i].campaign;
				break;
			case 7: 
				y = members[i].gender;
				break;
			case 8:
				y = members[i].condition;
				break;
			case 9:
				y = members[i].contact;
				break;
			default:
				console.log("Something has gone horribly wrong in populateByString(x)");
		}
			if(hashmap.length == 0) { hashmap.push( { label: y, count: 1, enabled: true }); } 
			else {
				for(var k = 0; k < hashmap.length; k++) {			//	k = step through items in hashmap
					if(hashmap[k].label == y) {
						hashmap[k].count += 1;
						break;
					} else {
						if(k == hashmap.length-1) {
							hashmap.push( { label: y, count: 1, enabled: true });		
						} else {
						continue;
						}
					}
				} // end k
			}
	}
	return hashmap;
}