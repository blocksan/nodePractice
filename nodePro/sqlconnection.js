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


/*CREATE DEFINER=`root`@`localhost` PROCEDURE `get_all_nametable`() BEGIN SELECT name from nodetable; END
*/   // created stored procedure to get data from nodejs

con.query('CALL get_all_nametable()',function(err,rows){
  if (err) throw err;

  console.log('Data received from Db:\n');
  //console.log(rows);   // it will return all the data in json format along with extra details like updated rows , effected rows

  for (var i = 0; i < rows[0].length; i++) 
  {
  	console.log(rows[0][i].name);   // this is used to iterate over the returned result set which is at 0th index location and other details at 1st 
	};
});   

//procedure with IN parameter 
/*CREATE DEFINER=`root`@`localhost` PROCEDURE `get_selected_name`( in employee_id int ) BEGIN SELECT name FROM nodetable where sno = employee_id; END*/
con.query('CALL get_selected_name(2)',function(err,res){
	if(err) throw err;
	console.log(' DATA selected from In procedure');
	//console.log(res);  // return the whole data set in form of json therefor need to get particular value from indexing
	console.log(res);
});	
//ending the connection
con.end();