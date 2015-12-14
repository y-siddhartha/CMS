var map,
    dialog;
require(["esri/map", "esri/layers/FeatureLayer", "esri/symbols/SimpleFillSymbol", "esri/symbols/SimpleLineSymbol", "esri/renderers/SimpleRenderer", "esri/graphic", "esri/lang", "esri/Color", "dojo/number", "dojo/dom-style", "dijit/TooltipDialog", "dijit/popup", "dojo/domReady!"], function(Map, FeatureLayer, SimpleFillSymbol, SimpleLineSymbol, SimpleRenderer, Graphic, esriLang, Color, number, domStyle, TooltipDialog, dijitPopup) {
	map = new Map("mapDiv", {
		sliderOrientation : "vertical",
		sliderPosition : "bottom-left",
		sliderStyle : "large",
		maxScale : 500,
		minScale : 30000
	});

	//add the CMS map layer and set the extent
	var baseLayer = new esri.layers.ArcGISDynamicMapServiceLayer(properties.aerialMapService);

	map.addLayer(baseLayer);
	visible = [1, 2, 3, 4, 5, 6, 7, 8];
	baseLayer.setVisibleLayers(visible);

	map.setExtent(getMapExtent());
	map.enableDoubleClickZoom();

	// graveSpaces layer and its features
	var graveSpaces = new FeatureLayer(properties.graveSpacesLayer, {
		mode : FeatureLayer.MODE_ONDEMAND,
		outFields : ["*"],
		minScale : 800
	});

	// cemetery boundary layer and its features
	var cemeteryBoundaries = new FeatureLayer(properties.cemeteryBoundariesLayer, {
		mode : FeatureLayer.MODE_ONDEMAND,
		outFields : ["*"],
		maxScale : 2500
	});

	// Selected graveSpaces layer and its features
	var selectedGraveSpaces = new FeatureLayer(properties.graveSpacesLayer, {
		mode : FeatureLayer.MODE_ONDEMAND,
		outFields : ["*"]
	});

	// Defintion expressions for all feature layers
	cemeteryBoundaries.setDefinitionExpression("1=1");
	graveSpaces.setDefinitionExpression("1=1");
	selectedGraveSpaces.setDefinitionExpression("SrchNum = '" + getQueryVariable("serialNumber") + "'");

	// Symbols for all feature layers
	var cemeteryBoundarySymbol = new esri.symbol.SimpleFillSymbol(properties.cemeteryBoundarySymbolFeatures);

	var graveSpacesSymbol = new esri.symbol.SimpleMarkerSymbol(properties.graveSpacesSymbolFeatures);

	var selectedGraveSpacesSymbol = new esri.symbol.SimpleMarkerSymbol(properties.selectedGraveSpacesSymbolFeatures);

	//set renderers for each feature layer
	cemeteryBoundaries.setRenderer(new SimpleRenderer(cemeteryBoundarySymbol));
	graveSpaces.setRenderer(new SimpleRenderer(graveSpacesSymbol));
	selectedGraveSpaces.setRenderer(new SimpleRenderer(selectedGraveSpacesSymbol));

	// Add the feature layers to the map
	map.addLayer(graveSpaces);
	map.addLayer(cemeteryBoundaries);
	map.addLayer(selectedGraveSpaces);

	// Info window size, color and position
	map.infoWindow.resize(245, 125);
	dialog = new TooltipDialog({
		id : "tooltipDialog",
		style : "position: absolute; width: 300px; font: normal normal normal 10pt Helvetica;z-index:100"
	});
	dialog.startup();

	var highlightSymbol = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID, new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([255, 0, 0]), 3), new Color([125, 125, 125, 0.35]));

	//close the dialog when the mouse leaves the highlight graphic
	map.on("load", function() {
		map.graphics.enableMouseEvents();
		map.graphics.on("mouse-out", closeDialog);
	});

	function closeDialog() {
		map.graphics.clear();
		dijitPopup.close(dialog);
	}

	// Cemetery boundaries info dialog box
	cemeteryBoundaries.on("mouse-over", function dialogBox(evt) {
		var t = "<b>Cemetery Name: </b>${Cem_Name}";

		var content = esriLang.substitute(evt.graphic.attributes, t);
		var highlightGraphic = new Graphic(evt.graphic.geometry, highlightSymbol);
		map.graphics.add(highlightGraphic);

		dialog.setContent(content);

		domStyle.set(dialog.domNode, "opacity", 0.85);
		dijitPopup.open({
			popup : dialog,
			x : evt.pageX,
			y : evt.pageY
		});

	});

	// Grave Spaces info dialog box
	graveSpaces.on("mouse-over", function dialogBox(evt) {
		var content = esriLang.substitute(evt.graphic.attributes, properties.graveSpacesDialogBoxContent);
		var highlightGraphic = new Graphic(evt.graphic.geometry, highlightSymbol);
		map.graphics.add(highlightGraphic);

		dialog.setContent(content);

		domStyle.set(dialog.domNode, "opacity", 0.85);
		dijitPopup.open({
			popup : dialog,
			x : evt.pageX,
			y : evt.pageY
		});

	});


	// Selected Grave Space info dialog box
	selectedGraveSpaces.on("mouse-over", function dialogBox(evt) {
		var content = esriLang.substitute(evt.graphic.attributes, properties.selectedGraveSpacesDialogBoxContent);
		var highlightGraphic = new Graphic(evt.graphic.geometry, highlightSymbol);
		map.graphics.add(highlightGraphic);

		dialog.setContent(content);

		domStyle.set(dialog.domNode, "opacity", 0.85);
		dijitPopup.open({
			popup : dialog,
			x : evt.pageX,
			y : evt.pageY
		});

	});

});

function getMapExtent() {
	serialNumber = getQueryVariable("serialNumber");

	if (serialNumber === undefined || serialNumber === null) {
		cemCode = "RO";
	} else {
		cemCode = serialNumber.substr(0, 2);
	}

	var rosemereExtent = [-85.39408, 32.63049, -85.38317, 32.63694];
	var gardenHillsExtent = [-85.40316, 32.62261, -85.38862, 32.63124];
	var evergreenExtent = [-85.4005, 32.63108, -85.39075, 32.63686];
	var selectedCemeteryExtent = [];

	//add the CMS map layer and set the extent

	switch(cemCode) {
	case "EG":
		selectedCemeteryExtent = evergreenExtent;
		break;
	case "GH":
		selectedCemeteryExtent = gardenHillsExtent;
		break;
	default:
		selectedCemeteryExtent = rosemereExtent;
	}
	var startExtent = new esri.geometry.Extent(selectedCemeteryExtent[0], selectedCemeteryExtent[1], selectedCemeteryExtent[2], selectedCemeteryExtent[3], new esri.SpatialReference({
		wkid : 4326
	}));

	return startExtent;
};

var switchToMapView = new switchToMapView();
