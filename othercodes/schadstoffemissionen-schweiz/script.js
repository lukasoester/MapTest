// Schweizerdaten laden

d3.json('js/ch.json', function (err, geojson_switzerland) {
    if (err) return console.error(err);

    d3.csv('rohdaten.csv', function (d) {
            for (var k in d) {
            if (d[k].match(/^[0-9\.]+$/)) { // prüfen ob zahl, wenn ja dann string in zahl umwandeln
            d[k] = +d[k];
            }
            }

            return d;
            }, 
        function (err, data) {
            if (err) return console.error(err);


            data = data.filter(function (d) {
                //console.log(d);
                return d.Jahr == d3.select('#year').text();
            });

            data = data.filter(function (d) {
                //console.log(d);
                return d.Kanton_Betrieb != 'CH';
            });

            data = data.filter(function (d) {
                //console.log(d);
                return d.Wert != 0;
            });
            //console.log(data);
        
//Kantone laden
        
            var switzerland = topojson.feature(geojson_switzerland, geojson_switzerland.objects.cantons);

            //console.log(switzerland);

            var data_nester = d3.nest().key(function (d) {
                return d.Kanton_Betrieb;
            }).key(function (d) {
                return d.Schadstoff_Name;
            }).rollup(function (leaves) {
                leaves.extent = d3.extent(leaves, function (d) {
                    return d.Wert
                });
                leaves.total = d3.sum(leaves, function (d) {
                    return d.Wert
                });
                return leaves;
            });

            var schadstoffArten = d3.set(data.map(function (d) {
                return d.Schadstoff_Name;
            })).values().sort();

            //console.log(schadstoffArten);
            //console.log(data);

            var dataByCanton = data_nester.entries(data);

            //console.log(dataByCanton);

            dataByCanton.forEach(function (cantondata) {
                switzerland.features.some(function (canton) {
                    if (canton.properties.abbr == cantondata.key) {
                        canton.properties.data = d3.map(cantondata.values, function (d) {
                            return d.key
                        });
                        return true;
                    }
                });
            });

            var dataBySchadstoff = d3.nest()
            .key(function (d) {
                return d.Schadstoff_Name
            }).key(function (d) {
                return d.Kanton_Betrieb;
            }).rollup(function (leaves) {
                leaves.extent = d3.extent(leaves, function (d) {
                    //console.log(leaves);
                    return d.Wert;
                });
                leaves.total = d3.sum(leaves, function (d) {
                    return d.Wert
                });
                return leaves;
            }).map(data, d3.map);

            //console.log('hier:', dataBySchadstoff);

            d3.select('#schadstoffe')
                .selectAll('option')
                .data(schadstoffArten)
                .enter()
                .append('option')
                .text(String);

            d3.select('#schadstoffe')
                .append('option')
                .text('-')
                .attr("selected", "selected");

            d3.select('#schadstoffe').on('change', function () {
                d3.select("#text").remove();
                d3.select("#texts").remove();
                d3.select("#bar").remove();
                d3.select("#axis").remove();
                d3.select("#axis line").remove();
                d3.select("#axis path").remove();
                d3.select("#svg3").remove();

                //console.log(this.value);

                var selected_schadstoff = this.value;

                var extent = [0,d3.max(dataBySchadstoff.get(selected_schadstoff).values(), function(d){return d.total})]; 

                //console.log(dataBySchadstoff.get(this.value));
                //console.log(extent);

                var color = d3.scale.quantize()
                .range(["rgb(253,253,160)", "rgb(255,179,71)","rgb(255,140,0)", "rgb(255,117,24)", "rgb(194,59,34)"])
                .domain(extent);

                //console.log(color.range());

                var colorrects = d3.select('svg').selectAll('rect.colorrange').data(color.range());

                svg.append("rect")
                    .attr("x", 150)
                    .attr("y", 138)
                    .attr("width", 25)
                    .attr("height", 25)
                    .style("stroke", "black")
                    .attr("fill", "rgb(260,250,270)")
                    .append("title")
                    .text("0");

                svg.append("text")
                    .attr('id', 'text')
                    .attr('class', 'text')
                    .attr("x", 180)
                    .attr("y", 31)
                    .attr("width", 25)
                    .attr("height", 25)
                    .text(d3.max(extent).toLocaleString() +' kg/a');

                svg.append("text")
                    .attr("id", "texts")
                    .attr("class", "texts")
                    .attr("x", 180)
                    .attr("y", 158)
                    .attr("width", 25)
                    .attr("height", 25)
                    .text(d3.min(extent).toLocaleString() + ' kg/a');

                colorrects.enter()
                    .append('rect')
                    .attr('class', 'colorrange')
                    .attr('width', 25)
                    .attr('height', 25)
                    .attr('x',  150)
                    .style("stroke", "black")
                    .attr('y', function(d,i){ 
                    return 113 - 25 * i 
                    })
                    .append('title');

                colorrects.attr('fill', function(d) { return d });

                colorrects.selectAll('title').text(function(d){
                    return color.invertExtent(d);
                });

                d3.selectAll('path.canton')
                    .transition()
                    .attr('fill', function (d) {
                    if (d.properties.data && d.properties.data.has(selected_schadstoff)) {
                    return color(d.properties.data.get(selected_schadstoff).values.total);
                    } else {
                    return 'rgb(260,250,270)';}
                    });


                var margin = {top: 50, right: 20, bottom: 70, left: 100},
                width = 600 - margin.left - margin.right,
                height = 600 - margin.top - margin.bottom;

                var x = d3.scale.ordinal().rangeRoundBands([0, width], .05);

                var y = d3.scale.linear().range([height, 0]);

                var xAxis = d3.svg.axis()
                    .scale(x)
                    .orient("bottom");

                var yAxis = d3.svg.axis()
                    .scale(y)
                    .orient("left")
                    .ticks(20);

                var svg1 = d3.select("body").append("svg")
                    .attr('class', 'bar')
                    .attr('id', 'bar')
                    .attr("width", width + margin.left + margin.right)
                    .attr("height", height + margin.top + margin.bottom)
                    .append("g")
                    .attr("class", "g")
                    .attr("transform", 
                    "translate(" + margin.left + "," + margin.top + ")");

                d3.csv("rohdaten.csv", function(error, data) {

                    data = data.filter(function (d) {
                        //console.log(d);
                        return d.Jahr == d3.select('#year').text();
                    });

                    data = data.filter(function (d) {
                        //console.log(d);
                        return d.Schadstoff_Name == selected_schadstoff;
                    });

                    data = data.filter(function (d) {
                        //console.log(d);
                        return d.Wert != 0;
                    });

                    //console.log(data);

                    data.forEach(function(d) {
                        d.Wert = +d.Wert;
                    });

                    var diffuseQuellen = data.filter(function(d){
                        return d.Quelle == 'Diffuse Quellen'
                    });

                    var betrieblicheQuellen  = data.filter(function(d){
                        return d.Quelle != 'Diffuse Quellen'
                    });

                    var totaldiffQuelle = d3.round(d3.sum(diffuseQuellen, function(d) { return d.Wert; }),2) ;
                    //console.log(totaldiffQuelle);

                    var totalbetrQuelle = d3.round(d3.sum(betrieblicheQuellen, function(d) { return d.Wert; }),2) ;
                    //console.log(totalbetrQuelle);

                    var data1 = [totaldiffQuelle,totalbetrQuelle];
                    //console.log(data1);

                    var name = [ "Diffuse Quellen", "Betriebliche Quellen" ];

                    //console.log(name);

                    x.domain(name);
                    y.domain([0, d3.sum(data, function(d) { return d.Wert; })]);
                    //console.log(d3.sum(data, function(d) {return d.Wert}));

                    var summe = d3.sum(data, function(d) { return d.Wert; });
                    //console.log(summe);

                    svg1.append("g")
                        .attr("class", "x axis")
                        .attr("id", "x axis")
                        .attr("transform", "translate(0," + height + ")")
                        .call(xAxis)
                        .selectAll("text")
                        .style("text-anchor", "middle")
                        .attr("y", 20)
                        .attr("dx", "-.5em")
                        .attr("dy", "-.55em");

                    svg1.append("g")
                        .attr("class", "y axis")
                        .attr("id", "y axis")
                        .call(yAxis)
                        .append("text")
                        .attr("transform", "rotate(-90)")
                        .attr("y", 6)
                        .attr("dy", ".71em")
                        .style("text-anchor", "end");

                    svg1.selectAll("bar")
                        .data(data1)
                        .enter().append("rect")
                        .attr("fill", "rgb(194,59,34)")
                        .attr("x", function(d,i) { return 250 + -230*i })
                        .attr("width", x.rangeBand())
                        .attr("y", function(d,i) {return height - y(d)})
                        .attr("height", function(d,i) { return y(d)});

                    //console.log(data1);

// zahlen zu balkendiagamm
                    
                    svg1.append("g")
                        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
                        .selectAll(".textlabel")
                        .data(data1)
                        .enter()
                        .append("text")
                        .attr("class", "textlabel")
                        .attr("x", function(d,i) { return 22+ 235*i })
                        .attr("y", height/2)
                        .text(function(d){ return d.toLocaleString(); })
                        .style("text-anchor", "middle");

                    var schadstoffe = document.getElementById('schadstoffe');
                    var currentSchadstoff = schadstoffe.options[schadstoffe.selectedIndex].value;
                    var svg3 = d3.select("body").append('svg')
                        .attr('class', 'behind')
                        .attr("id", "svg3")
                        .attr('width', 1000)
                        .attr('height', 800); 

                    svg3.append("rect")
                        .attr("class", "behind")
                        .attr("id", "behind")
                        .attr('fill', 'none')
                        .attr('stroke', 'black')
                        .style('stroke-width', 3);

                    svg3.append("text")
                        .attr("id", "text3")
                        .attr("x", 5)
                        .attr("y", 20)
                        .attr('class', 'text3')
                        .text("Schadstoffemission in kg/a an " +currentSchadstoff+" aufgeteilt in diffuse und betriebliche Quellen")
                        .style('font-weight', 'bold');
                });

            });

// Karte platzieren

            var width = 900
            var height = 600
            var svg = d3.select('svg')
                .attr("viewBox", "0 0 " + width + " " + height)
                .attr("width", width)
                .attr("height", height);

            var width = parseInt(d3.select('svg').style('width'));
            var height = parseInt(d3.select('svg').style('height'));

            var svg2 = d3.select("body").append('svg')
                .attr('class', 'background')
                .attr('width', 1100)
                .attr('height', 800); 

            svg2.append("rect")
                .attr('class', 'background')
                .attr('x', 5)
                .attr('y', 230)
                .attr('width', 985)
                .attr('height', 550)
                .attr('fill', 'none')
                .attr('stroke', 'black')
                .style('stroke-width', 1);                        

            var path = d3.geo.path()
                .projection(null);

//Kantone zeichnen

            var cantons = svg.select('#main').selectAll('path.canton').data(switzerland.features);

            cantons.enter()
            .append('path')
            .attr('class', 'canton')
            .attr('d', path)
            .style('stroke', 'grey')
            .attr('stroke-width', 0.5)
            .attr('fill', 'rgb(260,250,270)');

            cantons.on('click', function (d) {
                //console.log(d);
            });

            cantons.on('mouseover', function (d) {
                d3.select(this).style("stroke", "black").attr("stroke-width", 2.5);

                var html = '<h9> <br><br><br> Klicken Sie, um mehr Informationen zum Kanton '+ d.properties.abbr + ' zu erhalten </h9>';

                d3.select('#infotitle')
                .style('display', 'inherit')
                .html(html);

                d3.selectAll("path.canton")
                .append("title")
                .text(function(d) {return d.properties.abbr});
            });

            cantons.on('click', function (d) {
                d3.select('#map')
                    .on("mousewheel.zoom", null)
                    .on("DOMMouseScroll.zoom", null)
                    .on("wheel.zoom", null);
                //console.log(d);

                var schadstoffe = document.getElementById('schadstoffe');
                var currentSchadstoff = schadstoffe.options[schadstoffe.selectedIndex].value;

                if (d.properties.data.has(currentSchadstoff)) {
                    var schadstoffData = d.properties.data.get(currentSchadstoff);

                    //console.log(schadstoffData.values);

                    var schadstoff = schadstoffData.values['total'].toLocaleString();
                    //console.log(schadstoff);

                    var html = '<h3>Die Gesamtemission an '+ currentSchadstoff +' im Kanton '+
                        d.properties.abbr + ' beträgt ' + schadstoff + ' ' + schadstoffData.values[0].Einheit +'</h3>';

                    html +='<h4>Die Gesamtemission an '+currentSchadstoff+' verteilt sich auf folgende Unternehmen über das angegebene Medium: </h4>';

                    schadstoffData.values.forEach(function (d) {
                        var Wert = d3.round(d.Wert,2);

                        //console.log(Wert);
                        html += '<h6>' + d.Betrieb + ': </h6><h7>Emission: ' + Wert.toLocaleString() +
                            ' ' + d.Einheit + '<br>Medium: '+d.Medium+' '+d.Verwendung+'</h7>';
                    });

                    d3.select('#info')
                    .style('display', 'inherit')
                    .html(html);
                };

                d3.select('#info ul').html(html);

            }).on('mouseout', function (d) {
                //console.log(d);

                d3.select(this).attr("stroke-width", 1) .style("stroke", "grey");
                d3.select('#info ul').html(''); 
            });
        
            svg.select('#main')
                .selectAll('text')
                .data(switzerland.features)
                .enter()
                .append('g')
                .attr('transform', function(d){
                return 'translate('+path.centroid(d)+')';
                })
                .append('text')
                .text(function(d){
                return d.properties.value;
                });
    });
});