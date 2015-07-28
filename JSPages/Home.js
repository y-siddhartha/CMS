require(["dojo/dom", "dojo/on", "esri/tasks/query", "esri/tasks/QueryTask", "dojo/domReady!"], function(dom, on, Query, QueryTask) {

	var queryTask = new QueryTask(properties.graveSpacesLayer);

	var query = new Query();
	query.returnGeometry = false;
	query.outFields = ["Cem_Name", "Interred_L", "Interred_F", "Owner_1", "Owner_2", "Section", "PlotNum", "SpaceNum", "SrchNum", "VET"];
	var searchByValue = dom.byId("searchBy").value;
	var searchKeyWord = dom.byId("searchKeyword").value;

	on(dom.byId("execute"), "click", execute);

	function execute() {

		switch (dom.byId("searchBy").value) {
		case "interredFirstName":
			query.where = "Interred_F like '" + dom.byId("searchKeyword").value + "%'";
			break;
		case "interredLastName":
			query.where = "Interred_L like '" + dom.byId("searchKeyword").value + "%'";
			break;
		case "ownerName":
			query.where = "Owner_1 like '" + dom.byId("searchKeyword").value + "%'";
			break;
		default:
			query.where = "Interred_F like '" + dom.byId("searchKeyword").value + "%'";
			break;
		}

		if (dom.byId("searchKeyword").value.length > 0)
			queryTask.execute(query, showResults);
		else
			dom.byId("output").innerHTML = "Please, do not leave the field blank!!";

		function showResults(results) {
			var resultCount = results.features.length;

			if (resultCount < 1) {
				dom.byId("output").innerHTML = "Sorry! No results found.";
			} else {
				dom.byId("output").innerHTML = "";
			}

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
					if (attr == "SrchNum") {
						// resultItems.push("<a href=\"SearchResultMap.html?serialNumber="+featureAttributes[attr]+"\">" + display_attr + ":</b>  " + featureAttributes[attr] + "<br>");
						resultItems.push("<a href=\"CMSSearchResult.html?serialNumber=" + featureAttributes[attr] + "\">" + display_attr + ":</b>  " + featureAttributes[attr] + "<br>");
					} else {
						if (attr == "VET") {
							resultItems.push("<b>" + display_attr + "<br>");
						} else {
							resultItems.push("<b>" + display_attr + ":</b>  " + featureAttributes[attr] + "<br>");
						};
					};

				}

				resultItems.push("<br>");
				var info = document.getElementById('output');
				var ele = document.createElement("tr");
				ele.setAttribute("id", "info" + i);
				ele.setAttribute("class", "inner");
				ele.innerHTML = resultItems.join("");
				output.appendChild(ele);
			}

			pager.init();
			pager.showPage(1);
			pager.showPageNav(1);
		}

	}

});

