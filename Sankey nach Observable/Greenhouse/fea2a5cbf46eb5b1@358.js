// https://observablehq.com/@reinpk/carbon-flow-diagram@358
export default function define(runtime, observer) {
  const main = runtime.module();
  const fileAttachments = new Map([["carbon@44.json",new URL("./files/eca901d3c0c95c1eda0433d628ac16e63b033ff55ad0bd029ee765e1b735ed974604015bbf528dace4fd29010e49bcc5f616617a60a80d1fe409eda2f2444727",import.meta.url)]]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], function(md){return(
md`# Greenhouse Gas Reactions

This diagram attempts to map out every significant greenhouse gas-emitting chemical reaction. Supporting data sources below.

Also see the [long-form document](https://docs.google.com/document/d/11RByHr-t599tP6OYJG2gbLiL3vV2xkJnTs5laH8UTT8/edit#heading=h.yqp29fhmmns1) with details on each reaction and companies working on replacements.
`
)});
  main.variable(observer("chart")).define("chart", ["d3","width","height","sankey","data","color","format","DOM"], function(d3,width,height,sankey,data,color,format,DOM)
{
  const svg = d3.create("svg")
      .attr("viewBox", [0, 0, width, height]);

  const {nodes, links} = sankey(data);

  svg.append("g")
      .attr("stroke", "#000")
    .selectAll("rect")
    .data(nodes)
    .join("rect")
      .attr("x", d => d.x0)
      .attr("y", d => d.y0)
      .attr("height", d => d.y1 - d.y0)
      .attr("width", d => d.x1 - d.x0)
      .attr("fill", d => color(d.category))
      .on("hover", function() {
           // make bold
       })
      .on("click",function() {
         console.log('click');
       })
    .append("title")
      .text(d => `${d.name}\n\n${format(d.value)}`);

  const link = svg.append("g")
      .attr("fill", "none")
      .attr("stroke-opacity", 0.5)
    .selectAll("g")
    .data(links)
    .join("g")
      .style("mix-blend-mode", "multiply");

  const gradient = link.append("linearGradient")
  .attr("id", d => (d.uid = DOM.uid("link")).id)
  .attr("gradientUnits", "userSpaceOnUse")
  .attr("x1", d => d.source.x1)
  .attr("x2", d => d.target.x0);

  gradient.append("stop")
    .attr("offset", "0%")
    .attr("stop-color", d => color(d.source.category));

  gradient.append("stop")
    .attr("offset", "100%")
    .attr("stop-color", d => color(d.target.category));

  link.append("path")
      .attr("d", d3.sankeyLinkHorizontal())
      .attr("stroke", d => d.uid)
      .attr("stroke-width", d => Math.max(1, d.width));

  link.append("title")
      .text(d => `${d.source.name} → ${d.target.name}\n${format(d.value)}`);

  svg.append("g")
      .style("font", "10px sans-serif")
    .selectAll("text")
    .data(nodes)
    .join("text")
      .attr("x", d => d.x0 < width / 2 ? d.x1 + 6 : d.x0 - 6)
      .attr("y", d => (d.y1 + d.y0) / 2)
      .attr("dy", "0.35em")
      .attr("text-anchor", d => d.x0 < width / 2 ? "start" : "end")
      .text(d => `${d.name} (${d.equation})`);

  return svg.node();
}
);
  main.variable(observer("sankey")).define("sankey", ["d3","width","height"], function(d3,width,height)
{
  const sankey = d3.sankey()
      .nodeAlign(d3[`sankeyJustify`])
      .nodeWidth(15)
      .nodePadding(10)
      .extent([[1, 5], [width - 1, height - 5]]);
  return ({nodes, links}) => sankey({
    nodes: nodes.map(d => Object.assign({}, d)),
    links: links.map(d => Object.assign({}, d))
  });
}
);
  main.variable(observer("format")).define("format", ["d3"], function(d3)
{
  const f = d3.format(",.0f");
  return d => `${f(d)} GT CO2e/year`;
}
);
  main.variable(observer("color")).define("color", ["d3"], function(d3)
{
  const color = d3.scaleOrdinal(d3.schemeCategory10);
  return name => color(name.replace(/ .*/, ""));
}
);
  main.variable(observer("data")).define("data", ["FileAttachment"], function(FileAttachment){return(
FileAttachment("carbon@44.json").json()
)});
  main.variable(observer("width")).define("width", function(){return(
975
)});
  main.variable(observer("height")).define("height", function(){return(
600
)});
  main.variable(observer("d3")).define("d3", ["require"], function(require){return(
require("d3@5", "d3-sankey@0.12")
)});
  main.variable(observer()).define(["md"], function(md){return(
md`# Data Sources
**Concrete**
* 1.8 GT CO2e/year for global cement production, 55% calcination, 45% coal+natural gas for heat
* https://www.nrmca.org/sustainability/CONCRETE%20CO2%20FACT%20SHEET%20FEB%202012.pdf

**Steel**
* 8% of global CO2 emissions... of 36 GT/year = 2.9 GT/year... 90% coke and 10% direct reduced iron (natural gas)
* https://www.worldsteel.org/publications/position-papers/steel-s-contribution-to-a-low-carbon-future.html

**Aluminum**
* 0.4 GT/yr for aluminum production, with half coming from energy (natural gas) and half from anode
* http://climate.columbia.edu/files/2012/04/GNCS-Aluminum-Factsheet.pdf

**Electricity**
* 10.1 GT/yr of coal electricity plant emissions, 1/20th of that for oil and 1/3 of that for natural gas
* https://www.eia.gov/tools/faqs/faq.php?id=73&t=11
* https://www.iea.org/geco/emissions/

**Transport**
* 23% of 36 GT is 8.3 GT/yr
* https://www.who.int/sustainable-development/transport/health-risks/climate-impacts/en/

**Refining**
* 5% of feed used in refinery itself, 20% of those emissions are for hydrogen from methane
* https://www.sciencedirect.com/science/article/pii/S1876610209000277/pdf?md5=ffbffe5034a0d44f3e75b676b07d6107&pid=1-s2.0-S1876610209000277-main.pdf

**Ammonia**
* 0.5 GT/yr
* https://ammoniaindustry.com/ammonia-production-causes-1-percent-of-total-global-ghg-emissions/

**Gas Leaks**
* 2.3% of all methane extracted, with 25x multiplier for CO2 equivalence
* 4 trillion cubic meters/year --> 3.2 billion tons of CH4/year total global production
* 74 million tons leaked/year --> 1.8 GT CO2e/year
* https://www.nytimes.com/2018/06/21/climate/methane-leaks.html
* https://climatechangeconnection.org/emissions/co2-equivalents/
* https://www.engineeringtoolbox.com/gas-density-d_158.html
* http://energyatlas.iea.org/#!/tellmap/-1165808390

**Tundra**
* 20 million tons of released CH4 per year, converts to 0.5 GT CO2e/year
* https://en.wikipedia.org/wiki/Arctic_methane_emissions

**Livestock**
* 2 GT CO2e/year
* https://timeforchange.org/are-cows-cause-of-global-warming-meat-methane-co2/

**Landfill**
* 0.8 GT CO2e/year
* https://www.globalmethane.org/documents/landfill_fs_eng.pdf

**Land Use Change**
* 2.8 GT CO2e/year
* https://timeforchange.org/are-cows-cause-of-global-warming-meat-methane-co2/

**Industrial Heat**
* 10% of global CO2 emissions, split between coal/natural gas for estimation purposes here
* https://energypolicy.columbia.edu/sites/default/files/file-uploads/LowCarbonHeat-CGEP_Report_100219-2_0.pdf

**Residential Heat**

**NOx**
* 31 MT/yr anthropogenic... 268x for greenhouse impact == 8.4 GT CO2e/yr
* ...1.7 GT CO2e/yr from biomass burning (15)
* ...6.0 GT CO2e/yr from transport (9)
* ...0.7 GT CO2e/yr from fertilizer
* https://en.wikipedia.org/wiki/Global_warming_potential#Values
* https://www.dropbox.com/s/3o02skf5tr8x8e3/Screenshot%202019-11-06%2022.16.30.png?dl=0
* http://sci-hub.tw/10.1023/A:1009793806086

**HFCs**
* Currently roughly 1 GT CO2e/yr
* https://en.wikipedia.org/wiki/Global_warming_potential#Values
* https://www.sciencedirect.com/science/article/pii/S135223101530488X

**CFCs**
* https://en.wikipedia.org/wiki/Chlorofluorocarbon
* https://www.meti.go.jp/policy/chemical_management/ozone/files/pamplet/panel/08e_basic.pdf
`
)});
  return main;
}
