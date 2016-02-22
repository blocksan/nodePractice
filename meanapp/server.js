var express=require('express');
var app=express();
var mongojs=require('mongojs');
var bodyparser=require('body-parser');

var db=mongojs('contactlist',['contactlist']);

app.use(express.static(__dirname+"/"));     //for giving the common path for html,css static pages from express module
app.use(bodyparser.json());                       //for parsing the JSON body of input boxes from the client side
	
		console.log(__dirname);					 //for printing the current directory path 

app.get('/contactlist',function(err,res){        //receiving request from the client side using angular

console.log("request received from the client"); //consoling the request just to check
			
db.contactlist.find(function(errcon,docs){       //docs is the data sent from the mongodb server

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
		             ];*/         			  //dummy data just for checking
		//var contactlist=person;  			  //storing person array in another variable
		//res.json(contactlist);		     // converting contactlist array into json array type data so that it can be readable by the angular controller

});

	//insert module into mongodb
		app.post('/contactlist',function(req,res){   			 //app.post method to use the post data from the angular client side
		//	console.log(req.body);              				//req.body is the data received from the client in JSON format and to parse its body we use bodyParser module
			db.contactlist.insert(req.body,function(err,doc){   //insert function for mongodb
				res.json(doc);  
			});
		});

	//delete module into mondodb
		app.delete('/contactlist/:id',function(req,res){
			var id = req.params.id;								//id is get from the URL and parsed as params.id 
			db.contactlist.remove({_id:mongojs.ObjectId(id)},function(err,doc){
				res.json(doc);
			});
		});

		/*app.update('/contactlist/:id',function(req,res){
			var id=req.params.id;
		});*/

		 app.get('/contactlist/:id',function(req,res){
		 	var id = req.params.id;								//id is get from the URL and parsed as params.id 
			db.contactlist.findOne({_id:mongojs.ObjectId(id)},function(err,doc){
				res.json(doc);
			});
		 });    //just use for rerouting from url using express module

		//update function where id is getting from the client and sending back the resultant result
		 app.put('/contactlist/:id',function(req,res){
		 	var id=req.params.id;
		 	db.contactlist.findAndModify(
		 		{
		 		query:
		 			{
		 				_id:mongojs.ObjectId(id)
		 			},
		 		update:
		 			{
		 				$set: {
		 						name:req.body.name,email:req.body.email,number:req.body.number
		 						}
		 			},
		 		new:true
		 		},
		 		function(err,doc)
		 		{
		 			res.json(doc);
		 		});
		 });
 app.listen(3000);
 console.log("server runnning meanapp");