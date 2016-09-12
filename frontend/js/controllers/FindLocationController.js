foundtruck.controller('FindLocationController', ['$scope', '$state', function($scope, $state) {

	$scope.changeView = function(viewName) {
		$state.go(viewName);
	};

	$scope.test = function() {
		alert('test');
	};

	$scope.findMe = function() {
		var latitude;
		var longitude;

	    if (window.navigator && window.navigator.geolocation) {
	        var geolocation = window.navigator.geolocation;
	        geolocation.getCurrentPosition(sucesso, erro);
	    } else {
	        alert('Geolocalização não suportada em seu navegador.');
	    }

	    function sucesso(posicao) {
	        console.log(posicao);
	        latitude = posicao.coords.latitude;
	        longitude = posicao.coords.longitude;
	        alert('Sua latitude estimada é: ' + latitude + ' e longitude: ' + longitude);
	    }

	    function erro(error) {
	        console.log(error);
	    }
	};

}]);