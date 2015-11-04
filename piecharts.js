function readyPiechartsDiv() {
	console.log("mainDiv load: readyPiechartsDiv()");
	
	var headerrow = y;
	var fields = [];
	var temp = headerrow.substring(4, (headerrow.length - 4)).split("<th>");
	for(var i = 1; i < temp.length; i++) {
		var x = temp[i].indexOf("<");
		fields[i] = temp[i].substring(0, x);
	}
	
	for(var i = 1; i < fields.length; i++) {
		if(i == 2 || i == 3 || i == 4 || i == 10) {
			//	skip - not appropriate for pie chart
		} else {
			var tempname = "field" + i;
			var tempbutton = "<div id='" + tempname + "' class='ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only mainBtn'>" + fields[i] + "</div>";
			$("#piechartfieldsDiv").append(tempbutton);
		}
	}
	
	$("#field1").click(function(evt) {
		drawpiechart(populateByString(1), "Members First Associated with Group (by Year)");
	});
	
	$("#field5").click(function(evt) {
		drawdonutchart(populateByString(5), "Members By Country");
	});
	
	$("#field6").click(function(evt) {
		drawdonutchart(populateByString(6), "Members By Campaign");
	});
	
	$("#field7").click(function(evt) {
		drawdonutchart(populateByString(7), "Members By Gender Identification");
	});
	
	$("#field8").click(function(evt) {
		drawdonutchart(populateByString(8), "Members By Condition");
	});
	
	$("#field9").click(function(evt) {
		drawdonutchart(populateByString(9), "Members By Contact Preference Type");
	});
	
}


// function populateByString(x) {
// 	var hashmap = [];
// 	var y;
// 	for(var i = 0; i < members.length; i++) {
// 		switch(x) {
// 			case 1:
// 				y = members[i].startDate.getFullYear();
// 				break;
// 			case 5:
// 				y = members[i].country;
// 				break;
// 			case 6:
// 				y = members[i].campaign;
// 				break;
// 			case 7: 
// 				y = members[i].gender;
// 				break;
// 			case 8:
// 				y = members[i].condition;
// 				break;
// 			case 9:
// 				y = members[i].contact;
// 				break;
// 			default:
// 				console.log("Something has gone horribly wrong in populateByString(x)");
// 		}
// 			if(hashmap.length == 0) { hashmap.push( { label: y, count: 1, enabled: true }); } 
// 			else {
// 				for(var k = 0; k < hashmap.length; k++) {			//	k = step through items in hashmap
// 					if(hashmap[k].label == y) {
// 						hashmap[k].count += 1;
// 						break;
// 					} else {
// 						if(k == hashmap.length-1) {
// 							hashmap.push( { label: y, count: 1, enabled: true });		
// 						} else {
// 						continue;
// 						}
// 					}
// 				} // end k
// 			}
// 	}
// 	return hashmap;
// }

// function populateByString(x) {
// 	var hashmap = [];
// 	var fieldname = "";
// 	for(var i = 0; i < members.length; i++) {

// 			if(hashmap.length == 0) { hashmap.push( { label: y, count: 1, enabled: true }); } 
// 			else {
// 				for(var k = 0; k < hashmap.length; k++) {			//	k = step through items in hashmap
				
// 					if(hashmap[k].label == y) {
// 						hashmap[k].count += 1;
// 					} else {
// 						hashmap.push( { label: y, count: 1, enabled: true });
// 					}
// 				} // end k
// 			}
// 	}
// 	return hashmap;
// }
	


function drawdonutchart(dataset, title) {
	$("#chart").empty();
	
	$("#chart").append("<h1 id='pieTitle'></div>");
	$("#pieTitle").html(title);
	
	var width = 360;
	var height = 360;
	var radius = Math.min(width, height) / 2;
	var donutWidth = 75;
	var legendRectSize = 18;
	var legendSpacing = 4;
	
		
	var color = d3.scale.category20b();
	
	var svg = d3.select("#chart")
		.append('svg')
		.attr('id', 'svgDiv')
		.attr('width', width)
		.attr('height', height)
		.append('g')
		.attr('transform', 'translate(' + (width / 2) + ',' + (height / 2) + ')');
		
	var arc = d3.svg.arc()
		.innerRadius(radius - donutWidth)
		.outerRadius(radius);
	
	var pie = d3.layout.pie()
		.value(function(d) { return d.count; })
		.sort(null);
		
	var tooltip = d3.select('#chart')
		.append('div')
		.attr('id', 'tooltipDiv')
		.attr('class', 'tooltip');
		
	tooltip.append('div')
		.attr('class', 'label');
		
	tooltip.append('div')
		.attr('class', 'count');
		
	tooltip.append('div')
		.attr('class', 'percent');
		
	var path = svg.selectAll('path')
		.data(pie(dataset))
		.enter()
		.append('path')
		.attr('d', arc)
		.attr('fill', function (d, i) {
			return color(d.data.label);
		})
		.each(function(d) { this._current = d; });
	
	path.on('mouseover', function(d) {
		var total = d3.sum(dataset.map(function(d) {
			return (d.enabled) ? d.count : 0;
		}));
		var percent = Math.round(1000 * d.data.count / total) / 10;
		tooltip.select('.label').html(d.data.label);
		tooltip.select('.count').html(d.data.count);
		tooltip.select('.percent').html(percent + '%');
		tooltip.style('display', 'block');
	});
	
	path.on('mouseout', function(d) {
		tooltip.style('display', 'none');
	});
		
		
	var legend = svg.selectAll('.legend')
		.data(color.domain())
		.enter()
		.append('g')
		.attr('class', 'legend')
		.attr('transform', function(d, i) {
			var height = legendRectSize + legendSpacing;
			var offset = height * color.domain().length / 2;
			var horz = -2 * legendRectSize;
			var vert = i * height - offset;
			return 'translate(' + horz + ',' + vert + ')';
		});
		
	legend.append('rect')
		.attr('width', legendRectSize)
		.attr('height', legendRectSize)
		.style('fill', color)
		.style('stroke', color)
		.on('click', function(label) {
			var rect = d3.select(this);
			var enabled = true;
			var totalEnabled = d3.sum(dataset.map(function(d) {			//	add up how many boxes are enabled
				return (d.enabled) ? 1 : 0;								//	if enabled, +1, else 0
			}));
			
			if(rect.attr('class') === 'disabled') {						//	if disabled, return it to default (enabled)
				rect.attr('class', '');
			} else {
				if(totalEnabled < 2) return;							//	prevent last selector from being disabled
				rect.attr('class', 'disabled');
				enabled = false;
			}
			
			pie.value(function(d) {										//	re-calculates the total based on what is enabled
				if(d.label === label) d.enabled = enabled;
				return (d.enabled) ? d.count: 0;
			});
			
			path = path.data(pie(dataset));
			
			path.transition()
				.duration(750)
				.attrTween('d', function(d) {
					var interpolate= d3.interpolate(this._current, d);
					this._current = interpolate(0);
					return function(t) {
						return arc(interpolate(t));
					};
				});
		});
		
	legend.append('text')												//	centers legend in the middle of donut hole
		.attr('x', legendRectSize + legendSpacing)
		.attr('y', legendRectSize - legendSpacing)
		.text(function(d) { return d; });
		
};	
	
	
	// var dataset = [
	// 	{ label: "Monday", count: 379130, enabled: true },
	// 	{ label: "Tuesday", count: 424923, enabled: true },
	// 	{ label: "Wednesday", count: 432138, enabled: true },
	// 	{ label: "Thursday", count: 430728, enabled: true },
	// 	{ label: "Friday", count: 428295, enabled: true },
	// 	{ label: "Saturday", count: 368239, enabled: true },
	// 	{ label: "Sunday", count: 282701, enabled: true }
	// ];
	
	// drawdonutchart();
	
	
// 	function drawpiechart(dataset) {
// 	var width = 360;
// 	var height = 360;
// 	var radius = Math.min(width, height) / 2;
	
// 	var color = d3.scale.category20b();
	
// 	var svg = d3.select("#chart")
// 		.append('svg')
// 		.attr('width', width)
// 		.attr('height', height)
// 		.append('g')
// 		.attr('transform', 'translate(' + (width / 2) + ',' + (height / 2) + ')');
		
// 	var arc = d3.svg.arc()
// 		.outerRadius(radius);
	
// 	var pie = d3.layout.pie()
// 		.value(function(d) { return d.count; })
// 		.sort(null);
		
// 	var path = svg.selectAll('path')
// 		.data(pie(dataset))
// 		.enter()
// 		.append('path')
// 		.attr('d', arc)
// 		.attr('fill', function (d, i) {
// 			return color(d.data.label);
// 		});
// };
	
