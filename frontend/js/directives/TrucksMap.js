foundtruck.directive('trucksMap', function() {
	return {
		restrict: 'E',
		template: '<div id="googleMap" class="col-md-12 col-xs-12" style="padding:0;height:592px;"></div>',
		controller: 'TrucksMapController',
		link: function(scope, element, attrs, TrucksMapController) {
			// Creates map and set on view
			TrucksMapController.loadMap();
		}
	}
});