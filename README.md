# HS.Composition
This is working implementation of map compositions rendering using [Leaflet](http://leafletjs.com/) (an open-source JavaScript library for mobile-friendly interactive maps).
- - -

Map is a composite object referring to a lot of live data sources around the net, require the existence of a “Map Composition” standard that describes the elements that constitute a map and how they should be combined to fit together neatly.

An early effort by the OGC was the [Web Map Context specification](http://portal.opengeospatial.org/files/?artifact_id=8618) that has not evolved since 2005. This little bit ‘heavyweight’ XML-based standard is limited in scope and has not evolved with the developments in standards and technology in the 11 years that have passed since its creation.

Recently the three European Community funded projects [SDI4Apps](http://sdi4apps.eu/), [Foodie](http://www.foodie-project.eu/) and [OTN](http://project.opentransportnet.eu/) have started the work of defining a simple, lightweight specification for Map Compositions using HTML5 and bandwidth friendly JavaScript Object Notation (JSON) as a carrier of information.

The current specification of the JSON Map Composition is available on the [GitHub Wiki of HSLayers NG](https://github.com/hslayers/hslayers-ng/wiki/Composition-schema).
- - -

The live demo is available on [this address] (http://www.agmeos.cz/composition).
