// Author:			Cyrill Rast, Marc Rey
// Description: 	Functions to create and update chord visualizations of dept relationships.
// Requested:		You need those Libraries: d3.js, underscore.js, mapper.js
// Thanks:			This code is largely based on the work and support by Steven Hall at Delimited.io. See this page: http://www.delimited.io/blog/2013/12/8/chord-diagrams-in-d3


//*******************************************************************
//  SET VARIABLES
//*******************************************************************

// INITIAL YEAR
var theYear = d3.select("#rangeInput").node().value; // when making a chord initially, theYear will be passed as selectedYear into makeChord.

// CHANGED YEAR
function changeYear (){
	var newYear = d3.select("#rangeInput").node().value;
}


// COLOR SETS
var colorAssets = ["#d1e5f0","#92c5de","#4393c3","#2166ac","#053061"];
var colorLiabilities  = ["#67001f","#b2182b","#d6604d","#f4a582","#fddbc7"];
var colorBanks = ["#00AF64", "#218359", "#007241", "#36D792", "#61D7A4"];




//*******************************************************************
//  MAKE CHORD
//*******************************************************************
function makeChord(selectedYear, selectedData, selectedColor, selectedDiv, selectedInvestment, selectedRegion){
	//*******************************************************************
	//  CREATE MATRIX AND MAP
	//*******************************************************************
	
	
	d3.csv(selectedData, function (error, data) {
	    var mpr = chordMpr(data);
	
	    mpr
	        .addValuesToMap('creditor')
	        .addValuesToMap('debtor')
	        .setFilter(function (row, a, b) {
	            return (row.creditor === a.name && row.debtor === b.name)
	        })
	        .setAccessor(function (recs, a, b) {
	            if (!recs[0]) return 0;
	            return +recs[0][selectedYear];
	        });
	    drawChords(mpr.getMatrix(), mpr.getMap());
	});
	
	//*******************************************************************
	//  DRAW THE CHORD DIAGRAM
	//*******************************************************************
	function drawChords (matrix, mmap) {
	    var w = 500, h = 500, r1 = h / 2, r0 = r1 - 100;
	
	    var fill = d3.scale.ordinal()
	        .domain(d3.range(4))
	        .range(selectedColor);
	
	    var chord = d3.layout.chord()
	        .padding(.02)
	        .sortSubgroups(d3.descending)
	        .sortChords(d3.descending);
	
	    var arc = d3.svg.arc()
	        .innerRadius(r0)
	        .outerRadius(r0 + 20);
	
	    var svg = d3.select(selectedDiv).append("svg:svg")
	        .attr("width", w)
	        .attr("height", h)
	      .append("svg:g")
	        .attr("id", "circle")
	        .attr("transform", "translate(" + w / 2 + "," + h / 2 + ")");
	
	        svg.append("circle")
	            .attr("r", r0 + 20);
	
	    var rdr = chordRdr(matrix, mmap);
	    chord.matrix(matrix);
	
	    var g = svg.selectAll("g.group")
	        .data(chord.groups())
	      .enter().append("svg:g")
	        .attr("class", "group")
	        .on("mouseover", mouseover)
	        .on("mouseout", function (d) { d3.select("#tooltip").style("visibility", "hidden") });
	
	    g.append("svg:path")
	        .style("stroke", "black")
	        .style("fill", function(d) { return fill(d.index); })
	        .attr("d", arc);
	
	    g.append("svg:text")
	        .each(function(d) { d.angle = (d.startAngle + d.endAngle) / 2; })
	        .attr("dy", ".35em")
	        .style("font-family", "helvetica, arial, sans-serif")
	        .style("font-size", "10px")
	        .attr("text-anchor", function(d) { return d.angle > Math.PI ? "end" : null; })
	        .attr("transform", function(d) {
	          return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")"
	              + "translate(" + (r0 + 26) + ")"
	              + (d.angle > Math.PI ? "rotate(180)" : "");
	        })
	        .text(function(d) { return rdr(d).gname; });
	
	      var chordPaths = svg.selectAll("path.chord")
	            .data(chord.chords())
	          .enter().append("svg:path")
	            .attr("class", "chord")
	            .style("stroke", function(d) { return d3.rgb(fill(d.target.index)).darker(); })
	            .style("fill", function(d) { return fill(d.target.index); })
	            .attr("d", d3.svg.chord().radius(r0))
	            .on("mouseover", function (d) {
	              d3.select("#tooltip")
	                .style("visibility", "visible")
	                .html(chordTip(rdr(d)))
	                .style("top", function () { return (d3.event.pageY - 100)+"px"})
	                .style("left", function () { return (d3.event.pageX - 100)+"px";})
	            })
	            .on("mouseout", function (d) { d3.select("#tooltip").style("visibility", "hidden") });
	
	      function chordTip (d) {
	        var p = d3.format(".2%"), q = d3.format(",.3r")
	        return "Dependencies:<br/>"
	          + d.sname + " has " + p(d.svalue/d.stotal) + " (" + q(d.svalue) + "Mio. USD) in " + d.tname
	          + (d.sname === d.tname ? "": ("<br/>"
	          + d.tname + " has " + p(d.tvalue/d.ttotal) + " (" + q(d.tvalue) + "Mio. USD) in " + d.sname))
	      }
	
	      function groupTip (d) {
	        var p = d3.format(".1%"), q = d3.format(",.3r")
	        return "Country Info:<br/>"
	            + d.gname + " has " + q(d.gvalue) + " Mio. USD <br/>"
	            + " That is " + p(d.gvalue/d.mtotal) + " of the Total (" + q(d.mtotal) + " Mio. USD)"
	      }
	
	      function mouseover(d, i) {
	        d3.select("#tooltip")
	          .style("visibility", "visible")
	          .html(groupTip(rdr(d)))
	          .style("top", function () { return (d3.event.pageY - 80)+"px"})
	          .style("left", function () { return (d3.event.pageX - 10)+"px";})
	
	        chordPaths.classed("fade", function(p) {
	          return p.source.index != i
	              && p.target.index != i;
	        });
	      }
	}

}

//*******************************************************************
//  CHANGE VISUALISATIONS
//*******************************************************************

// REMOVE THE PREVIOUS VISUALIZATION
function removeVisualization () {
	d3.selectAll("svg").remove(); // remove the former Chord
}

// SET THE NEW YEAR



// MAKE NEW VISUALIZATIONS
	// USE MAKECHORD