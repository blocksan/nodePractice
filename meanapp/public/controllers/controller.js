var app=angular.module('app',[]);
	app.controller('studentController', function($scope,$http) {  //using http module to send a request to server
		
		//refresh function
		var refresh=function()
		{	        											  	//making the refresh function so that it can be called whenever new data is inserted or updated to change the front-view data
			$http.get('/contactlist').success(function(response){   //sending the route url to node server to request data and data received in json format
			  //console.log('data received from the server');       //just consoling just to check 
				$scope.person=response;      				        //storing the received data into person array
				$scope.contact="";        						   //this is use to set input boxes to blank
			});
		};
		refresh();           									   //calling the refresh function onload to load the data
	
	//addcontact function 
		$scope.addContact=function(){
			//console.log($scope.contact);
			$http.post('/contactlist',$scope.contact).success(function(response)
			{  														 //using http.post module to post data to the node server
				/*console.log(response);*/  						//viewing the newly inserted result
				refresh();
			})
		};

	//removecontact function
		$scope.removeMe=function(id){
			//console.log(id);
			$http.delete('/contactlist/'+id).success(function(response){  
																	 //using http.post module to post data to the node server
				/*console.log(response);*/  						//viewing the newly inserted result
				refresh();
			});
		};

	//editcontact function
		$scope.editMe=function(id){
			console.log(id);
			$http.get('/contactlist/'+id).success(function(response)
			{  								
				$scope.contact=response;							//for updating the input box with selected ID data
			})
		};
	//update function
		$scope.updateContact=function(){
			$http.put('/contactlist/'+$scope.contact._id,$scope.contact).success(function(response){
				refresh();
			});
		}
	//clear input boxes
		$scope.clearInput=function(){
			$scope.contact="";
		}
		
});   																//end of controller function
	   