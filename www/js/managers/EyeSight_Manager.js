var eyesightMan = {
    init: function() {
       // alert("ready");
        this.startEngine("echome", function(echoValue) {
                         alert(echoValue == "echome");});
        
    },
    
    startEngine: function(str, callback) {
        try
        {
        cordova.exec(callback, function(err) {
                     callback('Nothing to echo.');
                     }, "EyeSight", "eyeSight", [str]);
        } catch(err) {}
    },
    
    returnFunc: function(echoValue) 
    {    
        //alert(echoValue);
        gesture(echoValue);
    },
    
    changeDirection: function(dir){
        this.startEngine(dir,function(echoValue) {  app.report("99");
                         eyesightMan.returnFunc(echoValue); // should alert true.
                         });
    
    }
};
