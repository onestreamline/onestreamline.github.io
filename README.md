This Repo is for hosting the Website; the Repo for code is in BitBucket
This is my personal Website to showcase my sample projects and resume; I build light weight Websites suitable for small-biz; free hosting and Content Management System; custom POS plugins. 


I am a gardener, yogi, swimmer, and software engineer. I work for @HealthSparq, a software and healthcare company; we make it easy for you to make an educated choice about your health care options by comparing cost and quality.
I solve problems, communicate solutions clearly, and collaborate effectively with others. 


Learning Notes: 
///////// 6/13/2016 Monday. Edited on 6/14, 6/15, 6/16, ???, 6/20 , 6/23(use repo history),...,6/30

///// section I: initial setup 
(see my demo video; to be built...) 

1 set up git to be able to contribute to the code; follow the instructions about git from bitbucket 
or one-time download at here, https://bitbucket.org/davegoswim/backuptogdrive/downloads

2 use visual studio; file > open website > choose the folder where contains all the root-level files 

3 right click trellodash.html and set as start page

4 debug > start without debugging, or debugging and choose run without debugging; do not add a web.config 

5 the site is up and running; see "pages" section below. if the site doesn't work, hit F12 developer tool > console and look for errors 

6 look learning notes below for topics such as angularjs, js, git, bootstrap, google api, and so on. look for troubleshooting tips. 


//// Pages and modules 
module: console.log as my diagnosis tool on the code/ajax calls work-flow and status such as a login process, before and after/on-success or on-error

pages:
I. trellodash module (trellodash.html and trellodash.js)
1 trellodash.html/ or trellodash.html/home --> log on trello, initial, the trello popup, use settings to manually logging in if the auto login doesn't work on homepage 

2 trellodash.html#/settings --> turn on developer mode, get github user info, manually logging in to google and trello, manually backing up date from trello into google drive 

trello workflow: boards->lists->cards ... see #3-5 below: 

3 trellodash.html/lists : /lists  see boards per loggedin user: example: http://localhost:17549/TrelloDash.html#/lists
--> be able to update a board? ... adding CRUD full capability 
--> change to boards 

4 see lists per board: /list/boardID
example: http://localhost:17549/TrelloDash.html#/list/5750520107f7ba0275fc926d
--> change to board  board/boardID

5 see cards per list: cards/listID: example: http://localhost:17549/TrelloDash.html#/cards/5759bdfafb9100966600dca9
--> change to list ... list/listID

6 contact us --> contact via an email address that will push the content to a trello board 

7 BackupWithGoogleDrive page ... see/move below details to its page commenting 
to back up with google drive 
retrieve from trello and save to google drive 
retrieve a board, then its lists, then its boards per list... then save to google drive, need to define a spreadsheet that will hold it?
then retrieve another board... iterate through the boards 
2 ways to do it, save one trello json to one spreadsheet ... easier ... data is not relational 
the other way .... more of objects approach, hard to desgin ... relational db
so should just do the first way focusing on backing up the data 
not really gonna reuse the data 
if building a trello mockup site, then reuse the data, then need to do a relational db, but should just use trello unless enterprise integration/trello is going away 


II. fitbitdash (fitbitdash.html and fitbitdash.js)
... similar to above; to be built 


///////////// section II Biz and Framework and ToDos/Phases

///////Biz: req: 
Re-purpose this app. 
Use it as a backup centre web app. 
back up Trello
back up Fitbit 
and more... 
to Google Drive. 

use SinglePAgeAppUI for the original development and notes; to consume expedia apis. 
going to del those in here, SinglePAgeAppUI-V2; And to rewrite to consume trello apis and more. 
 
 
 
 
///////// to do/to be built:
search "to do" or "todo" for improvements 

compile js to short names; unreadable code 

(done)Manually backing up by push a btn

(done)backup entire json, how? back up one api call's data, json format, to one spreadsheet in google drive 

Build an automatic backup feature that can back up data daily/weekly in a planned time... need server code 

when 3rd party is down, handle it, trello client.js is down, handle it gracefully, also, download a copy of js, maybe as a fallback 

download boards n lists n cards to one sheet 3 tabs... finish the whole thing 

apply 3rd party script on angularjs n gapi intergration from github 

host aws vs azure vs google cloud vs googe sheet vs dropbox vs tumblr... pick aws ... 1yr free trial fr 6/28 

add fitbit data download to sheet 

move controller.js n controller html to the same folder? see whats best prac for angularjs/mvc 

clean up learning notes 

/////Framework: 
consume trello api
consume google api 
use AngularJS version? 
use BootStrap: Website with responsive design so mobile site friendly 
use JS/jQuery with OOP concept: use closure, example: the data access layer, DataServices.JS 
troubleshooting via Chrome web developer and AngularJS addon
No DB 
IDE? Use VS/Plunker? because it needs a http for not getting cross origin errors. use VS. 
Hosting/Demo with a live http link? Azure or Google website or Plunker?? USe Azure/local host. Use Azure for hosting 
pure UI (html, css, js) and no server code, lightweight, phase1
use bitbucket for its free private repo.   //temp: Use Google Drive for storing the backup files 
<<<<<<< HEAD
note: git has a global setting for the username, need to overwrite it in git folder. for multiple git usernames in 1 PC. To set your username for every repository on your PC
2 acct, one from pc, one fr bitbucket acct if making changes online to readme 
=======
use sourcetree for git repos or use intellij integrated git tool 
>>>>>>> 68bf791f084d07f2bbe8f1ca4f1c2e696824ed23
... lightweight phase 1


Adv. Framework: Phase2: 
add iOS UI? 
(key?!) how to move the responsive website/mobile site to iOS native app quickly? And re use the services/code that the site is built on 
add server code like ASP.NET Web API to expose this app as APIs
Need server code to do the weekly backup action: iOS, asp.net web api triggered by windows service 



Phase 3: beef up: 
add Solr for search features ... need to add DB ... 
maybe move Google Doc to DB for Solr for searching ability 




///////// Section III Learning notes begin

search keywords to learn: ng-click, $parent.pageSpec ,localStorage      .... or search "syntax"
comparision to asp.net 
in asp.net we use user session to store like user search criteria, what to do in UI based framework? 
mayve use localStorage??


coding flow example to start, step by step: 
1. add view ... .html files
2. add in js with routes and controller code 
3. add in nav to connect to it 


Search <!-- for notes in Code 

AngularJS - part 2: advanced topics: 
1 able to move trello lib out to a service js file but not gapi. both gapi and angularjs are from google; with injector type loading, very few online rx some guy mentioned that and one official article from angular team

2 keep gapi in controller js file, but able to move as much code as possible to services js type of files to leave controller clean for data binding , move the business logics out to dedicated js files

3 one controller, one js file, vs all pages to controllers to one big js file 
similar to asp.net notorious defaultController with all the pages to one page code like (this is only my experience, not a typical setup) 


AngularJS:copied from README.md
1. ng-view, ng-model, ng-controller --> model view controller 

2. ngRoute: separate js lib from angularjs
3. ng-repeat, ng-class, ng-click, ng-show, ng-hide, ng-include .... 
--> Directive --> similar to asp.net mvc razor

4. $routeProvider, $scope, $http --> service 
5. modules ... similar to .Net assemblies 


7. what abt view? what abt model? see below.. keywords: https://docs.angularjs.org/guide/concepts


JS:
-closure: example: data service 
-factory pattern: example: data service... similar to server code's design pattern


Bootstrap:
-read its documentation for layouts/css/html 


Overall: architecture: 
-elevator pitch??
UI layer, easy to do mobile. service oriented. need strong js. 
troubleshooting could be problematic. lack of visual studio and intellisense 
Draw diagrams such as server-client networks for SSO, oAuth, Login/Signon

-security: start with AngularJS then asp.net web api... website security review ... 

-architecture: SQL server-->Solr-->relation to obj mapping like EF, what's the latest? LINQ to SQL vs EF--> C# --> asp.net web api/WCF --> AngularJS for website, what's for mobile site or mobile app? latest relation data to obj mapping? Solr setup with TomCat? 



//// google sheet api; google api client side javascript 
the sheet 
https://docs.google.com/spreadsheets/d/1IaRsdCfI5OMTHxmmxllGdW94o-CmijkhNE4q_76rASc/edit?usp=drive_web


https://developers.google.com/sheets/samples/

Client ID	
179800293581-sr0b4rh831k9u3k9ano34va85u35omu2.apps.googleusercontent.com

https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit#gid=0

https://sheets.googleapis.com/v4/spreadsheets/0Ano7fB4c18w1dDZ5a0ZONmFSdVNiWGdHZnd5eF9Oemc/values/Sheet1!A1:D5
research The library supports using CORS (cross-origin resource sharing): 
read https://developers.google.com/api-client-library/javascript/
learning from big company like google for standards on doing APIs REST 
https://developers.google.com/api-client-library/javascript/

google and ms are confusing too many options for example just auth 2 opt:
Authorization

Requires one of the following OAuth scopes:

https://www.googleapis.com/auth/drive
https://www.googleapis.com/auth/spreadsheets

decide to go with javascript lib
https://developers.google.com/api-client-library/javascript/reference/referencedocs
https://developers.google.com/sheets/guides/batchupdate#example

https://github.com/google/google-api-javascript-client/blob/master/samples/requestWithBody.html
//Request had insufficient authentication scopes
    //var SCOPES = ["https://www.googleapis.com/auth/spreadsheets.readonly"];
        var SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];
https://docs.google.com/spreadsheets/d/1IaRsdCfI5OMTHxmmxllGdW94o-CmijkhNE4q_76rASc/edit#gid=0




///// Git kb 
https://confluence.atlassian.com/bitbucket/copy-your-git-repository-and-add-files-746520876.html
https://confluence.atlassian.com/bitbucketserver/basic-git-commands-776639767.html


Git status
Get commit -a -m 'comments here the a is to add to stage the m is commenting'
git pull test master //test is the remote name i set up somewhere, master is the branch 
git push test master 
commit is to local only
push is to the remote repo
pull is to get from the remote repo
what abt checkout .... all sorts of keywords 




///////// Learning notes end


///////////Section IV  troubleshooting tips 
esp js ajax timing sequqnce call back 
a lot of times are in code commenting ... 

following below, there's a timeing issue, it's showing console log / alert but not rendering so the rendering part was finished before the data is in
need to search how to handling the timeing 
maybe http://stackoverflow.com/questions/24417749/angularjs-scope-not-binding-data-in-ng-repeat
struggled and finnaly figured out 
difference between
http://localhost:17549/TrelloDash.html#
vs
http://localhost:17549/TrelloDash.html#/
the trail slash .. woo hoo

also the way I set up the routes 
}).config(function ($routeProvider) { //adding a new route/page here 
    $routeProvider
     .when('/', { //back to homepage : homepage ties to search.html, not easy to understand. consolidate to same naming over url name and resources names
         //templateUrl: 'pages/home.html',
         templateUrl: 'components/home/home.html',
         controller: 'DashBoardController'


- once the js broken, for example, the ajax called failed, the site is not functioning, see screenshots in this folder 


/////Section V Logins 
///////////// Trello: 
key
19c8c5e43c4504f36da17cbb7c345320

token
6278e1e5e92779a3f395150e44705ade9e0514bcb75ee04e1637d8fdf9d128e7


////set up google api 



/////////// old in 2015/2014...
David Lin, SE

/// sticky
1. ng-view, ng-model, ng-controller-->model view controller 
2. ngRoute: seperate js lib from angularjs
3. ng-repeat, ng-class, ng-click, ng-show, ng-hide, ng-include .... --> Directive --> similar to asp.net mvc razor
4. $routeProvider, $scope, $http --> service 
5. modules ... similar to .Net assemblies 
6. factory: data service ... similiar to server code ... design pattern
7. what abt view? what abt model? see below.. keywords: https://docs.angularjs.org/guide/concepts
8. chk OneNote, elevator pitch? UI layer easy to do mobile. service oriendted. need strong js. troubleshooting could be problematic. lack of visual studio. lack of intellinse. 
need diagrams such as server-client networks for SSO, oAuth, Login/Signin....
!! 9. security  -- start with angularjs then asp.net, its web api... website security review ... 
10. architecture 
sql server-->solr-->relation to obj mapping like EF, what's the latest? LINQ to SQL vs EF--> C# --> asp.net web api/WCF --> AngularJS for website, what's for movile site or mobile app?
hadoop? latest relation data to obj mapping? Solr setup with TomCat? 

11 Qs: fundamentals? troubleshooting? design patterns? depe inje? actions/code toward security?...emphasize security n dep inj. 
12 search js note: .. what I learned abt js... tips tricks ....

demo:


////7/6
v 1 browser localstorage : add a deveoper mode to show tech spec of each page; store developer mode true or false in local storage 
local storage html5 vs session storage vs indexeddb(for high amount?)
--> can't find a default factory solution from angularjs... so gonna use javascript default code accessing html5 (W3C standard)
localStorage Object vs   sessionStorage Object
The sessionStorage object is equal to the localStorage object, except that it stores the data for only one session. The data is deleted when the user closes the browser window.

4 caching $http calls 
2 use google api spreadsheet for profile content; use my old code developed: https://spreadsheets.google.com/feeds/list/0Ano7fB4c18w1dDZ5a0ZONmFSdVNiWGdHZnd5eF9Oemc/3/public/values?alt=json
3 creative: client server skills map-->not code...


///////  7/2
1 dep annotations 
2 indexedDB vs local storage vs session storage 
3 move code comments out of code: relay on source control or here READ ME
		//what's efficient way to build up a long string in js? what's the best prac way? VS in c# use string builder and format {0},{1}
        //var urlHotelList = 'http://api.ean.com/ean-services/rs/hotel/v3/list?apiKey=cbrzfta369qwyrm9t5b8y8kf&cid=55505&minorRev=99&customerIpAddress=161.208.64.129&customerUserAgent=Explorer/2.1%20%28Windows%207%29%20APP&minorRev=99&locale=en_US&currencyCode=USD&city=' + city + '&stateProvinceCode=' + state + '&countryCode=US&arrivalDate=' + arrivalDate + '&departureDate=' + departureDate + '&room1=' + room1 + '&_type=json&callback=JSON_CALLBACK';
        //use .jsonp would fix the cross-original request browser error and able to get the data/resource back 
        //$http.jsonp(urlHotelList).then(onHotelComplete, onHotelError);

        //playing around the js block myself to know learn 
        //alert("binding to scope");       
        dataService.getHotelList(city, state, arrivalDate, departureDate, room1).then(onHotelComplete, onHotelError);
        //alert("binded the data")
		
////// 7/1
1 signin: GitHub API oAuth : 33f8372384cfb176921c50ff16b371b6f2222c38
https://gist.github.com/technoweenie/419219

v 2 move $http calls to data service; proper javascript style coding with closure 

//6/30
1. session management. states. caching. ...to store info. 
v 2. .run
3. token  ... SSO via oAuth... signin
4. testng. unit testing. dep injection. 
5. $cookies. $log. 
6. services. RESTful services. $http. dataService.js one-stop shop to get all my data... $http caching. sharing data between controllers. 
?7. security... signin via token. .... all security related??
8. offline applications... store data where? indexed db. manifest. cache. 
!9. go through angularjs... find similiarities to server side C# .... learn 1 then 2 .. 2 birds one stone...
folder/directory structure, MVC, data service, caching, session mng, one func one usage keep the func small, tiers/layers, no global variables,.., good programming practices,...assemblies vs modules,....
vs differences like interface, inheritance, compile,... ... not covered in angularjs 
( asp.net web form 2.0-->asp.net mvc razor -->AngularJs )
(.net reader-->Linq to SQL-->(EF)-->Solr)


///6/29 what's next?
2. all the stuff in angularjs get started pluralsight 
3. site map: signin, settings, index(dashboard)[hotels EAN API,providers Solr,any search to data], contact, profile 
3.' add search textbox to dashboard ,Add Sort features vs filter features ?

//// 6/26
server side integration ... consume REST, Solr...
securities... signin .. azure, sso, twitter, github,...
directory/folder structure 

////6/24 Wednesdaay: Summary 
1. ng-view, ng-model, ng-controller-->model view controller 
2. ngRoute
3. ng-class, ng-click, 
4. $routeProvider, $scope, $http
5. sharing code between controllers using services: http://fdietz.github.io/recipes-with-angular-js/controllers/sharing-code-between-controllers-using-services.html
... learned... but how to show a div or not based on page? ,,, once figured what exactly to look for, close to the sol... 
.... how to control a partial view to show or not under different controller/path ... the partial view is common to many pages/path... for example, a customer page will have customerController and other controllers and partial views that are common to other pages such as Nav, widgets
.. sidebar example, should be similiar to what I need: $rootScope 
6. move api calls to services ... move them out of controller codeing blocks 


///6/23
1. need a summary on key coding block 
2. summary on strange issues .. example: debug worksheet: http://developer.ean.com/general-info/debug-worksheet/

3. cross original issue: use jsonp. jsonp formatting issue: use http://stackoverflow.com/questions/19916362/angularjs-how-to-make-a-jsonp-request
4. json via request headers vs via query string ... designed on the API end

5. use template move html out of index.html(single page)
6. add input textboxs to search: location and  user etc. 
   how to use bootstrap, align textboxes, large/small sizes 

7. main controller undefined issue. use newer version angular, need to update code, no more controoler in global variable
8. troubleshooting tool: firefox, chrome better for this, .... not as good as visual studio debug points 
9. sum up pretty good progress just in 1-day; can be even quicker w/o documenting learning on the go...


///6/22
1. add config: routing
2. add index to templates with each Div; the index will call those html templates via routing. routing to controller to model to template to view
3. troubleshooting cross domain policy issue; why it works for GitHub but not EAN. .. because the XML? because it's not jsonp? due to the http is used over the https 
	Also EAN would return either XML/json based on request headers, how to do that in angularjs?
	Comparing to Solr api which it can be inside URL so Get with a query string to determine which format to be returned xml or json. 
	But EAN's doesn't. it realys on request headers. 


/// 6/18 tasks
v 1 twitter bootstrap nav-sidebar to turn on a Div ... good ref? http://mode87.com/untame/demo/tabbedsite/
v 2 Dynamically load data to that Div via AngularJS


/// 6/17 Wednesday 
1 add a template from Bootstrap; dashboard. It's mobile friendly. It's going to be the main/bearbone of this site; bootstrap js and css, its html template.

3 brainstorming ideas to use the dashboard: json to table view illustration ... for demo, for reuse it as a tool 


//////////////// 6/15/2015
1. review prev code and add comments 
2. 
//Pages: index.html, weather.html 
//JS: script.js
//Data: 1 https://api.github.com/users/onestreamline
//2 ProviderAddressSearch.json 


//////////////// Q4 2014
target: 
weather history http://www.wunderground.com/history/airport/KADS/2014/10/20/DailyHistory.html?req_city=Addison&req_state=TX&req_statename=Texas
Solr: json: provider address search

technology:
solr 
tomcat on windows 
(remove)java
(remove)spring 
angular js 
plunker
(remove)IntelliJ

patterns:
(remove)mvc via spring ... 
(remove)web service via spring
mvc via angular js 

/////////////////////////////////
pages:
index.html 
weather.html 

///////////////////////// Summary 
Angular JS Summary: 
1
no golbal variables 
iffy

2
controller
nested controller 
module ... namespace 


3 services 
$scope
$http
$location


4 directories 
ng-repeat="p in provider.response.docs"  //syntax example 

check one note for more info --> where exactly? 
working log: moving to one note... ...

10/23: while trying to show page title .. found $location and $routeProvider --> just happened same time ... background pluralsight video shows it cover these 2 topcis ..
