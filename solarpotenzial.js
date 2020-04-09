

//        var comSzen2 = communities[0].values[0].Scenario2_RoofsOnly_PotentialSolarElectricity_GWh + communities[0].values[0].Scenario2_RoofsOnly_PotentialSolarHeat_GWh;

//            $("#comSzen2").html(comSzen2);




var element = d3.select('#svg-wrapper').node();
var width = element.getBoundingClientRect().width;
    height = width / 3 * 2;

    
var projection = d3.geo.albers()
    .rotate([0, 0])
    .center([8.3, 46.8])
    .scale(18 * width)
    .translate([width / 2, height / 2])
    .precision(.1);

var path = d3.geo.path()
    .projection(projection);

var svg = d3.select("#svg-wrapper").append("svg")
    .attr("width", width)
    .attr("height", height);

d3.json("readme-swiss.json", function(error, swiss) {
  if (error) throw error;

  var cantons = topojson.feature(swiss, swiss.objects.cantons);
    var communities = [];
  svg.selectAll('.canton')
    .data(cantons.features)
    .enter()
    .append("path")
      .attr("class", "canton")
      .attr("d",function(d) {
        return path(d);
      }) 
      .attr('fill', function(d, i){
            //Zürich
            if (i === 0)
                return d.color = "rgb(255,237,160)"
            //Bern
            else if (i === 1) 
                return d.color = "rgb(253,141,60)"
             //Luzern
            else if (i === 2)
                return d.color = "rgb(254,178,76)"
            //Uri
            else if (i === 3) 
                return d.color = "rgb(254,178,76)"
            //Schwyz
            else if (i === 4) 
                return d.color = "rgb(254,178,76)"
            //Obwalden
            else if (i === 5) 
                return d.color = "rgb(253,141,60)"
            //Nidwalden
            else if (i === 6) 
                return d.color = "rgb(255,237,160)"
            //Glarus
            else if (i === 7) 
                return d.color = "rgb(254,178,76)"
            //Zug
            else if (i === 8) 
                return d.color = "rgb(254,217,118)"
            //Fribourg
            else if (i === 9) 
                return d.color = "rgb(252,78,42)"
            //Solothurn
            else if (i === 10) 
                return d.color = "rgb(254,178,76)"
            //Basel-Stadt
            else if (i === 11) 
                return d.color = "rgb(255,255,204)"
            //Basel-Land
            else if (i === 12) 
                return d.color = "rgb(254,217,118)"
            //Schaffhausen
            else if (i === 13) 
                return d.color = "rgb(254,178,76)"
            //Appenzell-Ausserrhoden
            else if (i === 14) 
                return d.color = "rgb(253,141,60)"
            //Appenzell-Innerrhoden
            else if (i === 15) 
                return d.color = "rgb(227,26,28)"
            //St. Gallen
            else if (i === 16) 
                return d.color = "rgb(254,178,76)"
            //Graubünden
            else if (i === 17) 
                return d.color = "rgb(128,0,38)"
            //Aargau
            else if (i === 18) 
                return d.color = "rgb(254,178,76)"
            //Thurgau
            else if (i === 19) 
                return d.color = "rgb(252,78,42)"
            //Tesssin
            else if (i === 20) 
                return d.color = "rgb(252,78,42)"
            //Waadt
            else if (i === 21) 
                return d.color = "rgb(254,178,76)"
            //Wallis
            else if (i === 22) 
                return d.color = "rgb(227,26,28)"
            //Neuchatel
            else if (i === 23) 
                return d.color = "rgb(254,178,76)"
            //Genf
            else if (i === 24) 
                return d.color = "rgb(255,255,204)"
            //Jura
            else if (i === 25) 
                return d.color = "rgb(128,0,38)"
            
            else {
                return 'yellow'
            }
        })
      
      .on('mouseover', function(d){
        d3.select(this) 
        .style("opacity", 0.5);
        })
    
        .on('mouseleave', function(d){
        d3.select(this) 
        .style("opacity", 1);
        })
    
      .on('click', function(d) {
        var currentCanton = d.properties.name;
        var szenarioData = [];
        d3.json("szenario.json", function (data) {

                var index = data.findIndex(x => x.Key == currentCanton);
                szenariodata = data[index];


                $("#Szen1").html(szenariodata.Szenario1);
                $("#Szen2").html(szenariodata.Szenario2);
                $("#Szen3").html(szenariodata.Szenario3);
                $("#Szen4").html(szenariodata.Szenario4);
                $("#Kanton").html(szenariodata.Kanton);
                

            });
       });

  svg.append("path")
      .datum(topojson.mesh(swiss, swiss.objects.cantons, function(a, b) { return a !== b; }))
      .attr("class", "canton-boundary")
      .attr("d", path);

  svg.selectAll("text")
      .data(cantons.features)
    .enter().append("text")
      .attr("transform", function(d) { return "translate(" + path.centroid(d) + ")"; })
      .attr("dy", ".35em")
      .text(function(d) { return d.properties.name; });
});




 

//enable tooltip
$(document).ready(function(){

    
        var communities = [];
        d3.json("Solarenergiepotenziale_Gemeinden_Daecher_und_Fassaden_2019.01.01.json", function (data) {
                 communities = data;
                    console.log(communities)

                var dataSelect = [];
                //create data array for select2
                communities.forEach(function(element) {
                   var obj = {
                        id : element.MunicipalityNumber,
                        text : element.MunicipalityName
                    };
                    dataSelect.push(obj);
                });
                $(".communitiesSelect").select2({data: dataSelect, closeOnSelect: true});
            });
        $('.communitiesSelect').on('select2:select', function (e) {
                var vKey = $(this).val();
                var index = communities.findIndex(x => x.MunicipalityNumber == vKey);
                var szenariodata = communities[index];

                var comSzen2 = parseFloat(szenariodata.Scenario2_RoofsOnly_PotentialSolarElectricity_GWh) + parseFloat(szenariodata.Scenario2_RoofsOnly_PotentialSolarHeat_GWh);  

                var comSzen4 = parseFloat(szenariodata.Scenario4_RoofsFacades_PotentialSolarElectricity_GWh) + parseFloat(szenariodata.Scenario4_RoofsFacades_PotentialSolarHeat_GWh);
                $("#comSzen1").html(szenariodata.Scenario1_RoofsOnly_PotentialSolarElectricity_GWh);
                $("#comSzen2").html(comSzen2.toFixed(2));
                $("#comSzen3").html(szenariodata.Scenario3_RoofsFacades_PotentialSolarElectricity_GWh);
                $("#comSzen4").html(comSzen4.toFixed(2));
            
        });

  $('[data-toggle="tooltip"]').tooltip(); 
    
});
     
     
     
     
//function filterByProperty(array, prop, value){
//    var filtered = [];
//    for(var i = 0; i < array.length; i++){
//
//        var obj = array[i];
//
//        for(var key in obj){
//                var item = obj[key];
//                if(item[prop] == value){
//                    filtered.push(item); 
//            }
//        }
//
//    }    
//
//    return filtered;
//
//}

// Close the dropdown menu if the user clicks outside of it
//window.onclick = function(event) {
//  if (!event.target.matches('.dropbtn')) {
//    var dropdowns = document.getElementsByClassName("dropdown-content");
//    var i;
//    for (i = 0; i < dropdowns.length; i++) {
//      var openDropdown = dropdowns[i];
//      if (openDropdown.classList.contains('show')) {
//        openDropdown.classList.remove('show');
//      }
//    }
//  }
//}

//function isItemInArray(array, item) {
//    for (var i = 0; i < array.length; i++) {
//        
//        if (array[i][0] == item[0] && array[i][1] == item[1]) {
//            return true;   
//        }
//    }
//    return false;   
//}



//var zh = cantons.find(function(value) {
//    return value.key === "Zürich"
//});