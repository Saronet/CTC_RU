function searchMan() {
    this.start = function() {        
        $(".Up_banner_background").delegate("#search", "touchend", searchMan_.showWordsBox);
        //$("#search").bind("touchend", searchMan_.showWordsBox); 
    }
    this.showWordsBox = function() {
        $("#search_text_box").val("");
        $('.search_text_background').show();
        if(isIpad()) {
            $('.Gesture_btn').css({ "background-position": "-101px 50%" });
        }
        else {
            $('.Gesture_btn').css({ "background-position": "-60px 50%" }); //iphone
        }


        $('.search_text').show();
        // $('#backFromSearch').show();
        $("#search").hide();
        $("#search_text_box").focus();
    }

    this.clear = function() {
        $(".search_text").val("");
		if(isIpad())
             {
                $(".search_text").css("font-size", "59px");
                }
            else
            {
                 $(".search_text").css("font-size", "27px");
            }
    }

    this.open_search_page = function() {       
        searchMan_.createSearchList($("#search_text_box").val());
        NavigationMan_.navigate(NavigationMan_.pagePosition, "search");
    }

    this.attachEvents = function() {
        $(".search_page .search_btn_icon").bind("touchend", function() {
			searchMan_.createSearchList($(".search_page input.search_text").val());
        });
		
		$("#search_text_searchpage").keypress(function(e) {
            if(e.keyCode == 13) {
				alert("enter1");
				searchMan_.createSearchList($(".search_page input.search_text").val());// add id
			}
		})
		
		$("#search_text_searchpage_2").keypress(function(e) {
            if(e.keyCode == 13) {
				alert("enter2");
				searchMan_.createSearchList($(".search_page input.search_text").val());// add id
			}
		})
		
		$("#search_text_searchpage_3").keypress(function(e) {
            if(e.keyCode == 13) {
				alert("enter3");			
				searchMan_.createSearchList($(".search_page input.search_text").val());// add id
			}
		})
		
		$("#search_text_box").keypress(function(e) {
            if(e.keyCode == 13) {
				searchMan_.createSearchList($("#search_text_box").val());
				NavigationMan_.navigate(NavigationMan_.pagePosition, "search");
				
			}
		})
		
    }

    this.createSearchList = function(words) {
		var listWords = words.split(" ");
        jsonMan_.search(listWords, "searchMan_.createSearchListCB");
        $(".search_page input.search_text").val(words);
		searchMan_.attachEvents();
    }

    this.createSearchListCB = function(val) {
        $(".recipes_list_search ul").html("");
        //only if we have results
        if(val.count_total > 0) {
            console.log(val);
            jsonToArrayFoodgerator(val);

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

                var id = val.posts[i].id;
                var image = "<img class=\"decoration_recipes\" alt=\"\" src=\"images/decoration_recipes.png\" />";
                if(isIpad()) {
                    image = "<img class=\"decoration_recipes_search\" alt=\"\" src=\"images_ipad/decoration_recipes.png\" />";
                }

                //check if there is a picture
                var small_imag = val.posts[i].custom_fields["wpcf-image"];
                if(small_imag == "") { small_imag = "images/default_pic.jpg"; }

                $(".recipes_list_search ul").append("<li class=\"search_result\" id=\"recipeSearch" + id + "\" ontouchstart=\"list_hover(this)\" >" +
                                         " <div class=\"favorite_category_background\">" +
                                            "<span class=\"favorite_recipe_name\">" + categoryToDisplay + "</span>" +
                                          "</div>" +
                                          "<div class=\"recipes_small_pic_border\"><img class=\"recipes_small_pic\" alt=\"\" src=\"" + small_imag + "\" /></div>" +
                                          "<div class=\"inside_information\">" +
                                             "<span class=\"recipes_first_title\">" + val.posts[i].custom_fields["wpcf-recipe_name"] + "</span>" +
                                             "<span class=\"recipes_second_title\">" + val.posts[i].custom_fields["wpcf-short_describtion"] + "</span>" +
                                             "<span class=\"recipes_look_inside_btn\" ></span>" +
                                             "<div class=\"recipes_footer_search\">" +
                                                "<span class=\"clock_icon_recipes\"> </span>" +
                //                                            "<span class=\"recipes_footer_text\">" + val.posts[i].custom_fields["wpcf-total_time"] + " мин. </span>" +
                                                "<span class=\"recipes_footer_text\">" + val.posts[i].custom_fields["wpcf-total_time"] + " Min. </span>" +
                                                "<span class=\"recipes_line\">|</span>" +
                                                "<span class=\"fire_icon_recipes\"></span>" +
                                                "<span class=\"recipes_footer_text\"> сложно</span>" +
                                                "<span class=\"recipes_line\">|</span> " +
                                                "<div  class=\"searchFavoriteBtnOuter\" id=\"searchFavoriteF" + id + "\" onclick=\"searchMan_.addToFavorite(this)\"><span class=\"star_icon_recipes\" ></span> " +
                                                "<span class=\"recipes_footer_text\"> в избранное </span></div>" +
                                           " </div>" + image +
                                           "</div>" +
                                     " </li>");


                if(isIpad()) {
                    checkHtml($("#recipeSearch" + id + " .recipes_first_title"), 129);
                    checkHtml($("#recipeSearch" + id + " .recipes_second_title"), 104);
                }
                else {
                    checkHtml($("#recipeSearch" + id + " .recipes_first_title"), 66);
                    checkHtml($("#recipeSearch" + id + " .recipes_second_title"), 49);
                }


                $("#recipeSearch" + id).data("id", id);
                $("#recipeSearch" + id).data("category", val.posts[i].categories[0].slug);
                $("#searchFavoriteF" + id).data("id", id);
                $("#searchFavoriteF" + id).data("recipeObj", val.posts[i]);



                $("#recipeSearch" + id).bind('touchmove', function() {
                    $("#recipeSearch" + id).data("move", true)


                });

                $("#recipeSearch" + id).bind('touchend', function() {
                    list_regular();
                    console.log("click");
                    //alert(json);
                    if(!$("#recipeSearch" + id).data("move")) {
                        // goto_one_recipe(this);
                        recipeMan_.showRecipePage($(this));
                    }
                    else {
                        $("#recipeSearch" + id).data("move", false)
                    }
                });

                if(favoriteMan_.isInFavorite(id)) {
                    $("#recipeSearch" + id + " .searchFavoriteBtnOuter").hide();
                }
                else {
                    $("#recipeSearch" + id + " .searchFavoriteBtnOuter").show();
                }

            });
            $(".food_list").hide();
            $(".recipes_list_Results").show();
            hideLoading();
        }
        //show a message
        else {
            $(".search_page .search_text").val("Извините, по вашему запросу ничего не найдено");
             if(isIpad())
             {
                $(".search_text").css("font-size", "52px");
             }
            else
            {
                 $(".search_text").css("font-size", "23px");
            }
        }
    }

    this.addToFavorite=function(myThis){
        if(!e) var e = window.event;
        e.cancelBubble = true;
        if(e.stopPropagation) e.stopPropagation();

        console.log(0);
        favoriteMan_.addRecipeToList(myThis);
        $(myThis).fadeOut();
        
    }
}
