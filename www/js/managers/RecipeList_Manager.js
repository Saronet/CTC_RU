
  function RecipeListMan () {
    // maxOfFeater: "5",
   // this.featerDisplayID =  0;
    //this.numOfFeaters =  0;
    this.numOfRecipesForPage = 3;
    this.page =1;
    this.category;
    this.categoryTitle;
    this.recipesCategoriesDisplayed = [];
    this.createList = function(obj, category, status) {
        $(".all_categories_hover").removeClass("all_categories_hover");
        //from more recipe or create new without scroll
        if(((obj != null) && (!$(obj).data("move"))) || (obj == null)) {
            try {
                var page;
                this.category = category;
                //if this category in the recipesArray without all the recipes from the server
                // if(this.recipesCategoriesDisplayed[category] == undefined) {
                if(status == "more" || this.recipesCategoriesDisplayed[category] == undefined) {
                    if(categoryListDisplay != category) {
                        //if come with add to load more recipes - dont clear the recipes list
                        if(status != "more") {
                            this.clearRecipeListPage();
                            NavigationMan_.navigate("categories", "recipesList");
                        }
                        if(recipesArray[this.category] == undefined) {
                            page = 1;
                        }
                        else {
                            recipesArray[this.category].page = recipesArray[category].page + 1;
                            page = recipesArray[this.category].page;
                        }
                        showLoading();

                        setTimeout("jsonMan_.get_posts_by_category('" + this.category + "','" + this.numOfRecipesForPage + "', '" + page + "', 'recipesListMan_.createListCB')", 100);

                        this.recipesCategoriesDisplayed[this.category] = true;

                    }

                }
                //else - get the recipes from the recipesArray
                else {
                    //this is the last category that shown,so dont build the divs again
                    if(categoryListDisplay == category) {
                        NavigationMan_.navigate("categories", "recipesList");
                    }
                    else {
                        this.clearRecipeListPage();
                        this.CreateWithoutServer($(recipesArray).attr(category), category);

                    }
                }

                return sswsd;
            }
            catch(ex) {
                return "";
            }

        }
        else {
            $(obj).data("move", false);
        }

    }

    this.setThereIsMoreSpan = function(val) {
        //loadMoreRecipes

        if(val.posts.length == 0) {
            $("#loadMoreRecipes").css("display", "none");
        }
         else if(val.posts.length > 0) {
            $("#loadMoreRecipes").css("display", "block");
        }
    }
    this.on_move = function(obj) {
        $(obj).data("move", true);
    }
      this.createListCB = function(val) {
          recipesListMan_.setThereIsMoreSpan(val)
          try {
              //if(!recipesListMan_.thereIsCategoryRecipes($(val).attr("category").slug)) {
                  jsonToArray(val);
             // }


          }
          catch(ex) { }
          //var recipeListMan_2 = new RecipeListMan();
          //var listFeater = val;
          recipeList = val;
          var numOfItems = 0;
          if(val.posts.length > recipesArray[$(val).attr("category").slug].page) {
              numOfItems = recipesListMan_.numOfRecipesForPage;
          }
          else {
              numOfItems = val.posts.length;
          }
         
          for(var i = 0; i < numOfItems; i++) {
              json = val;
              
              recipesListMan_.addLine(val.posts[i],val.category.slug,"append");
              categoryListDisplay = val.category.slug;
          }

           $(".titel_recipes_category_name").text(recipesArray[recipesListMan_.category].categoryTitle);
          if(isIpad()) {
              checkHtml($(".titel_recipes_category_name"), 109);
          }
          else{
              checkHtml($(".titel_recipes_category_name"), 49);
          }          

           //NavigationMan_.navigate("categories","recipesList");
     
           hideLoading();
      }
      this.CreateWithoutServer = function(list, category, categoryTitle) {

          $.each($(list).attr("list"), function() {
              recipesListMan_.addLine($(this), category, "prepend");

          });
          categoryListDisplay = category;
          $(".titel_recipes_category_name").text(recipesArray[category].categoryTitle);
          if(isIpad()) {
              checkHtml($(".titel_recipes_category_name"), 109);
          }
          else{
              checkHtml($(".titel_recipes_category_name"), 49);
          }
          
          hideLoading();
          NavigationMan_.navigate("categories", "recipesList");

      }

      this.addLine = function(line, category, useWith) {
          var id = $(line).attr("id");
          var image = "<img class=\"decoration_recipes\" alt=\"\" src=\"images/decoration_recipes.png\" />";
          if(isIpad()) {
              image = "<img class=\"decoration_recipes\" alt=\"\" src=\"images_ipad/decoration_recipes.png\" />";
          }
          var small_imag = $(line).attr("custom_fields")["wpcf-image"][0];
          if(small_imag == "") { small_imag = "images/default_pic.jpg"; }
          
          var itemHtml = "<li  id=\"recipeGoToR" + id + "\" ontouchstart=\"list_hover(this)\" >" +
                              "<div class=\"category-title\"></div>"+
                              "<div class=\"recipes_small_pic_border\"><img class=\"recipes_small_pic\" alt=\"\" src=\"" + small_imag + "\" /></div>" +
                              "<div class=\"inside_information\">" +
                                  "<span class=\"recipes_first_title\">" + $(line).attr("custom_fields")["wpcf-recipe_name"][0] + "</span>" +
                                  "<span class=\"recipes_second_title\">" + $(line).attr("custom_fields")["wpcf-short_describtion"][0] + "</span>" +
                                  "<span class=\"recipes_look_inside_btn\">\></span> " +
                                  "<div class=\"recipes_footer\">" +
                                    "<span class=\"clock_icon_recipes\"> </span>" +
                                              "<span class=\"recipes_footer_text\"> " + $(line).attr("custom_fields")["wpcf-total_time"][0] + " мин. </span>" +
                                    // "<span class=\"recipes_footer_text\"> " + $(line).attr("custom_fields")["wpcf-total_time"][0] + " Min. </span>" +
                                    "<span class=\"recipes_line\">|</span>" +
                                    "<span class=\"recipes_footer_text\"> " + $(line).attr("custom_fields")["wpcf-complexity_level"][0] + "</span>" +
                                    //"<span class=\"recipes_line\">|</span> " +
                                    "<div  class=\"favoriteBtnOuter\" onclick=\"recipesListMan_.addToFavorite(this)\" id=\"favoriteR" + id + "\"><span class=\"star_icon_recipes\"></span> " +
                                    "<span class=\"recipes_footer_text\"> в избранное </span></div>" +

                              "</div>" + //image +
                             "</div>" +
                            "</li>";



          if(useWith == "prepend") {
              $("#recipes_list").prepend(itemHtml);
          }
          else if(useWith == "append") {
              $("#recipes_list").append(itemHtml);
          }


          if(isIpad()) {
              checkHtml($("#recipeGoToR" + id + " .recipes_first_title"), 129);
              checkHtml($("#recipeGoToR" + id + " .recipes_second_title"), 104);
          }
          else {
              checkHtml($("#recipeGoToR" + id + " .recipes_first_title"), 66);
              checkHtml($("#recipeGoToR" + id + " .recipes_second_title"), 49);
          }
          //alert($("#recipeGoToR" + id + " .recipes_first_title").height());


          /*var secondTitle = $(line).attr("custom_fields")["wpcf-short_describtion"][0];
          if(secondTitle.toString().length > 100) {
          secondTitle = secondTitle.toString().substring(0, 100) + "...";

          }
          $("#recipeGoToR" + id + " .recipes_second_title").text(secondTitle);*/

          $("#recipeGoToR" + id).data("id", id);
          $("#recipeGoToR" + id).data("category", category);
          $("#favoriteR" + id).data("id", id);
          if(line[0] != undefined) {
              $("#favoriteR" + id).data("recipeObj", line[0]);
          }
          //console.log("favoriteR line" + line);
          else {
              $("#favoriteR" + id).data("recipeObj", line);
          }

          $("#recipeGoToR" + id).bind('touchmove', function() {
              $("#recipeGoToR" + id).data("move", true)


          });

          $("#recipeGoToR" + id).bind('touchend', function() {
              list_regular();
              console.log("click");
              //alert(json);
              if(!$("#recipeGoToR" + id).data("move")) {
                  // goto_one_recipe(this);
                  recipeMan_.showRecipePage($(this));
              }
              else {
                  $("#recipeGoToR" + id).data("move", false)
              }
          });

          if(favoriteMan_.isInFavorite(id)) {
              $("#recipeGoToR" + id + " .favoriteBtnOuter").hide();
          }
          else {
              $("#recipeGoToR" + id + " .favoriteBtnOuter").show();
          }


      }

      this.getMoreRecipes = function() {

          //when you comt to this page in the second time - it doesnt load 
          //the list again. now i want him to load one more
          categoryListDisplay = "";

          //recipesArray[this.category].page =  recipesArray[this.category].page + 1;
          this.createList(null,this.category, "more");

      }

      this.clearRecipeListPage = function() {
          console.log(0);
          $("#recipes_list").html("");
          $(".titel_recipes_category_name").text("");

      }

    this.thereIsCategoryRecipes = function(category) {
        var thereIsCategory = false;
        $(recipesArray).each(function() {
            if($(this).category == category)
            { thereIsCategory = true; }

        });

        return thereIsCategory;
    }

    this.addToFavorite=function(myThis){
        if(!e) var e = window.event;
        e.cancelBubble = true;
        if(e.stopPropagation) e.stopPropagation();

        console.log(0);
        favoriteMan_.addRecipeToList(myThis);
        $(myThis).fadeOut();
        
    }

    this.gestureMove=function(side){
        var window = $(".recipes_middel_window_recipres_page");
        var height = $("#recipes_list li").height();//window.height() * 2 / 3;
        var pos = window.get(0).scrollTop;
        var numRes=Math.round(pos/height);

        
        //scroll up
        if(side == "down") {
            window.stop().animate({scrollTop:(pos - height)},1500,function(){recipesListMan_.setHover();});
            
        }
        //scroll down
        else if(side=="up"){
            window.stop().animate({scrollTop:(pos + height)},1500,function(){recipesListMan_.setHover();});
            
        }else if(side=="select"){
                        recipeMan_.showRecipePage($("#recipes_list li").eq(numRes));
        }
        
        
    }
      this.setHover=function(){
          var window = $(".recipes_middel_window_recipres_page");
          var height = $("#recipes_list li").height();//window.height() * 2 / 3;
          var pos = window.get(0).scrollTop;
          var numRes=Math.round(pos/height);
          list_regular();
          list_hover($("#recipes_list li").eq(numRes).get(0));

      }
}