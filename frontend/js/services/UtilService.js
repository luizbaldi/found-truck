foundtruck.service('UtilService', function() {
	
	this.getRandomNumber = function(min, max) {
		return Math.random() * (max - min) + min;
	}

	this.isEmpty = function(value) {
	    return (value === undefined || value == null || value.length <= 0 || value == "") ? true : false;
	}

	this.goBack = function() {
		window.history.back();
	};
});