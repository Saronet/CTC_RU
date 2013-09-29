
function TimerMan() {
    this.image_start = "images/timer_start_btni.png";
    this.image_reset = "images/timer_recet_btn.png";
    this.image_delete = "<img class=\"timer_delete_btn\" onclick=\"timerMan_.deleteTimer(this)\" alt=\"\" src=\"images/timer_delete_btn.png\" />";
    this.image_finish="<img class=\"finish_background\" alt=\"\" src=\"images/timer_finished_background.png\" />";

    this.showPage = function() {

        NavigationMan_.navigate("tools", "timer");

        //this.setTimerList();
    }

    this.attachEvents = function() {
        $("#timer_cancel_btn").click(function() {
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

        $("#timer_Start_btn").click(function() {

            if($("#timeEdit").text() == "00:00") {
                alert("Timer should be at least 10 seconds");
            }

            else if($("#timerName").val() != "00:00") {

                //add timer to localStorage
                var oldTimers = localStorage.getItem("CTCTimers");
                if(oldTimers == undefined) {
                    oldTimers = "";
                }
                //startTime + {} + how many time plus start time + {} + name  
                var date = new Date();
                var startTime = date.getTime();
                var time = timerMan_.convertToMiliseconds($("#timeEdit").text());
                time = time + startTime; //$("#timeEdit").text();
                var name = $("#timerName").val();
                if(name == "" || name == "The Name")//there is no name - set default
                {
                    var index = 1;
                    // var timers = timerListFromStorage.split("timer:");
                    var timersIndexForName = localStorage.getItem("CTCTimersIndex");
                    if(timersIndexForName == undefined) {
                        timersIndexForName = "1";
                    }
                    else {
                        timersIndexForName = timersIndexForName * 1 + 1;
                    }
                    localStorage.setItem("CTCTimersIndex", timersIndexForName);

                    name = "timer " + timersIndexForName;

                }
                /* $("#timerName").val(name);
                var newTimer = 'timer:' + startTime + '{}' + time + '{}' + name + '{}' + "play";
                localStorage.setItem('CTCTimers', oldTimers + newTimer);
                //add timer to list
                timerMan_.addTimerToList();
                //navigate to timers list
                NavigationMan_.navigate(NavigationMan_.pagePosition, "timersList");

                //push notification
                timerMan_.notificationStart(time, name);*/


                /* $("#tryTimer .timer_name").text(name);
                checkHtml($("#tryTimer .timer_name"), 90);
                name = $("#tryTimer .timer_name").text();*/
                if(name.length > 10) { name = name.substr(0, 9) + ".."; }
                //******************************
                $("#timerName").val(name);
                var newTimer = 'timer:' + startTime + '{}' + time + '{}' + name + '{}' + "play";
                localStorage.setItem('CTCTimers', oldTimers + newTimer);
                //add timer to list
                timerMan_.addTimerToList();
                //navigate to timers list
                NavigationMan_.navigate(NavigationMan_.pagePosition, "timersList");

                //push notification
                timerMan_.notificationStart(time, name);
            }
        });

    }
    this.setTimerList = function() {

        if(isIpad()) {
            timerMan_.image_start = "images_ipad/timer_start_btni.png";
            timerMan_.image_reset = "images_ipad/timer_reset_btni.png";
            timerMan_.image_delete = "<img class=\"timer_delete_btn\" onclick=\"timerMan_.deleteTimer(this)\" alt=\"\" src=\"images_ipad/timer_delete_btn.png\" />";
            timerMan_.image_finish = "<img class=\"finish_background\" alt=\"\" src=\"images_ipad/timer_finished_background.png\" />";

        }
        var timerListFromStorage = localStorage.getItem('CTCTimers');
        if(timerListFromStorage != null) {
            var timers = timerListFromStorage.split("timer:");

            for(var i = 1; i < timers.length; i++) {
                //                $(".add_timer_btn").css("margin-top", "15px");
                $(".add_timer_btn").css("margin-top", "-3px");
                if(timers[i].length > 0) {
                    //add timer btn position
                    $(".add_timer_btn").css("margin-top", "-3px");
                    var oneItem = timers[i].split("{}");
                    var name = oneItem[2];
                    var startTime = oneItem[0];
                    var time = oneItem[1];
                    var isPlay = oneItem[3];

                    var date = new Date();
                    var now = date.getTime();
                    var differTime = (now - startTime);


                    if(now < time * 1) {
                        var timeToDisplay = timerMan_.convertFromMiliToString(time - now);
                        //if(isPlay == "play")
                        //{
                        //    $(this).data("status", "play");
                        //   
                        //}
                        ////if its pause
                        //else{
                        //     $(this).data("status", "stop");
                        //     timeToDisplay 
                        //     
                        //}
                    }

                    if(isPlay == "stop") {
                        //$(this).data("status", "stop");
                        //$(this).children(".timer_toPic_position").children(".timer_recet_btn").attr("src", "images/timer_recet_btni.png");
                        timeToDisplay = timerMan_.convertFromMiliToString(time - startTime);
                        // isPlay = false;
                    }
                    //else {
                    //    $(this).data("status", "stop");
                    //    $(this).children(".timer_toPic_position").children(".timer_recet_btn").attr("src", "images/timer_recet_btni.png");
                    //    timeToDisplay = timerMan_.convertFromMiliToString(time - startTime);
                    //    isPlay = false;
                    //}
                    timerMan_.updateStatusInLocal(name, isPlay);


                    $("#timer_list_middel").append("<div class=\"new_timer\">" +
                                    "<span class=\"timer_name\">" + name + "</span>" +
                                    "<div class=\"timer_toPic_position\"><span class=\"timer_clock\">" + timeToDisplay + " </span>" +
                                    "<img class=\"timer_recet_btn\" onclick=\"timerMan_.initOrStart(this)\" alt=\"\" src=" + timerMan_.image_start + " />"
                                      + timerMan_.image_delete +
                                    "</div>" +
                                "</div>");

                    var currentTimer = $("#timer_list_middel .new_timer")[i - 1];
                    var duration = timerMan_.convertFromMiliToString(time - startTime);
                    $(currentTimer).data("duration", duration);
                    if(isPlay == "play") {
                        $(currentTimer).children(".timer_toPic_position").children(".timer_recet_btn").attr("src", timerMan_.image_reset);
                        $(currentTimer).data("status", "play");
                    }
                    else if(isPlay == "stop") {
                        $(currentTimer).children(".timer_toPic_position").children(".timer_recet_btn").attr("src", timerMan_.image_start);
                        $(currentTimer).data("status", "stop");

                    }
                    // timerMan_.updateStatusInLocal($(currentTimer).children(".timer_name").text(),$(currentTimer).data("status"));




                    var height = $("#timer_list_middel").css("height");
                    height = height.substring(0, height.length - 2);
                    //$("#timer_list_middel").css("height", height * 1 + 220 + "px"); //ipad
                    //                    $("#timer_list_middel").css("height", height * 1 + 100 + "px");iphone

                }
            }
        }
        setInterval(timerMan_.setTimers, 1000);

    }

    this.initOrStart = function(initStartBtn) {
        var timerWrap = $(initStartBtn).parents(".new_timer");
        var name = $(timerWrap).children(".timer_name").text();
        var time = $(timerWrap).data("duration");
        var status = $(timerWrap).data("status");
        if(status == "play") {

            $(timerWrap).data("status", "stop");
            $(timerWrap).children(".timer_toPic_position").children(".timer_clock").text(time);
            $(initStartBtn).attr("src", timerMan_.image_start);

            timerMan_.notificationStop(timerMan_.convertToMiliseconds(time), name);

        }

        else if(status == "stop") {
            $(timerWrap).data("status", "play");
            $(timerWrap).data("duration");
            //            $(initStartBtn).attr("src", "images/timer_start_btni.png"); iphone
            $(initStartBtn).attr("src", timerMan_.image_reset);
            //update storage
            var date = new Date();
            var now = date.getTime();
            var updateTime;
            var oldTimers = localStorage.getItem('CTCTimers');
            var timersArray = oldTimers.split("timer:");
            for(var i = 0; i < timersArray.length; i++) {
                if(timersArray[i].indexOf(name) > -1) {
                    var oneItem = timersArray[i].split("{}");
                    oneItem[0] = now;
                    var timeMili = timerMan_.convertToMiliseconds(time);
                    oneItem[1] = now + timeMili;
                    updateTime = oneItem[1];
                    oneItem[2] = name;
                    oneItem[3] = "play";
                    timersArray[i] = oneItem[0] + "{}" + oneItem[1] + "{}" + oneItem[2] + "{}" + oneItem[3];
                    timerMan_.updateTimersStorage(timersArray);
                }
            }
            timerMan_.notificationStart(updateTime, name);


        }

        timerMan_.updateStatusInLocal(name, $(timerWrap).data("status"));
    }

    this.updateStatusInLocal = function(name, status) {
        var oldTimers = localStorage.getItem('CTCTimers');
        var timersArray = oldTimers.split("timer:");
        for(var i = 0; i < timersArray.length; i++) {
            if(timersArray[i].indexOf(name) > -1) {
                var oneItem = timersArray[i].split("{}");
                oneItem[3] = status;
                timersArray[i] = oneItem[0] + "{}" + oneItem[1] + "{}" + oneItem[2] + "{}" + oneItem[3];
                timerMan_.updateTimersStorage(timersArray);
            }
        }

    }

    this.deleteTimer = function(deleteBtn) {
        var timerWrap = $(deleteBtn).parents(".new_timer");
        $(timerWrap).hide();
        var name = $(timerWrap).children(".timer_name").text();

        //delete from storage
        var oldTimers = localStorage.getItem('CTCTimers');
        var timersArray = oldTimers.split("timer:");
        var duration;
        for(var i = 0; i < timersArray.length; i++) {
            if(timersArray[i].indexOf(name) > -1) {
                oneItem = timersArray[i].split("{}");
                duration = oneItem[2];
                timersArray.splice(i, 1);

            }
        }
        //var height = $("#timer_list_middel").css("height");
        //height = height.substring(0, height.length - 2);
        //        $("#timer_list_middel").css("height", height * 1 - 100 + "px");iphone
        //        $("#timer_list_middel").css("height", height * 1 - 100 + "px");iphone
        //$("#timer_list_middel").css("height", height * 1 - 220 + "px");
       // $("#timer_list_middel").css("height", height * 1 - 220 + "px");
        timerMan_.updateTimersStorage(timersArray);

        if(("#timer_list_middel .new_timer").length > 0) {
            var withPlayTimers = false;
            $("#timer_list_middel .new_timer").each(function() {
                if(!$(this).css("display") == "none") {
                    withPlayTimers = true;
                }
            });
            if(withPlayTimers == false) {
               $(".add_timer_btn").css("margin-top", "0px")
       
            }

        }
        //delete from notification
        timerMan_.notificationStop(duration, name);
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
                //var time = $(this).children(".timer_toPic_position").children(".timer_clock").text();
                var name = $(this).children(".timer_name").text();
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
                        
                        $(".main_background").append("<div id=\"" + nameId + "\" class=\"timer_finish\"><span class=\"timer_all_background_black\"></span>"+ timerMan_.image_finish +
                                                        "<span class=\"timer_finish_title\">ТАЙМЕР</span><div id=\"timer_finish_recipe_name\" class=\"timer_finish_recipe_name\">ПИРОГ С КАПУСТОЙ</div>" +
                                                        "<div class=\"timer_finish_finish_text\">ПРИГОТОВЛЕН!</div><span class=\"timer_ok_border\" ontouchend=\"timerMan_.timer_finish(this)\"><span class=\"timer_finish_OK\">OK</span></span></div>");
                       $(".timer_all_background_black").first().css("background-color", "black");
                        $(timer_name).text(name);
                        //$(".timer_page").show();
                        timer_name = "#" + nameId;
                        $(timer_name).show();




                        //alert(name + "timer has ended!")
                    }

                    //                    $(this).children(".timer_toPic_position").children(".timer_recet_btn").attr("src", "images/timer_start_btni.png"); iphone
                    $(this).children(".timer_toPic_position").children(".timer_recet_btn").attr("src", timerMan_.image_start);
                    //var name = $(this).children(".timer_name").text();
                    $(this).data("status", "stop");

                    timerMan_.updateStatusInLocal(name, $(this).data("status"));
                    toolsMan_.setTimersCounter();
                    updated = $(this).data("duration");

                    //show timer finish page 


                    timerMan_.notificationStop(timerMan_.convertToMiliseconds(updated), name);


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
        /*if(timeArr[0] == "9" || timeArr[0] == "8" || timeArr[0] == "7" || timeArr[0] == "6" || timeArr[0] == "5" || timeArr[0] == "4" || timeArr[0] == "3" || timeArr[0] == "2" || timeArr[0] == "1" || timeArr[0] == "0") {
        timeArr[0] = "0" + timeArr[0];

        }*/

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
    //image_start 
    //image_reset 
    //image_delete



    this.addTimerToList = function() {
        $("#timer_list_middel").append("<div class=\"new_timer\">" +
                                "<span class=\"timer_name\">" + $("#timerName").val() + "</span>" +
                                "<div class=\"timer_toPic_position\"><span class=\"timer_clock\">" + $("#timeEdit").text() + "</span>" +
                                "<img class=\"timer_recet_btn\" onclick=\"timerMan_.initOrStart(this)\" alt=\"\" src=" + timerMan_.image_reset + " />"
                                      + timerMan_.image_delete +
                                "</div>" +
                            "</div>");
        var currentTimers = $("#timer_list_middel .new_timer");
        var currentT = $(currentTimers)[currentTimers.length - 1];
        $(currentT).data("duration", $("#timeEdit").text());
        $(currentT).data("status", "play");
        var height = $("#timer_list_middel").css("height");
        height = height.substring(0, height.length - 2);
      //  $("#timer_list_middel").css("height", height * 1 + 100 + "px"); iphone
         //$("#timer_list_middel").css("height", height * 1 + 200 + "px");

        $("#timerName").val("");

        //add timer button position
       // $(".add_timer_btn").css("margin-top", "15px");iphone
         $(".add_timer_btn").css("margin-top", "-22px");

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

        $("#timeEdit").text("00:00");

    }

    this.getEndTimeByName = function(name) {
        var timers = localStorage.getItem('CTCTimers');
        var timersArray = timers.split("timer:");
        // var date = new Date();
        //var absoluteTime = date.getTime();
        for(var i = 0; i < timersArray.length; i++) {
            if(timersArray[i].indexOf(name) > -1) {
                var oneItem = timersArray[i].split("{}");
                return oneItem[1];

            }
        }

    }

    this.getStartTimeByName = function(name) {
        var timers = localStorage.getItem('CTCTimers');
        var timersArray = timers.split("timer:");
        // var date = new Date();
        //var absoluteTime = date.getTime();
        for(var i = 0; i < timersArray.length; i++) {
            if(timersArray[i].indexOf(name) > -1) {
                var oneItem = timersArray[i].split("{}");
                return oneItem[0];

            }
        }

    }

    this.timer_finish = function(myObj) {
        $(myObj).parent().remove();
        
        //$(".timer_list").show();
        //$("#timer_finish_recipe_name").text(name);

        // $(".timer_page").show();

    }



    this.notificationStart = function(time, name) {
        //d = new Date(time);
        //plugins.localNotification.add({
        //                                    date: d,
        //                                    message: name + ' has ended!',
        //                                    hasAction: true,
        //                                    badge: 0,
        //                                    id: name + '_timer',
        //                                    sound:'horn.caf'/*,
        //                                    background:'app.background',
        //                                    foreground:'app.running'*/
        //                                    });
    }

    this.notificationStop = function(time, name) {
        //  plugins.localNotification.cancel(name + '_timer');

    }



    this.nameToId = function(name) {
        return name.replace(/\s/g, '');
    }
}