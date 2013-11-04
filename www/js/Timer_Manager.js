var snd;
function TimerMan() {
    $('.timer_cancel_btn').css("color","#BBB");//כפתור כתום
    $('.timer_Start_btn').css("color","#BBB");//כפתור ירוק
    this.image_start = "images/timer_play_btni.png";
    this.image_reset = "images/timer_pause_btni.png";
    this.image_delete = "<img class=\"timer_delete_btn\" ontouchstart=\"timerMan_.deleteTimer(this)\" alt=\"\" src=\"images/timer_delete_btn.png\" />";
    //this.image_finish="<img class=\"finish_background\" alt=\"\" src=\"images/timer_finished_background.png\" />";
    this.showPage = function() {
		try{snd = new Media( '/android_asset/www/voice/ding.wav' );}catch(err){};
        NavigationMan_.navigate("tools", "timer");

        //this.setTimerList();
    }
this.start_border_on=function()//כפתור התחל לירוק
{
    $('.timer_border_start').addClass("timer_border_start_green");
    $('.timer_Start_btn').css("color","#C5EE49");
}    
this.start_border_off=function()//כפתור אתחל לחזור לאפור
{
    $('.timer_border_start').removeClass("timer_border_start_green");
    $('.timer_Start_btn').css("color","#BBB");
}    
this.orange_font=function(obj)
{
     $(obj).children(".tools_text").css("color","#E76A06");
}   
this.orange_text_on=function(obj)
{
   $(obj).addClass("timer_small_border_orange");
   $(obj).children(".timer_hour").addClass("red");
       $(obj).children(".timer_min").addClass("red");
       $(obj).children(".timer_sec").addClass("red");
  $(obj).children().children(".timer_text").addClass("red");
} 
this.orange_text_off=function(obj)
{
   $(obj).removeClass("timer_small_border_orange");
   $(obj).children(".timer_hour").removeClass("red");
    $(obj).children(".timer_min").removeClass("red");
    $(obj).children(".timer_sec").removeClass("red");
   $(obj).children().children(".timer_text").removeClass("red");
} 
this.green_on=function()
{
    $('.timer_Start_btn').css("color","#C5EE49");//כפתור ירוק
}
this.green_off=function()
{
    $('.timer_Start_btn').css("color","#BBB");//כפתור אפור
}
this.orange_on=function()
{
    $('.timer_cancel_btn_text').addClass("red")//כפתור כתום
    
}
this.orange_off=function()
{
    $('.timer_cancel_btn_text').removeClass("red")//כפתור אפור
    
}
    this.attachEvents = function() {
        
        $("#timer_cancel_btn").click(function() {
        $('.timer_cancel_btn').css("color","#BBB");
            timerMan_.setTime("init");
        });

        $("#timerName").focus(function() {
            $("#timerName").val("");
        });
        $("#timer_hour").click(function() {

            timerMan_.setTime("10min");
        });

        $("#timer_min").click(function() {
            timerMan_.setTime("1min");

        });
        $("#timer_sec").click(function() {

            timerMan_.setTime("10second");
        });
        this.timersIndexForName;
        $("#timer_Start_btn").click(function() {
            
            if($("#timeEdit").text() == "00:00") {
                alert("Timer should be at least 10 seconds");
            }

            else {//if(!timerMan_.hasTimer($("#timerName").val())) {

                //add timer to localStorage
                var oldTimers = localStorage.getItem("CTCTimers");
                if(oldTimers == undefined) {
                    oldTimers = "";
                }

                //check if use with the default name
                //if yes - update the local storsge - prevent double use
                if("ТАЙМЕР "+timerMan_.timersIndexForName  == $("#timerName").val())
                {
                    localStorage.setItem("CTCTimersIndex", timerMan_.timersIndexForName);
                }
                //startTime + {} + how many time plus start time + {} + name + {} + name to display 
               
                ////set name to save in localstorage
                //timersIndexForName = localStorage.getItem("CTCTimersIndex");
                //if(timersIndexForName == undefined) {
                //    timersIndexForName = "1";
                //}
                //else {
                //    timersIndexForName = timersIndexForName * 1 + 1;
                //}
               // localStorage.setItem("CTCTimersIndex", timersIndexForName);

                //var name = "timer " + timersIndexForName;

                var date = new Date();
                var startTime = date.getTime();
                var time = timerMan_.convertToMiliseconds($("#timeEdit").text());
                time = time + startTime; //$("#timeEdit").text();
                var name = $("#timerName").val();
                var nameToDisplay = $("#timerName").val();
                //if(nameToDisplay == "" || nameToDisplay == "имя")//there is no name - set default
                //{
                //    nameToDisplay = name;

                //}

                //******************************
                $("#timerName").val(nameToDisplay);
                var newTimer = 'timer:' + startTime + '{}' + time + '{}' + name + '{}' + "play{}" + nameToDisplay;
                localStorage.setItem('CTCTimers', oldTimers + newTimer);
                //add timer to list
                timerMan_.addTimerToList(name);
                //navigate to timers list
                NavigationMan_.navigate(NavigationMan_.pagePosition, "timersList");

                //push notification
                timerMan_.notificationStart(time, nameToDisplay);
            }
            /*else {
            alert("ther is another timer with the same name! give another name");
            }*/
        });

    }

    this.getDefaultName = function()
    {
        //set name to save in localstorage
                this.timersIndexForName = localStorage.getItem("CTCTimersIndex");
                if(this.timersIndexForName == undefined || this.timersIndexForName == "") {
                    this.timersIndexForName = "1";
                }
                else {
                    this.timersIndexForName = this.timersIndexForName * 1 + 1;
                }
                return "ТАЙМЕР " + this.timersIndexForName;
    }
    this.setTimerList = function() {

            timerMan_.image_start = "images/timer_play_btni.png";
            timerMan_.image_reset = "images/timer_pause_btni.png";
            timerMan_.image_delete = "<img class=\"timer_delete_btn\" onclick=\"timerMan_.deleteTimer(this)\" alt=\"\" src=\"images/timer_delete_btn.png\" />";
            timerMan_.image_finish = "<img class=\"finish_background\" alt=\"\" src=\"images_ipad/timer_finished_background.png\" />";

         var timerListFromStorage = localStorage.getItem('CTCTimers');
        
        //if there is timers
        if(timerListFromStorage != null) {
            var timers = timerListFromStorage.split("timer:");

            for(var i = 1; i < timers.length; i++) {
                //if not ""                
                if(timers[i].length > 0) {                    
                    var oneItem = timers[i].split("{}");
                    var name = oneItem[2];
                    var startTime = oneItem[0];
                    var time = oneItem[1];
                    var isPlay = oneItem[3];
                    var nameToDisplay=oneItem[4];

                    var date = new Date();
                    var now = date.getTime();
                    var differTime = (now - startTime);
                    var timeToDisplay;

                    if(now < time * 1) {
                        timeToDisplay = timerMan_.convertFromMiliToString(time - now);                        
                    }

                    if(isPlay == "stop") {                        
                        timeToDisplay = timerMan_.convertFromMiliToString(time - startTime);                        
                    }                    

                    timerMan_.updateStatusInLocal(name, isPlay);

                    $("#timer_list_middel").append("<div class=\"new_timer\">" +
                                    "<div class=\"timer_toPic_position\"><span class=\"timer_clock\">" + timeToDisplay + " </span>" +
                                    "<img class=\"timer_recet_btn\" ontouchstart=\"timerMan_.initOrStart(this)\" alt=\"\" src=" + timerMan_.image_start + " />" +
                                    "<div class=\"timer_name\">" + nameToDisplay + "</div>" +
                                       timerMan_.image_delete +
                                    "</div>" +
                                "</div>");

                    var currentTimer = $("#timer_list_middel .new_timer")[i - 1];
                    var duration = timerMan_.convertFromMiliToString(time - startTime);                    

                    $(currentTimer).data("duration", duration);
                    $(currentTimer).data("nameToDisplay", nameToDisplay);
                    $(currentTimer).data("name", name);
                   
                    if(isIpad()) {
                      //  checkHtml($(currentTimer).children(".timer_name"), 94);
                      //   $(".add_timer_btn").css("margin-top", "4.5%");
                    }
                    else {
                     //   checkHtml($(currentTimer).children(".timer_name"), 94); 
                      //   $(".add_timer_btn").css("margin-top", "3.5%");
                        
                    }
                    
                    if(isPlay == "play") {
                        $(currentTimer).children(".timer_toPic_position").children(".timer_recet_btn").attr("src", timerMan_.image_reset);
                        $(currentTimer).data("status", "play");
                    }
                    else if(isPlay == "stop") {
                        $(currentTimer).children(".timer_toPic_position").children(".timer_recet_btn").attr("src", timerMan_.image_start);
                        $(currentTimer).data("status", "stop");

                    }
                }
            }
        }
        setInterval(timerMan_.setTimers, 1000);

    }

    this.initOrStart = function(initStartBtn) {
        var timerWrap = $(initStartBtn).parents(".new_timer");
        var name = $(timerWrap).data("name");
        var nameToDisplay = $(timerWrap).data("nameToDisplay");
        var time = $(timerWrap).data("duration");
        var status = $(timerWrap).data("status");
        if(status == "play") {

            $(timerWrap).data("status", "stop");
            $(timerWrap).children(".timer_toPic_position").children(".timer_clock").text(time);
            $(initStartBtn).attr("src", timerMan_.image_start);

            timerMan_.notificationStop(timerMan_.convertToMiliseconds(time), nameToDisplay);

        }

        else if(status == "stop") {
            $(timerWrap).data("status", "play");
            $(timerWrap).data("duration");
            $(initStartBtn).attr("src", timerMan_.image_reset);

            //update storage
            var date = new Date();
            var now = date.getTime();
            var updateTime;
            var oldTimers = localStorage.getItem('CTCTimers');
            var timersArray = oldTimers.split("timer:");
            for(var i = 0; i < timersArray.length; i++) {
                var oneItem = timersArray[i].split("{}");
                if(oneItem[2] == name) {
                    oneItem[0] = now;
                    var timeMili = timerMan_.convertToMiliseconds(time);
                    oneItem[1] = now + timeMili;
                    updateTime = oneItem[1];
                    oneItem[2] = name;
                    oneItem[3] = "play";
                    oneItem[4] = nameToDisplay;
                    timersArray[i] = oneItem[0] + "{}" + oneItem[1] + "{}" + oneItem[2] + "{}" + oneItem[3] + "{}" + oneItem[4] ;
                    timerMan_.updateTimersStorage(timersArray);
                }
            }
            timerMan_.notificationStart(updateTime, nameToDisplay);


        }

        timerMan_.updateStatusInLocal(name, $(timerWrap).data("status"));
    }

    this.updateStatusInLocal = function(name, status) {
        var oldTimers = localStorage.getItem('CTCTimers');
        var timersArray = oldTimers.split("timer:");
        for(var i = 0; i < timersArray.length; i++) {
            var oneItem = timersArray[i].split("{}");
            if(oneItem[2] == name) {
                oneItem[3] = status;
                timersArray[i] = oneItem[0] + "{}" + oneItem[1] + "{}" + oneItem[2] + "{}" + oneItem[3] + "{}" + oneItem[4] ;
                timerMan_.updateTimersStorage(timersArray);
            }
        }

    }

    this.deleteTimer = function(deleteBtn) {
        var timerWrap = $(deleteBtn).parents(".new_timer");
        $(timerWrap).hide();        
        var name = $(timerWrap).data("name");
        var nameToDisplay=$(timerWrap).data("nameToDisplay");
        //delete from storage
        var oldTimers = localStorage.getItem('CTCTimers');
        var timersArray = oldTimers.split("timer:");
        var duration;
        for(var i = 0; i < timersArray.length; i++) {
            oneItem = timersArray[i].split("{}");
            if(oneItem[2] == name) {

                duration = oneItem[2];
                timersArray.splice(i, 1);

            }
        }
        
        timerMan_.updateTimersStorage(timersArray);
        if(isIpad()) {
            //$(".add_timer_btn").css("margin-top", "32px");
        }
        else {
            //$(".add_timer_btn").css("margin-top", "-3px");

        }
        if($("#timer_list_middel .new_timer").length > 0) {
            var withPlayTimers = false;
            $("#timer_list_middel .new_timer").each(function() {
                if($(this).css("display") != "none") {
                    withPlayTimers = true;
                }
            });
            if(withPlayTimers == false) {
             //   $(".add_timer_btn").css("margin-top", "0px")
            }
            else {
                if(isIpad()) {
                    //$(".add_timer_btn").css("margin-top", "32px");
                }
                else {
                    //$(".add_timer_btn").css("margin-top", "-3px");

                }
            }

        }
        //delete from notification
        timerMan_.notificationStop(duration, nameToDisplay);
    }

    this.updateTimersStorage = function(timersArray) {
        var timersListToStorage = "";
        for(var i = 0; i < timersArray.length; i++) {
            if(timersArray[i] != "") {
                timersListToStorage += "timer:" + timersArray[i];
            }
        }
        localStorage.setItem('CTCTimers', timersListToStorage);
    }

    this.setTimers = function() {
        $("#timer_list_middel .new_timer").each(function() {
            if($(this).data("status") == "play") {
                var date = new Date();
                var absoluteTime = date.getTime();

                var nameToDisplay = $(this).data("nameToDisplay");
                var name = $(this).data("name");

                var endTime = timerMan_.getEndTimeByName(name);
                var time = timerMan_.convertFromMiliToString(endTime - absoluteTime);
                //console.log(time);
                var updated = timerMan_.removeSecond(time);
                if(updated == "timeover") {
                    //set the button to start, and 

                    //if the difference between the end & absolute is less than 1000 mili
                    //its show that the timeis over and we dont have to show the message
                    if((endTime - absoluteTime) > -1000) {
                        //console.log("timeover");
                        $(".timer_all_background_black").css("background-color", "transparent");

                        var nameId = timerMan_.nameToId(name);
                        var timer_name = "#" + nameId + " .timer_finish_recipe_name";
                        var timer_back = "#" + nameId + " .timer_all_background_black";

                        try {
							try{
								snd.play();
							} catch(err) {
								console.log('error: ' + err);
							}
							window.plugins.statusBarNotification.notify('CTC', nameToDisplay + ' has ended');
                        }
                        catch(err) {
                            console.log('Its IOS: ' + err);
                        }

                        $(".main_background").append("<div id=\"" + nameId + "\" class=\"timer_finish\"><span class=\"timer_all_background_black\"></span>" +"<div class=\"timer_finish_all_position\">"+ timerMan_.image_finish +
                                                        "<span class=\"timer_finish_title\">ТАЙМЕР</span><div id=\"timer_finish_recipe_name\" class=\"timer_finish_recipe_name\">ПИРОГ С КАПУСТОЙ</div>" +
                                                        "<div class=\"timer_finish_finish_text\">ПРИГОТОВЛЕН!</div><span class=\"timer_ok_border\" ontouchend=\"timerMan_.timer_finish(this)\"><span class=\"timer_finish_OK\">OK</span></span></div></div>");
                        $(".timer_all_background_black").first().css("background-color", "black");
                        //$(timer_name).text(name);
                        //var shortName;

                        //play the 'ding' when time over
						try{
                        document.getElementById("timerDing").play();
						} catch(err){
							console.log('android');

						}
					


                        $(timer_name).text(nameToDisplay);

                        if(browser == "ipad") {
                            //checkHtml($(timer_name), 136);
                        }
                        else {
                           // checkHtml($(timer_name), 70);
                        }


                        timer_name = "#" + nameId;
                        $(timer_name).show();


                    }


                    $(this).children(".timer_toPic_position").children(".timer_recet_btn").attr("src", timerMan_.image_start);

                    $(this).data("status", "stop");

                    timerMan_.updateStatusInLocal(name, $(this).data("status"));
                    toolsMan_.setTimersCounter();
                    updated = $(this).data("duration");

                    //show timer finish page 


                    timerMan_.notificationStop(timerMan_.convertToMiliseconds(updated), nameToDisplay);


                }
                $(this).children(".timer_toPic_position").children(".timer_clock").text(updated);
            }
        });
    }

    this.removeSecond = function(time) {

        var timeArr = time.split(":");

        if(timeArr[0] == "-1" & timeArr[1] == "59") {
            return "timeover";
        }
        if(timeArr[0] == "00" & timeArr[1] == 0) {
            return "timeover";
        }
        if(timeArr[0] == "0-1") {
            console.log(time);
            return "timeover";
        }

        timeArr[1] = timeArr[1] * 1 - 1;
        if(timeArr[1] == -1) {
            timeArr[0] = timeArr[0] * 1 - 1;
            timeArr[1] = "59";
            if(timeArr[0] == -1) {
                timeArr[0] = "00";
                timeArr[1] = "00";
            }
        }


        if(timeArr[1] < 10) {
            timeArr[1] = "0" + timeArr[1];

        }
        if((timeArr[0] != "-1") && (timeArr[0].length == 1)) {
            timeArr[0] = "0" + timeArr[0];
        }
        
        return timeArr[0] + ":" + timeArr[1];
    }

    this.convertFromMiliToString = function(milisec) {
        var allSeconds = milisec / 1000;
        var seconds = allSeconds % 60;
        var minutes = allSeconds / 60;
        seconds = Math.round(seconds);
        minutes = Math.floor(minutes);

        if(seconds <= -1 && minutes <= -1) {
            return "00:00";
        }

        if(minutes < 10) {
            minutes = "0" + minutes;
        }
        if(seconds < 10) {
            seconds = "0" + seconds;
        }

        return minutes + ":" + seconds;

    }

    this.convertToMiliseconds = function(time) {
        var timeArray = time.split(":");
        var result = timeArray[1] * 1000;
        result += timeArray[0] * 1000 * 60;
        return result;

    }



    this.addTimerToList = function(name) {

        $("#timer_list_middel").append("<div class=\"new_timer\">" +
                                
                                "<div class=\"timer_toPic_position\"><span class=\"timer_clock\">" + $("#timeEdit").text() + "</span>" +
                                "<img class=\"timer_recet_btn\" ontouchstart=\"timerMan_.initOrStart(this)\" alt=\"\" src=" + timerMan_.image_reset + " />"
                                      +"<div class=\"timer_name\">" + $("#timerName").val() + "</div>" 
                                      + timerMan_.image_delete +
                                "</div>" +
                            "</div>");

        var currentTimers = $("#timer_list_middel .new_timer");
        
        var currentT = $(currentTimers.last());

        currentT.data("duration", $("#timeEdit").text());
        currentT.data("status", "play");
        currentT.data("name", name);
        currentT.data("nameToDisplay", $("#timerName").val());

        if(isIpad()) {
          //  checkHtml(currentT.children(".timer_name"), 94);
           // $(".add_timer_btn").css("margin-top", "4.5%px");
        }
        else {
         //   checkHtml(currentT.children(".timer_name"), 94);
           // $(".add_timer_btn").css("margin-top", "3.5%px");
        }
        
        $("#timerName").val("");

    }

    this.setTime = function(buttonClicked) {
        var time = $("#timeEdit").text();
        var seconds = time.substring(time.length - 2, time.length);
        var minutes = time.substring(0, time.length - 3);
        switch(buttonClicked) {
            case "10min":
                minutes = minutes * 1 + 10 * 1;
                break;

            case "1min":
                minutes = minutes * 1 + 1 * 1;
                break;
            case "10second":
                seconds = seconds * 1 + 10 * 1;
                if(seconds == 60) {
                    minutes = minutes * 1 + 1 * 1;
                    seconds = "00";
                }
                break;
            case "init":
                seconds = "00";
                minutes = "00";
                break;



        }
        $("#timeEdit").text(minutes + ":" + seconds);

    }
    this.open_new_timer = function() {
        NavigationMan_.navigate("timersList", "timerEdit");
        var name =timerMan_.getDefaultName();
        $("#timerName").val(name);
        //$("#timerName").val("имя");
        $("#timeEdit").text("00:00");

    }

    this.getEndTimeByName = function(name) {
        var timers = localStorage.getItem('CTCTimers');
        var timersArray = timers.split("timer:");
        
        for(var i = 0; i < timersArray.length; i++) {
            var oneItem = timersArray[i].split("{}");
            if(oneItem[2]==name) {
                
                return oneItem[1];

            }
        }

    }

   this.getStartTimeByName = function(name) {
        var timers = localStorage.getItem('CTCTimers');
        var timersArray = timers.split("timer:");
        
        for(var i = 0; i < timersArray.length; i++) {
            if(timersArray[i].indexOf(name) > -1) {
                var oneItem = timersArray[i].split("{}");
                return oneItem[0];
            }
        }

    }

    this.timer_finish = function(myObj) {
        $(myObj).parent().parent().remove(); 
        

    }



    this.notificationStart = function(time, name) {
       try{
            d = new Date(time);
        plugins.localNotification.add({
                                            date: d,
                                            message: name + 'истекло!',
                                            hasAction: true,
                                            badge: 0,
                                            id: name + '_timer',
                                            sound:'horn.caf'/*,
                                            background:'app.background',
                                            foreground:'app.running'*/
                                            });

       }
       catch(ex){}
    }

    this.notificationStop = function(time, name) {
        try{
           plugins.localNotification.cancel(name + '_timer'); 
        }  
        catch(ex){}

    }



    this.nameToId = function(name) {
        var id = name.replace(/[^A-Za-z0-9]/g, "");
        return id;
    }

    this.hasTimer = function(name) {
        var timers = localStorage.getItem('CTCTimers');
        if(timers != null) {
            var timersArray = timers.split("timer:");
            for(var i = 0; i < timersArray.length; i++) {
                var oneItem = timersArray[i].split("{}");
                if(oneItem[2] == name) {
                    return true;
                }
            }
        }
        return false;
    }
}