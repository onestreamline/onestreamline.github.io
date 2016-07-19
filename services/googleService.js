$(document).ready(function () {
    // Your Client ID can be retrieved from your project in the Google
    // Developer Console, https://console.developers.google.com
    //var CLIENT_ID = '179800293581-sr0b4rh831k9u3k9ano34va85u35omu2.apps.googleusercontent.com';

    ////var SCOPES = ["https://www.googleapis.com/auth/spreadsheets.readonly"];
    //var SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];
    
    var oapi = window.oapi = window.oapi || {}; oapi.writeResponseToConsole1 = ("test my client domain closure; works with a string but how to do the function  "); (function () {
        //return {
        //    writeResponseToConsole1: writeResponseToConsole1
        //};
        //this.writeResponseToConsole1 = writeResponseToConsole1();
        //function writeResponseToConsole1() {
        //            //console.log(response);
        //            console.log("test my client domain closure  ");
        //        }
    })();
       
})



