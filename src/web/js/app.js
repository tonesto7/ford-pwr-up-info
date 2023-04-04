// Defines the main angular site instancelet authenticated = false;
let mainApp = angular.module("mainApp", ["ui.bootstrap"]);

$(window).on("load", () => {
    console.log("Document Ready...");
    const appleDevice = /iPad|iPhone|iPod|Mac OS/.test(navigator.userAgent) && !window.MSStream;
    const appleDevice2 = /iPad|iPhone|iPod|Mac OS/.test(navigator.userAgentData) && !window.MSStream;
    if (appleDevice || appleDevice2) {
        console.log("Apple Device Detected...");
        $("body").addClass("apple-device");
    }

    window.onerror = function (message, source, lineNumber, colno, error) {
        console.warn(`UNHANDLED ERROR: ${error.stack}`);
    };
});

mainApp.controller("PwrUpInfoController", [
    "$rootScope",
    "$scope",
    "$http",

    function ($rootScope, $scope, $http) {
        $scope.pwrUpData = null;

        $scope.LoadData = async () => {
            try {
                $scope.pwrUpData = (await $http.get("https://raw.githubusercontent.com/tonesto7/ford-pwr-up-info/main/data.json")).data;
            } catch (err) {
                console.log(`LoadData Exception: `, err);
            }
            console.log("pwrUpData: ", $scope.pwrUpData);
            $scope.$apply();
        };

        $scope.formatTheDate = (dt) => {
            console.log("formatTheDate: ", dt);
            return new Date(dt).toLocaleString();
        };

        $scope.LoadData();
    },
]);
