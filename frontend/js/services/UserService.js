foundtruck.service('UserService', function($http) {
	this.doLogin = function(userData) {
		var httpRequest = $http(
			{
				method  : 'POST',
	        	url     : '../backend/public/index.php/login',
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
	        	url     : '../backend/public/index.php/user/create',
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

	this.update = function(user) {
		var httpRequest = $http(
			{
				method  : 'POST',
	        	url     : '../backend/public/index.php/user/update',
	       		data    :  JSON.stringify(user),  
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
	};
});