var casper = require("casper").create();
var Url = "http://staging548.curationcorp.com";
var mouse = require("mouse").create(casper);
var viewport = {width: 1280, height: 1024};
var roles = [
{"email":"jon.a@adappt.co.uk","password":"Polka123Polka","role":"admin"},
{"email":"level1@example.com","password":"password","role":"level1"},
{"email":"sha-testing@gmail.com","password":"Sharmila223","role":"level2"}];

casper.start(Url, function() {
	console.log("Website found. Testing User Roles...");
});

/**
* Iteration for users roles
*/

roles.forEach(function(role){
	casper.thenOpen(Url,function(){
		console.log("loging into CurationCorp - ",role.role)
		this.fill(".signin",{
			email:role.email,
			password:role.password		
		},true);
		this.wait(10000,function(){
			if(this.getCurrentUrl() != Url + "/signin") {
				console.log("login success, Current Url is ",this.getCurrentUrl());
			//	if (this.exists('a[tooltip="Market Place"]')) console.log("Dashboard exists");
			//	else console.log("login Unsuccessful");
				var _sUrl = 'screens/' + role.role + " Market.png";
				this.viewport(viewport.width,viewport.height);
				if (this.click(".menu-title")){
					casper.options.waitTimeout = 5000;
					console.log("click over DASHBOARDS exists");
					
					this.capture(_sUrl,{
						top:0,
						left:0,
						width:viewport.width,
						height:viewport.height
					})
					console.log("screenshot captured",_sUrl);
				}
				else console.log("cant't be clicked");
				}
				this.click('a[href="/signout"]');
				this.wait(2000,function(){
				console.log("Logging Out", role.role);
			});
		});
	});
});
casper.run()