<!--//--><![CDATA[//><!--
	if (document.images) {
		var Aargau_img = new Image();
		var Appenzell_Innerrhoden_img = new Image();
		var Appenzell_Ausserrhoden_img = new Image();
		var Bern_img = new Image();
		var Basel_Landschaft_img = new Image();
		var Basel_Stadt_img = new Image();
		var Fribourg_img = new Image();
		var Geneve_img = new Image();
		var Glarus_img = new Image();
		var Graubuenden_img = new Image();
		var Jura_img = new Image();
		var Luzern_img = new Image();
		var Neuchatel_img = new Image();
		var Nidwalden_img = new Image();
		var Obwalden_img = new Image();
		var St_Gallen_img = new Image();
		var Schaffhausen_img = new Image();
		var Solothurn_img = new Image();
		var Schwyz_img = new Image();
		var Thurgau_img = new Image();
		var Ticino_img = new Image();
		var Uri_img = new Image();
		var Vaud_img = new Image();
		var Valais_img = new Image();
		var Zug_img = new Image();
		var Zuerich_img = new Image();
		var Schweiz_img = new Image();
		var See_img = new Image();
		
		var No_Verfassung = new Image();
		var Verfassung = new Image();
		var No_Strategie = new Image();
		var Strategie = new Image();
		var Down_l = new Image();
		var Down_m = new Image();
		var Up_m = new Image();
		var Up_h = new Image();
		
		Aargau_img.src = "./img/Aargau.svg";
		Appenzell_Innerrhoden_img.src = "./img/Appenzell_Innerrhoden.svg";
		Appenzell_Ausserrhoden_img.src = "./img/Appenzell_Ausserrhoden.svg";
		Bern_img.src = "./img/Bern.svg";
		Basel_Landschaft_img.src = "./img/Basel-Landschaft.svg";
		Basel_Stadt_img.src = "./img/Basel-Stadt.svg";
		Fribourg_img.src = "./img/Fribourg.svg";
		Geneve_img.src = "./img/Geneve.svg";
		Glarus_img.src = "./img/Glarus.svg";
		Graubuenden_img.src = "./img/Graubuenden.svg";
		Jura_img.src = "./img/Jura.svg";
		Luzern_img.src = "./img/Luzern.svg";
		Neuchatel_img.src = "./img/Neuchatel.svg";
		Nidwalden_img.src = "./img/Nidwalden.svg";
		Obwalden_img.src = "./img/Obwalden.svg";
		St_Gallen_img.src = "./img/St._Gallen.svg";
		Schaffhausen_img.src = "./img/Schaffhausen.svg";
		Solothurn_img.src = "./img/Solothurn.svg";
		Schwyz_img.src = "./img/Schwyz.svg";
		Thurgau_img.src = "./img/Thurgau.svg";
		Ticino_img.src = "./img/Ticino.svg";
		Uri_img.src = "./img/Uri.svg";
		Vaud_img.src = "./img/Vaud.svg";
		Valais_img.src = "./img/Valais.svg";
		Zug_img.src = "./img/Zug.svg";
		Zuerich_img.src = "./img/Zuerich.svg";
		Schweiz_img.src = "./img/Schweiz.svg";
		See_img.src = "./img/See.svg";
		
		No_Verfassung.src = "./img/book/No_Verfassung.png";
		Verfassung.src = "./img/book/Verfassung.png";
		No_Strategie.src = "./img/book/No_Strategie.png";
		Strategie.src = "./img/book/Strategie.png";
		
		Down_l.src = "./img/book/Down_l.png";
		Down_m.src = "./img/book/Down_m.png";
		Up_m.src = "./img/book/Up_m.png";
		Up_h.src = "./img/book/Up_h.png";
		
		var images = {
			"Aargau" : Aargau_img,
			"Appenzell Innerrhoden" : Appenzell_Innerrhoden_img,
			"Appenzell Ausserrhoden" : Appenzell_Ausserrhoden_img,
			"Bern" : Bern_img,
			"Basel-Landschaft" : Basel_Landschaft_img,
			"Basel-Stadt" : Basel_Stadt_img,
			"Fribourg" : Fribourg_img,
			"Geneve" : Geneve_img,
			"Glarus" : Glarus_img,
			"Graubuenden" : Graubuenden_img,
			"Jura" : Jura_img,
			"Luzern" : Luzern_img,
			"Neuchatel" : Neuchatel_img,
			"Nidwalden" : Nidwalden_img,
			"Obwalden" : Obwalden_img,
			"St. Gallen" : St_Gallen_img,
			"Schaffhausen" : Schaffhausen_img,
			"Solothurn" : Solothurn_img,
			"Schwyz" : Schwyz_img,
			"Thurgau" : Thurgau_img,
			"Ticino" : Ticino_img,
			"Uri" : Uri_img,
			"Vaud" : Vaud_img,
			"Valais" : Valais_img,
			"Zug" : Zug_img,
			"Zuerich" : Zuerich_img,
			"Schweiz" : Schweiz_img,
			"See" : See_img,
		}
		
		var book_images = [
				[No_Verfassung, Verfassung],
				[No_Strategie, Strategie]
			],
			arrow_images = [Down_l, Down_m, Up_m, Up_h];
	}
//--><!]]>
var chars = {"ü":"ue","â":"a","é":"e"};
function convertToGerman(string){
	return string.replace(/[^A-Za-z0-9\[\] ]/g,function(a){
				return chars[a]||a
		})
};

var width = parseInt(d3.select("svg").node().getBoundingClientRect().width/*.style("width")*/),
	height = parseInt(d3.select("svg").node().getBoundingClientRect().height/*.style("height")*/);

var path = d3.geo.path()
	.projection(null);

var svg = d3.select("#main_svg")
	.attr("width", width)
	.attr("height", height);

var menu_items_colors = ["Reds","YlGn","RdYlGn","YlGnBu","Greens","YlGnBu","RdYlGn"];

var svg_cantons = svg.append("svg:g")
		.attr("id","cantons")
		.attr("class",menu_items_colors[0]),
	svg_lakes = svg.append("svg:g")
		.attr("id","lakes")
		.attr("class","static");

var legend_domain = [0, 1, 2, 3, 4, 5, 6, 7, 8];
var legend_labels = ["↓ sehr tief", "", "", "", "↕ mittelmässig", "", "", "", "↑ sehr hoch"];
var legend = svg.append("svg:g")
	.attr("id","legend")
	.attr("class",menu_items_colors[0]);
var legend_items;
var item_box_w = 20, item_box_h = 20;

var menu = d3.select("#menu"),
	description_container = d3.select("#description_container"),
	description_title = d3.select("#description_title"),
	info_panel_1 = d3.select("#info_panel_1"),
	info_panel_2 = d3.select("#info_panel_2"),
	clicks_container = d3.select("#clicks_container"),
	clicks_panel_1 = d3.select("#clicks_panel_1"),
	clicks_panel_2 = d3.select("#clicks_panel_2"),
	clicks_title = d3.select("#clicks_title"),
	links_panel = d3.select("#links_panel");

var background = "#f4f4f4";
var canvas = info_panel_2.select("svg");

var cantons,
	lakes;
var topology,
	csv,
	codes;

var holder = d3.map(),
	array = [];
	
var s_cantonpopup = "Anzahl bewilligter Gesuche für Finanzierung von Institutionen";
var s_selectedcolumn = "IN";
var s_selecteddescription = "Dieses Kriterium behandelt die gesamte Anzahl bewilligter Gesuche im jeweiligen Kanton. Das Ziel dieser Gesuche ist die Finanzierung der Institutionen zur Vereinbarkeit Beruf-Familie.";
var s_selectedgroup = "group_1";
var s_selectedid = "0";
var s_selectedtype = "item_1a";
var rating = d3.map();

queue()
	.defer(d3.json, "./data/json/ch-cantons-lakes.json")
	.defer(d3.csv, "./data/csv/data.csv", function(csv_data) {
				 rating.set(csv_data.id, parseFloat(csv_data[s_selectedcolumn]));})
	.defer(d3.csv, "./data/csv/codes.csv")
	.await(ready);

function ready(error, json, csv_data, codes_data) {
	svg.on("dblclick",function(d){
		clicks_container.transition()
				.duration(400)
				.style("opacity", 0);
		clicks_panel_1.html("");
		clicks_panel_2.select("svg").html("");
	});
	
	menu.property("selectedIndex",0);
	
	topology = json;
	csv = csv_data;
	codes = codes_data;
	
	cantons = topojson.feature(topology, topology.objects.cantons);
	
	csv_data.forEach(function(row){
		cantons.features.some(function(canton){
			if(canton.properties.id == row.id){
				for(var t in row){
					canton.properties[t] = row[t];
				}
				return true;
			}
		});
	}); 
	
	//----- add cantons ---
	svg_cantons.selectAll("path")
		.data(cantons.features)
		.enter().append("svg:path")
		.attr("class", function(d){
			var quant = d3.scale.quantize()
				.domain(d3.extent(rating.values()))
				.range(d3.range(9));
			return "q" + quant(rating.get(d.id)) + "-9";
		})
		.attr("d", path)
		.on("mouseover",function(d){
			description_container.transition()
				.duration(400)
				.style("opacity", 1);
			
			d3.select(this).attr("class","highlighted");
			s_cantonpopup = ("<img src='"+images[d.properties.abbr === 'GE' ? "Geneve" : convertToGerman(d.properties.name)].src+"'/><strong>"+d.properties.name+"</strong><br/>");
			var q = queue();
			q.defer(getCantonData, d.id);
			q.awaitAll(updateTooltip);
			var c_id = d.id;
			legend.selectAll("#legend_item")
				.select("rect")
				.attr("id", function(d){
					var quant = d3.scale.quantize()
						.domain(d3.extent(rating.values()))
						.range(d3.range(9));
					
					return (quant(rating.get(c_id)) == d)?("highlighted"):("q" + d + "-9");
				});
			
		})
		.on("mouseout",function(d){
			var quant = d3.scale.quantize()
				.domain(d3.extent(rating.values()))
				.range(d3.range(9));
			d3.select(this).attr("class", function(d){
				return "q" + quant(rating.get(d.id)) + "-9";
			});
			legend.selectAll("#legend_item")
				.select("rect")
				.attr("id", function(d){
					return "q" + d + "-9";
				});
			
			description_container.transition()
				.duration(400)
				.style("opacity", 0);
			info_panel_1.html("");
			info_panel_2.select("svg").html("");
		})
		.on("click",function(d){
			clicks_container.transition()
				.duration(400)
				.style("opacity", 1);
			clicks_panel_1.html(info_panel_1.html());
			//clicks_panel_2.html(info_panel_2.html());
			canvas = clicks_panel_2.select("svg");
			var q = queue();
			q.defer(getCantonData, d.id);
			q.awaitAll(updateTooltip);
		})
		.on("dblclick",function(d){
			clicks_container.transition()
				.duration(400)
				.style("opacity", 0);
			clicks_panel_1.html("");
			clicks_panel_2.select("svg").html("");
		})
		.on("contextmenu",function(d){
			clicks_container.transition()
				.duration(400)
				.style("opacity", 0);
			clicks_panel_1.html("");
			clicks_panel_2.select("svg").html("");
		});
	/*------------------------- add lakes ------------------*/
	lakes = topojson.feature(topology, topology.objects.lakes);

	svg_lakes.selectAll("path")
		.data(lakes.features)
		.enter().append("svg:path")
		.attr("d", path)
		.on("mouseover",function(d){
			d3.select(this).attr("class","highlighted");
			info_panel_1.html("<img src='"+images["See"].src+"'/><strong>"+d.properties.name+"</strong>");
			description_container.transition()
				.duration(400)
				.style("opacity", 1);
		})
		.on("mouseout",function(d){
			d3.select(this).attr("class","static");
			description_container.transition()
				.duration(400)
				.style("opacity", 0);
			info_panel_1.html("");
		});
		
	/*--------------------- add legend ------------------*/
	legend_items = legend.selectAll("g")
		.data(legend_domain)
		.enter().append("g:g")
		.attr("id", "legend_item");
	legend_items.append("rect")
		.attr("x", 0)
		.attr("y", function(d, i){ return	((legend_labels.length+2)*item_box_h)-(i*item_box_h) - 2*item_box_h;})
		.attr("width", item_box_w)
		.attr("height", item_box_h)
		.attr("class", function(d, i) {
			return "q" + i + "-9";
		});
	legend_items.append("text")
		.attr("x", 25)
		.attr("y", function(d, i){ return ((legend_labels.length+2)*item_box_h)-(i*item_box_h) - item_box_h - 4;})
		.text(function(d, i){ return legend_labels[i]; });
	legend.selectAll("#legend_item")
		.append("title")
		.text(function(d){
			var quant = d3.scale.quantize()
				.domain(d3.extent(rating.values()))
				.range(d3.range(9));
			return "("+thFormat(quant.invertExtent(d)[0].toFixed(2))+", "+thFormat(quant.invertExtent(d)[1].toFixed(2))+")";
		});
}

function changeOption(s_v,s_id){
	s_selectedcolumn = s_v;
	s_selectedid = s_id;
	var q = queue();
	q.defer(updateMap);
	q.await(drawMap);
}

function thFormat(input){
	input += '';
	var x = input.split('.');
	var x1 = x[0];
	var x2 = x.length > 1 ? '.' + x[1] : '';
	var regex = /(\d+)(\d{3})/;
	while (regex.test(x1)){
	x1 = x1.replace(regex, '$1' + '\'' + '$2');
		}
		return x1 + x2;
}

function updateMap(callback){
	d3.csv("./data/csv/data.csv", function(csv_data) {
		csv = csv_data;
		csv.forEach(function(row){
			rating.set(row.id, parseFloat(row[s_selectedcolumn]));
		});
		callback(null, "go");
	})
}

function drawMap(error, results){
	var quant = d3.scale.quantize()
		.domain(d3.extent(rating.values()))
		.range(d3.range(9));
	svg_cantons.attr("class",function(){
		return menu_items_colors[s_selectedid];
	});
	svg_cantons.selectAll("path")
		.attr("class", function(d){
			var quant = d3.scale.quantize()
				.domain(d3.extent(rating.values()))
				.range(d3.range(9));
			return "q" + quant(rating.get(d.id)) + "-9";
		});
	
	
	legend.attr("class",menu_items_colors[s_selectedid]);
	legend.selectAll("#legend_item")
		.select("title")
		.text(function(d){
			var quant = d3.scale.quantize()
				.domain(d3.extent(rating.values()))
				.range(d3.range(9));
			return "("+thFormat(quant.invertExtent(d)[0].toFixed(2))+", "+thFormat(quant.invertExtent(d)[1].toFixed(2))+")";
		});
}

		
function getCantonData(id, callback){
	var result = menu.property("options")[menu.property("selectedIndex")].text;
	holder = d3.map();
	
	if (id != 0){
		d3.csv("./data/csv/codes.csv", function(codes_data){
			codes = codes_data.filter(function(row) {
				if(row.Typ == s_selectedtype){
					return true;
				}
			});
		});
		d3.csv("./data/csv/data.csv", function(csv_data){
			csv = csv_data.filter(function(row) {
				if(parseInt(row.id) == +id){
					return true;
				}
			});
			canvas.html("");
			if(s_selectedtype == "item_1a" || s_selectedtype == "item_1b"){
				csv.forEach(function (d){
					for(var j in codes){
						array.push(parseFloat(d[codes[j]["Variable"]]));
					}
					holder.set(d.id,array);
					array = [];
				});
				for(var p in holder.keys()){
					drawBubbles(holder,holder.keys()[p]);
				}
			} /*else if(s_selectedtype == "item_2"){
				csv.forEach(function (d){
					for(var j in codes){
						array.push(parseFloat(d[codes[j]["Variable"]]));
					}
					holder.set(d.id,array);
					array = [];
				});
				for(var p in holder.keys()){
					drawSpider(holder,holder.keys()[p]);
				}
			}*/ else if(s_selectedtype == "item_3a" || s_selectedtype == "item_3b"){
				csv.forEach(function (d){
					for(var j in codes){
						array.push(parseFloat(d[codes[j]["Variable"]]));
					}
					holder.set(d.id,array);
					array = [];
				});
				for(var p in holder.keys()){
					drawBars(holder,holder.keys()[p]);
				}
			} else if(s_selectedtype == "item_4"){
				csv.forEach(function (d){
					for(var j in codes){
						array.push(parseFloat(d[codes[j]["Variable"]]));
					}
					holder.set(d.id,array);
					array = [];
				});
				for(var p in holder.keys()){
					drawBooks(holder,holder.keys()[p]);
				}
			}
			
			result = result.concat(" <b>", thFormat(csv[0][s_selectedcolumn]), "</b>");
			callback(null, result);
		});
	};
}

function updateTooltip(error, results){
	s_cantonpopup += results;
	info_panel_1.html(s_cantonpopup);
			canvas = info_panel_2.select("svg");
}

function drawBubbles(data_map,id){
	var r = 30;
	
	canvas.html("");
	
	canvas.attr("id","bubbles")
		.style("width","100%")
		.style("height","150px")
		.style("background",background);
	var bubbleObj = canvas.selectAll("g")
		.data(data_map.get(''+id))
		.enter().append("g")
		.attr("id", function(d,i) { return "bubble_and_label_" + i; })
		.attr("class",menu_items_colors[s_selectedid]);
	
	bubbleObj.append("rect")
		.attr("class", "bubble_container")
		.attr("id", function(d,i) { return "bubble_container_" + i; })
		.attr("width", function(d,i) { return 2*(r+2); })
		.attr("height", function(d,i) { return 4*(r+2); })
		.attr("x", function(d, i) { return (r*2.5)*(1+i)-(r+2); })
		.attr("y", 0)
		.style("fill",background)
		.on("mouseover",function(d,i){
			d3.select("#bubble_" + i).attr("class","highlighted");
			d3.select("#bubble_" + i).style("stroke-width","5.0");
			d3.select("#bubble_label_" + i).attr("font-weight","bold");
			d3.select("#bubble_percent_label_" + i).attr("font-weight","bold");
		})
		.on("mouseout",function(d,i){
			d3.select("#bubble_" + i)
				.attr("class", function(d){
					var quant = d3.scale.quantize()
						.domain(d3.extent(data_map.get(''+id)))
						.range(d3.range(9));
					return i<3 ? ("q" + quant(d) + "-9"): "highlighted";
				});
			d3.select("#bubble_" + i).style("stroke-width","0.5");
			d3.select("#bubble_label_" + i).attr("font-weight","normal");
			d3.select("#bubble_percent_label_" + i).attr("font-weight","normal");
		})
		.append("title")
		.text(function(d,i){ return codes[i]['Beschreibung']; });
	//****** bubble
	bubbleObj.append("circle")
		.attr("class", function(d,i){
			var quant = d3.scale.quantize()
				.domain(d3.extent(data_map.get(''+id)))
				.range(d3.range(9));
			return i<3 ? ("q" + quant(d) + "-9"): "highlighted";
		})
		.attr("id", function(d,i) { return "bubble_" + i; })
		.attr("r",0)
		.transition().duration(500).attr("r", function(d,i) { return Math.round(r*d/d3.max(data_map.get(''+id))); })
		.attr("cx", function(d, i) { return (r*2.5)*(1+i); })
		.attr("cy", 2*r)
		.style("stroke","black")
		.style("stroke-width","0.5")
		.style("pointer-events", "none");
	
	//****** labels
	bubbleObj.append("text")
		.attr("class", "bubble_label")
		.attr("id", function(d,i) { return d<0 ? "no_data" : ("bubble_label_" + i); })
		.attr("x", function(d, i) { return (r*2.5)*(1+i); })
		.attr("y", (0.5*r))
		.attr("font-style", function(d,i){ return i<3 ? "normal" : "italic"; })
		.attr("font-size", function(d,i){ return i<3 ? "11" : "13px"; })
		.attr("text-anchor", "middle")
		.attr("dominant-baseline", "middle")
		.attr("alignment-baseline", "middle")
		.style("pointer-events", "none")
		.text(function(d) {return d<0 ? "keine Daten" : thFormat(s_selectedtype == "item_1b" ? d.toFixed(2) : d);});
	
	bubbleObj.append("text")
		.attr("class", "data_label")
		.attr("x", 0)
		.attr("y", (0.5*r))
		.attr("font-size", 12)
		.attr("text-anchor", "start")
		.attr("dominant-baseline", "middle")
		.attr("alignment-baseline", "middle")
		.style("pointer-events", "none")
		.text("Wert:");
	
	//****** percentages
	bubbleObj.append("text")
		.attr("class", "bubble_label")
		.attr("id", function(d,i) { return d<0 ? "no_data" : ("bubble_percent_label_" + i); })
		.attr("x", function(d, i) { return (r*2.5)*(1+i); })
		.attr("y", (3.5*r))
		.attr("font-style", function(d,i){ return i<3 ? "normal" : "italic"; })
		.attr("font-size", function(d,i){ return i<3 ? "11" : "13px"; })
		.attr("text-anchor", "middle")
		.attr("dominant-baseline", "middle")
		.attr("alignment-baseline", "middle")
		.style("pointer-events", "none")
		.text(function(d) {return d<0 ? "keine Daten" : thFormat((100.0*d/d3.max(data_map.get(''+id))).toFixed(2)+'%');});
	
	bubbleObj.append("text")
		.attr("class", "data_label")
		.attr("x", 0)
		.attr("y", (3.5*r))
		.attr("font-size", 12)
		.attr("text-anchor", "start")
		.attr("dominant-baseline", "middle")
		.attr("alignment-baseline", "middle")
		.style("pointer-events", "none")
		.text("Prozent:");
}

function drawBars(data_map,id){
	var r = 30;
	
	canvas.html("");
	
	var margin = {top: 40, right: 20, bottom: 30, left: 40},
			width = 460 - margin.left - margin.right,
			height = 150 - margin.top - margin.bottom;

		var formatPercent = d3.format(".0%");

		var x = d3.scale.ordinal()
			.rangeRoundBands([0, width], .1);

		var y = d3.scale.linear()
			.range([height, 0]);

		var xAxis = d3.svg.axis()
			.scale(x)
			.orient("bottom");

		var yAxis = d3.svg.axis()
			.scale(y)
			.orient("left")
			.ticks(5)
			.tickFormat(function(d) { return formatPercent(+d/100.0); });

		var tip = d3.tip()
			.attr('class', 'd3-tip')
			.offset([-10, 0])
			.html(function(d,i) {
				return codes[i]['Beschreibung']+": <strong>" + ((s_selectedtype == "item_3a" || s_selectedtype == "item_3b") ? (d<0 ? "Keine Daten" : thFormat(d.toFixed(2))+'%') : d) + "</strong>";
			})
		//***** canvas ****
		canvas.attr("id","bars")
			.attr("width",width + margin.left + margin.right)
			.attr("height",height + margin.top + margin.bottom)
			.attr("text-anchor", "middle")
			.attr("dominant-baseline", "middle")
			.attr("alignment-baseline", "middle")
			.style("background",background);
		
		var barObj = canvas.append("g")
			.attr("class",menu_items_colors[s_selectedid])
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

		barObj.call(tip);
		
		x.domain(codes.map(function(d,i){ return codes[i]['Beschreibung'].split(' ')[1]; }));
		y.domain([0, 100]);
		
			barObj.append("g")
				.attr("class", "x axis")
				.attr("transform", "translate(0," + height + ")")
				.call(xAxis);

			barObj.append("g")
				.attr("class", "y axis")
				.call(yAxis)
			.append("text")
				.attr("x", -40)
				.attr("y", -20)
				.attr("dy", ".71em")
				.style("text-anchor", "start")
				.text("Prozent");
			


		var singleBar = barObj.append("g").selectAll(".bar")
				.data(data_map.get(''+id))
			.enter().append("rect")
				.attr("class", function(d,i){
					var quant = d3.scale.quantize()
						.domain(d3.extent(data_map.get(''+id)))
						.range(d3.range(9));
					return i<4 ? ("bar q" + quant(d) + "-9"): "highlighted";
				})
				.attr("id", function(d,i) { return "bar_" + i; })
				.attr("x", function(d) { return x(d); })
				.attr("width", width/data_map.get(''+id).length - 10)
				.attr("y", function(d) { return y(0); })
				.attr("height", function(d) { return height - y(0); })
				.style("stroke","black")
				.style("stroke-width","0.5");
		
		singleBar.transition().duration(500)
			.attr("y", function(d) { return d<0 ? y(0) : y(d); })
			.attr("height", function(d) { return height - (d<0 ? y(0) : y(d)); });
		singleBar.append("title")
			.text(function(d,i){ return codes[i]['Beschreibung']+": "+((s_selectedtype == "item_3a" || s_selectedtype == "item_3b") ? (d<0 ? "Keine Daten" : thFormat(d.toFixed(2))+'%') : d); });
}

function drawBooks(data_map,id){
	var r = 30, rr = 15;
	
	canvas.html("");
	
	canvas.attr("id","books")
		.style("width","100%")
		.style("height","150px")
		.attr("text-anchor", "middle")
		.attr("dominant-baseline", "middle")
		.attr("alignment-baseline", "middle")
		.style("background",background);
	
	var book_images = [
		["./img/book/No_Verfassung.png", "./img/book/Verfassung.png"],
		["./img/book/No_Strategie.png", "./img/book/Strategie.png"]
		],
		arrow_images = ["./img/book/Down_l.png", "./img/book/Down_m.png",
		"./img/book/Up_m.png", "./img/book/Up_h.png"];
	
	var bookObj = canvas.selectAll("g")
		.data(data_map.get(''+id))
		.enter().append("g")
		.attr("id", function(d,i) { return "book_and_label_" + i; });
	
	bookObj.append("rect")
		.attr("class", "book_container")
		.attr("id", function(d,i) { return "book_container_" + i; })
		.attr("width", function(d,i) { return 2*(r+2); })
		.attr("height", function(d,i) { return 4*(r+2); })
		.attr("x", function(d, i) { return (r*2.5)*(1+i)-(r+2); })
		.attr("y", 0)
		.style("fill",background)
		.on("mouseover",function(d,i){
			d3.select("#book_" + i)
				.transition().duration(500)
				.attr("x", (r*2.5)*(1+i)-(r+2)-rr/2)
				.attr("y", 2*r-rr/2)
				.attr("width", 2*r+rr)
				.attr("height", 2*r+rr);
			d3.select("#book_label_" + i).attr("font-weight","bold");
			d3.select("#book_percent_label_" + i).attr("font-weight","bold");
		})
		.on("mouseout",function(d,i){
			d3.select("#book_" + i)
				.transition().duration(500)
				.attr("x", (r*2.5)*(1+i)-(r+2))
				.attr("y", 2*r)
				.attr("width", 2*r)
				.attr("height", 2*r);
			d3.select("#book_label_" + i).attr("font-weight","normal");
			d3.select("#book_percent_label_" + i).attr("font-weight","normal");
		})
		.append("title")
		.text(function(d,i){ return codes[i]['Beschreibung']; });
	//****** book
	bookObj.append("image")
		.attr("id", function(d,i) { return "book_" + i; })
		.attr("xlink:href", function(d,i){
			return i<2 ? book_images[i][d] : arrow_images[d];
		})
		.attr("x", function(d, i) { return (r*2.5)*(1+i); })
		.attr("y", 3*r)
		.attr("width", 0)
		.attr("height", 0)
		.transition().duration(500)
		.attr("x", function(d, i) { return (r*2.5)*(1+i)-(r+2); })
		.attr("y", 2*r)
		.attr("width", 2*r)
		.attr("height", 2*r)
		.style("pointer-events", "none");
	
	//****** labels
	bookObj.append("text")
		.attr("class", "book_label")
		.attr("id", function(d,i) { return "book_label_" + i; })
		.attr("x", function(d, i) { return (r*2.5)*(1+i); })
		.attr("y", (0.5*r))
		.attr("font-style", function(d,i){ return i<2 ? "normal" : "italic"; })
		.attr("font-size", function(d,i){ return i<2 ? "11" : "13px"; })
		.attr("text-anchor", "middle")
		.attr("dominant-baseline", "middle")
		.attr("alignment-baseline", "middle")
		.style("pointer-events", "none")
		.text(function(d,i) { return i<1 ? 'Verfassung' : (i<2 ? 'Strategie' : 'Bewertung'); });
}
