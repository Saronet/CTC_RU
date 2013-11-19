// GLOBAL VARS
var my_client_id = "410704168986366", // YOUR APP ID
my_secret = "763a6eb73ffbd5634fa35189ba1d0f06", // YOUR APP SECRET 
my_redirect_uri = "http://www.facebook.com/connect/login_success.html", // LEAVE THIS
my_type ="user_agent", my_display = "touch"; // LEAVE THIS

var facebook_token = "fbToken"; // OUR TOKEN KEEPER


function FacebookMan ()  {
this.init=function(){
    
    // Begin Authorization
    var authorize_url = "https://graph.facebook.com/oauth/authorize?";
    authorize_url += "client_id=" + my_client_id;
    authorize_url += "&redirect_uri=" + my_redirect_uri;
    authorize_url += "&display=" + my_display;
    authorize_url += "&scope=publish_stream,offline_access"
    
    // Open Child browser and ask for permissions
    
    window.plugins.childBrowser.onLocationChange = function(loc){
        //this.facebookLocChanged(loc);
        // When the childBrowser window changes locations we check to see if that page is our success page.
        if (loc.indexOf("http://www.facebook.com/connect/login_success.html") > -1) {
            var fbCode = loc.match(/code=(.*)$/)[1]
            $.ajax({
                   url:'https://graph.facebook.com/oauth/access_token?client_id='+my_client_id+'&client_secret='+my_secret+'&code='+fbCode+'&redirect_uri=http://www.facebook.com/connect/login_success.html',
                   data: {},
                   dataType: 'text',
                   type: 'POST',
                   success: function(data, status){
                   // We store our token in a localStorage Item called facebook_token
                   localStorage.setItem(facebook_token, data.split("=")[1]);
                   
                   window.plugins.childBrowser.close();
                   
                   console.log("showing loged in");
                   $("#facebook_loginArea").hide();
                   
                   
                   // show our info
                   $("#info").show();
                   shareMan_.createPost();
                   },
                   error: function(error) {
                   window.plugins.childBrowser.close();
                   }
                   });
        }

    };
    if (window.plugins.childBrowser != null) {
        window.plugins.childBrowser.showWebPage(authorize_url);
    }
};
    
    
this.share=function(url){
    
    // Create our request and open the connection
    var req = new XMLHttpRequest(); 
    req.open("POST", url, true);
    
    
    req.send(null); 
    return req;
};

this.post=function(_fbType,params){
    
    // Our Base URL which is composed of our request type and our localStorage facebook_token
    var url = 'https://graph.facebook.com/me/'+_fbType+'?access_token='+localStorage.getItem(facebook_token);
    
    // Build our URL
    for(var key in params){
        /*if(key == "message"){
            
            // We will want to escape any special characters here vs encodeURI
            url = url+"&"+key+"="+escape(params[key]);
        }
        else {*/
            url = url+"&"+key+"="+encodeURIComponent(params[key]);
        //}
    }
    
    var req = facebookMan_.share(url);
    
    // Our success callback
    req.onload = facebookMan_.success();
};

this.success = function() {
    $("#facebook_statusTXT").show();
    $("#facebook_statusBTN").show();

    // hide our info
    $("#info").hide();

    // reset our field
    $("#facebook_statusTXT").val('');

    //show the success message on the button
    $(".share_facebook_btn").text("«Ваша фотография была загружена»");
    hideLoading();
    console.log("DONE!");
    shareMan_.done();
}
};