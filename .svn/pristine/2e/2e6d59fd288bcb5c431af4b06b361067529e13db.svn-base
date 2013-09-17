termSingle_Manager = function(term) {

    this.showPage = function(term) {

        $("#termImg").attr("src", "");
        NavigationMan_.navigate(NavigationMan_.pagePosition, "termSingle");

        var details = $(term).data("details");
        $(".Terminology_singel_page .second_nav_text").text($(details).attr("wpcf-term_name")[0]);
        $("#one_recipe_text_pic_term").text($(details).attr("wpcf-term_name")[0]);
        $("#one_recipe_text_discription_term").text($(details).attr("wpcf-describtion")[0]);

        if($(details).attr("wpcf-image")[0] == "") {
            $(".one_term_pic").hide();
        }
        else {
            $(".one_term_pic").show();
            $("#termImg").attr("src", $(details).attr("wpcf-image")[0]);
        }


    }

}
