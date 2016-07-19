$(document).ready(function () {
    // Your Client ID can be retrieved from your project in the Google
    // Developer Console, https://console.developers.google.com
    var CLIENT_ID = '179800293581-sr0b4rh831k9u3k9ano34va85u35omu2.apps.googleusercontent.com';

    //var SCOPES = ["https://www.googleapis.com/auth/spreadsheets.readonly"];
    var SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];
    /**
     * Check if current user has authorized this application.
     */
    function checkAuth() {
        console.log("checking if auth by google: this one is able to load google client ");
        console.log("the firing here is still after dataservice.js");
        gapi.auth.authorize(
          {
              'client_id': CLIENT_ID,
              'scope': SCOPES.join(' '),
              'immediate': true
          }, handleAuthResult);
        console.log("checking if auth by google: after: should have the gapi: but it's ajax so this would show before the call finished");
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


})