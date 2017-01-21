foundtruck.service('UserService', function($http) {
	this.doLogin = function(userData) {
		var httpRequest = $http(
			{
				method  : 'POST',
	        	url     : '../backend/public/index.php/user/login',
	       		data    :  JSON.stringify(userData),  
	       		dataType: 'json'
  	    	}
  	    )
  	    .success(function(data) {
		 	return data;
		})
		.error(function(error) {
		 	return error;
		});
		
  	    return httpRequest;
	}

	this.register = function(userData) {
		var httpRequest = $http(
			{
				method  : 'POST',
	        	url     : '../backend/public/index.php/user/register',
	       		data    :  JSON.stringify(userData),  
	       		dataType: 'json'
  	    	}
  	    )
  	    .success(function(data) {
		 	return data;
		})
		.error(function(error) {
		 	return error;
		});
		
  	    return httpRequest;
	}
});