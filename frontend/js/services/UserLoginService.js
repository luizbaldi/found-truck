foundtruck.factory('UserLoginService', function($http) {
	var httpRequest = $http.get('json/userLoginData.json')
		.success(function(data) {
			return data;
		})
		.error(function(error) {
			return error;
		});

	return httpRequest;
});