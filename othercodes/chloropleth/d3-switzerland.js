// initialization
var x = -200;
var y = 0;
var zoomLevel = 0;
var areaSelected = false;
var colorScale = d3.scaleThreshold()
    .domain([35000, 45000, 55000, 65000, 75000, 85000])
    .range(d3.schemeYlGnBu[7]); 
var svg = {};
var zoom = {};
var eventTransform = {};
eventTransform['k'] = 1;
eventTransform['x'] = -200;
eventTransform['y'] = -0;

var timerBlock;
var zoomReleased = true;

$(document).ready(function(){
    $("#map-container").mouseleave(function() {
        $(".tooltip").hide();
    });
    $("#map-container").mouseenter(function() {
        $(".tooltip").show();
    });
});


drawMap();
function drawMap(){
    // Load world data
    d3.json('ch.json', function (err, geojson_switzerland) {  
        if (err) return console.error(err);
            // Load my data
            d3.csv('averageIncomesMunCH2013.csv', function(err, data){
                if (err) return console.error(err);

                //extract geojson
                var switzerland_lakes = topojson.feature(geojson_switzerland, geojson_switzerland.objects.lakes);
                var switzerland_munic = topojson.feature(geojson_switzerland, geojson_switzerland.objects.municipalities);
                var switzerland_cantons = topojson.feature(geojson_switzerland, geojson_switzerland.objects.cantons);

                // draw the SVG element
                svg = drawSVG();

                // define how paths are generated
                var path = d3.geoPath().projection(null);

                // draw the map
                var municipalities = drawMunicipalities(data,svg,path,switzerland_munic);
                var cantons = drawCantons(data,svg,path,switzerland_cantons);
                var lakes = drawLakes(data,svg,path,switzerland_lakes);        

                // add tooltip to body
                var tooltip = drawTooltip();

                // add zoom buttons       
                //var buttonZoomIn = drawButtonZoomIn();         
                //var buttonZoomOut = drawButtonZoomOut();
                //var buttonZoomReset = drawButtonZoomReset();

                // prevent that text is marked when zooming in fast
                $('.buttonZoom').mousedown(function(){ return false; })

                // set initial zoom and position of map
                //svg.attr("transform", "translate(-200,0) scale(1)");

                // onMouseover
                municipalities.on("mouseover", function (d) {
                    onMouseOver(d,this,data,tooltip)
                });

                // onClick
                municipalities.on('click', function (d) {
                    onClick(d,this,data);
                });

                // Draw Legend
                drawLegend();


                // Zoom Map
                zoom = d3.zoom()
                    .scaleExtent([1, 8])
                    .on("zoom", zoomed);


                // the zoom effect should be possible on the whole SVG element
                svg.call(zoom).call(zoom.transform, d3.zoomIdentity.scale(1,1));
        });
    });
    
}

function drawSVG(){
    return d3.select('svg')
                .append('g')
                .attr("height","560")
                .attr("width","560")
                .attr('class', 'outer_g')
                .attr("transform", "translate(-200,0) scale(1)")
                .append('g');
}

function drawMunicipalities(data,svg,path,switzerland_munic){
    return svg.selectAll('path.munic').data(switzerland_munic.features).enter()
                .append('path')
                .attr('class', 'munic')
                .attr('d', path)
                .style('stroke', 'grey')
                .style('fill' , function(d) { 
                    var fillColor = '#EFEFEF';
                    var i = 0;
                    for(var e in data) {                    
                        if (data[e].id == d.id){
                            fillColor = colorScale(data[e].val);
                        }
                    }   
                    return fillColor; 
                })
                .attr('stroke-width', 0.4);
}
function drawCantons(data,svg,path,switzerland_cantons){
    return svg.selectAll('path.canton').data(switzerland_cantons.features).enter()
                .append('path')
                .attr('class', 'canton')
                .attr('d', path)
                .style('stroke', '#666666')
                .style('fill' , "none")
                .attr('stroke-width', 0.9);
}
function drawLakes(data,svg,path,switzerland_lakes){
    return svg.selectAll('path.lake').data(switzerland_lakes.features).enter()
                .append('path')
                .attr('class', 'lake')
                .attr('d', path)
                .style('fill' , "#58ACFA");
}
function drawButtonZoomIn(){
    return d3.select("#map-container").append("div")
                .attr("id", "buttonZoomIn") 
                .attr("class", "buttonZoom")
                .html('+')
                .on("click",showInitial);
}
function drawButtonZoomOut(){
    return d3.select("#map-container").append("div")	
                .attr("id", "buttonZoomOut")
                .attr("class", "buttonZoom")
                .html('-')
                .on("click",showGeneva)
                .on("mousedown",function(){ return false; });
}
function drawButtonZoomReset(){
    return d3.select("#map-container").append("div")	
                .attr("id", "buttonZoomReset")
                .html('Reset Zoom')
                .on("click",showInitial);
}
function drawTooltip(){
    return d3.select("body").append("div")	
                .attr("class", "tooltip")				
                .style("opacity", 0);
}
function onMouseOver(d,scope,data,tooltip){
    var amount = 'keine Daten vorhanden';
    var name = 'keine Daten vorhanden';
    for(var e in data) {
        if (data[e].id == d.id){
            name = data[e].gemeindename;
            amount = data[e].val + " CHF";
        }
    }
    d3.selectAll(".munic")
        .attr("stroke-width", 0.4);
    d3.select(scope)
        .attr("stroke","#666666")
        .attr("stroke-width", 0.9);
    tooltip.transition()		
        .duration(100)		
        .style("opacity", .9);

    if(d3.event.pageX >= $("svg").width()/2) {
        tooltip.html(name + "</br>" + amount)
            .style("left", (d3.event.pageX - 220) + "px")
            .style("top", (d3.event.pageY - 28) + "px");
    }
    else {
        tooltip.html(name + "</br>" + amount)
            .style("left", (d3.event.pageX + 20) + "px")
            .style("top", (d3.event.pageY - 28) + "px");
    }
}
function onClick(d,scope,data){
    // make the country stroke a bit bolder
    d3.selectAll("path.munic")
        .style('stroke', 'grey')
        .style("stroke-width", 0.4);

    d3.select(scope)
        .style("stroke", "rgba(0,0,0,0.3)")
        .style("stroke-width", 2);

    var name = 'keine Daten vorhanden';
    var amount = 'keine Daten vorhanden';
    for(var e in data) {
        if (data[e].id == d.id){
            name = data[e].gemeindename;
            amount = data[e].val;
        }
    }

    // display some additional data in the #info div
    d3.select('.name_value').html(name);
    d3.select('.amount_value').html(amount + " CHF");
}
function drawLegend(){
    var x = d3.scaleLinear()
        .domain([25000, 95000])
        .rangeRound([600, 860]);
    var g = d3.select('#map_legend')
        .append("g")
        .attr("transform", "translate(-600,20)");

    g.selectAll("rect")
        .data(colorScale.range().map(function(d) {
            d = colorScale.invertExtent(d);
            if (d[0] == null) d[0] = x.domain()[0];
            if (d[1] == null) d[1] = x.domain()[1];
            return d;
        }))
        .enter().append("rect")
            .attr("height", 8)
            .attr("x", function(d) { return x(d[0]); })
            .attr("width", function(d) { return x(d[1]) - x(d[0]); })
            .attr("fill", function(d) { return colorScale(d[0]); });

    g.append("text")
        .attr("class", "caption")
        .attr("x", x.range()[0])
        .attr("y", -6)
        .attr("fill", "#000")
        .attr("text-anchor", "start")
        .attr("font-weight", "bold")
        .text("Durchschnittliches steuerbares Einkommen (CHF)");

    g.call(d3.axisBottom(x)
        .tickSize(13)
        .tickFormat(function(x, i) { return x ; })
        .tickValues(colorScale.domain()))
        .select(".domain")
        .remove();
}

function zoomed() {
    if (areaSelected) {
        zoomReleased = false;
        d3.event.transform.x = eventTransform.x;
        d3.event.transform.y = eventTransform.y;
        d3.event.transform.k = eventTransform.k;
        svg.style("stroke-width", 1.5 / eventTransform.k + "px");
        svg.attr("transform", 'translate(' + eventTransform.x + ',' + eventTransform.y + ') scale(' + eventTransform.k + ')'); // updated for d3 v4
        areaSelected = false;
        timerBlock = setTimeout(function(){ zoomReleased = true; }, 300);
    }
    else {
        if (zoomReleased) {
            svg.style("stroke-width", 1.5 / d3.event.transform.k + "px");
            svg.attr("transform", d3.event.transform); // updated for d3 v4
        }
        else {
            d3.event.transform.x = eventTransform.x;
            d3.event.transform.y = eventTransform.y;
            d3.event.transform.k = eventTransform.k;
        }
        
    }
}

function zoomIn(){
    zoomLevel += 1; 
    newX = -200 -(200*zoomLevel);
    newY = -100*zoomLevel;
    newZoom = 1+(0.5*zoomLevel);
    svg.attr({
        transform: 'translate(' + newX + ',' + newY + ') scale(' + newZoom + ')'
    });
}
function zoomOut(){
    zoomLevel = (zoomLevel>0) ? zoomLevel-1 : 0; 
    newX = -200 -(200*zoomLevel);
    newY = -100*zoomLevel;
    newZoom = 1+(0.5*zoomLevel);
        svg.attr({
        transform: 'translate(' + newX + ',' + newY + ') scale(' + newZoom + ')'
    })
}
function showGeneva(){
    areaSelected = true;
    svg.attr("transform", "translate(-230,-450) scale(2.5)");
    eventTransform.k = 2.5;
    eventTransform.x = -230;
    eventTransform.y = -450;
}
function showTicino(){
    areaSelected = true;
    svg.attr("transform", "translate(-1000,-650) scale(2.58)");
    eventTransform.k = 2.58;
    eventTransform.x = -1000;
    eventTransform.y = -650;
}
function showZuerich(){
    areaSelected = true;
    svg.attr("transform", "translate(-900,-20) scale(2.5)");
    eventTransform.k = 2.5;
    eventTransform.x = -900;
    eventTransform.y = -20;
}
function showBasel(){
    areaSelected = true;
    svg.attr("transform", "translate(-500,-20) scale(2.5)");
    eventTransform.k = 2.5;
    eventTransform.x = -500;
    eventTransform.y = -20;
}
function showBern(){
    areaSelected = true;
    svg.attr("transform", "translate(-400,-300) scale(2.5)");
    eventTransform.k = 2.5;
    eventTransform.x = -400;
    eventTransform.y = -300;
}
function showInitial(){
    areaSelected = true;
    svg.attr("transform", "translate(0,0) scale(1)");
    eventTransform.k = 1;
    eventTransform.x = 0;
    eventTransform.y = 0;
}

