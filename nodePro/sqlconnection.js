//performing crud operations  CREATE READ UPDATE DELETE

var mysql =require('mysql');
var con = mysql.createConnection({
	host:"localhost",
	user:"root",
	password:"",
	database:"nodedata"
});

//connecting to the database

con.connect(function(err){
	if(err){
	console.log("error in connection");
	return;
	}	
console.log('connection established');
});

//executing the query for fetching the data

con.query('SELECT * FROM nodetable',function(err,rows)
{
  if(err) throw err;
  		console.log('Data received from Db:\n');
  	    console.log('Sno   '+' Name\n');
	  for(var i=0;i<rows.length;i++)
	  {
	  	console.log(rows[i].sno+' ==> '+rows[i].name);
	  };

  //console.log(rows);   //for showing the resultant output of the database in the json format 
});

//query for inserting into the database 
var query={sno:'',name:'indu'};
con.query('INSERT INTO nodetable SET ?',query,function(err,res)
{
	if(err) throw err;
	console.log('last effected rows for insertion  '+res.affectedRows);  // used to show the last affected row
});

//query to update the database
con.query('UPDATE nodetable SET name = ? WHERE sno = ?',['pooja',2],function(err,result)
{
	if(err) throw err;
	console.log(' last effected row for updation   '+result.affectedRows);
});

//query to delete the data from the database
con.query('DELETE from nodetable where name = ?',['indu'],function(err,result){
	if(err) throw err;
	console.log('last effected row for deletion '+result.affectedRows);
});

//ending the connection
con.end();