tools_Manager = function() {
    this.numOfShopItems = 0;
    this.numOfTimersItems = 0;
    
    this.start_touch = function(e) {
		try{
            e.preventDefault();
        }
        catch(e){}
       // $("#tools_icon").addClass("icon_touch_start");
       

    }

    this.start = function() {
    
       // this.setShoppingCounter();
       // this.setTimersCounter();

      //  NavigationMan_.navigate(NavigationMan_.pagePosition, "tools");
        

    }

    this.updateCounters = function()
    {
        this.setShoppingCounter();
        this.setTimersCounter();
    }
    this.setShoppingCounter = function() {
        var numItems = $("#shopping_list li");
        toolsMan_.numOfShopItems = 0;
        $("#shopping_list li").each(function() {
            if($(this).css("display") != "none") {
                ++toolsMan_.numOfShopItems;

            }

        });
        if(toolsMan_.numOfShopItems == 0) {
            $("#counterShoppingWrap").hide();
        }
        else {
            $("#counterShoppingWrap").show();
            $("#counterShopping").text(toolsMan_.numOfShopItems);
        }

    }

    this.setTimersCounter = function() {
        toolsMan_.numOfTimersItems = 0;
        var numItems = $("#timer_list_middel .new_timer");
        //toolsMan_.numOfShopItems = 0;
        $("#timer_list_middel .new_timer").each(function() {
            if($(this).css("display") != "none") {
                if($(this).data("status")=="play"){//check if is play now
                    ++toolsMan_.numOfTimersItems;
                }//++toolsMan_.numOfTimersItems;

            }
            

        });
        if(toolsMan_.numOfTimersItems == 0) {
            $("#counterTimerWrap").hide();
        }
        else {
            $("#counterTimerWrap").show();
            $("#counterTimer").text(toolsMan_.numOfTimersItems);
        }

    }

    this.goToSite=function(){
        
    }
}