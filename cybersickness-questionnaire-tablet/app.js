(function () { // BEGIN LOCAL_SCOPE
var AppUi = Script.require('appUi');

var ui;
function startup() {
    ui = new AppUi({
        buttonName: "SURVEY", // The name of your app
		home: Script.resolvePath("app.html"), // The path to your app's UI
		graphicsDirectory: Script.resolvePath("https://missouri.box.com/shared/static/h3rtbu163x2t5te6sftqdc3c7vx7drck.png") // The path to your button icons
    });
}
startup();
}()); // END LOCAL_SCOPE