require(["dojo/dom", "dojo/on", "esri/tasks/query", "esri/tasks/QueryTask", "dojo/domReady!"], function(dom, on, Query, QueryTask) {

	var queryTask = new QueryTask(properties.graveSpacesLayer);

	var query = new Query();
	query.returnGeometry = false;
	query.outFields = ["Cem_Name", "Interred_L", "Interred_F", "Owner_1", "Owner_2", "Section", "PlotNum", "SpaceNum", "SrchNum", "VET"];

	query.where = "SrchNum = '" + getQueryVariable("serialNumber") + "'";
	queryTask.execute(query, showResults);

	function showResults(results) {
		var resultCount = results.features.length;
		for (var i = 0; i < resultCount; i++) {
			var resultItems = [];
			var featureAttributes = results.features[i].attributes;
			for (var attr in featureAttributes) {
				switch (attr) {
				case "Cem_Name":
					display_attr = "Cemetery Name";
					break;
				case "Interred_L":
					display_attr = "Interred Last Name";
					break;
				case "Interred_F":
					display_attr = "Interred First Name";
					break;
				case "Owner_1":
					display_attr = "Owner 1";
					break;
				case "Owner_2":
					display_attr = "Owner 2";
					break;
				case "PlotNum":
					display_attr = "Plot Number";
					break;
				case "SpaceNum":
					display_attr = "Space Number";
					break;
				case "SrchNum":
					display_attr = "Search Number";
					break;
				case "VET":
					if (featureAttributes[attr] == 'Y') {
						display_attr = "****VETERAN****";
					} else {
						display_attr = "";
					};
					break;
				default:
					display_attr = attr;
				}
				if (attr == "VET") {
					resultItems.push("<b>" + display_attr + "<br>");
				} else {
					resultItems.push("<b>" + display_attr + ":</b>  " + featureAttributes[attr] + "<br>");
				};
			}
			resultItems.push("<br>");
		}
		dom.byId("output").innerHTML = resultItems.join("");
	}

	source = "CMSMap.html";
	source = source + "?serialNumber=" + getQueryVariable("serialNumber");
	document.getElementById("map").src = source;
});
