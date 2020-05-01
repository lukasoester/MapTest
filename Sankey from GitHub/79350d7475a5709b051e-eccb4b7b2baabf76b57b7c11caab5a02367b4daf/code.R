    require(rCharts)
    require(plyr)
    
    gallery <- read.csv(
      "https://docs.google.com/spreadsheet/pub?key=0AovoNzJt5GetdEhQVDgyYXpJMnZ2M2J2YmtvX0I5Snc&output=csv",
      stringsAsFactors = FALSE
    )
    
    gallery.use <- gallery[,c("technology","visualizationType","documentType","author")]
    colnames(gallery.use) <- rep("column",4)
    
    gallery.edge <- rbind(
      gallery.use[,1:2],
      gallery.use[,2:3],
      gallery.use[,3:4],
      deparse.level=1
    )
    
    colnames(gallery.edge) <- c("source","target")
    
    gallery.edge <- ddply(gallery.edge,~source+target,nrow)
    
    colnames(gallery.edge) <- c("source","target","value")
    
    #verify that no source = target
    #or will get stuck in infinite loop
    gallery.edge[which(gallery.edge[,1]==gallery.edge[,2]),]
    
    
    
    gallery.edge$source <- as.character(gallery.edge$source)
    gallery.edge$target <- as.character(gallery.edge$target)
    sankeyPlot2 <- rCharts$new()
    sankeyPlot2$setLib('http://timelyportfolio.github.io/rCharts_d3_sankey/')
    sankeyPlot2$set(
      data = gallery.edge,
      nodeWidth = 15,
      nodePadding = 10,
      layout = 32,
      width = 960,
      height = 500
    )
    
    
    sankeyPlot2$setTemplate(
      afterScript = "
    <script>
      // to be specific in case you have more than one chart
      d3.selectAll('#{{ chartId }} svg path.link')
        .style('stroke', function(d){
          //here we will use the source color
          //if you want target then sub target for source
          //or if you want something other than gray
          //supply a constant
          //or use a categorical scale or gradient
          return d.source.color;
        })
       //note no changes were made to opacity
       //to do uncomment below but will affect mouseover
       //so will need to define mouseover and mouseout
       //happy to show how to do this also
       // .style('stroke-opacity', .7) 
    </script>
    ")
    
    sankeyPlot2
