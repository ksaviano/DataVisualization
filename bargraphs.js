function readyBargraphsDiv() {
	console.log("mainDiv load: readyBargraphsDiv()");
	
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
			$("#bargraphfieldsDiv").append(tempbutton);
		}
	}
	
	$("#field1").click(function(evt) {
		drawbarchart(populateByString(1), "Members First Associated with Group (by Year)");
	});
	
	$("#field5").click(function(evt) {
		drawbarchart(populateByString(5), "Members By Country");
	});
	
	$("#field6").click(function(evt) {
		drawbarchart(populateByString(6), "Members By Campaign");
	});
	
	$("#field7").click(function(evt) {
		drawbarchart(populateByString(7), "Members By Gender Identification");
	});
	
	$("#field8").click(function(evt) {
		drawbarchart(populateByString(8), "Members By Condition");
	});
	
	$("#field9").click(function(evt) {
		drawbarchart(populateByString(9), "Members By Contact Preference Type");
	});
	
}

function drawbarchart(dataset, title) {
	var chartDiv = $("#chart")
	chartDiv.empty();
	
	chartDiv.append("<h3 id='barTitle'></h3>");
	$("#barTitle").html(title);
	
	chartDiv.append("<svg class='chart'></svg>");
		
	var margin = { top: 20, right: 20, bottom: 30, left: 40 },
		width = 600 - margin.left - margin.right,
		height = 400 - margin.top - margin.bottom;
	
	var formatPercent = d3.format(".0%");
		
	var x = d3.scale.ordinal()
		.rangeRoundBands([0, width], .2)
		.domain(dataset.map(function(d) { return d.label; }));
	
	var y = d3.scale.linear()
		.range([height+10, 0])
		.domain([0, d3.max(dataset, function(d) { return d.count; })]);
		
	var xAxis = d3.svg.axis()
		.scale(x)
		.orient("bottom");
		
	var yAxis = d3.svg.axis()
		.scale(y)
		.orient("left")
		.ticks(10, "");
		
	var tip = d3.tip()
		.attr('class', 'd3-tip')
		.offset([-10, 0])
		.html(function (d) {
			return "Total: <span>" + d.count +"</span>";
		});
				
	var chart = d3.select(".chart")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
		.append("g")
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	chart.call(tip);
	
	chart.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(0," + height + ")")
		.call(xAxis);
		
	chart.append("g")
		.attr("class", "y axis")
		.call(yAxis)
		.append("text")
			.attr("transform", "rotate(-90)")
			.attr("y", 6)
			.attr("dy", ".71em")
			.style("text-anchor", "end")
			.text("Frequency");
		
	chart.selectAll(".bar")
		.data(dataset)
		.enter().append("rect")
			.attr("class", "bar")
			.attr("y", function(d) { return y(d.count); })
			.attr("width", x.rangeBand())
			.attr("x", function(d) { return x(d.label); })
			.attr("height", function(d) { return height - y(d.count); })
			.on('mouseover', tip.show)
			.on('mouseout', tip.hide);
			
//	TRYING TO ADD TOOLTIP AND LEGEND TO BAR GRAPHS

	

}


function type(d) {
	d.value = +d.value;
	return d;
}
	
	
	
	
	
	
	
	
