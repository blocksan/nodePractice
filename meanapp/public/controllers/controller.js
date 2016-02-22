var app=angular.module('app',[]);
	app.controller('studentController', function($scope,$http) {  //using http module to send a request to server
		$http.get('/contactlist').success(function(response){    //sending the route url to node server to request data and data received in json format
			console.log('data received from the server');   //just consoling just to check 
			$scope.person=response;        //storing the received data into person array

		});
		
	});
	   