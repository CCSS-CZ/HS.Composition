/**
 * initialize map and call drawComposition if needed
 * @param  {boolean} comp is composition selected?
 */
function redrawComposition(comp, curl) {
	map = L.map('map').setView([49.8589393, 14.2838466], 15);
	lc = new L.Control.Layers().addTo(map);
	L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
		attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
	}).addTo(map);
	if (comp) {
		readComposition(curl);
	}
}

/**
 * @param  {JSON} composition JSON with saved composition
 */
function drawComposition(composition) {
	map.fitBounds([
		[composition.extent[1], composition.extent[0]],
		[composition.extent[3], composition.extent[2]]
	]);
	document.title = composition.title;
	for (var l in composition.layers) {
		var ccrs = ((composition.layers[l].params.CRS) ? composition.layers[l].params.CRS.replace(':', '') : composition.layers[l].params.FROMCRS.replace(':', ''));
		var clayers = composition.layers[l].params.LAYERS;
		var copacity = composition.layers[l].opacity;
		var ctransparent = composition.layers[l].params.TRANSPARENT;
		var cformat = ((composition.layers[l].params.FORMAT) ? composition.layers[l].params.FORMAT : 'image/png');
		var options = {layers: clayers,
						crs: L.CRS.ccrs,
						opacity: copacity,
						transparent: ctransparent,
						format: cformat
					};
		var url = decodeURIComponent(composition.layers[l].url);
		var wmslayer = L.tileLayer.wms(url, options).addTo(map);
		lc.addOverlay(wmslayer, composition.layers[l].title)
	}
}

/**
 * @param  {string} url url of saved composition
 */
function readComposition(courl) {
	$.ajax({
		url: 'proxy.php',
		cache: false,
		headers: {
			'X-Proxy-URL': courl,
		},
    	dataType: 'json', success: function(data) {
			//var data = rj.parse(datain);
			drawComposition(data.data);
		},
		error:function(xhr){
			//alert("An error occured: " + xhr.status + " " + xhr.statusText);
			if (xhr.status == 200) {
				var data = rj.parse(xhr.responseText);
				drawComposition(data.data);
			}
		}
	});
}

function getCompositionsList(url) {
	var murl = url + "csw/?request=GetRecords?request=GetRecords&query=type%3D'application'&format=application/json&language=eng&maxrecords=200&sortby=";
	$.ajax({
		url: 'proxy.php',
		cache: false,
		headers: {
			'X-Proxy-URL': murl,
		},
		dataType: 'json',
		success: function(data) {
			var selComp = '';
			for (var i in data.records) {
				if (data.records[i].serviceType == 'WMC') selComp = selComp + '<tr onClick="map.off();map.remove();redrawComposition(true, \'' + data.records[i].link + '\');" class="feature-row" id="' + i + '"><td style="vertical-align: middle;"></td><td class="feature-name">' + data.records[i].title + '</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>';
			}
			document.getElementById('cselect').innerHTML = selComp;
		}
	});
}

$( document ).ready(function() {
	getCompositionsList('http://youth.sdi4apps.eu/php/metadata/');
	redrawComposition(false, false);
});
var sidebar = L.control.sidebar('sidebar').addTo(map);
