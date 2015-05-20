/** Testing dashboard
 */

/* Initialize casper */
var casper = require("casper").create();
var Url = casper.cli.args[0] || "http://staging548.curationcorp.com";
var viewport = {
    width: 1280,
    height: 1024
};

/* Types of user roles */
var roles = require('./roles.json');

/* Initiate casper with the given url */
casper.start(Url, function() {
    console.log("Website found. Testing User Roles...");
});

/**
 * Iteration for users roles
 */

roles.forEach(function(role) {
    casper.thenOpen(Url, function() {
        console.log("logging into CurationCorp - ", role.role)
        this.fill(".signin", {
            email: role.email,
            password: role.password
        }, true);
        this.wait(5000, function() {
            if (this.getCurrentUrl() != Url + "/signin") {
                console.log("login success, Current Url is ", this.getCurrentUrl());
                if (this.exists('a[tooltip="Dashboards"]')) console.log("Dashboard exists");
                else console.log("login Unsuccessful");
                var _sUrl = 'screens/' + role.role + " Dashboard.png";
                this.viewport(viewport.width, viewport.height);
                if (this.click('a[tooltip="Dashboards"]')) {
                    console.log("click over DASHBOARDS exists");
                    this.capture(_sUrl, {
                        top: 0,
                        left: 0,
                        width: viewport.width,
                        height: viewport.height
                    })
                    console.log("screenshot captured", _sUrl);
                } else console.log("cant't be clicked");

                if (this.exists('a[tooltip="Market Place"]')) console.log("Market exists");
                var _sUrl = 'screens/' + role.role + " Market.png";
                this.viewport(viewport.width, viewport.height);
                if (this.click('a[tooltip="Market Place"]')) {
                    console.log("click over MARKET-PLACE exists");
                    this.capture(_sUrl, {
                        top: 0,
                        left: 0,
                        width: viewport.width,
                        height: viewport.height
                    })
                    console.log("screenshot captured", _sUrl);
                } else console.log("cant't be clicked");

                if (this.exists('a[tooltip="Settings"]')) console.log("Settings exists");
                var _sUrl = 'screens/' + role.role + " Settings.png";
                this.viewport(viewport.width, viewport.height);
                if (this.click('a[tooltip="Settings"]')) {
                    console.log("click over SETTINGS exists");
                    this.capture(_sUrl, {
                        top: 0,
                        left: 0,
                        width: viewport.width,
                        height: viewport.height
                    })
                    console.log("screenshot captured", _sUrl);
                } else console.log("cant't be clicked");

                if (this.exists('a[tooltip="Alerts Overview"]')) console.log("Alerts exists");
                var _sUrl = 'screens/' + role.role + " Alerts.png";
                this.viewport(viewport.width, viewport.height);
                if (this.click('a[tooltip="Alerts Overview"]')) {
                    console.log("click over ALERTS-OVERVIEW exists");
                    this.capture(_sUrl, {
                        top: 0,
                        left: 0,
                        width: viewport.width,
                        height: viewport.height
                    })
                    console.log("screenshot captured", _sUrl);
                } else console.log("cant't be clicked");

                if (this.exists('a[tooltip="Support"]')) console.log("Support exists");
                var _sUrl = 'screens/' + role.role + " Support.png";
                this.viewport(viewport.width, viewport.height);
                if (this.click('a[tooltip="Support"]')) {
                    console.log("click over SUPPORT exists");
                    this.capture(_sUrl, {
                        top: 0,
                        left: 0,
                        width: viewport.width,
                        height: viewport.height
                    })
                    console.log("screenshot captured", _sUrl);
                } else console.log("cant't be clicked");

                if (this.exists(".menu-title")) console.log("Menu exists");
                var _sUrl = 'screens/' + role.role + "main.js";
                this.viewport(viewport.width, viewport.height);
                if (this.click(".menu-title")) {
                    console.log("click over MENU-TITLE exists");
                    this.capture(_sUrl, {
                        top: 0,
                        left: 0,
                        width: viewport.width,
                        height: viewport.height
                    })
                    console.log("screenshot captured", _sUrl);
                } else console.log("cant't be clicked");
                this.click('a[href="/signout"]');
                this.wait(2000, function() {
                    console.log("Logging Out", role.role);
                });
            } else console.log("Login failed!");
        });
    });
});
casper.run();