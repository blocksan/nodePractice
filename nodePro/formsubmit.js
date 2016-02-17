var mysql =require('mysql');
var fs=require('fs');
var http=require('http');
var formidable = require("formidable");
var util = require('util');
var mysql =require('mysql');
var con = mysql.createConnection({
	host:"localhost",
	user:"root",
	password:"",
	database:"nodedata"
});

var server=http.createServer(function(req,res){
	
	if (req.method.toLowerCase() == 'get') {
        displayForm(res);
    } else if (req.method.toLowerCase() == 'post') {
        processForm(req, res);
    }
});

//function to display form
function displayForm(res)
{	//console.log(res);
	fs.readFile('index.html',function(err,data){
		res.writeHead(200,
			{
			'Content-Type':'text/html',
			'Content-Length':data.length
			});
		res.write(data);
		res.end();
	});
}
function processForm(req,res)
{
	var form=new formidable.IncomingForm();

		form.parse(req,function(err,fields,files,insertFun)
		{
			res.writeHead(200,{'Content-Type':'text/plain'});
			res.write("recieved the data \n");
			res.end(util.inspect({
				fields:fields,
				files:files,
				insertFun:insertIntoData(fields)
			}));
			
		})
}
function insertIntoData(fields){
var query={sno:'',name:fields.nameField};
con.query('INSERT INTO nodetable SET ?',query,function(err,res)
{
	if(err) throw err;
	console.log('last effected rows for insertion  '+res.affectedRows);  // used to show the last affected row
});
return true;
}


server.listen(3000);
console.log('server listening');