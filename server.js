var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var path = require('path');

app.set("views", path.join(__dirname, "/"));
app.set("view_engine", "html").engine("html", function(path, options, fn) {
  if ("function" === typeof options) {
    fn = options;
    options = {};
  }
  return fs.readFile(path, "utf8", fn);
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express["static"](path.join(__dirname, "/")));

app.get("/",function(req,res){
	res.render('index.html');
})

app.listen(3000,function(){
	console.log("listening to port",3000);
})
