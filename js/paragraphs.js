

let p_intro="<p>El aire que respiramos está lleno de partículas microscópicas  capaces de flotar y transportarse a través de corrientes de aire. Estas partículas se conocen como <strong>aerosoles</strong>. Aunque no nos demos cuenta a simple vista, hay aerosoles de distintos tamaños y composición que inundan el aire que respiramos. En este artículo hablaremos de un conjunto de aerosoles que son particularmente dañinos para la salud humana. Estos aersoles se caracterizan por tener un diámetro igual o menor a 2.5\u03BCm, por lo que también se les conoce como material particulado fino 2.5 o <strong>PM2.5</strong> (sigla en inglés).</p>"

let p_sinca="<p>El Ministerio del Medio Ambiente de Chile mantiene operativa multiples estaciones de monitoreo de contaminantes atmosféricos a lo largo del país. Los datos de cada estación quedan disponible en línea a través del <a href='https://sinca.mma.gob.cl'>Sistema de Información Nacional de Calidad del Aire (SINCA)</a>. La Región de O'Higgins cuenta con 4 estaciones de monitoreo de calidad del aire, unicadas en Rancagua (Rancagua I y II), Rengo y San Fernando. El siguiente mapa muestra la ubicación de estas estaciones dentro de la Región de O'Higgins.</p>"

let p_measurements="<p>Para medir PM2.5, las estaciones utilizan un método denominado <strong>atenuación beta</strong>. En este método, una bomba extrae una muestra de aire que queda impregnada una cinta recolectora. La cinta es luego bombardeada con rayos beta que intenta atravesar el material. A mayor cantidad de PM2.5 presente en la muestra, menor es la cantidad de rayos beta que logran atravesa la muestra. Esta atenuación de rayos beta es directamente proporcional a la masa de PM2.5 presente, y dado que se conoce el volumen de aire extraído, se puede determinar la concentración de contaminante en el aire, normalmente expessada en microgramos por metro cúbico (\u03BCg/m\u00B3).</p>"

let p_timeseries="<p>Como las mediciones son realizadas diariamente de manera automática, podemos observar la concentración de PM2.5 en \u03BCg/m\u00B3 para cada día del año en una línea temporal. Por ejemplo, la siguiente línea temporal muestra la variación de PM2.5 durante el año <strong>2021</strong> en la estación <strong>Rancagua I</strong>. Vemos que entre los meses de enero y febrero la concentración se encuentra mayormente bajo los 20\u03BCg/m\u00B3. Entre marzo y abril la concentración diaria  de PM2.5 comienza a aumentar lentamente, alcanzando valores máximos entre mayo y agosto (peak de 112\u03BCg/m\u00B3). Entre el mes de septiembre y octubre la concentración diaria inicia una disminución, volviendo a su valor mínimo (alrededor de 20\u03BCg/m\u00B3) desde noviembre.</p>"

let p_intro_calendars="<p>Una forma más compacta de observar las mediciones PM2.5 a lo largo del año es coloreando cada día del calendario según el valor de concentración. Así, concentraciones bajas y cercanas a <strong>20\u03BCg/m\u00B3</strong> tendrían un color amarillo mientras que concentraciones altas, cercanas a <strong>112\u03BCg/m\u00B3</strong>, tendrían un color marrón.</p>"

let p_calendar_short="<p>La figura de la derecha muestra la misma información de la línea temporal pero en forma de calendario. Al igual que la línea temporal, se observa que la mayor concentración de PM2.5 en 2021 en Rancagua I se produjo en los meses de invierno, entre mayo y agosto.</p> "

let p_wildfires="<p>En este ejemplo se pueden notar los <a href='https://es.wikipedia.org/wiki/Incendios_forestales_en_Chile_de_2017'>megaincendios</a> del verano de 2017 en la zona central de Chile. Los incendios forestales crean grandes emisiones de PM2.5, por lo que en el calendario se destacan los valores entre enero y febrero, alcanzando un máximo de 71\u03BCg/m\u00B3 el 28 de enero.</p>"

let p_intro_long="<p>A continuación se muestra el calendario completo para todas las mediciones de PM2.5 disponibles en la Región de O'Higgins. Seleccionando una estación de SINCA se puede actualizar el calendario para observar tanto las diferencias entre los lugares de medición como en el tiempo cronológico. Con el switch se puede ver la categoría de calidad del aire correspondiente según la normativa vigente (bueno, regular, alerta, preemergencia, emergencia).</p>"

d3.select('#p-intro').html(p_intro)
d3.select('#p-sinca').html(p_sinca)
d3.select('#p-measurements').html(p_measurements)
d3.select('#p-timeseries').html(p_timeseries)
d3.select('#p-intro-calendars').html(p_intro_calendars)
d3.select('#p-calendar-short').html(p_calendar_short)
d3.select('#p-wildfires').html(p_wildfires)
d3.select('#p-intro-long-calendar').html(p_intro_long)

