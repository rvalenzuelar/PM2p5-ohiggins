function plot_line(){
    const width = 800;
    const height = 400;
    
    const margin = {
        left: 40,
        right: 70,
        top: 10,
        bottom: 70
    };
    
    let svg = d3.select("#line-plot")
        .append("svg")
        .attr("width", width)
        .attr("height", height);
    
    let xAxis = svg.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + (height - margin.bottom) + ")");
    
    let yAxis = svg.append("g")
        .attr("class", "axis axis--y")
        .attr("transform", "translate(" + margin.left + ",0)");
    
    let xLabel = xAxis.append("g")
        .append("text")
        .attr("class", "x axis-title")
        .attr("text-anchor", "middle")
        .style("font-size", "10px")
        .attr("fill", "black")
        .attr("transform", `translate(${(width - margin.right) / 2}, 25)`);
    
    let yLabel = yAxis.append("g")
        .append("text")
        .attr("class", "y axis-title")
        .attr("text-anchor", "end")
        .style("font-size", "10px")
        .attr("fill", "black")
        .attr("transform", `translate(10, ${margin.top}) rotate(-90)`);
    
    let rule = svg.append("g")
        .attr("class", "rule")
        .attr("transform", "translate(" + margin.left + ",0)");
    
    rule.append("line")
        .attr("y1", margin.top)
        .attr("y2", height - margin.bottom)
        .attr("stroke", "lightgray");
    
    rule.append("text")
        .attr("text-anchor", "start")
        .attr("fill", "black")
        .attr('y', margin.top + 10)
        .style("font-size", "13px")
        .style("font-family", "sans-serif")


    // let tooltip = svg.append("text")
    //     .style("font-size", "10px")
    //     .style("font-family", "sans-serif");  
    
    Promise.all([
        d3.csv("data/Rancagua1_PM2p5.csv")
    ]).then(function(datos) {
    
        let data = datos[0];
    
        let dateParse = d3.timeParse("%Y-%m-%d");
    
        const x = 'date';
        const y = 'valid';
    
        data.forEach(d => {
            d[x] = dateParse(d[x]);
            d[y] = +d[y]
        });
    
        data = filertByDate(data, "2021-01-01", "2022-01-01")

        const dates = data.map(v => v[x]);
        const valids = data.map(v => v[y]);
        

        let xMin = d3.min(data, d => d[x]);
        let xMax = d3.max(data, d => d[x]);
        let yMin = d3.min(data, d => d[y]);
        // let yMax = d3.max(data, d => d[y]);
        const yMax = 120;

        let xScale = d3.scaleTime()
            .range([margin.left, width - margin.right])
            .domain([xMin, xMax]);
    
        let yScale = d3.scaleLinear()
            .range([height - margin.bottom, margin.top])
            .domain([yMin, yMax]);

        let line = d3.line()
            .curve(d3.curveMonotoneX)
            .x(d => xScale(d[x]))
            .y(d => yScale(d[y]));
        
        var ES = d3.timeFormatLocale(es_ES);             
        // dateText = d3.timeFormat("%B %d")(dates[i])
        // dateText = ES.utcFormat("%B %d")(dates[i])            
        xAxis.call(
            d3.axisBottom(xScale)
                // .tickFormat(d3.timeFormat("%b"))
                .tickFormat(ES.utcFormat("%b"))
                .ticks(d3.timeMonth.every(1))
        );
        yAxis.call(d3.axisLeft(yScale));

        xLabel.text("Fecha");
        yLabel.text("PM2.5 (\u03BCg/m\u00B3)");

        
        // Set the gradient
        svg.append("linearGradient")
            .attr("id", "line-gradient")
            .attr("gradientUnits", "userSpaceOnUse")
            .attr("x1", 0)
            .attr("y1", yScale(0))
            .attr("x2", 0)
            .attr("y2", yScale(yMax))
            .selectAll("stop")
            .data([
                {offset: "0%", color: d3.interpolateYlOrBr(0)},
                {offset: "50%", color: d3.interpolateYlOrBr(.5)},
                {offset: "100%", color: d3.interpolateYlOrBr(1)}
            ])
            .enter()
            .append("stop")
            .attr("offset", function(d) { return d.offset; })
            .attr("stop-color", function(d) { return d.color; });

        let curves = svg.selectAll(".curve")
            .data([data]);
    
        curves.enter()
            .append("path")
            .attr("class", "curve")
            .attr("fill", "none")
            .attr("stroke-width", 2.0)
            .attr("stroke-linejoin", "round")
            .attr("stroke-linecap", "round")
            .style("mix-blend-mode", "multiply")
            .style("opacity", 1.0)
            .attr("stroke", "url(#line-gradient)")
            .attr("d", d => line(d));

        curves
            .attr("class", "curve")
            .attr("fill", "none")
            .attr("stroke-width", 2.0)
            .attr("stroke-linejoin", "round")
            .attr("stroke-linecap", "round")
            .style("mix-blend-mode", "multiply")
            .style("opacity", 1.0)
            .attr("stroke", 'steelblue')
            .attr("d", d => line(d));

        curves.exit().remove();

        svg.on('mousemove', moved)
            .on('mouseenter', entered)
            .on('mouseleave', left)
            .on('click', click);

        function moved(event) {
            const thisX = d3.pointer(event, this)[0];
            const xm = xScale.invert(thisX);
            const i1 = d3.bisectLeft(dates, xm, 1);
            const i0 = i1 - 1;
            const i = xm - dates[i0] > dates[i1] - xm ? i1 : i0;

            rule.select('line')
                .attr("x1", xScale(dates[i]) - margin.left)
                .attr("x2", xScale(dates[i]) - margin.left);
            var ES = d3.timeFormatLocale(es_ES);             
            // dateText = d3.timeFormat("%B %d")(dates[i])
            dateText = ES.utcFormat("%B %d")(dates[i])
            valueText = valids[i].toString()
            // toolText = dateText + "\r" + valueText
            toolText = `Fecha:${dateText} Valor:${valueText}ug/m3`;
            
            rule.select("text")
                .attr("x", xScale(dates[i]) - margin.left + 5)
                .text(toolText);
        };

        function entered(event) {
            rule.style("opacity",1)
        };

        function left(event) {
            rule.style("opacity", 0.0);
        };

        function click(event) {
            
        };
    });
}

