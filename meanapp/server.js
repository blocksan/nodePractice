var express=require('express');
var app=express();
var mongojs=require('mongojs');
var db=mongojs('contactlist',['contactlist']);
app.use(express.static(__dirname+"/public"));  //for giving the common path for html,css static pages from express module

		console.log(__dirname);

		app.get('/contactlist',function(err,res){   //receiving request from the client side using angular
		console.log("request received from the client"); //consoling the request just to check
			
		db.contactlist.find(function(errcon,docs){   //docs is the data sent from the mongodb server

			console.log(docs); 
			res.json(docs);

		});


		/*person= [{
		               name: "sandeep",
		               email: "sandyghosh555@gmail.com",
		               phone:"12012012"
		            },
		            {
		               name: "tush",
		               email: "tush@gmail.com",
		               phone:"87687687"
		            }
		             ];*/          //dummy data just for checking
		//var contactlist=person;    //storing person array in another variable
		//res.json(contactlist);		// converting contactlist array into json array type data so that it can be readable by the angular controller

});

 /*app.get('/',function(req,res){
 	res.send("from meanapp server");
 });*/    //just use for rerouting from url using express module

 app.listen(3000);
 console.log("server runnning meanapp");