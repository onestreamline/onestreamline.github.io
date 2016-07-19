angular.module('myApp1').controller('SideBarController', function ($scope, $location, $route, googleService) {
    $scope.goBtn = function (path) {
        $location.path(path);
    };
   
    //trello api on success or error 
    var successBoards = function (successMsg) {
        //alert(successMsg[0].name);
        console.log(successMsg);
        $scope.trelloBoards = { boardsResponse: successMsg };
        $scope.$apply();
        return ({ boardsResponse: successMsg });
    };

    var errorBoards = function (errorMsg) {
        console.log(errorMsg);
        $scope.trelloBoards = { boardsResponse: errorMsg };
        $scope.$apply();
        return ({ boardsResponse: errorMsg });;
    };
    
    var authenticationSuccess = function () { console.log("Successful authentication"); var TrelloURI = "/member/me/boards"; Trello.get(TrelloURI, successBoards, errorBoards); };
    var authenticationFailure = function () { console.log("Failed  authentication"); };

    //moved trello authorize to sidebarcontroller,...moved from the maincontroller originally
    if (typeof Trello === 'undefined') { //javascript handle/catch error example; use this syntax 
        console.error("the Trello obj doesn't exist; check network");
    }
    else {
        Trello.authorize({
            type: "popup",
            name: "Backup with Google Drive Application",
            interactive: false, //read from trello token local storage not making a call , check network to confirm this 
            scope: {
                read: true,
                write: true
            },
            expiration: "never",
            success: authenticationSuccess,
            error: authenticationFailure
        });
    }
    //sidebar controller related issues: (move this from js to readme) 
    //stuck! Q? works only initially, once click on other links, it goes to the routeprovider and grab the proper controller and is not going to run this controller thus the if-else logic based on the path is no use 
    //above example route controller works due to it calls the route provider then the controller then the controller's template is calling that controller thus that controller eventaully being ran again and thus the if-else logic works on checking the path/page name
    //I think the reason to stuck is basically angulajs doesn't have good enough feature here... looks like lib/article explains my problem: http://www.funnyant.com/angularjs-ui-router/
    //move all these comments to my readme!
    //final sol.: see .run coding block
    //alert("try side bar");
    //$scope.checkAuth1 = googleService.checkAuth();
    //ng-click handling
    //6/28 seeing some weirdness might be due to the trello was down was server down

    //on firefox, it doesn't get the token
    //on chrome, it does get the token
    //browser compaitibily isse by trello, their issue, they needdd to fix it
    //i can do move the read boards code after on success of token 
    //trello api: move to dataservice or trellodataservice
    //var TrelloURI = "/member/me/boards";
    //put it here triggers the firefox to fire the trello authr popup everytime and getting an error because no token yet; however, chrome does not have this proble, it works 
    //sol to move sidebar controller to be fired later after the settings controller/backupcenter controller
    //side bar is first prior to the main content of the page due to in the layout it's first, so why not move authroize to here, it's going to be on every page anyway
});
