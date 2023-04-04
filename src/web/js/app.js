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
    "$rootScope",
    function ($rootScope) {
        this.LoadData = async () => {
            return { data: "test" };
        };
    },
]);

mainApp.controller("PwrUpInfoController", [
    "$rootscope",
    "$scope",
    "GetPwrUpData",
    function ($rootScope, $scope, GetPwrUpData) {
        $scope.pwrUpData = GetPwrUpData.LoadData();
    },
]);
