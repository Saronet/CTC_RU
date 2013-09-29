function shareMan () {
  
    this.initShare=function(){
        try {
            jsonMan_.get_share("ipad", "shareMan_.initShareCB");           
        return sswsd;
        }
        catch(ex) {
            return "";
        }
    }

    this.initShareCB = function(val) {
        
        var mailToShare="mailto:?Subject=share&body=%0D%0A"+val["posts"][0].excerpt;
        $(".tools_share").attr("href", mailToShare);
    }

  this.showPage = function()
  {
       NavigationMan_.navigate("tools","share");
         
       $(".share_position").show();
  }

  $("#browseBtn").click(function() {

                        navigator.camera.getPicture(shareMan_.onSuccess, shareMan_.onFail, { quality: 50,
                                                    destinationType: Camera.DestinationType.DATA_URL,
                                                    sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM,
                                                    targetWidth: 584
                                                    });                                                
  });
  $("#takeAPicBtn").click(function(){
                          navigator.camera.getPicture(shareMan_.onSuccess, shareMan_.onFail, { quality: 50,
                                                      destinationType: Camera.DestinationType.DATA_URL, targetWidth: 584
                                                      });                                                  
  });
  this.onSuccess = function(imageData) {
      //        $('.share_img').attr("src", "data:image/jpeg;base64," + imageData);
      //      $('.share_specific_pic').show();
      //    $('.share_position').hide();
      //  NavigationMan_.navigate("","browse");
      showLoading();
      jQuery.ajax({
          type: 'POST',
          url: 'http://cambium.co.il/ctc/wp-content/uploads/save.php',
          data: { 'data': 'data:image/jpeg;base64,' + imageData },
          complete: function(data) { //do what ever needed
              $('.share_img').attr("src", "http://cambium.co.il/ctc/wp-content/uploads/" + data.responseText);
              $('.share_position').hide();
              NavigationMan_.navigate("", "browse");
              hideLoading();

          }
      });

  }
    
    this.onFail=function(message) {
        //alert('Failed because: ' + message);
    }

    $(".share_facebook_btn").click(function() {
        //$(".Up_banner_background").hide();
        //$(".second_nav_background_papers").hide();
        //$(".share_position").hide();
        //$(".share_specific_pic").hide();
        //$(".facebookDialog").show();
alert("11");
        // First lets check to see if we have a user or not
       
	   
<!--	    if(!localStorage.getItem("fbToken")) {
-->

            /*$("#facebook_loginArea").show();
            $("#facebook_status").hide();

            $("#facebook_login").click(function(){*/
						alert("12");

<!--            facebookMan_.init();
-->
shareMan_.createPost();

            //});

<!--        }
-->
<!--        else {
            console.log("showing loged in");
            // show our info
            $("#info").show();
			alert("13");
-->            
<!--        }
-->
    });

    

    this.done=function(){
        //$(".Up_banner_background").show();
        //$(".second_nav_background_papers").show();
        //$(".share_position").show();
        //$(".share_specific_pic").show();
        //$(".facebookDialog").hide();
        $('.share_specific_pic').hide();
        $('.share_position').show();
    };

    
    this.createPost=function(){
        // Define our message!

        var msg = $("#TextArea_share").val();
        if((msg == undefined)||(msg == "")){msg="This is my message";}
        $("#TextArea_share").val("");
    
        // Define the part of the Graph you want to use.
        var _fbType = 'feed';
    
    // This example will post to a users wall with an image, link, description, text, caption and name.
    // You can change
        var params = {};
        params['message'] = msg;
        params['name'] = 'A Facebook App for Phonegap';
        params['description'] = "I just made a Facebook app with Phonegap using this sweet tutorial from Drew Dahlman";
        params['_link'] = "http://www.drewdahlman.com";
        params['picture'] = $('.share_img').attr("src");
        params['caption'] = 'Hello World';
    
        // When you're ready send you request off to be processed!
		alert("aaa");
				console.log('Debug 1');
				var params = {
				    method: 'feed',
				    name: 'A Facebook App for Phonegap',
				    link: 'https://developers.facebook.com/docs/reference/dialogs/',
				    picture: $('.share_img').attr("src"),
				    caption: 'Hello World' + $('.share_img').attr("src"),
				    description: 'Dialogs provide a simple, consistent interface for applications to interface with users.'
				  };
				console.log(params);
			    FB.ui(params, function(obj) { console.log(obj);});
	
    };
  
  }
