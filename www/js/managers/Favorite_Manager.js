 //localStorage.setItem('favoritesIDs', "");
  //localStorage.setItem('favoritesIDs', "");
favorite_Manager = function() {

    this.start_touch = function(e) {
        try {
            e.preventDefault();
        }
        catch(ex) { }
        // $("#favorite_icon").addClass("icon_touch_start");
    }

    this.showPage = function() {
        hideLoading();
        // $("#favorite_icon").removeClass("icon_touch_start");
        var tempFavoriteList;
        try {
            var tempFavoriteList = localStorage.getItem('favoriteCTCList');
            tempFavoriteList = tempFavoriteList.split("***###***");
        }
        catch(ex) { }

        if(tempFavoriteList != null && tempFavoriteList != "") {
            //if there is 
            $(".favorite_page .recipes_text_down").hide();
            favoriteMan_.clearResultsListPage();
            // jQuery.parseJSON(jsonString);
            $(tempFavoriteList).each(function(i) {
                var test = $(this);
                var recipe = jQuery.parseJSON($(this)[0].toString());

                if($(this)[0].toString() != "null" && $(this)[0].toString() !== "") {

                    //set category title
                    var categoryToDisplay = recipe.categories[0].title;
                    if(categoryToDisplay == "feature") {
                        try {
                            categoryToDisplay = recipe.categories[1].title;
                        }
                        catch(ex) { }
                        if(categoryToDisplay == "feature") {
                            categoryToDisplay = "";
                        }
                    }
                    var icon_delete = "images/favorite_delete_icon.png";
                    var image = "<img class=\"decoration_recipes\" alt=\"\" src=\"images/decoration_recipes.png\" />";
                    if(isIpad()) {
                        image = "<img class=\"decoration_recipes_favorite\" alt=\"\" src=\"images_ipad/decoration_recipes.png\" />";
                        icon_delete = "images_ipad/favorite_delete_icon.png";
                    }

                    //insert into recipesArray
                    jsonToArrayOneRecipe(recipe);
                    var deleteImage = "images/delete_recipe_btn.png";
                    if(isIpad()) {
                        deleteImage = "images_ipad/delete_recipe_btn.png";
                    }
                    //check if there is a picture
                    var small_imag = recipe.custom_fields["wpcf-image"];
                    if(small_imag == "") { small_imag = "images/default_pic.jpg"; }




                    $("#recipes_list_favorite").append("<li id=\"recipeGoToFA" + recipe.id + "\"  ontouchmove=\"favoriteMan_.was_move(this)\"  onclick=\"favoriteMan_.goto_one_recipe(this)\"   >" +
                                     "<div class=\"cover_delete\" ontouchstart=\"favoriteMan_.deleteCover()\"></div>" +
                                     " <div class=\"favorite_category_background\">" +
                                     "<span class=\"favorite_recipe_name\">" + categoryToDisplay + "</span>" +
                                     "</div>" +
                                     "<div class=\"favorite_delete_icon\" ontouchend=\"favoriteMan_.deleteFavorite(this)\"><img alt=\"\" src=\"" + icon_delete + "\" /></div>" +
                                     "<div class=\"recipes_small_pic_border\"><img class=\"recipes_small_pic\" alt=\"\" src=\"" + small_imag + "\" /></div>" +
                                     "<div class=\"inside_information\">" +
                                     "<span class=\"recipes_first_title\">" + recipe.custom_fields["wpcf-recipe_name"] + "</span>" +
                                     "<span class=\"recipes_second_title\">" + recipe.custom_fields["wpcf-short_describtion"] + "</span>" +
                                     "<span class=\"recipes_look_inside_btn\" >\></span>" +
                                     "<div class=\"recipes_footer\">" +
                                     "<span class=\"clock_icon_recipes\"> </span>" +
                                     "<span class=\"recipes_footer_text\">" + recipe.custom_fields["wpcf-total_time"] + " мин. </span>" +
                    //"<span class=\"recipes_footer_text\">" + recipe.custom_fields["wpcf-total_time"] + " Min. </span>" + //for english
                    //"<span class=\"recipes_line\">|</span>" +

                                     "<span class=\"recipes_footer_text\"> сложно</span>" +
                    //"<span class=\"recipes_line\">|</span> " +
                    //"<span class=\"favorite_close_btn\"></span> " +
                    //"<span class=\"recipes_footer_text\">удалить</span>" +
                                     " </div>" + //image +
                                     "</div>" +
                    // "<div class=\"delete_recipe_btn\" style=\"display:none;\"><img class=\"delete_recipe_position\"  id=\"favoriteDelete" + recipe.id + "\" alt=\"\" src=" + deleteImage + " ontouchend=\"favoriteMan_.deleteFavorite(this)\" /></div>" +
                                     " </li>");

                    if(isIpad()) {
                        checkHtml($("#recipeGoToFA" + recipe.id + " .recipes_first_title"), 129);
                        checkHtml($("#recipeGoToFA" + recipe.id + " .recipes_second_title"), 104);
                    }
                    else {
                        checkHtml($("#recipeGoToFA" + recipe.id + " .recipes_first_title"), 58);
                        checkHtml($("#recipeGoToFA" + recipe.id + " .recipes_second_title"), 49);
                    }


                    //$("#favorite" + recipe.id).data("id", recipe.id);
                    //$("#favoriteDelete" + recipe.id).data("id", recipe.id);
                    var category = recipe.categories[0].slug;
                    if(category == "feature") {
                        category = recipe.categories[1].slug;
                    }
                    $("#recipeGoToFA" + recipe.id).data("id", recipe.id);
                    $("#recipeGoToFA" + recipe.id).data("category", category);

                    $("#recipeGoToFA" + recipe.id).data("scroll", false);
                    $("#recipeGoToFA" + recipe.id).data("swipe", false);
                    //$("#favoriteDelete" + recipe.id).data("show", false);


                    $("#recipeGoToFA" + recipe.id).bind("touchstart", function() {
                        list_hover(this);
                    });



                    $("#recipeGoToFA" + recipe.id).touchwipe({
                        wipeLeft: function() {
                            favoriteMan_.deleteShow(recipe.id);
                        },
                        wipeRight: function() {
                            favoriteMan_.deleteShow(recipe.id);
                        },
                        preventDefaultEvents: false,
                        min_move_x: 40

                    });



                }
            });
        }
        //if there is no favorite recipe
        else {
            //Вы пока не добавили ни одного рецепта в избранное
            $(".favorite_page .recipes_text_down").show();
        }

        NavigationMan_.navigate(NavigationMan_.pagePosition, "favorite");



        // JSON.stringify(recipesArray["feature"].list[5][0])
    }


    this.deleteShow = function(id) {
        var myObj = "#recipeGoToFA" + id;
        $(myObj).data("swipe", true);
        list_hover($(myObj));
           $(myObj).addClass("delete");
        switch(browser) {
            case "isGt2":
                $(myObj + ' .recipes_small_pic_border').css("margin", "0 0 0 63px");
                $(myObj + ' .recipes_first_title').css("margin-left", "228px");
                /*$(myObj + ' .recipes_second_title').css("margin-left", "227px");*/
                $(myObj + ' .recipes_second_title').css("display", "none");
                $(myObj + ' .cover_delete').css("left", "115px");
                $(myObj + ' .cover_delete').css("width", "80%");
                break;
            case "isGt3":
                $(myObj + ' .recipes_small_pic_border').css("margin", "0 0 0 63px");
                $(myObj + ' .recipes_first_title').css("margin-left", "228px");
                /*$(myObj + ' .recipes_second_title').css("margin-left", "227px");*/
                $(myObj + ' .recipes_second_title').css("display", "none");
                $(myObj + ' .cover_delete').css("left", "115px");
                $(myObj + ' .cover_delete').css("width", "80%");
                break;
            case "ipad":
               // $(myObj + ' .recipes_small_pic_border').css("margin", "0 0 0 171px");
              ///  $(myObj + ' .recipes_first_title').css("margin-left", "541px");
              //  $(myObj + ' .recipes_first_title').css("width", "779px");
                /*$(myObj + ' .recipes_second_title').css("margin-left", "541px");*/
             //   $(myObj + ' .decoration_recipes_favorite').css("left", "42%");
             //   $(myObj + ' .recipes_second_title').css("display", "none");
             //   $(myObj + ' .cover_delete').css("left", "145px");
            //    $(myObj + ' .cover_delete').css("width", "90%");
                break;
            case "iphone":
                // $(myObj + ' .recipes_small_pic_border').css("margin", "0 0 0 32px");
                //$(myObj + ' .recipes_first_title').css("margin-left", "231px");
                // $(myObj + ' .recipes_first_title').css("width", "287px");
                /*$(myObj + ' .recipes_second_title').css("margin-left", "231px");*/
                //$(myObj + ' .recipes_second_title').css("display", "none");
                // $(myObj + ' .cover_delete').css("left", "63px");
                //  $(myObj + ' .cover_delete').css("width", "90%");


             
                break;
        }

        $(myObj + ' .favorite_delete_icon').show();
        $(myObj + ' .recipes_footer').hide();
        $(".cover_delete").show();
    }

    this.deleteFavorite = function(toDelete) {
        if(!e) var e = window.event;
        e.cancelBubble = true;
        if(e.stopPropagation) e.stopPropagation();
        $(".cover_delete").hide();
        //var id = $(toDelete).data("id");
        //delete from favoriteCTCList
        var id = $(toDelete).parent().data("id");
        var tempFavoriteList = localStorage.getItem('favoriteCTCList');
        tempFavoriteList = tempFavoriteList.split("***###***");
        var indexToRemove;
        var objToDeleteString = "";
        $(tempFavoriteList).each(function(i) {
            var recipe = jQuery.parseJSON($(this)[0].toString());
            if(recipe != null) {
                if(recipe.id == id) {
                    indexToRemove = i;
                    //$(this).remove();
                    objToDeleteString = JSON.stringify(recipe);
                }
            }

        });
        objToDeleteString = "***###***" + objToDeleteString;
        //tempFavoriteList.splice(indexToRemove);
        var currentList = localStorage.getItem('favoriteCTCList');
        var indexStart = localStorage.getItem('favoriteCTCList').indexOf(objToDeleteString);
        favoriteListAfterDelete = currentList.substring(0, indexStart)
        favoriteListAfterDelete += currentList.substring(indexStart + objToDeleteString.length, currentList.length);

        localStorage.setItem('favoriteCTCList', favoriteListAfterDelete);

        //delete from favoritesIDs
        var favoritesIDs = localStorage.getItem('favoritesIDs');
        var idsArray = favoritesIDs.split(":");
        for(var i = 0; i < idsArray.length; i++) {
            if(idsArray[i] == id) {
                idsArray.splice(i, 1);
            }
        }
        var IDsUpdate = "";
        for(var j = 0; j < idsArray.length; j++) {
            IDsUpdate += idsArray[i] + ":";
        }
        localStorage.setItem('favoritesIDs', IDsUpdate);


        $("#recipeGoToFA" + id).slideToggle("normal");

    }
    this.deleteFavoriteStep1 = function(toDelete) {
        var id = $(toDelete).data("id");
        //$("#favoriteDelete" + id).show();
        $("#favoriteDelete" + id).parent().show();
        $(".inside_information").hide();

    }

    this.addRecipeToList = function(recipeObj) {
        console.log($(recipeObj).data("recipeObj"));
        var oldFavoriteList = localStorage.getItem('favoriteCTCList');
        if(oldFavoriteList == undefined || oldFavoriteList == null)
        { oldFavoriteList = ""; }

        var id = $(recipeObj).data("recipeObj").id;
        //check if this id exist in the favorite list of IDs,
        //only if not- add it to the 2 local storage
        var isExist = this.isInFavorite(id);

        //insert to storage
        if(isExist == false) {
            //add to favoriteCTCList
            var recipeObjString = JSON.stringify($(recipeObj).data("recipeObj"));
            if(oldFavoriteList.indexOf(recipeObjString) == -1) {

                var newFavoriteList = oldFavoriteList + "***###***" + recipeObjString;
                localStorage.setItem('favoriteCTCList', newFavoriteList);
            }
            //add to favoritesIDs
            var favoritesIDs = localStorage.getItem('favoritesIDs');
            favoritesIDs += ":" + id;
            localStorage.setItem('favoritesIDs', favoritesIDs);
        }

    }

    this.inFavorite = function(recipeObj) {

        //var oldFavoriteList = localStorage.getItem('favoriteCTCList');
        //if(oldFavoriteList == null) { oldFavoriteList = ""; }
        //var recipeObjString = JSON.stringify(recipeObj);
        //if(oldFavoriteList.indexOf(recipeObjString) == -1) {
        //    console.log("check false"); console.log(recipeObj);
        //    return false;
        //}
        //console.log("check true"); console.log(recipeObj);
        //return true;
    }

    this.isInFavorite = function(id) {
        //var id =$(recipeObj).attr("id");
        var favoritesIDs = localStorage.getItem('favoritesIDs');
        if(favoritesIDs == undefined || favoritesIDs == null) {
            localStorage.setItem('favoritesIDs', "");
            favoritesIDs = "";
        }
        var isExist = false;

        var idsArray = favoritesIDs.split(":");

        for(var i = 0; i < idsArray.length; i++) {
            if(idsArray[i] == id) {
                isExist = true;
            }

        }
        return isExist;

    }
    this.goto_one_recipe = function(recipeObj) {

        var myRecipeObj = $(recipeObj);
        if(myRecipeObj.data("scroll")) {
            myRecipeObj.data("scroll", false);
            if(myRecipeObj.data("swipe")) {
                //myRecipeObj.children('.delete_recipe_btn').children().data("show", false);
                myRecipeObj.data("swipe", false);

            }
            else {
                list_regular();

            }
        }

        else {
            // goto_one_recipe(this);
            recipeMan_.showRecipePage(myRecipeObj);
            list_regular();

        }
    }
    //check if the user was swipe or just click
    this.was_move = function(recipeObj) {
        $(recipeObj).data("scroll", true);
    }

    this.clearResultsListPage = function() {

        $("#recipes_list_favorite").html("");
    }

    this.deleteCover = function() {
        var myObj;
        $(".favorite_delete_icon").each(function() {
            if($(this).css("display") == "block") {
                myObj = "#" + $(this).parent().attr("id");
                if(isIpad()) {
                 //   $(myObj + ' .recipes_small_pic_border').css("margin", "0 0 0 23px");
                //    $(myObj + ' .recipes_first_title').css("margin-left", "380px");
                 //   $(myObj + ' .recipes_second_title').css("margin-left", "378px");
               //     $(myObj + ' .decoration_recipes_favorite').css("left", "32%");
                } else {
                    // $(myObj + ' .recipes_small_pic_border').css("margin", "0 0 0 23px");
                    //  $(myObj + ' .recipes_first_title').css("margin-left", "188px");
                    //  $(myObj + ' .recipes_second_title').css("margin-left", "187px");
                }
                $(myObj).removeClass("delete");
                $(myObj + ' .favorite_delete_icon').hide();
                $(myObj + ' .recipes_footer').show();
            }
        });
        list_regular();
        $(".cover_delete").hide();
    }

    this.gestureMove = function(side) {
        var window = $(".recipes_middel_window_favorite");
        var height = $("#recipes_list_favorite li").height() + $("#recipes_list_favorite li").css("margin-bottom").substring(0, 2) / 2;
        var pos = window.get(0).scrollTop;
        var numRes = Math.round(pos / height);

        //scroll up
        if(side == "down") {
            window.stop().animate({ scrollTop: (pos - height) }, 1500, function() { favoriteMan_.setHover(); });

        }
        //scroll down
        else if(side == "up") {
            window.stop().animate({ scrollTop: (pos + height) }, 1500, function() { favoriteMan_.setHover(); });

        } else if(side == "select") {
            //alert($("#recipes_list li").eq(numRes).attr("id"));
            recipeMan_.showRecipePage($("#recipes_list_favorite li").eq(numRes));
        }


    }
    this.setHover = function() {
        var window = $(".recipes_middel_window_favorite");
        var height = $("#recipes_list_favorite li").height() + $("#recipes_list_favorite li").css("margin-bottom").substring(0, 2) / 2;
        var pos = window.get(0).scrollTop;
        var numRes = Math.round(pos / height);
        list_regular();
        //alert(numRes);
        list_hover($("#recipes_list_favorite li").eq(numRes).get(0));


    }

}