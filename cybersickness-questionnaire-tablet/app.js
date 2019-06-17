(function () { // BEGIN LOCAL_SCOPE
var AppUi = Script.require('appUi');

var ui;
function startup() {
    ui = new AppUi({
        buttonName: "SURVEY", // The name of your app
		home: Script.resolvePath("app.html"), // The path to your app's UI
		graphicsDirectory: Script.resolvePath("https://boonakij.github.io/cybersickness-questionnaire-tablet/") // The path to your button icons
    });
}
startup();
}()); // END LOCAL_SCOPE