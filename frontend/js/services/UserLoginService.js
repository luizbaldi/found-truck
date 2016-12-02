foundtruck.factory('UserLoginService', function($http) {
	var httpRequest = $http.get('https://api.myjson.com/bins/2f557')
		.success(function(data) {
			return data;
		})
		.error(function(error) {
			return error;
		});

	return httpRequest;
});