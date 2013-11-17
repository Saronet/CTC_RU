var mainMan_;
var NavigationMan_;
var recipesListMan_;
var foodgrMan_;
var recipeMan_;
var jsonMan_;
var featureMan_;
var CategoriesRecipeListMan_;
var shoppingMan_;
var toolsMan_;
var timerMan_;
var favoriteMan_;
var termsMan_;
var shareMan_;
var gestureMan_;
var termSingle_Manager_;
var searchMan_;
var categoryListDisplay;
var recipeList;
var facebookMan_;

var json = {};
//var recipesArray = new Array();
var recipesArray = {};
var recipesArray2 = new Object;
var recipesFeature = [];
var categoriesArray = [];
var init = {
    start: function() {
        document.addEventListener("touchstart", function() { }, true);

        //$('.upload_app').hide();
        $('#favorite_icon_hover').hide();
        $('#recipes_icon_hover').hide();
        $('#foodgrator_icon_hover').hide();
        $('#tools_icon_hover').hide();

        //init js object
        jsonMan_ = new JsonMan();

        favoriteMan_ = new favorite_Manager();
        //  init navigation
        NavigationMan_ = new NavigationMan();
        // navigationMan_.attachEvents();

        termsMan_ = new termsMan();
        termsMan_.attachEvents();
        shareMan_ = new shareMan()
        shareMan_.initShare();
        //init main page
        mainMan_ = new MainMan();
        mainMan_.initFeatures();
        mainMan_.initSearch();
        mainMan_.initGesture();
        searchMan_ = new searchMan();
        searchMan_.setHeightMainSearch();
        searchMan_.attachEvents();
        gestureMan_ = new gestureMan();
        //gestureMan_.initGesture();

        //init recipesList manager
        recipesListMan_ = new RecipeListMan();

        //init shopping cart
        shoppingMan_ = new shoppingMan();
        shoppingMan_.attachEvents();
        //init foodgerator manager
        foodgrMan_ = new FoodgrMan();
        foodgrMan_.setHeightMainContent();
        toolsMan_ = new tools_Manager();
        toolsMan_.attachEvent();
        recipeMan_ = new RecipeMan();

        CategoriesRecipeListMan_ = new CategoriesRecipeList_Manager();
        timerMan_ = new TimerMan();
        timerMan_.attachEvents();
        timerMan_.setTimerList();

        termSingle_Manager_ = new termSingle_Manager();

        if(browser != "isGt2" && browser != "isGt3") {
            facebookMan_ = new FacebookMan();
        }

        //when the keyboard is up - hide the footer
        keyboardUpEvent();

        //first time user
        var isFirstTime;
        try {
            isFirstTime = localStorage.getItem('CTCFirstTime');
        }
        catch(e) { }
        if(isFirstTime != "noFirstTime") {
            $(".start_pop_page").show();
            localStorage.setItem('CTCFirstTime', "noFirstTime");
        }

        //check internet
        updateInternetAccess()

    }
}


