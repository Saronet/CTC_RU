function shareMan() {

    this.initShare = function() {


        $("#text-area-cover").click(function() {
            $("#text-area-cover").hide();
            if(!$(".share_specific_pic").hasClass("up")) {
                $(".share_specific_pic").addClass("up");
                $(".second_nav_background_papers").hide();
            }

            $("#TextArea_share").focus();
        });

        $("#TextArea_share").blur(function() {
            $("#text-area-cover").show();
            $(".share_specific_pic").removeClass("up");
            $(".second_nav_background_papers").show();
        });

        try {
            jsonMan_.get_share("ipad", "shareMan_.initShareCB");
            return sswsd;
        }
        catch(ex) {
            return "";
        }
    }

    this.initShareCB = function (val) {

        try {
            var body = "";
            var subject = "";
            $(val["posts"]).each(function () {
                if ($(this).attr("slug") == browser.toLowerCase()) {

                    body = $('<div/>').html($(this).attr("excerpt")).text();
                    subject = $(this).attr("custom_fields")["wpcf-subject"][0];
                    subject += "<br/>" + $(this).attr("custom_fields")["wpcf-link"][0];
                }
            });

            var mailToShare = "mailto:?Subject=" + subject + "&body=%0D%0A" + body;
            $(".tools_share").attr("href", mailToShare);
        }
        catch (e) { }
    }

    this.showPage = function() {
        NavigationMan_.navigate("tools", "share");

        $(".share_position").show();
        
       
     //   $(".share_text_area").click(function() {
            //  $(".share_specific_pic").animate({ "top": "-50%" }, 500);
      //                             alert("NP");
      //                             $(".share_specific_pic").addClass("up");
      //  });
         //  alert("12");

       // $(".share_text_area").blur(function() {
           // $(".share_specific_pic").animate({ "top": "-59px" }, 500);
      //     $(".share_specific_pic").removeClass("up");
      //  });
         //  alert("13");
    }

    $("#browseBtn").click(function () {

                        navigator.camera.getPicture(shareMan_.onSuccess, shareMan_.onFail, { quality: 50,
                                                    destinationType: Camera.DestinationType.DATA_URL,
                                                    sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM,
                                                    targetWidth: 584
                                                    });
  });
    
    $("#takeAPicBtn").bind('touchstart',function () {
                                $(this).addClass("hover");
              });
    
    $("#takeAPicBtn").bind('touchend',function () {
                                $(this).removeClass("hover");
                           navigator.camera.getPicture(shareMan_.onSuccess, shareMan_.onFail, { quality: 50,
                                                       destinationType: Camera.DestinationType.DATA_URL, targetWidth: 584, correctOrientation: true
                                                       });
             });
    
  //$("#takeAPicBtn").click(function () {
      //$('.share_position').hide();
      //$('.share_specific_pic').show();
     
 // });
  this.onSuccess = function(imageData) {
      //        $('.share_img').attr("src", "data:image/jpeg;base64," + imageData);
      //      $('.share_specific_pic').show();
      //    $('.share_position').hide();
      //  NavigationMan_.navigate("","browse");
      showLoading();
      jQuery.ajax({
          type: 'POST',
          url: 'http://appetite.theboxsite.com/wp-content/uploads/save.php',
          data: { 'data': 'data:image/jpeg;base64,' + imageData },
          complete: function(data) { //do what ever needed
              $('.share_img').attr("src", "http://appetite.theboxsite.com/wp-content/uploads/" + data.responseText);
              if($('.share_img').height() < $('.share_img').width()) {
                  $('.share_img').css("width", "99%");
              }
              $('.share_position').hide();
              NavigationMan_.navigate("", "browse");
              hideLoading();

            }
        });

    }

    this.onFail = function (message) {
        //alert('Failed because: ' + message);
    }

    $(".share_facebook_btn").click(function() {
        //$(".Up_banner_background").hide();
        //$(".second_nav_background_papers").hide();
        //$(".share_position").hide();
        //$(".share_specific_pic").hide();
        //$(".facebookDialog").show();

        // First lets check to see if we have a user or not
        if(!localStorage.getItem("fbToken")) {
            /*$("#facebook_loginArea").show();
            $("#facebook_status").hide();

            $("#facebook_login").click(function(){*/
            facebookMan_.init();

            //});

        }

        else {
            console.log("showing loged in");
            // show our info
            $("#info").show();
            showLoading();
            shareMan_.createPost();
        }

    });



    this.done = function () {
        //$(".Up_banner_background").show();
        //$(".second_nav_background_papers").show();
        //$(".share_position").show();
        //$(".share_specific_pic").show();
        //$(".facebookDialog").hide();
        $('.share_specific_pic').hide();
        $('.share_position').show();
    };


    this.createPost = function () {
        // Define our message!

        var msg = $("#TextArea_share").val();
        if ((msg == undefined) || (msg == "")) { msg = "This is my message"; }
        $("#TextArea_share").val("");

        // Define the part of the Graph you want to use.
        var _fbType = 'feed';

        // This example will post to a users wall with an image, link, description, text, caption and name.
        // You can change
        var params = {};
        params['message'] = msg;
        params['name'] = 'CTC.Рецепты — приложение без прикосновения к экрану';
        params['descrdoneption'] = "Я готовлю с помощью приложения «CTC.Рецепты» и вот, что у меня получилось";
        params['link'] = "http://www.domashniy.ru/article/eda/";
        params['picture'] = $('.share_img').attr("src");
        params['caption'] = 'Привет, Друзья ';

        // When you're ready send you request off to be processed!
        //facebook
        facebookMan_.post(_fbType, params);

        
    };

}
