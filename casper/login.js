/** Testing Login access for user roles
 */
var casper = require("casper").create();
var Url = casper.cli.args[0] || "http://staging548.curationcorp.com";
var viewport = {
    width: 1280,
    height: 1024
};
var roles = require('./roles.json');

casper.start(Url, function() {
    console.log("Website found. Testing User Roles...");
});

/**
 * Iteration for users roles
 */

roles.forEach(function(role) {
    casper.thenOpen(Url, function() {
        console.log("loging into site - ", role.role)
        this.fill(".signin", {
            email: role.email,
            password: role.password
        }, true);
        this.wait(2000, function() {
            if (this.getCurrentUrl() != Url + "/signin") {
                console.log("login success, Current Url is ", this.getCurrentUrl());
                var _sUrl = 'screens/' + role.role + "-login.png";
                this.viewport(viewport.width, viewport.height);
                console.log("Taking Screenshot");
                this.wait(3000, function() {
                    this.capture(_sUrl, {
                        top: 0,
                        left: 0,
                        width: viewport.width,
                        height: viewport.height
                    });
                    console.log("Screenshot Saved at", _sUrl);
                    this.click('a[href="/signout"]');
                    this.wait(2000, function() {
                        console.log("Logging Out", role.role);
                    });
                })
            } else console.log("login Unsuccessful");


        });
    });
});

/* Run the script */
casper.run();