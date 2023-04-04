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

mainApp.service("GetPwrUpData", [
    "$http",
    function ($http) {
        this.LoadData = async () => {
            try {
                return (await $http.get("https://raw.githubusercontent.com/tonesto7/ford-pwr-up-info/main/data.json")).data;
            } catch (err) {
                console.log(`LoadData Exception: `, err);
                return null;
            }
        };
    },
]);

mainApp.controller("PwrUpInfoController", [
    "$rootScope",
    "$scope",
    "GetPwrUpData",
    async function ($rootScope, $scope, GetPwrUpData) {
        $scope.pwrUpData = await GetPwrUpData.LoadData();
        console.log("pwrUpData: ", $scope.pwrUpData);
        $scope.$apply();
    },
]);
