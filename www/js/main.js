
function cb(data)
{
    console.log("");
}

 function jsonToArray(jsonObj)
      {

        //i come here with one category recipes only
        var recipeArrayobj_ = new recipeArrayObj();
        var category = $(jsonObj).attr("category").slug;
        //add category to array
        if (!(recipesArray)[category])
        {
                        
            recipeArrayobj_.category = category;
            recipeArrayobj_.categoryTitle = jsonObj.category.title;
                      
            recipesArray[category]= (recipeArrayobj_);
        }

        //add category's recipes
        $($(jsonObj).attr("posts")).each(function() {


            recipesArray[category].list[$(this).attr("id")] = $(this);

        });
                       
                       
               } 

 function jsonToArrayNotByFeatureCategory(val)
 {
   //i come here with some categories
   var recipeArrayobj_ = new recipeArrayObj();
   $($(val).attr("posts")).each(function() {
       var currentCategory = $(this).attr("categories")[0].slug;
       var categoryTitle =  $(this).attr("categories")[0].title;
       if(currentCategory == "feature")
       {
           currentCategory = $(this).attr("categories")[1].slug;
           categoryTitle =  $(this).attr("categories")[1].title;
       }
       if(!recipesArray[currentCategory]) {
           recipeArrayobj_.category = currentCategory;
           recipeArrayobj_.categoryTitle = categoryTitle;

           recipesArray[recipeArrayobj_.category] = (recipeArrayobj_);
       }
       // recipeArrayobj_.list[$(this).attr("id")] = $(this);
       $(recipesArray[currentCategory]).attr("list")[$(this).attr("id")] = $(this);

     
   });
 }
        function jsonToArrayOneRecipe(jsonObj)
        {
            var recipeArrayobj_ = new recipeArrayObj();
                   //add category to array
            var category = $(jsonObj).attr("categories")[0].slug;
             if(category == "feature")
               {
                   category = $(jsonObj).attr("categories")[1].slug
               }
                   if (!(recipesArray)[category])
                   {
                        
                       recipeArrayobj_.category = category;
                      
                       recipesArray[recipeArrayobj_.category]= (recipeArrayobj_);
                   }

                   (recipesArray)[category].list[$(jsonObj).attr("id")] = jsonObj;
        }
         
      
function jsonToArrayFoodgerator(jsonObj)
{
    //i come here with some categories
   var recipeArrayobj_ = new recipeArrayObj();
   $($(jsonObj).attr("posts")).each(function() {
       var currentCategory = $(this).attr("categories")[0].slug;
       if(!recipesArray[currentCategory]) {
           recipeArrayobj_.category = currentCategory;

           recipesArray[recipeArrayobj_.category] = (recipeArrayobj_);
       }
       // recipeArrayobj_.list[$(this).attr("id")] = $(this);
       $(recipesArray[currentCategory]).attr("list")[$(this).attr("id")] = $(this);

     
   });
   

}

function getRecipeNumberById( id,type)
{
    switch (type)
    {
        case "feature":
            return id.substring(7); break;

        }
}

 function list_hover(liHover)
      {
		list_regular();  
        var obj = "#"+$(liHover).attr("id");
        $(liHover).addClass("recipes_hover");
        //$(obj+" .recipes_second_title").css({"color":"#ffffff"});
        if(isIpad()){
            //$(obj+" .clock_icon_recipes").css({"background-position":"-41px 50%"});
            //$(obj+" .fire_icon_recipes").css({"background-position":"-40px 50%"});
            //$(obj+" .star_icon_recipes").css({"background-position":"-40px 50%"});
            //$(obj+" .favorite_close_btn").css({"background-position":"-42px 50%"});
            //$(obj + " .recipes_look_inside_btn").css({ "background-position": "-28px 50%" });
        }
        else{
            //$(obj+" .clock_icon_recipes").css({"background-position":"-19px 50%"}); 
            //$(obj+" .fire_icon_recipes").css({"background-position":"-16px 50%"}); 
            //$(obj+" .star_icon_recipes").css({"background-position":"-17px 50%"});  
            //$(obj+" .favorite_close_btn").css({"background-position":"-20px 50%"});
            //$(obj+" .recipes_look_inside_btn").css({"background-position":"-11px 50%"});
        }
        
      
        //$(obj+" .recipes_footer_text").css({"color":"#ffffff"});
        //$(obj+" .recipes_line").css({"color":"#ffffff"});
        //$(obj+" .recipes_first_title").css({"text-shadow":"1px 0px #ffffff"});
        
        
      }
      function list_regular()
      {
        $(".recipes_hover").removeClass("recipes_hover");
        $('.recipes_second_title').css({"color":"#727A85"});
        $('.clock_icon_recipes').css({"background-position":"0"});
        $('.fire_icon_recipes').css({"background-position":"0"});
        $('.star_icon_recipes').css({"background-position":"0"});
        $('.recipes_line').css({"color":"#4D555F"});
        $('.recipes_footer_text').css({"color":"#4D555F"});
        $('.recipes_first_title').css({"text-shadow":"none"});
        $('.recipes_look_inside_btn').css({"background-position":"0"});
        $('.favorite_close_btn').css({"background-position":"0"});

         
      }

      function getRecipeById(id)
      {
          
          $(recipesArray).each(function(){
              $(this).list;

          });
      }

      function hideLoading()
      {
          /*try{
          navigator.notification.activityStop();
          }
          catch(ex){*/
              $("#progress").hide();
          //}

      }

      function showLoading()
      {
          /*try{
          navigator.notification.activityStart();
          }
          catch(ex){*/
              
              $("#progress").show();
          //}
          

      }

      function checkHtml(obj,myHeight){
          //$("#try").css({ "width": obj.width(), "font-size": obj.css("font-size") });

          $("#try").addClass(obj.attr("class"));
          $("#try").text(obj.text());

            var remove = false;
            var tmpName;
            var title = $("#try");
            var check;
            if(obj.height() == 0) { check = title; } else { check = obj; }
            while(check.height() > myHeight) {
                remove = true;
                tmpName = check.html().substr(0, check.html().length - 1);
                check.html(tmpName);
                //obj.html(tmpName);
            }
            //alert(check.height());
            if(remove) {
                tmpName = check.html().substr(0, check.html().length - 3);
                obj.html(tmpName + "..");
            }
            $("#try").removeClass(obj.attr("class"));
      }
      
      
      
      //var isAndroid = true;
      
      function getBrowser(){
        var ua = navigator.userAgent.toLowerCase();
        var isGt2 = ua.indexOf("gt-i9100") > -1;
        if(isGt2){
            return "isGt2";
        }
        var isGt3 = ua.indexOf("gt-i9300") > -1;
        if(isGt3){
            return "isGt3";
        }
        var isIpad = ua.indexOf("ipad") > -1;
        if(isIpad){
            return "ipad";
        }
        var isIphone = ua.indexOf("iphone") > -1;
        if(isIphone){
            return "iphone";
        }
        return "iphone";

      }
      var browser=getBrowser();

        function isIpad(){
          var isiPad = navigator.userAgent.match(/iPad/i) != null;
         return isiPad;
         //  return false;
         
      }

      function changeCssToIpad(){         
          if(isIpad()){
              $(".Main_page").height(1850);
              $(".main_background").height(1850);
          }
      }
      
      function tryfb(){
        $('.share_specific_pic').show();
        $('.share_position').hide();
        NavigationMan_.navigate("","browse");
        //$(".Up_banner_background").hide();
        $(".second_nav_background_papers").hide();
        $(".share_position").hide();
        $(".share_specific_pic").hide();
        $(".facebookDialog").show();
        $("#facebook_loginArea").show();
        $("#facebook_status").hide();
      }

      function gesture(side){
          //alert(side);
          if($(".home_page").css("display")!="none"){
              featureMan_.gestureMove(side);
          }
          else if($(".one_recipe_page").css("display")!="none"){
              recipeMan_.gestureMove(side);
          }
          else if($(".categories_page").css("display")!="none"){
              CategoriesRecipeListMan_.gestureMove(side);
          }
          else if($(".recipres_page").css("display")!="none"){
              recipesListMan_.gestureMove(side);
          }
          else if($(".favorite_page").css("display")!="none"){
              favoriteMan_.gestureMove(side);
          }
      }

   //check internet
   function updateInternetAccess() {
    if(navigator.onLine == false)
    {
        $(".message_no_internet").show();
       
    }
    else
    {
        $(".message_no_internet").hide();

    }
    
   }

function keyboardUpEvent(){
    $("input[type=text]").focus(function(){
        $(".down_menu_background").hide();
    });

     $("input[type=text]").blur(function(){
        $(".down_menu_background").show();
    });
}
