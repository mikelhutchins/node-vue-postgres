
var pg = require("pg");
var dbclient = null;
module.exports = function(){
	var conString = "pg://postgres:Buddy1sH2nds0m3@localhost:5432/dvdrental";
	dbclient = new pg.Client(conString);
	dbclient.connect();
	};
return dbclient;
/*var query = dbclient.query("SELECT * FROM city ORDER BY city_id limit 10");
query.on("row", function (row, result) {
    result.addRow(row);
});
query.on("end", function (result) {
    console.log(JSON.stringify(result.rows, null, "    "));
    dbclient.end();
});*/