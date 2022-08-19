 // https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.5/d3.js
// SAMPLE https://jsfiddle.net/ningunaparte/9gm68vmn/

// var nowDate = new Date();

// ES LOCATION
// d3.locale Spanish Spain / Español
// https://github.com/mbostock/d3/wiki/Localization

// Source:
// https://gist.github.com/ningunaparte/9d67f051e3f7fedf4e20

var es_ES = {
    "decimal": ",",
    "thousands": ".",
    "grouping": [3],
    "currency": ["€", ""],
    "dateTime": "%a %b %e %X %Y",
    "date": "%d/%m/%Y",
    "time": "%H:%M:%S",
    "periods": ["AM", "PM"],
    "days": ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
    "shortDays": ["Dom", "Lun", "Mar", "Mi", "Jue", "Vie", "Sab"],
    "months": ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
    "shortMonths": ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"]
};

// var ES = d3.locale(es_ES);

// // PARAMS AVAILABLE https://github.com/mbostock/d3/wiki/Time-Formatting

// var myDefaultFormat = d3.time.format("%A %d, %H:%M");
// var mySampleFormat = ES.timeFormat("%A %d, %H:%M");
// var mySampleNumber = 155624.55;

// var strings = [nowDate, myDefaultFormat(nowDate), mySampleFormat(nowDate), ES.numberFormat(",.")(mySampleNumber)]

// d3.select("body").append('ul').selectAll('li')
//     .data(strings)
//     .enter().append('li')
//     .text(function(d) {
//         return d;
//     })