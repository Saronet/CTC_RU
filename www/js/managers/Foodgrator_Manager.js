var wordsToSearch =[];
var pageHeightFood = "";
var pageHeightFoodList = "";
function FoodgrMan () {
    //this.wordsToSearch = "";
    this.isFirstTime = true;

    this.start_touch = function(e) {
		hideLoading();
		try{
        e.preventDefault();
        }
        catch(e){}
       //  $("#foodgrator_icon").addClass("icon_touch_start");
         
     }
    this.start = function() {
        //input text
      //  $("#foodgrator_icon").removeClass("icon_touch_start");
        NavigationMan_.navigate(NavigationMan_.pagePosition, "foodgerator");


        //clear wordsToSearch and result search
        wordsToSearch = [];
        if(this.isFirstTime == true) {
            this.attachEvents();
            this.isFirstTime = false;
        }
        $("#food_list").html("");

       
       


    }
    this.attachEvents = function() {        //enter clicked in search text box
        var deleteImage = "";
        if(isIpad()) {
            deleteImage = "";
        }
        $("#Text_search_foodgrator").keypress(function(e) {
            if(e.keyCode == 13) {
                if($("#Text_search_foodgrator").val() != "") {
                    $(".recipes_list_Results").hide();
                    $("#food_listWrap").show();
                    $("#food_list").append("<li>" + "<div class=\"cover_delete\" ></div>" + "<div class=\"food_name_div\"><span class=\"food_name\">" + $("#Text_search_foodgrator").val() + "</span></div>" +
                "<span class=\"delete_btn_foodgator\" ontouchend=\"foodgrMan_.deleteLine(this)\">Удалить</span></li>");
                    // wordsToSearch = wordsToSearch + "&" + $("#Text_search_foodgrator").val();
                    wordsToSearch[wordsToSearch.length] = $("#Text_search_foodgrator").val();
                    $("#Text_search_foodgrator").val("");
                    $("#Text_search_foodgrator").focus();

                    $(".food_list ul li").last().bind("swipeleft swiperight", function() {
                        $(this).children(".delete_btn_foodgator").animate({ width: 'toggle' }, { duration: "fast" });
                        $(".cover_delete").show();
                    });
                }
            }
        });




        //get recipes
        $("#ResultBtnFoodSearch").bind('touchend', function() {
       
           if($("#Text_search_foodgrator").val() != "" && $("#Text_search_foodgrator").val() != " ") {
                    $(".recipes_list_Results").hide();
                    $("#food_listWrap").show();
                    $("#food_list").append("<li>" + "<div class=\"cover_delete\" ></div>" + "<div class=\"food_name_div\"><span class=\"food_name\">" + $("#Text_search_foodgrator").val() + "</span></div>" +
                "<span class=\"delete_btn_foodgator\"  ontouchend=\"foodgrMan_.deleteLine(this)\">Удалить</span></li>");
                    // wordsToSearch = wordsToSearch + "&" + $("#Text_search_foodgrator").val();
                    wordsToSearch[wordsToSearch.length] = $("#Text_search_foodgrator").val();
                    $("#Text_search_foodgrator").val("");
                    $("#Text_search_foodgrator").focus();

                    $(".food_list ul li").last().bind("swipeleft swiperight", function() {
                        $(this).children(".delete_btn_foodgator").animate({ width: 'toggle' }, { duration: "fast" });
                        $(".cover_delete").show();
                    });
                }
                $("#Text_search_foodgrator").focus() 

        });

        $("#ResultBtnFood").bind('touchend', function() {
            foodgrMan_.clearResultsListPage();

            foodgrMan_.createListByWords(wordsToSearch);

            NavigationMan_.navigate("", "foodgeratorList")

        });

        $(".food_list").click(function() {
            //removeTextBoxFocus
            $("#Text_search_foodgrator").blur();
        });

    }

    this.open_Text_Btn_Food = function() {
        $(".foodgrator_instructions").hide();
        $('.foodgrator_text_background').show();
        $(".recipes_background_foodgrator").show();

        $(".recipes_list_Results").hide();
        $(".food_list").show();
        $("#Text_search_foodgrator").focus();

    }
    this.createListByWords = function(words) {
        try {
            showLoading();
            to_search = "";
            //take the word in the text box
            if($("#Text_search_foodgrator").val() !=""){
                 words[wordsToSearch.length] = $("#Text_search_foodgrator").val();
            }
            
            //var wordsList;
            for(var i = 0; i < words.length; i++) {
                to_search += "&slug=" + words[i];
            }
            setTimeout("jsonMan_.search_by_gradients('" + to_search + "','foodgrMan_.createListCB')", 100);
            return sswsd;
        }
        catch(ex) {
            return "";
        }

    };


    this.createListCB = function(val) {

        // jsonToArrayFoodgerator(val);
        //only if we have results
        if(val.count > 0) {
            $($(val).attr("posts")).each(function(i) {

                //set category title
                var categoryToDisplay = val.posts[i].categories[0].title;
                if(categoryToDisplay == "feature") {
                    try {
                        categoryToDisplay = val.posts[i].categories[1].title;
                    }
                    catch(ex) { }
                    if(categoryToDisplay == "feature") {
                        categoryToDisplay = "";
                    }
                }
                //check if there is a picture
                var small_imag = val.posts[i].custom_fields["wpcf-image"];
                if(small_imag == "") { small_imag = "images/default_pic.jpg"; }

                var id = val.posts[i].id;
                $("#recipes_list_Results").append("<li id=\"recipeGoToF" + id + "\" ontouchstart=\"list_hover(this)\" ontouchend=\"list_regular()\">" +

                                     "<div class=\"favorite_category_background\">" +
                                     "<span class=\"favorite_recipe_name\">" + categoryToDisplay + "</span>" +
                                     "</div>" +
                //                                   "<img class=\"recipes_small_pic_position\" alt=\"\" src=\"" +small_imag +"\" />" +
                                     "<div class=\"recipes_small_pic_border\"><img class=\"recipes_small_pic\" alt=\"\" src=\"" + small_imag + "\" /></div>" +
                                     "<div class=\"inside_information\">" +
                                     "<span class=\"recipes_first_title\">" + val.posts[i].custom_fields["wpcf-recipe_name"] + "</span>" +
                                     "<span class=\"recipes_second_title\">" + val.posts[i].custom_fields["wpcf-short_describtion"] + "</span>" +
                                     "<span class=\"recipes_look_inside_btn\" ></span>" +
                                     "<div class=\"recipes_footer\">" +
                                     "<span class=\"clock_icon_recipes\"> </span>" +
                                     "<span class=\"recipes_footer_text\">" + val.posts[i].custom_fields["wpcf-total_time"] + " мин. </span>" +
                //"<span class=\"recipes_line\">|</span>" +
                                     "<span class=\"fire_icon_recipes\"></span>" +
                                     "<span class=\"recipes_footer_text\"> " + val.posts[i].custom_fields["wpcf-complexity_level"] + "</span>" +
                //"<span class=\"recipes_line\">|</span> " +
                //"<div  class=\"foodFavoriteBtnOuter\" id=\"favoriteF" + id + "\" onclick=\"foodgrMan_.addToFavorite(this)\"><span class=\"star_icon_recipes\" ></span> " +
                //"<span class=\"recipes_footer_text\"> в избранное </span></div>" +
                                     " </div>" +
                                     "</div>" +
                                     " </li>");



                /*var secondTitle = val.posts[i].custom_fields["wpcf-short_describtion"];
                if(secondTitle.toString().length > 100) {
                secondTitle = secondTitle.toString().substring(0, 100) + "...";

                }
                $(".recipes_second_title").text(secondTitle);*/

                if(isIpad()) {
                    checkHtml($("#recipeGoToF" + id + " .recipes_first_title"), 129);
                    checkHtml($("#recipeGoToF" + id + " .recipes_second_title"), 104);
                }
                else {
                    checkHtml($("#recipeGoToF" + id + " .recipes_first_title"), 66);
                    checkHtml($("#recipeGoToF" + id + " .recipes_second_title"), 49);
                }

                $("#recipeGoToF" + id).data("id", id);
                $("#recipeGoToF" + id).data("category", val.posts[i].categories[0].slug);
                $("#favoriteF" + id).data("id", id);
                $("#favoriteF" + id).data("recipeObj", val.posts[i]);


                $("#recipeGoToF" + id).bind('touchmove', function() {
                    $("#recipeGoToF" + id).data("move", true)


                });

                $("#recipeGoToF" + id).bind('click', function() {
                    console.log("click");
                    $('.Gesture_btn').css({ "background-position": "0px" });
                    //alert(json);
                    if(!$("#recipeGoToF" + id).data("move")) {
                        // goto_one_recipe(this);
                        recipeMan_.showRecipePage($(this));
                    }
                    else {
                        $("#recipeGoToF" + id).data("move", false)
                    }
                });

                if(favoriteMan_.isInFavorite(id)) {
                    $("#recipeGoToF" + id + " .foodFavoriteBtnOuter").hide();
                }
                else {
                    $("#recipeGoToF" + id + " .foodFavoriteBtnOuter").show();
                }
            });
            $(".food_list").hide();
            $(".recipes_list_Results").show();
            //clean the search box
            $("#Text_search_foodgrator").val("");
        }

        //show a message
        else {
            $('.message_no_Results').css({ "display": "block" });
            $('.foodgrator_text_background').show();
        }

        hideLoading();
    }
    
    this.clearResultsListPage = function()
    {
        $("#recipes_list_Results").html("");
        $('.message_no_Results').css({"display":"none"});
    }

    this.deleteLine = function(btnClicked) {
        if(!e) var e = window.event;
        e.cancelBubble = true;
        if(e.stopPropagation) e.stopPropagation();
        $(".cover_delete").hide();

        $(btnClicked).parents("li").slideToggle("fast").remove();
        var filedToDeleteFromLine = $(btnClicked).parents("li").children(".food_name_div").children("span").text();

        //delete
        $(wordsToSearch).each(function(i) {
            if($(this)[0].toString() == filedToDeleteFromLine)
            { wordsToSearch.splice(i, 1); }
        });
    }

    this.addToFavorite=function(myThis){
        if(!e) var e = window.event;
        e.cancelBubble = true;
        if(e.stopPropagation) e.stopPropagation();

        console.log(0);
        favoriteMan_.addRecipeToList(myThis);
        $(myThis).fadeOut();
    }

    this.deleteCover = function() {
        $(".delete_btn_foodgator").each(function() {
            if($(this).css("display") == "block") {
                $(this).animate({ width: 'toggle' }, { duration: "fast" });
            }
        });
        $(".cover_delete").hide();
    }
    this.setHeightMainContent = function () {
        var topStr = $(".foodgrator_text_background").css("top")
        topStr = topStr.substring(0, topStr.length - 2);
        pageHeightFood = $(document).height() - $(".Up_banner_background").height() - $(".down_menu_background").height() - $(".second_nav_background_papers").height() - $(".foodgrator_text_background").height() - topStr - 16;
        pageHeightFoodList = $(document).height() - $(".Up_banner_background").height() - $(".down_menu_background").height() - $(".second_nav_background_papers").height() - 16;
         switch(browser){
            case "ipad": 
            pageHeightFoodList = pageHeightFoodList -30;
            break;  
        }
    }
}