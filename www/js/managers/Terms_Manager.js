function termsMan () {
    this.count = 500000;
    this.page = 1;
    this.showPage = function() {
        NavigationMan_.navigate("tools", "terms");        
        $("#term_search").focus();
        if($("#terms_list li").length==0){            
            this.createList();
        }

    }
    
    this.attachEvents = function()
    {
               //enter clicked in search text box
        //$("#term_search").keypress(function(e) {

        //    if(e.keyCode == 13) {

        //        $("#terms_list").append("<li ontouchend=\"termSingle_Manager_.showPage()\">"+
        //                                "<span class=\"term_name\">" + $("#term_search").val()+"</span>"+
        //                               " <span class=\"get_information_term\" ><img alt=\"\" src=\"images/term_goto_information_btn.png\" /></span>"+
        //                            "</li>");
        //       
        //        $("#term_search").val("");
        //        $("#term_search").focus();

        //        

        //    }
        //});
   }
    
    this.createList = function()
    {
         setTimeout("jsonMan_.get_terms_post('" + this.count + "','"+this.page +"'," +this.createListCB+")", 100);

    }
    this.createListCB = function(val) {
        
         var infoImage = "images/term_goto_information_btn.png";
        if(isIpad()) {
            infoImage = "images_ipad/term_goto_information_btn.png";
        }
        $(val.posts).each(function(i) {
            //wpcf-describtion  wpcf-image wpcf-term_name
            //$(this).attr("custom_fields").
            var termItemDetails = $(this).attr("custom_fields");
            $("#terms_list").append("<li onclick=\"termSingle_Manager_.showPage(this)\">" +
                                        "<span class=\"term_name\">" + $(termItemDetails).attr("wpcf-term_name") + "</span>" +
                                        "<span class=\"get_information_term\" ><img alt=\"\" class=\"term_name_arrow\" src=\""+infoImage+"\" /></span>" +
                                    "</li>");
            var termItemLI = $("#terms_list li")[i];
            $(termItemLI).data("details", termItemDetails);

        });

           

    }

    this.search = function() {
        var numOfItemsShown = 0;
        $("#terms_list li").each(function() {
            if($(this).text().toLowerCase().indexOf($("#term_search").val().toLowerCase()) > -1) {
                $(this).show();
                numOfItemsShown++;
            }
            else {
                $(this).hide();
             
            }

        });
        //show a message if dont have search results
            if(numOfItemsShown <= 0) {
                $('.message_no_Results_term').show();
                
            }
            else {
                $('.message_no_Results_term').hide();
               
            }
       
    }      
          
}