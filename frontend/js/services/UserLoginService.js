foundtruck.factory('UserLoginService', function($http) {
	this.doLogin = function(userData){
		httpRequest = $http(
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
});