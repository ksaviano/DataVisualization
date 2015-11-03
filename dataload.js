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
		printTable(file);
		  
	function printTable(file) {
console.log("In printTable(file).")
		var reader = new FileReader();
		var contenttable = $("#contents");
		reader.readAsText(file);
		reader.onload = function(event){
			var csv = event.target.result;
			var data = $.csv.toArrays(csv);
console.log(data.length + " " + data[0].length + " " + data);
			var headerrow = "<tr>";
			var tablerow = "<tr>";
			
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
				if(i == 0) { $("#contents").append(headerrow); continue; }
				var tempMember = new Member();
				tempMember.importMember(sd, c, s, z, country, camp, g, cond, cont, r);
				members.push(tempMember);
			}
			console.log(members);
			reader.onerror = function(){ alert('Unable to read ' + file.fileName); };
		}
	}
	
	  

  
	$("#selectHelpBtn").click(function(evt) {
		console.log("dataload.js selectHtlpBtn (Help) clicked.");
		$("#selectHelpDiv").toggle();
	});	
}
}