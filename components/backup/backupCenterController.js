angular.module('myApp1').controller('BackupCenterController', function ($scope, $route, dataService, cm_dataService, $routeParams) {//not cascading style ; one controller one js file; good for long js file/long controller logic; this page's code is much more manageable, small lines
    $scope.message = "backup center: Trello";
    $scope.latestsheetTitle = "to be created...";
    $scope.queryParams = $routeParams; //query strings dump
    //trello token logic begin
    $scope.tokenTrello = $routeParams.token; //$location.path();    //http://localhost:17549/TrelloDash.html#/backupcenter&token=ce7f4ad12da4569579e0b0aa3e92a914185bbfa0e43c62cbca38b40811bcae7e //http://localhost:17549/TrelloDash.html#/backupcenter
    
    if (typeof $scope.tokenTrello === 'undefined') { //javascript handle/catch error example; use this syntax 
        $scope.TrelloBtnAfterToken = true;
        //no token, show trello login btn
    }
    else {
        $scope.TrelloBtnAfterToken = false; //yes token, don't show trello login btn
    }
    //local storage set by trello 
    var trello_token = localStorage.getItem("trello_token");
    //if (typeof trello_token === 'undefined') {
    if(!trello_token){
        //not auth yet
        $('#TrelloAuthBtn').show();//show btn//temp fix, ng-show doesn't work
        $scope.TrelloBtnAfterToken = true;
    }
    else {
        $scope.tokenTrello = trello_token;//assign token to scope 
        //hide the trello auth btn;//temp fix, ng-show doesn't work
        $scope.TrelloBtnAfterToken = false;
        $('#TrelloAuthBtn').hide();//temp fix, ng-show doesn't work
    }
    //trello token logic end

    //better UX? auto auth vs btn click; use btn click for popup/redirect, be aware of the browser blocking the popup for the login  be aware of browser blocks popups and user wouldn't know why it's not working...
    //log in trello and do a test read
    $scope.authorizeTrelloBtn = function authorizeTrello() {
        //trello api on success or error 
        var successBoards = function (successMsg) {
            //alert(successMsg[0].name);
            console.log(successMsg);
            $scope.trelloBoards = { boardsResponse: successMsg };
            $scope.TrelloBtnAfterToken = false;
            $('#TrelloAuthBtn').hide();//temp fix, ng-show doesn't work
            //alert($scope.TrelloBtnAfterToken);
            $scope.$apply();
            return ({ boardsResponse: successMsg });
        };
        var errorBoards = function (errorMsg) {
            console.log(errorMsg);
            $scope.trelloBoards = { boardsResponse: errorMsg };
            $scope.$apply();
            return ({ boardsResponse: errorMsg });;
        };   //https://developers.trello.com/clientjs //ref: https://developers.trello.com/get-started/start-building
        var authenticationSuccess = function () { console.log("Successful authentication"); var TrelloURI = "/member/me/boards"; Trello.get(TrelloURI, successBoards, errorBoards); };
        var authenticationFailure = function () { console.log("Failed  authentication"); };
        console.log("logging in...");
        Trello.authorize({
            type: "popup",//redirect //auto popup is going to be blocked but btn to popup might be fine
            name: "Backup with Google Drive Application",
            persist: true,
            scope: {
                read: true,
                write: true
            },
            expiration: "never",
            success: authenticationSuccess,
            error: authenticationFailure
        });
        console.log("logged in???");
    };

    //login trello
    $scope.loginTrelloBtnClick = function loginTrello() {
        cm_dataService.loginTrello();
        console.log("work finished");
    }    //log in to trello: move trello lib call to a service js file so only google client js is hard to move out due to the auto ajax loading mechimism it has both angularjs and gapi is dynamic injecting
    //read trello
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

    //global variable but limited in angular controller level, so not too bad?
    var arrayBoardID = [];
    var arrayListIDs = [];
    //repeat array processing in one coding block 
    function handleArrayProcessingGeneric(successMsg,type1) {
        var array2DLists = [];
        var arrayColumnNameList = [];
        if (successMsg.length > 0) {
            for (i = 0; i < successMsg.length; i++) {
                var row = successMsg[i];
                var array1D = [];

                for (key in row) {
                    if (i == 0) {
                        arrayColumnNameList.push((key)); //for column name
                    }
                    if (type1 == "Boards" && key == "id") {
                        arrayBoardID.push((row["id"]));//to retrieve a list of board ids for calling lists 
                    }
                    else if (type1 == "Lists" && key == "id") {
                        arrayListIDs.push((row["id"])); //to retrieve list IDs for calling cards per list id 
                    }
                    array1D.push(JSON.stringify(row[key])); //for values 
                }
                if (i == 0) {
                    array2DLists.push(arrayColumnNameList);
                }

                array2DLists.push(array1D);

            }
        } else {
            //appendPre('No data found.');
        }
        return array2DLists;
    }
    
    //$scope.readSheetBtnClick = commonService.readSheet($scope.latestSheetID); //use common services for btn click functions
    function genericGAPIWrapper(array2DCards,type1) {
        var resourceToGoogle1 = {
            "range": type1 + "!A1:Z700",//update the numbers here for more rows/records.
            "majorDimension": "ROWS",
            "values": array2DCards //make this an array obj to pass in
        };
        var restRequest = gapi.client.request({
            'path': 'https://sheets.googleapis.com/v4/spreadsheets/' + $scope.latestSheetID + '/values/'+type1 + '!A1:Z700?valueInputOption=USER_ENTERED',
            'method': 'PUT',
            'body': resourceToGoogle1,
            'callback': cm_dataService.writeResponse
        });
    }
    
    function updateSheet(response) {
        
        $scope.latestSheetID = response.spreadsheetId;
        $scope.latestsheetURL = "https://docs.google.com/spreadsheets/d/" + response.spreadsheetId;
        $scope.latestsheetTitle = "here";
        //how to refresh the page to get this scope update    ref: http://www.jeffryhouser.com/index.cfm/2014/6/2/How-do-I-run-code-when-a-variable-changes-with-angularjs    
        $scope.showReadBtn = true;
        $scope.$apply();

        //move to a function
        var resourceTrello = "";
        var array2DLists = [];
        //success of boards
        var success = function (successMsg) {            
            //sheet range: sheet tab and range
            //sheet id 
            var array2D = handleArrayProcessingGeneric(successMsg,"Boards"); //refactoring: move the array processing to its own func; very long lines 
            //todo: make the range dynamic by reading the array length and translate from number to A-Z           
           
            if ($scope.latestSheetID) { //only make the call when the sheetID is present 
                //boardsGAPIWrapper(array2D); //refactoring, move out rep gapi code 
                genericGAPIWrapper(array2D, "Boards");
                //insert lists data
                //when inserting the array is still empty not finishing reading from trello, timing issue js timing issue due to its async nature
            }
            else {
                console.log("missing sheet ID");
            }
            //read lists 
            // use math diagrams to help understanding JS array and push function, push an array into an array, then it's a 2-D array vs appending one array to one array then still 1D array: 
           
            // Make sure the callback is a function​               
            var resource2 = "";           
            //var arrayCardID = [];
            var array2DLists = [];
            //$scope.boardID = $routeParams.boardID //$location.path();
            //trello api on success or error 
            var successLists = function (successMsg, var11,var12) {          
                //console.log(var11,var12);
                var errorCards = function (errorMsg) {
                    console.log(errorMsg);
                    return ({ boardsResponse: errorMsg });;
                };
                var array2DCards = [];
                //chaining: get boards on success, insert boards and call lists per board id-->get lists on success, insert lists and call cards per list id-->get cards on success, insert cards
                var successCards = function (successMsg, var11) {
                    
                    array2DCards = array2DCards.concat(handleArrayProcessingGeneric(successMsg,"Cards"));

                    //todo: how to avoid redudant calls and only call the last one?? cannot inject a variable due to using trello client.js and it's a remote file, unless download it and modify it
                    //cardsGAPIWrapper(array2DCards);
                    genericGAPIWrapper(array2DCards, "Cards");
                    return array2DCards;
                };

                array2DLists = array2DLists.concat(handleArrayProcessingGeneric(successMsg,"Lists"));
                    
                //todo: how to avoid redudant calls and only call the last one?? cannot inject a variable due to using trello client.js and it's a remote file, unless download it and modify it
                //listsGAPIWrapper(array2DLists);
                genericGAPIWrapper(array2DLists, "Lists");
                //read cards 
                for (j = 0; j < arrayListIDs.length; j++) {
                    var TrelloURI = "/lists/" + arrayListIDs[j] + "/cards";
                    Trello.get(TrelloURI, successCards, errorCards);
                }
                return array2DLists;
            };

            var errorLists = function (errorMsg) {
                console.log(errorMsg);
                    
                return ({ boardsResponse: errorMsg });;
            };

            //read lists 
            for (i = 0; i < arrayBoardID.length; i++) {
                var TrelloURI = "/boards/" + arrayBoardID[i] + "/lists";
                Trello.get(TrelloURI, successLists, errorLists);
            }
           
            return (successMsg);
        };

        var error = function (errorMsg) {
            console.log(errorMsg);
            return (errorMsg);
        };
        //re log in again to get the token even tho it's already in the localstorage due to trello client.js library issue... or don't use its closure just call normal APIs ajax 
        //don't know how trell client.js somehow doesn't get token unless just got token so do a rep auth login but with interactive false which is supposed to get from local storage so maybe it does not even have an actual ajax call
        Trello.authorize({
            type: "popup",//redirect //auto popup is going to be blocked but btn to popup might be fine
            name: "Backup with Google Drive Application",
            persist: true,
            interactive: false,
            scope: {
                read: true,
                write: true
            },
            expiration: "never",
            success: console.log("retrieve trello token from the local storage"),
            error: ""
        });
        var TrelloURI = "/member/me/boards"
        Trello.get(TrelloURI, success, error);
    }

    //$scope.delSheetBtnClick    
});
