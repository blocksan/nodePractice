var express=require('express');

var app=express();
//add some standard express middleware


app.get('/',function(req,res){    //requesting to the root directory of the project
res.send('hello express');
});
app.listen(3000,function(err,res){
	console.log('listening on port 3000 with express');
});