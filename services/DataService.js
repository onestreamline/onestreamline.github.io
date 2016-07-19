(function () {
    //utilities, moved to services  here from all controller js files 
    //need to understand more dependiency injection not able to retrieve the service undestand angularjs injector fdlow flow more time working on it will do so
    //already defined syntax
    //the syntax needs [] to insiitate first time
    //loading js lib order is imporant
    //pipelien of whats working that i've made it to\
    //when naming collision in the factory service, the first gets injected/loaded, accessible
    angular.module('app1.servicesCommon', []).factory('cm_dataService', dataServiceCommon);//Registering Services, //going to be loaded by the code below if naming collision happens
    angular.module('app1.services',[]).factory('dataService', dataService);//Registering Services
    //how to have more than 1 module in one single app? below code needs to have another place to call it or error trial n error to learn code also read documentation 
    //syntax needed for new one to regiter it, need the array 
    //var app = angular.module("MesaViewer", []);this fix not register the module due to missing the array took me a while to fig out should have past the error msg online found on stackoveflow google the error msg
    //angular.module('myApp2',[]).factory('dataService1', dataService);
    //angular.module('myApp1').factory('swim.dataService', dataService);//doesn't work
    angular.module('app1.core',[]).factory('googleService', googleService);
    //angular.module('myApp1').factory('commonService', commonService);
    function dataServiceCommon($http) {
        return {            
            writeSystemConsoleLog: writeSystemConsoleLog,
            writeResponse: writeResponse,
            createSheet: createSheet,
            loginTrello: loginTrello,
            readBoards: readBoards,
            readLists: readLists
        };

        function writeSystemConsoleLog(oMessage) {
            console.log(oMessage + "-writeSystemConsoleLog");
        }
        function writeResponse(response) {
            console.log(response);
        }
        function readBoards() {           
            var resource2 = "";
            var success = function (successMsg) {
                resource2 = successMsg;
                console.log(successMsg);
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
        function readLists(boardID, array2DListsTotal) {
            // Make sure the callback is a function​
            if (typeof callback === "function") {
                // Call it, since we have confirmed it is callable​
                alert("hihiju");
                callback(options);
                
            }
            var resource2 = "";
            var arrayColumnNameList = [];
            var arrayCardID = [];
            var array2DLists = [];
            
            //$scope.boardID = $routeParams.boardID //$location.path();
            //trello api on success or error 
            var success = function (successMsg, callback1) {
                //alert(successMsg[0].name);
                //resource2 = successMsg;
                //console.log(successMsg);
                //$scope.trelloBoards = { boardsResponse: successMsg };
                //.$apply();
                //timing to make the gapi call
                if (successMsg.length > 0) {
                    for (i = 0; i < successMsg.length; i++) {
                        var row = successMsg[i];
                        var array1D = [];

                        for (key in row) {
                            if (i == 0) {
                                arrayColumnNameList.push((key)); //for column name
                            }
                            //console.log(JSON.stringify(row[key]));
                            //for card id
                            //if (key == "id") {
                            //    arrayBoardID.push((row["id"]));
                            //}
                            array1D.push(JSON.stringify(row[key])); //for values 
                        }
                        if (i == 0) {
                            array2DLists.push(arrayColumnNameList);
                        }

                        array2DLists.push(array1D);
                        //alert("test222");
                        //if (typeof callback1 === "function") {
                        //    // Execute the callback function and pass the parameters to it​
                        //    callback1(array2DLists);
                        //    alert("test");
                        //}
                    }
                } else {
                    //appendPre('No data found.');
                }
                //return ({ boardsResponse: successMsg });
                //console.log(array2DLists);
                //console.log(array2DLists);
                //array2DListsTotal = [];
                //array2DListsTotal = array2DListsTotal.concat(array2DLists);
                //console.log(array2DListsTotal);
                //var resourceToGoogleLists = {
                //    "range": "Lists" + "!A1:F30",
                //    "majorDimension": "ROWS",
                //    "values": array2DLists //make this an array obj to pass in
                //};
                //var restRequest = gapi.client.request({
                //    'path': 'https://sheets.googleapis.com/v4/spreadsheets/' + '1F3tsoBfV81tLB7M7nMmjasjOunwZm3tnzD7bIWEBexo' + '/values/Lists' + '!A1:F30?valueInputOption=USER_ENTERED',
                //    'method': 'PUT',
                //    'body': resourceToGoogleLists,
                //    'callback': cm_dataService.writeResponse
                //});
                var p1 = new Promise(function (resolve, reject) {

                    //resolve("Success!");
                    resolve(array2DLists);
                    // or
                    //reject ("Error!");
                });

                p1.then(function (value) {
                    console.log(value); // Success!
                }, function (reason) {
                    console.log(reason); // Error!
                });
                return array2DLists;
            };

            var error = function (errorMsg) {
                console.log(errorMsg);
                //$scope.trelloBoards = { boardsResponse: errorMsg };
                //$scope.$apply();
                return ({ boardsResponse: errorMsg });;
            };
            //5745d10174c3235b8cffd409
            //5745d13f8196d68f6e66d0c9
            //5745d13f8196d68f6e66d0c9
            var TrelloURI = "/boards/" + boardID + "/lists";
            Trello.get(TrelloURI, success, error);
            
            //console.log(resource2);
            //return resource2;
            // Make sure the callback is a function​
            if (typeof callback === "function") {
                // Execute the callback function and pass the parameters to it​
                callback(successMsg);
                alert("test");
            }
            return array2DLists;
        }
        function loginTrello() {
            console.log("logging in 202");
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
        function createSheet() {
            console.log("test create a sheet from a common service using gapi");
            var user = { //default: initial call. 2-way databinding.
                name: "dave",
                company: "onestreamline",
                location: "dallas",
                trello: "me" //use me over davelin9 so no hardcode  
            }; //the user here, I defined
            //$scope.user = user; //binding to the page/AngularJS scope
            //google service begin

                try {
                    var googleUserFrLocalStorage = JSON.parse(localStorage.getItem("GoogleUser")); // this is how you parse a string into JSON
                    if (googleUserFrLocalStorage) {
                        googleUser = googleUserFrLocalStorage;
                        //$scope.googleUser = googleUser;
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

                    }
                } catch (ex) {
                    console.error(ex);
                }

            localStorage.removeItem("GoogleUser"); //remove the obj to update the obj later 
            console.log("remove a local storage item"); //to do: clean up the angularjs code: a lot of redudnt duplicate firing
            localStorage.setItem("GoogleUser", JSON.stringify(googleUser));

            var array2D = [];
            var arrayGitUser = ["GitHub", user.name, user.company];
            var arrayGoogleUser = ["Google", googleUser.name, googleUser.sheetURL];
            array2D.push(arrayGitUser);
            array2D.push(arrayGoogleUser);
            var today = new Date();
            var datetime = "LastSync" + today.getMonth() + today.getDate() + today.getTime() + today.getDay();
            //need to update this to get more tabs/sheets in google drive; got the error message but it didn't point out to this precisely
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
                  },
                  {
                    "properties": {
                        "title": "Lists",
                        "index": 1,
                        "sheetType": "GRID"
                    }
                  },
                  {
                      "properties": {
                          "title": "Cards",
                          "index": 2,
                          "sheetType": "GRID"
                      }
                  }
                ]
            };
            //var restRequest = gapi.client.request({
            //    'path': 'https://sheets.googleapis.com/v4/spreadsheets',
            //    'method': 'POST',
            //    'body': resourceToGoogle,
            //    'callback': writeResponseToPage //once the sheet is created, call this function to read trello boards, and update the sheet 
            //});
            return resourceToGoogle;
        }
    }
    function dataService($http) {
        return {
            getHotelList: getHotelList,
            getGitHubUser: getGitHubUser,
            getBoards: getBoards,
            writeSystemConsoleLog: writeSystemConsoleLog,
            writeSys: writeSys
        };   
        function writeSys(oMessage) {
            console.log(oMessage+"-writeSys");
        }
        function writeSystemConsoleLog(oMessage) {
            console.log(oMessage);
        }
        function getHotelList(city, state, arrivalDate, departureDate, room1) {
            //EAN API call: request, request headers
            //var urlHotelList = 'http://api.ean.com/ean-services/rs/hotel/v3/list?apiKey=cbrzfta369qwyrm9t5b8y8kf&cid=55505&minorRev=99&customerIpAddress=161.208.64.129&customerUserAgent=Explorer/2.1%20%28Windows%207%29%20APP&minorRev=99&locale=en_US&currencyCode=USD&city=Seattle&stateProvinceCode=WA&countryCode=US&arrivalDate=09/04/2015&departureDate=09/05/2015&room1=2&_type=json&callback=JSON_CALLBACK';
            var urlHotelList = 'http://api.ean.com/ean-services/rs/hotel/v3/list?apiKey=cbrzfta369qwyrm9t5b8y8kf&cid=55505&minorRev=99&customerIpAddress=161.208.64.129&customerUserAgent=Explorer/2.1%20%28Windows%207%29%20APP&minorRev=99&locale=en_US&currencyCode=USD&city=' + city + '&stateProvinceCode=' + state + '&countryCode=US&arrivalDate=' + arrivalDate + '&departureDate=' + departureDate + '&room1=' + room1 + '&_type=json&callback=JSON_CALLBACK';
            var hotelListData = $http.jsonp(urlHotelList);  //js note: ajax calling; the code keeps going to the next line when onHotelComplete hasn't executed ... it got exec the last due to the time needed thus is after the binding thus it's not showing in the scope
            return hotelListData; //js note: need this line: return: 
        }

        //GitHub API   
        function getGitHubUser(companyName) {
            var urlGitHub = "https://api.github.com/users/" + companyName; //"https://api.github.com/users/onestreamline"
            return $http.get(urlGitHub); //trigger on complete when complete getting api call, use the internal method to process the data
        }

        //Trello API
        function getBoards(nth) {
            var success = function (successMsg) {
                //alert(successMsg[0].shortLink);
                alert(successMsg[0].name);
                //$scope.trelloBoards = { boardsResponse: successMsg };

                console.log(successMsg);
                return ({ boardsResponse: successMsg });
            };

            var error = function (errorMsg) {
                console.log(errorMsg);
                return errorMsg;
            };
            var authenticationSuccess = function () { console.log("Successful authentication"); Trello.get('/member/davelin9/boards', success, error); }; //alert("Successful");
            var authenticationFailure = function () { console.log("Failed  authentication"); };
            Trello.authorize({
                type: "popup",
                name: "Backup to Google Drive Application",
                scope: {
                    read: true,
                    write: true
                },
                expiration: "never",
                success: authenticationSuccess,
                error: authenticationFailure
            });
            alert("wait for callback");
            return "testtest";
            //return $http.jsonp(success); //js note: need this line: return: 
            //or return error
        }
    }
    function googleService($http) {
        return {
            getSheet: getSheet,
            checkAuth: checkAuth
        };
        alert("firing google service ");
        function getSheet(companyName) {
            var urlGitHub = "https://api.github.com/users/" + companyName; //"https://api.github.com/users/onestreamline"
            return $http.get(urlGitHub); //trigger on complete when complete getting api call, use the internal method to process the data
        }
        
        var CLIENT_ID = '179800293581-sr0b4rh831k9u3k9ano34va85u35omu2.apps.googleusercontent.com';

        //var SCOPES = ["https://www.googleapis.com/auth/spreadsheets.readonly"];
        var SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];

        //this.checkAuth = checkAuth();

        this.handleAuthResult = handleAuthResult(authResult);

        this.handleAuthClick = handleAuthClick(event);

        function checkAuth() {
            console.log("checking if auth by google");
            alert("firing google service auth ");

            gapi.auth.authorize(
              {
                  'client_id': CLIENT_ID,
                  'scope': SCOPES.join(' '),
                  'immediate': true
              }, handleAuthResult);
            alert("firing google service after auth ");
        }

        /**
         * Handle response from authorization server.
         *
         * @param {Object} authResult Authorization result.
         */
        function handleAuthResult(authResult) {
            var authorizeDiv = document.getElementById('authorize-div');
            console.log(authResult);
            if (authResult && !authResult.error) {
                // Hide auth UI, then load client library.
                authorizeDiv.style.display = 'none';
                //loadSheetsApi();
            } else {
                // Show auth UI, allowing the user to initiate authorization by
                // clicking authorize button.
                authorizeDiv.style.display = 'inline';
            }
        }

        /**
         * Initiate auth flow in response to user clicking authorize button.
         *
         * @param {Event} event Button click event.
         */
        function handleAuthClick(event) {
            gapi.auth.authorize(
              { client_id: CLIENT_ID, scope: SCOPES, immediate: false },
              handleAuthResult);
            return false;
        }
    }
    //function commonService($http) {
    //    return {
    //        writeResponseToConsole: writeResponseToConsole,
    //        readSheet: readSheet
    //    };

    //    // Your Client ID can be retrieved from your project in the Google
    //    // Developer Console, https://console.developers.google.com
    //    var CLIENT_ID = '179800293581-sr0b4rh831k9u3k9ano34va85u35omu2.apps.googleusercontent.com';

    //    //var SCOPES = ["https://www.googleapis.com/auth/spreadsheets.readonly"];
    //    var SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];
    //    /**
    //     * Check if current user has authorized this application.
    //     */
    //    function checkAuth() {
    //        console.log("test common");
    //        //alert("test11");
    //        gapi.auth.authorize(
    //          {
    //              'client_id': CLIENT_ID,
    //              'scope': SCOPES.join(' '),
    //              'immediate': true
    //          }, handleAuthResult);
    //    }

    //    /**
    //     * Handle response from authorization server.
    //     *
    //     * @param {Object} authResult Authorization result.
    //     */
    //    function handleAuthResult(authResult) {
    //        var authorizeDiv = document.getElementById('authorize-div');
    //        console.log(authResult);
    //        if (authResult && !authResult.error) {
    //            // Hide auth UI, then load client library.
    //            authorizeDiv.style.display = 'none';
    //            //loadSheetsApi();
    //        } else {
    //            // Show auth UI, allowing the user to initiate authorization by
    //            // clicking authorize button.
    //            authorizeDiv.style.display = 'inline';
    //        }
    //    }

    //    function writeResponseToConsole(response) {
    //        console.log(response);
    //        console.log("from common services");
    //    }

    //    function readSheet(latestSheetID) {
    //        //use this as angularjs session: similar to asp.net session. if the val is previously set, then can retrieve. otherwise, get a undefined 
    //        //so do a js null check before using the value: foo === undefined ... do this check on UI/HTML via angularjs to show/hide the button 
    //        //use latestSheetID == null for angularjs which is more asp.net like 
    //        //$scope.latestSheetID 
    //        console.log("from common services");
    //        checkAuth();
    //        var restRequest = gapi.client.request({
    //            'path': 'https://sheets.googleapis.com/v4/spreadsheets/' + latestSheetID,//'1IaRsdCfI5OMTHxmmxllGdW94o-CmijkhNE4q_76rASc',
    //            'method': 'GET',
    //            'body': '',
    //            'callback': commonService.writeResponseToConsole
    //        });
    //    }
    //}
}());
