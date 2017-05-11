
var https = require('https');
var fs = require('fs');
var express = require('express');
var pg = require("pg");
var app =   express();
var port = 4545;
var sslkey = __dirname + '/ssl/keys/key.pem';
var sslcert = __dirname + '/ssl/certs/cert.pem';

//database connection --look at putting in module
var conString = "pg://postgres:Buddy1sH2nds0m3@localhost:5432/fdb";
var	dbclient = new pg.Client(conString);
	dbclient.connect();
//-----------------------------

// setup body parser
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
//-----------------------------

//routing
app.get('/goat',function(req,res) {
	var query = dbclient.query("SELECT * FROM nutr_def ORDER BY nutr_no");

	query.on("row", function (row, result) {
    	result.addRow(row);
	});

	query.on("end", function (result) {
    		//console.log(JSON.stringify(result.rows, null, "    "));
    	res.json(result.rows);
    //dbclient.end();
	});

});
//--------------------------------------

app.post('/sql-report', function(req, res) {
	var report_id = req.body.report_id;
	var query = "";
	var sql ="";


	switch(report_id) {
    case '1':
			//console.log("report 1");
        sql = "select \"NDC\",\"AHFS\",\"D\" as \"FORM\",\"GNN\" as \"GENERIC NAME\",\"MR1_LN\",\"MFG\",\"PD\",\"STR\" as \"STRENGTH\",\"STRUN\" as \"UNITS OF MEASURE\",\"GCN_SEQNO\" as \"GENERIC SEQNUM\" from fdb.mr5ndd where \"GNN\" like \'%ACETAMIN%\' order by \"GCN_SEQNO\""
        break;
    case '2':
		//console.log("report 2");
        sql = "select \"NDC\",\"AHFS\",\"D\" as \"FORM\",\"GNN\" as \"GENERIC NAME\",\"MR1_LN\",\"MFG\",\"PD\",\"STR\" as \"STRENGTH\",\"STRUN\" as \"UNITS OF MEASURE\",\"GCN_SEQNO\" as \"GENERIC SEQNUM\" from fdb.mr5ndd where \"GNN\" like \'%IBUPRO%\' order by \"GCN_SEQNO\""
        break;
    default:
				//console.log("default post");
        sql = "select \"NDC\",\"AHFS\",\"D\" as \"FORM\",\"GNN\" as \"GENERIC NAME\",\"MR1_LN\",\"MFG\",\"PD\",\"STR\" as \"STRENGTH\",\"STRUN\" as \"UNITS OF MEASURE\",\"GCN_SEQNO\" as \"GENERIC SEQNUM\" from fdb.mr5ndd where \"GNN\" like \'%DIPHEN%\' order by \"GCN_SEQNO\""
}

	//query the database and respond with json output
	query = dbclient.query(sql);

	query.on("row", function (row, result) {
			result.addRow(row);
	});

	query.on("end", function (result) {
			//console.log(JSON.stringify(result.rows, null, "    "));
			//dbclient.end();
			res.json(result.rows);

		//console.log(JSON.stringify(req.body));
    //console.log('req.body.name', req.body['name']);
});



});

//root folder for index.html
app.use('/', express.static(__dirname + '/public'));

//start https server
var server = https.createServer({
   key  : fs.readFileSync(sslkey),
   cert : fs.readFileSync(sslcert)
 },app).listen(port);
 console.log('App listening on port ' + port + '!');

//app.listen(port,function () {
//console.log('App listening on port ' + port + ' !');
//
