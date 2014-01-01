 function CategoriesRecipeList_Manager () {
     this.catArr=[]	;
     this.categories_start_touch = function(e) {
		try{
        e.preventDefault();
        }
        catch (e){}
         //$("#recipes_icon").addClass("icon_touch_start");
         
     }

     this.categories_page = function() {
		 hideLoading();
         //$("#recipes_icon").removeClass("icon_touch_start");

         NavigationMan_.navigate("main", "categories");

         //navigationMan_.pagePosition = "categoriesPage";
         //get categories only if itws the first time
         try {
             if($("#allCategoriesList li").length == 0) {
                 //$("#progress").show();
                 showLoading();
                 setTimeout(function() {
                     jsonMan_.get_categories_list("CategoriesRecipeListMan_.createListCB");
                 }

                 , 100);

             }

             // return sswsd;
         }
         catch(ex) {
             //  return "";
         }


     }



     this.createListCB = function(val) {
         if(categoriesArray.length == 0)
         { CategoriesRecipeListMan_.setCategoriesArray(val); }


         $($(val)[0].categories).each(function(i) {
             if($(this).attr("slug") != "feature") {
                                                                            $("#allCategoriesList").append("<li>" +
                                "<div class=\"cat_pic\" ontouchstart=\"CategoriesRecipeListMan_.onHover(this); \" ontouchmove=\"recipesListMan_.on_move(this)\" onclick=\"recipesListMan_.createList(this,'" + $(this).attr("slug") + "')\"><img alt=\"\" src=\"" + $(this).attr("caticons_url") + "\" />" +
                                "<div class=\"cat_white_back\"></div>" +
                                "<span class=\"cat_name\">" + $(this).attr('title') + "</span></div>" +
                               "</li>");
             }
             
             if(isIpad()){
                 checkHtml($("#allCategoriesList li .cat_name").last(), 90);
             }else{
                 checkHtml($("#allCategoriesList li .cat_name").last(), 40);
             }
         });
         //$("#progress").hide();
         hideLoading();
         //set the category's type that dispkayed - to prevent dubble display


     }


    this.setCategoriesArray = function(val) {
        var index = 0;
        $($(val)[0].categories).each(function(i) {
            if($(this).attr("slug") != "feature") {
                categoriesArray[index] = $(this);
                index++;
            }
        });

    }

    this.onHover = function(obj) {
        $(".all_categories_hover").removeClass("all_categories_hover");
		$(obj).parent().addClass("all_categories_hover");
    }
	

   
     this.setHover=function(){
         var window = $(".all_categories");
         var height = $("#allCategoriesList li").height();
         var pos = window.get(0).scrollTop;
         var numCat=Math.round(pos/height);
         
         $(".all_categories_hover").removeClass("all_categories_hover");
         this.onHover($(".cat_pic").eq(numCat).get(0));

     }
 }
