//var FeatureMan_;
function MainMan () {
    this.initFeatures = function() {
        featureMan_ = new FeatureMan();
        var list = featureMan_.createList();
        
        
    }

    this.initSearch = function() {
        searchMan_ = new searchMan();
        searchMan_.start();
        //searchMan_.attachEvents();
    }

    this.initIcons = function(){
      
        

    }
    this.initGesture = function()
    {
        //set the gesture page divs
        $(".gesture_list ul  li").hide();
        $(".gesture_list #gestureRight").show();
        $(".gesture_list #gestureLeft").show();
        $(".gesture_list #gestureSelect").show();
    }
    this.gotoMain = function()
    {
		hideLoading();
        NavigationMan_.navigate(NavigationMan_.pagePosition,"main");
		$('#middel_main').html('<div class="middel_main_ul1"></div>');
		$('#dots').html('');
		featureMan_.createList();		
		
		    featureMan_.slider = new Swipe(document.getElementById('middel_main'), {
            callback: function(e, pos) {
                $("#dots li").each(function(i) {
                    if(i != pos) {
                    //    $(this).css({ "background-position": "" });
                        //$(this).attr("src", image + "/point_empty.png");
                    } else {
                        //$(this).attr("src", image + "/point_full.png");
                    //    $(this).css({ "background-position": background_pos });
                    }

                });	
			} 
		});
    }
}