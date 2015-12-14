var properties = {
	mapService : 'http://gis.opelika-al.gov/arcgis/rest/services/Map_Services/Cemetery/MapServer',
	aerialMapService : 'http://gis.opelika-al.gov/arcgis/rest/services/Map_Services/CemeteryAerials/MapServer',
	graveSpacesLayer : 'http://gis.opelika-al.gov/arcgis/rest/services/Map_Services/Cemetery/MapServer/0',
	cemeteryPlotsLayer : 'http://gis.opelika-al.gov/arcgis/rest/services/Map_Services/Cemetery/MapServer/1',
	cemeteryBoundariesLayer : 'http://gis.opelika-al.gov/arcgis/rest/services/Map_Services/Cemetery/MapServer/2',
	i85ExitsLayer : 'http://gis.opelika-al.gov/arcgis/rest/services/Map_Services/Cemetery/MapServer/3',
	streetSymbolsLayer : 'http://gis.opelika-al.gov/arcgis/rest/services/Map_Services/Cemetery/MapServer/4',
	majorHighwaysLayer : 'http://gis.opelika-al.gov/arcgis/rest/services/Map_Services/Cemetery/MapServer/5',
	streetsLayer : 'http://gis.opelika-al.gov/arcgis/rest/services/Map_Services/Cemetery/MapServer/6',
	opelikaWaterFeatures : 'http://gis.opelika-al.gov/arcgis/rest/services/Map_Services/Cemetery/MapServer/7',
	cityLimitsPos : 'http://gis.opelika-al.gov/arcgis/rest/services/Map_Services/Cemetery/MapServer/8',
	graveSpacesSymbolFeatures : {
		"color" : [255, 0, 0, 50],
		"size" : 4,
		"angle" : -30,
		"xoffset" : 0,
		"yoffset" : 0,
		"type" : "esriSMS",
		"style" : "esriSMSCircle",
		"outline" : {
			"color" : [0, 0, 0, 255],
			"width" : 1,
			"type" : "esriSLS",
			"style" : "esriSLSSolid"
		}
	},
	graveSpacesDialogBoxContent : "<a href=\"CMSSearchResult.html?serialNumber=${SrchNum}\" target=\"_top\"><b>${SrchNum}</b><hr></a><b>Interred Name: </b>${Interred_F} ${Interred_L}<br><b>Owner Name: </b>${Owner_1}<br><b>Cemetery Name: </b>${Cem_Name}",
	selectedGraveSpacesSymbolFeatures : {
		"color" : [0, 0, 255, 180],
		"size" : 9,
		"angle" : -30,
		"xoffset" : 0,
		"yoffset" : 0,
		"type" : "esriSMS",
		"style" : "esriSMSCircle",
		"outline" : {
			"color" : [0, 0, 0, 255],
			"width" : 1,
			"type" : "esriSLS",
			"style" : "esriSLSSolid"
		}
	},
	selectedGraveSpacesDialogBoxContent : "<b>${SrchNum}</b><hr><b>Interred Name: </b>${Interred_F} ${Interred_L}<br><b>Owner Name: </b>${Owner_1}<br><b>Cemetery Name: </b>${Cem_Name}",
	cemeteryBoundarySymbolFeatures : {
		"color" : [150, 150, 150, 0.5],
		"outline" : {
			"color" : [0, 0, 0, 255],
			"width" : 1,
			"type" : "esriSLS",
			"style" : "esriSLSSolid"
		}
	}
};

