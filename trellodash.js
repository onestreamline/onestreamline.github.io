//// Code goes here; now 3.0 here for TrelloDash.html
//// No Global variables 
//need this for newer version angularjs; module=assembly

//angular.module('myApp1', ['app.core', 'app.services'])
//http://stackoverflow.com/questions/18607010/accessing-factory-defined-in-another-module-in-angularjs

angular.module('myApp1', ['ngRoute', 'app1.core', 'app1.services', 'app1.servicesCommon']).factory("PathService", function ($location) {
    //some code...
    //move this to a service: sharing code between controllers via services 
    var showDivHome = false;
    //alert("service:"+$location.path());
    var path1 = {
        showDivHome: false,
        path: $location.path()
    };
    //Q: why when refresh the browser URL, it goes to the right if-else. otherwise, it doesn't seem like $location is working on getting the latesst URL
    //if ($location.path() == "/settings") {
    //    path1.showDivHome = false;
    //    path1.path = "1";
    //}
    alert("path service");
    return path1;

}).controller('MainController', function ($scope) { //controller: Main
    //alert("firing fr main controller");    
    //initial login these 2 linesthis line below to be commented out due to the timing issue, so need to move this line after a callback of the authentication; relaized by trial and error. took a while. initally found it by accident. 
    //Trello.get('/member/davelin9/boards', success, error);  
}).controller('NavController', function ($scope, $location) { //controller: Nav
    $scope.message = "hello nav";
    $scope.isActive = function (viewlocation) {
        return viewlocation === $location.path();
    };
}).controller('SettingsController', function ($scope, $route, dataService, cm_dataService) { //controller: settings; SettingsController
    //TO DO
    //To be able to reuse my functions; move functions out to where? best practice of AngularJS? move to factory 
    //alert("firing settings controller");
    //alert("about to auth");
    //oapi.writeResponseToConsole1("testtest");
    //$scope.checkAuth1 = googleService.checkAuth();
    // alert("sent auth but not necessary getting it back, the ajax call");
    $scope.message = "hello settings";
    $scope.pageSpec = "github api call. add a signin. turn on/off site features: developer mode,...";
    //swimdataService.writeSystemConsoleLog("test namespace style");
    //var myApp2 = angular.module('myApp2');
    
    //angular.module('myApp2', []).factory('writeService', function writeSystemConsoleLog(oMsg) {
    //    console.log(oMsg);
    //});//need this here before loading the dataservice.js file to create more factory services 
    //var myApp2 = angular.module('app1.services');//
    //var dataService = myApp2.dataService;
    cm_dataService.writeSystemConsoleLog("test namespace style");//access dataservice2
    dataService.writeSys("test namespace style");
    //manager user here and push it to localStorage for other pages to use
    var user = { //default: initial call. 2-way databinding.
        name: "dave",
        company: "onestreamline",
        location: "dallas",
        trello: "me" //use me over davelin9 so no hardcode  
    }; //the user here, I defined
    $scope.user = user; //binding to the page/AngularJS scope



    //submit btn: get git hub user
    $scope.submitFunctionGetUser = function () {
        //GitHub API
        var onUserComplete = function (response) { //can use either response or result 
            //the user here is from the http response json. 2-way data-binding
            $scope.user = response.data; //assign entire api returned json data to this object
        };
        var onError = function (reason) {
            $scope.error = reason; //raw error 
        };

        var companyName = this.user.company;
        dataService.getGitHubUser(companyName).then(onUserComplete, onError);
    };
    //to do: submit btn: get more api users such as google drive, trello, bitbucket

    //duplicate code from profile: how to use across different routes/controllers ??
    //localStorage     
    //what should be stored in localStorage? mayber user object 
    $scope.showDeveloperMode = false;//dafault mode 
    var currentDeveloperMode = localStorage.getItem("DeveloperMode");
    if (currentDeveloperMode) {
        if (currentDeveloperMode == "true")
            $scope.showDeveloperMode = true;
        else
            $scope.showDeveloperMode = false;
    }
    ////btn click
    $scope.goDevMode = function (state) {
        if (state == "off") {
            //localStorage.removeItem("DeveloperMode");
            localStorage.setItem("DeveloperMode", "false");
            //not elegant but works simply
            $route.reload();
        }
        else if (state == "on") {
            //localStorage.removeItem("DeveloperMode");
            localStorage.setItem("DeveloperMode", "true");
            $route.reload();
        }
    };

    //google service begin
    //retrieve user from localStorage vs from google drive sheet
    //

    try {
        var googleUserFrLocalStorage = JSON.parse(localStorage.getItem("GoogleUser")); // this is how you parse a string into JSON
        if (googleUserFrLocalStorage) {
            googleUser = googleUserFrLocalStorage;
            $scope.googleUser = googleUser;
            console.log("success reading from the local storage item");
        }
        else {
            console.log("null object; set user info to default");       //if no local google user; set a default object 
            var googleUser = { //default: initial call. 2-way databinding.
                name: "default",
                sheetURL: "default",
                sheetID: "default-default",
                sheetTab: "default",
                sheetTabName: "default",
                sheetRange: "default",
                CLIENT_ID: "default",
                SCOPES: "default",
                trello: "default" //use me over davelin9 so no hardcode  
            };
            //var googleUser = { //default: initial call. 2-way databinding.
            //    name: "dave1",
            //    sheetURL: "https://docs.google.com/spreadsheets/d/1IaRsdCfI5OMTHxmmxllGdW94o-CmijkhNE4q_76rASc/edit#gid=1540748221",
            //    sheetID: "1IaRsdCfI5OMTHxmmxllGdW94o-CmijkhNE4q_76rASc",
            //    sheetTab: "1540748221",
            //    sheetTabName: "1540748221",
            //    sheetRange: "1540748221",
            //    CLIENT_ID: "",
            //    SCOPES: "",
            //    trello: "me" //use me over davelin9 so no hardcode  
            //};
        }
    } catch (ex) {
        console.error(ex);
    }

    localStorage.removeItem("GoogleUser"); //remove the obj to update the obj later 
    console.log("remove a local storage item"); //to do: clean up the angularjs code: a lot of redudnt duplicate firing
    localStorage.setItem("GoogleUser", JSON.stringify(googleUser));
    //$scope.googleUser = googleUser; //binding to the page/AngularJS scope
    //bind user fr localstorage


    $scope.loginTrelloBtnClick = function loginTrello() {
        console.log("logging in");
        //ref: https://developers.trello.com/get-started/start-building
        //be aware of the browser blocking the popup for the login
        var authenticationSuccess = function () { console.log("Successful authentication"); }; //alert("Successful");
        var authenticationFailure = function () { console.log("Failed  authentication"); };
        Trello.authorize({
            type: "popup",
            name: "Backup with Google Drive Application",
            scope: {
                read: true,
                write: true
            },
            expiration: "never",
            success: authenticationSuccess,
            error: authenticationFailure
        });
        console.log("logged in???");
    }
    $scope.readBoardsBtnClick = function readBoards() {
        var resource2 = "";
        var success = function (successMsg) {
            //alert(successMsg[0].name);
            //console.log(successMsg);
            //$scope.trelloBoards = { boardsResponse: successMsg };
            //$scope.$apply();
            resource2 = successMsg;
            return (successMsg);
        };

        var error = function (errorMsg) {
            console.log(errorMsg);

            return ({ boardsResponse: errorMsg });;
        };
        //trello api: move to dataservice or trellodataservice
        //var TrelloURI = "/member/" + user.trello + "/boards"; //use me, the workflow is easier, so no need to retreive user name like davelin9, per doc: GET / 1 / members / me / boards
        var TrelloURI = "/member/me/boards"
        Trello.get(TrelloURI, success, error);
        //console.log(resource2);
        return resource2;
    }

    function writeResponse(response) {
        console.log(response);
        //alert("test123456");
    }
    //function writeResponseToConsole(response) {
    //    console.log(response);
    //    //alert("test123456");
    //}
    function writeResponseToPage(response) {

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
            if (successMsg.length > 0) {
                for (i = 0; i < successMsg.length; i++) {
                    var row = successMsg[i];
                    //console.log(row.name);//working syntax
                    //console.log(row["name"]);//working syntax
                    //console.log(row[0]);//not syntax can't be by index, maybe ref: http://stackoverflow.com/questions/4044845/retrieving-a-property-of-a-json-object-by-index //find a sol: see below:
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

                    //var array1D = [row.name, row.desc, row.url, row.closed, row.id, JSON.stringify(row.prefs)];
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
                    'callback': writeResponse
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
    $scope.saveUserBtnClick = function saveUser() {
        var array2D = [];
        var arrayGitUser = ["GitHub", user.name, user.company];
        var arrayGoogleUser = ["Google", googleUser.name, googleUser.sheetURL];
        array2D.push(arrayGitUser);
        array2D.push(arrayGoogleUser);

        //to do
        //retrieve all info from google drive to local storage
        //retrieve all info from local storage with changes 
        //consolidate and update back to google drive 
        //no need to have local storage then, unless we need to have an offline mode which complicates the code flow
        googleUser.sheetTab = "Accounts";
        googleUser.sheetRange = "A1:C6";//A1:U37

        var restRequest = gapi.client.request({
            'path': 'https://sheets.googleapis.com/v4/spreadsheets/1IaRsdCfI5OMTHxmmxllGdW94o-CmijkhNE4q_76rASc/values/' + googleUser.sheetTab + "!" + googleUser.sheetRange + '?valueInputOption=USER_ENTERED',
            'method': 'PUT',
            'body': resourceToGoogle,
            'callback': writeResponse
        });
    }

    //Ref: CRUD a google drive sheet    
    $scope.createSheetBtnClick = function createSheet() {
        var array2D = [];
        var arrayGitUser = ["GitHub", user.name, user.company];
        var arrayGoogleUser = ["Google", googleUser.name, googleUser.sheetURL];
        array2D.push(arrayGitUser);
        array2D.push(arrayGoogleUser);
        var today = new Date();
        var datetime = "LastSync" + today.getMonth() + today.getDate() + today.getTime();
        var resourceToGoogle = {
            "spreadsheetId": 'string',
            "properties": {
                "title": "TrelloData-" + datetime,
                "locale": "en_US",
                "timeZone": "America/Chicago"
            },
            "sheets": [
              {
                  "properties": {
                      "title": "Boards",
                      "index": 0,
                      "sheetType": "GRID"
                  }
              }
            ]
        };
        var restRequest = gapi.client.request({
            'path': 'https://sheets.googleapis.com/v4/spreadsheets',
            'method': 'POST',
            'body': resourceToGoogle,
            'callback': writeResponseToPage
        });
    }
    console.log("access common services lib");
    //$scope.readSheetBtnClick = commonService.readSheet($scope.latestSheetID); //use common services for btn click functions
    //update sheet
    $scope.makeRestRequest2BtnClick = function makeRestRequest2() {

        var resourceTrello = "";
        var success = function (successMsg) {

            //var array12 = ["name", "desc", "url", "closed", "id", "prefs"];
            var array2D = [];
            var arrayColumnName = [];
            if (successMsg.length > 0) {
                for (i = 0; i < successMsg.length; i++) {
                    var row = successMsg[i];
                    //console.log(row.name);//working syntax
                    //console.log(row["name"]);//working syntax
                    //console.log(row[0]);//not syntax can't be by index, maybe ref: http://stackoverflow.com/questions/4044845/retrieving-a-property-of-a-json-object-by-index //find a sol: see below:
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

                    //var array1D = [row.name, row.desc, row.url, row.closed, row.id, JSON.stringify(row.prefs)];
                    array2D.push(array1D);
                }
            } else {
                //appendPre('No data found.');
            }
            var resourceToGoogle = {
                "range": "Boards!A1:U37",
                "majorDimension": "ROWS",
                "values": array2D, //make this an array obj to pass in
            };
            var restRequest = gapi.client.request({
                'path': 'https://sheets.googleapis.com/v4/spreadsheets/1IaRsdCfI5OMTHxmmxllGdW94o-CmijkhNE4q_76rASc/values/Boards!A1:U37?valueInputOption=USER_ENTERED',
                'method': 'PUT',
                'body': resourceToGoogle,
                'callback': writeResponse
            });

            return (successMsg);
        };

        var error = function (errorMsg) {
            console.log(errorMsg);
            return (errorMsg);
        };

        var TrelloURI = "/member/me/boards"
        Trello.get(TrelloURI, success, error);
    }
    //delete sheet

    //google service end

}).controller('CommonController', function ($scope, $rootScope) { //controller: Common ...need a better name 
    //code here 
}).controller('ListsController', function ($scope, $rootScope, dataService) { //controller: Lists
    
    // Merge githubuser and  trellouser to systemUser 
    //retreive user from settings and after logging in to retrieve 
    var user = {
        name: "dave",
        company: "onestreamline",
        location: "dallas",
        trello: "davelin9" //default: initial call. 2-way databinding. 
    }; //the user here, I defined
    //to do: retrieve from localStorage
    $scope.user = user;

    //to do: how to push the child content(like current ListsController) to the parent/higher archey 
    //page title, page content 
    $scope.title = "Trello - Lists";
    $scope.message = "hello user "; //pull username from localStorage after authneticated by trello popup 
    $scope.pageSpec = "please select a list to go to http://domain.com/trellodash/lists/listA";

    //trello api on success or error 
    var success = function (successMsg) {
        //alert(successMsg[0].name);
        console.log(successMsg);
        $scope.trelloBoards = { boardsResponse: successMsg };
        $scope.$apply();        
        return ({ boardsResponse: successMsg });
    };

    var error = function (errorMsg) {
        console.log(errorMsg);
        $scope.trelloBoards = { boardsResponse: errorMsg };
        $scope.$apply();
        return ({ boardsResponse: errorMsg });;
    };
    //trello api: move to dataservice or trellodataservice
    //var TrelloURI = "/member/" + user.trello + "/boards"; //use me, the workflow is easier, so no need to retreive user name like davelin9, per doc: GET / 1 / members / me / boards 
    var TrelloURI = "/member/me/boards"
    Trello.get(TrelloURI, success, error);

    //need this code here: for ajax: 
    //can only have one other wise get this error message: Error: $rootScope:inprog
    //Action Already In Progress
    //like asp.net be familiar with popuplar/common error messages that will help troubleshooting need expeirence
    //use the apply one above right after the ajax on success 
    //$scope.$apply();//need this code see: http://stackoverflow.com/questions/15475601/angularjs-ng-repeat-list-is-not-updated-when-a-model-element-is-spliced-from-t
    //still dont know why it doesnt work in dataservice.js file 
}).controller('ListController', function ($scope, $rootScope, dataService, $routeParams) { //controller: Lists
    //to do: how to push the child content(like current ListsController) to the parent/higher archey 
    //page title, page content 
    $scope.title = "Trello - List - ";
    $scope.message = "hello user " 
    $scope.pageSpec = "please select a list to go to http://domain.com/trellodash/lists/listA";
    $scope.boardID = $routeParams.boardID //$location.path();
    //trello api on success or error 
    var success = function (successMsg) {
        //alert(successMsg[0].name);
        console.log(successMsg);
        $scope.trelloBoards = { boardsResponse: successMsg };
        $scope.$apply();
        return ({ boardsResponse: successMsg });
    };

    var error = function (errorMsg) {
        console.log(errorMsg);
        $scope.trelloBoards = { boardsResponse: errorMsg };
        $scope.$apply();
        return ({ boardsResponse: errorMsg });;
    };
    //5745d10174c3235b8cffd409
    //5745d13f8196d68f6e66d0c9
    //5745d13f8196d68f6e66d0c9
    var TrelloURI = "/boards/" + $routeParams.boardID + "/lists";
    Trello.get(TrelloURI, success, error);
  
}).controller('CardsController', function ($scope, $rootScope, dataService, $routeParams) { //controller: Lists
    //to do: how to push the child content(like current ListsController) to the parent/higher archey 
    //page title, page content 
    $scope.title = "Trello - Cards - ";
    $scope.message = "hello  "
    $scope.pageSpec = "please select a list to go to http://domain.com/trellodash/lists/listA";
    //$scope.boardID = $routeParams.boardID //$location.path();
    //trello api on success or error 
    var success = function (successMsg) {
        //alert(successMsg[0].name);
        console.log(successMsg);
        $scope.trelloBoards = { boardsResponse: successMsg };
        $scope.$apply();
        return ({ boardsResponse: successMsg });
    };

    var error = function (errorMsg) {
        console.log(errorMsg);
        $scope.trelloBoards = { boardsResponse: errorMsg };
        $scope.$apply();
        return ({ boardsResponse: errorMsg });;
    };
    //5745d10174c3235b8cffd409
    //5745d13f8196d68f6e66d0c9
    //5745d13f8196d68f6e66d0c9
    var TrelloURI = "/lists/" + $routeParams.listID + "/cards";
    Trello.get(TrelloURI, success, error);
   

}).controller('SigninController', function ($scope) { //controller: profile 
    $scope.title = "hello! Please sign in";
    $scope.message = "";

}).controller('ProfileController', function ($scope, $route) { //controller: profile starts
    $scope.title = "hello! this is David Lin";
    $scope.pageSpec = "use google drive api to pull site content from google spreadsheet<br/>  ";
    //localStorage     
    $scope.showDeveloperMode = false;//dafault mode 
    var currentDeveloperMode = localStorage.getItem("DeveloperMode");
    if (currentDeveloperMode) {
        if (currentDeveloperMode == "true")
            $scope.showDeveloperMode = true;
        else
            $scope.showDeveloperMode = false;
    }
    ////btn click: developer mode: duplicate code in many controllers: move to a service?
    $scope.goDevMode = function (state) {
        if (state == "off") {
            //localStorage.removeItem("DeveloperMode");
            localStorage.setItem("DeveloperMode", "false");
            //not elegant but works simply
            $route.reload();
        }
        else if (state == "on") {
            //localStorage.removeItem("DeveloperMode");
            localStorage.setItem("DeveloperMode", "true");
            $route.reload();
        }
    };   
    //controller: profile ends
}).controller('ContactController', function ($scope, $route) { //controller: contact 
    $scope.message = "Contact our support to request a new feature";
    $scope.pageSpec = "a contact form to email me. a contact info: address, map loc(vague), phone";
    //$scope.showDivHome = PathService;
    ////btn click: developer mode: duplicate code in many controllers: move to a service?
    $scope.goDevMode = function (state) {
        if (state == "off") {
            //localStorage.removeItem("DeveloperMode");
            localStorage.setItem("DeveloperMode", "false");
            //not elegant but works simply
            $route.reload();
        }
        else if (state == "on") {
            //localStorage.removeItem("DeveloperMode");
            localStorage.setItem("DeveloperMode", "true");
            $route.reload();
        }
    };
}).controller('JumbotronTemplateController', function ($scope, $location) { //controller: JumbotronTemplate: a blurb/message section that may or may not show on each page based on settings  
    $scope.showJumbotronTemplate = true;//determine it based on the route 
    var currentPath = $location.path();
    //this is preset: can I change on demand via browser url bar or btn click somewhere?
    if (currentPath == "/settings") {
        //manually turn off the section; only when the view template/partial view has ng-include="'layout/jumbotronTemplate.html'"
        //also the template can be different:  ng-include="'components/search/searchNote.html'"
        $scope.showJumbotronTemplate = false;
    }
    else {
        //the path's html must have include this RouteController and ng-include="'layout/jumbotronTemplate.html'"
        $scope.showJumbotronTemplate = true;

        //duplicate code : see profile
        $scope.showDeveloperMode = false;//dafault mode 
        var currentDeveloperMode = localStorage.getItem("DeveloperMode");
        if (currentDeveloperMode) {
            if (currentDeveloperMode == "true")
                $scope.showDeveloperMode = true;
            else
                $scope.showDeveloperMode = false;
        }
    }
    

}).controller('DashBoardController', function ($scope, dataService) {
    

    var searchCRiteria = {
        city: "Seattle",
        state: "WA",
        arrivalDate: "09/04/2015",
        departureDate: "09/05/2015",
        room1: "2"
    };
    $scope.searchCRiteria = searchCRiteria;

    //EAN API: Hotel List Endpoint: Process the response 
    var onHotelComplete = function (response) {
        $scope.hotel = response.data;
        $scope.statusHotel = response.status;
        $scope.headerHotel = response.header;
    };
    var onHotelError = function (reason) {
        $scope.errorHotel = reason;
    };

    //EAN API call: request, request headers
    //use .jsonp would fix the cross-original request browser error and able to get the data/resource back 
    //$http.jsonp(urlHotelList).then(onHotelComplete, onHotelError);

    //submit btn; to search hotel 
    $scope.submitFunctionGetHotel = function () {
        var city = this.searchCRiteria.city;
        var state = this.searchCRiteria.state;
        var arrivalDate = this.searchCRiteria.arrivalDate;
        var departureDate = this.searchCRiteria.departureDate;
        var room1 = this.searchCRiteria.room1;
            
        dataService.getHotelList(city, state, arrivalDate, departureDate, room1).then(onHotelComplete, onHotelError);
    };
   

}).config(function ($routeProvider) { //adding a new route/page here 
    $routeProvider
     .when('/', { //back to homepage : homepage ties to search.html, not easy to understand. consolidate to same naming over url name and resources names
         //templateUrl: 'pages/home.html',
         templateUrl: 'components/home/home.html',
         controller: 'DashBoardController'
     }).when('/trellodash.html#/', { //doesnt work dont know why dont let the api call on the home use the subpages to bypass the issue only to figure out if req is really needed //back to homepage //add the trail dash to fix has to be above the below one
         //templateUrl: 'pages/home.html',
         templateUrl: 'components/home/home.html',
         controller: 'DashBoardController'
     }).when('/trellodash.html#', { //back to homepage 
         //templateUrl: 'pages/home.html',
         templateUrl: 'components/home/home.html',
         controller: 'DashBoardController'
     }).when('/lists', { //a page of all the lists per account
         templateUrl: 'components/lists/lists.html',
         controller: 'ListsController',
         data: {
             showDivOnlyIndex: false,
             showSysMsg: true
         }
     }).when('/list', { // a single list with listID
         templateUrl: 'components/lists/list.html',
         controller: 'ListController'
     }).when('/list/:boardID', { // a single list with listID
         templateUrl: 'components/lists/list.html',
         controller: 'ListController'
     }).when('/cards/:listID', { // a single list with listID
         templateUrl: 'components/lists/cards.html',
         controller: 'CardsController'
     }).when('/test1', {
         templateUrl: 'components/home/home.html',
         controller: 'DashBoardController'
     }).when('/signin', {
         templateUrl: 'components/signin/signin.html',
         controller: 'SigninController'
     }).when('/settings', {
         templateUrl: 'components/settings/settings.html', //make sure the template is there 
         controller: 'SettingsController',
         data: {
             showDivOnlyIndex: false
         }
     }).when('/profile', {
         templateUrl: 'components/profile/profile.html',
         controller: 'ProfileController'
     }).when('/contact', {
         templateUrl: 'components/contact/contact.html',
         controller: 'ContactController'   
     }).when('/test8', {
         templateUrl: 'components/settings/settings.html',
         controller: 'SettingsController'
     }).when('/backupcenter', {
         templateUrl: 'components/backup/backupcenter.html',
         controller: 'BackupCenterController',
         data: {
             TrelloBtnAfterToken: true
         }
     }).when('/backupcenter&token:token', { // a single list with listID
         templateUrl: 'components/backup/backupcenter.html',
         controller: 'BackupCenterController',
         data: {
             TrelloBtnAfterToken: false
         }
     }).otherwise({ //catch-it-all; no mapping route/page. 
         templateUrl: 'components/contact/contact.html',
         controller: function ($scope) {
             $scope.message = 'Welcome!!';
         }
     });
    // use the HTML5 History API
    //$locationProvider.html5Mode(true);
    // configure html5 to get links working on jsfiddle
    //$locationProvider.html5Mode(true);
    //to do: update this code, too much copy-paste
}).run(function($rootScope, $location, $routeParams) {
    $rootScope.$on('$routeChangeSuccess', function (event, current) {
        $rootScope.showSideBar = false;
        var currentPath = $location.path();
        if (currentPath == "/") {
            $rootScope.showSideBar = true;
        }
        else if (currentPath == "/settings") {
            $rootScope.showSideBar = true;
        }
        else if (currentPath == "/contact") {
            $rootScope.showSideBar = true;
        }
        else if (currentPath == "/backupcenter") {
            $rootScope.showSideBar = false;
        }
    });
    
    
});

