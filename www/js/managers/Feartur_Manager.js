var featerDisplayID =0;
var numOfFeaters =  0;
var maxOfFeater = 5;
function FeatureMan () {
    // maxOfFeater: "5",
   // this.featerDisplayID =  0;
    //this.numOfFeaters =  0;
    this.slider;
    this.createList = function() {
        //getBrowser();
        try {

             jsonMan_.get_posts_by_category("feature", numOfFeaters, 1, "featureMan_.createListCB");
           
            return sswsd;
        }
        catch(ex) {
            return "";
        }
    }


    this.startSlider = function() {           
        var background_pos;
//        var browser=getBrowser();
        switch(browser){
            case "isGt2": background_pos = "-26px 50%";
            break;
            case "isGt3": background_pos = "-26px 50%";
            break;
            case "ipad": background_pos = "-20.5px 1px";
            break;
            case "iphone": background_pos = "-9px 50%";
            break;
        }
        /*var background_pos = "-26px 50%"
        //var background_pos = "-17px 50%";- iphone
        if(isIpad()) {
            background_pos = "-38px 50%";
        }*/
        
         featureMan_.slider = new Swipe(document.getElementById('middel_main'), {
            callback: function(e, pos) {
                $("#dots li").each(function(i) {
                    if(i != pos) {
                        $(this).css({ "background-position": "" });
                        //$(this).attr("src", image + "/point_empty.png");
                    } else {
                        //$(this).attr("src", image + "/point_full.png");
                        $(this).css({ "background-position": background_pos });
					
                    }

                });

                //$("#dots li img").eq(pos).attr("src", image + "/point_full.png");
            }
        });


    }

    this.createListCB = function(val) {
        try {
            jsonToArray(val);

        }
        catch(ex) { }
        try {
            jsonToArrayNotByFeatureCategory(val);

        }
        catch(ex) { }
        var featerMan_2 = new FeatureMan();
        var maxOfFeater = 5;
        var listFeater = val;
        var numOfItems = 0;

        if(val.posts.length <= maxOfFeater) {
            numOfItems = val.posts.length;
        }
        else {
            numOfItems = maxOfFeater;
        }
        numOfFeaters = numOfItems;
        //creates the featers containers
        //val.posts[i].id

        var background_pos; // = "-26px 50%";
        var dotWidth; // = 40;

        switch(browser) {
            case "isGt2":
                background_pos = "-26px 50%";
                dotWidth = 40;
                break;
            case "isGt3":
                background_pos = "-26px 50%";
                dotWidth = 40;
                break;
            case "ipad":
                background_pos = "-20.5px 1px";
                dotWidth = 43;
                break;
            case "iphone":
                background_pos = "-9px 50%";
                dotWidth = 12;
                break;
        }
        var inIpad = isIpad();
        /*//var background_pos = "-17px 50%";
        var background_pos = "-26px 50%";
        
        
        //var dotWidth = 22;
        var dotWidth = 40;
        if(inIpad) {
        background_pos = "-38px 50%";
        dotWidth = 43;
        }*/
        $(".dots_position ul").width(dotWidth * numOfItems);

        for(var i = 0; i < numOfItems; i++) {
            //check if there is a picture
            var small_imag = val.posts[i].custom_fields["wpcf-image"];
            if(small_imag == "") { small_imag = "images/default_pic.jpg"; }

            $(".middel_main_ul1").append("<div id=feature" + val.posts[i].id + " class=\"midddel_main_pic_item feature\" ontouchmove=\"featureMan_.was_swipe(this)\" onclick=\"featureMan_.goto_one_recipe(this)\"></div>");
            $("#feature" + val.posts[i].id).append("<img src=\"" + small_imag + "\" />");
            $("#feature" + val.posts[i].id).append("<div class=\"white_background\"><div id=\"whiteFeat\" class=\"title_pic_white\">" + val.posts[i].custom_fields["wpcf-recipe_name"] + "</div><span id=\"timeFeat\" class=\"time_pic_white\"></span><span class=\"title_pic_text\">" + val.posts[i].custom_fields["wpcf-total_time"] + " минут </span></div>")
            //$("#feature" + val.posts[i].id).append("<div class=\"white_background\"><div id=\"whiteFeat\" class=\"title_pic_white\">" + val.posts[i].custom_fields["wpcf-recipe_name"] + "</div><span id=\"timeFeat\" class=\"time_pic_white\"><span id=\"titleFeat\" class=\"title_pic_text\">" + val.posts[i].custom_fields["wpcf-total_time"] + " Minute</span> </span></div>")//for english
            $("#dots").append("<li ></li>");

            //set the real category - not feature
            var category = "";
            if(val.posts[i].categories[0].slug != "feature")
            {
                category = val.posts[i].categories[0].slug;
            }
            else {
                try{
                    category = val.posts[i].categories[1].slug;
                }
                catch(ex){}
            }
            $("#feature" + val.posts[i].id).data("category", category);
            $("#feature" + val.posts[i].id).data("id", val.posts[i].id);
            $("#feature" + val.posts[i].id).data("swipe", false);
            //var browser = getBrowser();
            if(browser == "ipad") {
                checkHtml($("#feature" + val.posts[i].id + " .title_pic_white"), 265);
            }
            else if(browser == "iphone") {
                checkHtml($("#feature" + val.posts[i].id + " .title_pic_white"), 120);
            }
            else if(browser == "iphone") {
                checkHtml($("#feature" + val.posts[i].id + " .title_pic_white"), 80);
            }
            else {
                checkHtml($("#feature" + val.posts[i].id + " .title_pic_white"), 120);
            }
        }
        $("#dots li").first().css({ "background-position": background_pos });
        //$(".midddel_main_pic_item").hide();
        featerMan_2.startSlider();

    }

    this.goto_one_recipe = function(recipeObj) {
        //alert(0);
        if(!$(recipeObj).data("swipe")) {
            //goto_one_recipe(this);
            
            recipeMan_.showRecipePage($(recipeObj));
       }
        else {
            $(recipeObj).data("swipe", false);
        }

    }

    //check if the user was swipe or just click
    this.was_swipe = function(recipeObj) {
        $(recipeObj).data("swipe", true);
    }

    
     
}
