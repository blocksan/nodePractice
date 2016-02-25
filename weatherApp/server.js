var express=require('express');
var mongojs=require('mongojs');
var bodyparser=require('body-parser');
var app=express();

//to fix the directory
app.use(express.static(__dirname+"/"));

//to parse the JSON data receive from the Angular
app.use(bodyparser.json());  

//to see the current directory we working
console.log(__dirname);

//to show the index page
app.get('/',function(req,res){
	console.log("index page");
});

//to make the connection
app.listen(4000);
console.log("server start at 4000 port");

