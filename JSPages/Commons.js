function getQueryVariable(variable) {
	var query = window.location.search.substring(1);
	var vars = query.split("&");
	for (var i = 0; i < vars.length; i++) {
		var pair = vars[i].split("=");
		if (pair[0] == variable) {
			return pair[1];
		}
	}
}

function switchToMapView() {
	serialNumber = getQueryVariable("serialNumber");
	var element = document.getElementById("MapView");
	if (serialNumber === undefined || serialNumber === null) {
		element.innerHTML = '<a href=CMSMap.html>Swtich to Map View</a>';
	} else {
		element.innerHTML = '<a href=CMSMap.html?serialNumber=' + serialNumber + '>Swtich to Map View</a>';
	}
}


function switchToAerialView() {
	serialNumber = getQueryVariable("serialNumber");
	var element = document.getElementById("AerialView");
	if (serialNumber === undefined || serialNumber === null) {
		element.innerHTML = '<a href=CMSAerialMap.html>Switch to Aerial View</a>';
	} else {
		element.innerHTML = '<a href=CMSAerialMap.html?serialNumber=' + serialNumber + '>Swtich to Aerial View</a>';
	}
}


var pager = new Pager('output', 3, 'pager', 'pageNavPosition');

function Pager(tableName, itemsPerPage, pagerName, positionId) {
	this.tableName = tableName;
	this.itemsPerPage = itemsPerPage;
	this.pagerName = pagerName;
	this.positionId = positionId;
	this.currentPage = 1;
	this.pages = 0;
	this.inited = false;
	this.numbers = new Array(10);

	this.showRecords = function(from, to) {
		var table = document.getElementById(tableName);
		var rows = table.rows;
		// i starts from 1 to skip table header row
		for (var i = 0; i < rows.length; i++) {
			if (i < from || i > to)
				rows[i].style.display = 'none';
			else
				rows[i].style.display = '';
		}
	};

	this.showPage = function(pageNumber) {
		if (!this.inited) {
			alert("not inited");
			return;
		};

		if (this.isRedrawNeeded(pageNumber)) {
			var startPage = Math.floor((pageNumber - 1) * 0.1) * 10;
			this.showPageNav(startPage + 1);
		}

		var oldPageAnchor = document.getElementById(this.pagerName + 'pg' + this.currentPage);
		if (oldPageAnchor != null) {
			oldPageAnchor.className = 'pg-normal';
		}

		this.currentPage = pageNumber;
		var newPageAnchor = document.getElementById(this.pagerName + 'pg' + this.currentPage);
		if (newPageAnchor != null) {
			newPageAnchor.className = 'pg-selected';
		}

		var from = (pageNumber - 1) * itemsPerPage;
		var to = from + itemsPerPage - 1;
		this.showRecords(from, to);

		var pgNext = document.getElementById(this.pagerName + 'pgNext');
		var pgPrev = document.getElementById(this.pagerName + 'pgPrev');

		if (pgNext != null) {
			if (this.currentPage == this.pages)
				pgNext.style.display = 'none';
			else
				pgNext.style.display = '';
		}

		if (pgPrev != null) {
			if (this.currentPage == 1)
				pgPrev.style.display = 'none';
			else
				pgPrev.style.display = '';
		}
	};

	this.prev = function() {
		if (this.currentPage > 1)
			this.showPage(this.currentPage - 1);
	};

	this.next = function() {
		if (this.currentPage < this.pages) {
			this.showPage(this.currentPage + 1);
		}
	};

	this.init = function() {
		var rows = document.getElementById(tableName).rows;
		var records = (rows.length - 1);
		this.pages = Math.ceil(records / itemsPerPage);
		this.inited = true;
	};

	this.isRedrawNeeded = function(pageNumber) {

		for (var i = 0; i < this.numbers.length; i++) {
			if (this.numbers[i] == pageNumber) {
				return false;
			}
		}
		return true;
	};

	this.showPageNav = function(start) {
		if (!this.inited) {
			alert("not inited");
			return;
		}
		var element = document.getElementById(this.positionId);
		var loopEnd = start + 9;
		var index = 0;
		this.numbers = new Array(10);

		var pagerHtml = '<span onclick="' + this.pagerName + '.showPage(1);" class="pg-normal"></span>';

		pagerHtml += '<span id="' + this.pagerName + 'pgPrev" onclick="' + this.pagerName + '.prev();" class="pg-normal"> &#171 Prev </span>|';

		for (var page = start; page <= loopEnd; page++) {

			if (page > this.pages) {
				break;
			}
			this.numbers[index] = page;
			pagerHtml += '<span id="' + this.pagerName + 'pg' + page + '" class="pg-normal" onclick="' + this.pagerName + '.showPage(' + page + ');">' + page + '</span>';
			if (page != loopEnd) {
				pagerHtml += '|';
			}
			index++;
		}
		page--;
		if (this.pages > page) {
			pagerHtml += '<span class="regularDataBlue">...</span>';
		}

		pagerHtml += '<span id="' + this.pagerName + 'pgNext" onclick="' + this.pagerName + '.next();" class="pg-normal"> Next &#187;</span>';
		pagerHtml += '<span onclick="' + this.pagerName + '.showPage(' + this.pages + ');" class="pg-normal"></span>';

		element.innerHTML = pagerHtml;
	};
};

