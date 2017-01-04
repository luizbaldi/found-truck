foundtruck.service('UtilService', function() {
	
	this.getRandomNumber = function(min, max) {
		return Math.random() * (max - min) + min;
	}

});