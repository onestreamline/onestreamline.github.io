angular.module('myApp1').controller('BackupCenterController', function ($scope, $route, dataService, cm_dataService) {//not cascading style ; one controller one js file; good for long js file/long controller logic; this page's code is much more manageable, small lines
    $scope.message = "backup center";
    $scope.latestsheetURL="to be created..."
    $scope.loginTrelloBtnClick = function loginTrello() {
        cm_dataService.loginTrello();
        console.log("work finished");
    }    //log in to trello: move trello lib call to a service js file so only google client js is hard to move out due to the auto ajax loading mechimism it has both angularjs and gapi is dynamic injecting

    $scope.readBoardsBtnClick = function readBoards() {
        cm_dataService.readBoards();
        console.log("work finished");
    }      //$scope.readBoardsBtnClick = cm_dataService.readBoards(); //somehow fired before the btn is clicked, doesn't work this way, why? workaround: see below:
    
    //CRUD a google drive sheet     
    $scope.createSheetBtnClick = function createSheet() {
        var resourceToGoogle = cm_dataService.createSheet();
        //keep gapi.client here due to loading js sequence problems but moved most code to lib/common services etc. like the above. 
        var restRequest = gapi.client.request({
            'path': 'https://sheets.googleapis.com/v4/spreadsheets',
            'method': 'POST',
            'body': resourceToGoogle,
            'callback': updateSheet //once the sheet is created, call this function to read trello boards, and update the sheet 
        });
    }   
    //$scope.readSheetBtnClick = commonService.readSheet($scope.latestSheetID); //use common services for btn click functions
    function updateSheet(response) {

        //get the response spreadsheetId and call trello and put data in 
        console.log(response);
        console.log(response.spreadsheetId);
        $scope.latestSheetID = response.spreadsheetId;
        $scope.latestsheetURL = "https://docs.google.com/spreadsheets/d/" + response.spreadsheetId;
        //how to refresh the page to get this scope update    ref: http://www.jeffryhouser.com/index.cfm/2014/6/2/How-do-I-run-code-when-a-variable-changes-with-angularjs    
        $scope.showReadBtn = true;
        $scope.$apply();
        //move to a function
        var resourceTrello = "";
        var success = function (successMsg) {
            //var array12 = ["name", "desc", "url", "closed", "id", "prefs"];
            var array2D = [];
            var arrayColumnName = [];
            var today = "LastSync: " + new Date().toString();
            var dataLoadDate = [today];

            array2D.push(dataLoadDate);
            if (successMsg.length > 0) {
                for (i = 0; i < successMsg.length; i++) {
                    var row = successMsg[i];
                    var array1D = [];

                    for (key in row) {
                        //console.log(JSON.stringify(key));
                        if (i == 0) {
                            arrayColumnName.push((key));
                        }
                        //console.log(JSON.stringify(row[key]));
                        array1D.push(JSON.stringify(row[key]));
                    }
                    if (i == 0) {
                        array2D.push(arrayColumnName);
                    }

                    array2D.push(array1D);
                }
            } else {
                //appendPre('No data found.');
            }
            //sheet range: sheet tab and range
            //sheet id 
            var resourceToGoogle = {
                "range": "Boards!A1:U37",
                "majorDimension": "ROWS",
                "values": array2D, //make this an array obj to pass in
            };
            if ($scope.latestSheetID) { //only make the call when the sheetID is present 
                var restRequest = gapi.client.request({
                    'path': 'https://sheets.googleapis.com/v4/spreadsheets/' + $scope.latestSheetID + '/values/Boards!A1:U37?valueInputOption=USER_ENTERED',
                    'method': 'PUT',
                    'body': resourceToGoogle,
                    'callback': cm_dataService.writeResponse
                });
            }
            else {
                console.log("missing sheet ID");
            }
            return (successMsg);
        };

        var error = function (errorMsg) {
            console.log(errorMsg);
            return (errorMsg);
        };

        var TrelloURI = "/member/me/boards"
        Trello.get(TrelloURI, success, error);
    }
    //$scope.delSheetBtnClick
});
