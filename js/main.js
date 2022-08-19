

var stationOptions = {'Rancagua1':0, 
'Rancagua2':1, 
'Rengo':2, 
'San Fernando':3
}

function parseData(datos){
    let dateParse = d3.timeParse("%Y-%m-%d")
    datos.forEach(d => {
        d['date'] = dateParse(d['date']);
        d['valid'] = +d['valid']
    });
    return datos
}

function updateCalendar(datos_all, currentStation, div_name, beg='', end='', scaleType='continuous'){
    
    datos_station = datos_all[stationOptions[currentStation]]

    if (typeof datos_station[0].date === 'string'){
        var datos_plot = parseData(datos_station)
    } else {
        var datos_plot = datos_station
    }
    
    if (beg.length != 0 && end.length != 0){
        var datos_plot = filertByDate(datos_plot, beg, end)
        var mode = ''
    } else {
        var mode = 'full-calendar'
    }

    calendar = Calendar(datos_plot,{
        x: d => d.date,
        y: d => d.valid,
        width: 1000,
        colorsSelect: scaleType
    });

    console.log(calendar)
    if (mode === 'full-calendar'){
        calendar.id = 'calendar'
        d3.select('#calendar').remove()
        d3.select(div_name).insert(()=>calendar)
    } else {
        d3.select(div_name).insert(()=>calendar)
    }
        
}


Promise.all([
    d3.csv("data/Rancagua1_PM2p5.csv"),
    d3.csv("data/Rancagua2_PM2p5.csv"),
    d3.csv("data/Rengo_PM2p5.csv"),
    d3.csv("data/SanFdo_PM2p5.csv")
]).then(function(datos_all) {

    var currentStation = 'Rancagua1'
    
    updateCalendar(datos_all, currentStation, '#calendar-short', "2021-01-01", "2022-01-01")

    updateCalendar(datos_all, currentStation, '#calendar-2017', "2017-01-01", "2018-01-01")

    // DROPDOWN
    const dropdownSelect = d3.select("#dropdown");    

    let options = dropdownSelect.selectAll("option")
        .data(Object.keys(stationOptions));

    options.enter()
        .append("option")
        .attr("value", d => d)
        .html(d => d);

    options
        .attr("value", d => d)
        .html(d => d);

    options.exit().remove();

    dropdownSelect.on("change", event => {
        let newValue = d3.select(event.target).node().value;
        if (newValue !== currentStation) {
            currentStation = newValue;
            updateCalendar(datos_all, currentStation, '#calendar-long')
        } 
    })

    switchSelect = d3.select("#flexSwitchCheckDefault");
    switchSelect.on("click", event => {
        if (event.target.checked) {
            updateCalendar(datos_all, currentStation, '#calendar-long', '','', 'category')
        } else {
            updateCalendar(datos_all, currentStation, '#calendar-long')
        }
    })

    updateCalendar(datos_all, currentStation, '#calendar-long')

    plot_line();

    const select = document.getElementById('flexSwitchCheckDefault');
    select.addEventListener('change', function handleChange(event) {
        console.log(event.target.checked); // 👉️ get selected VALUE
        if (dropdownChanged){
            event.target.checked = false
        }
    });

    cbar = rampLinear()
    d3.select('#colorbar').insert(()=>cbar)

})