var app = {
    initialize: function() {
        this.bind();
    },
    bind: function() {
        document.addEventListener('deviceready', this.deviceready, false);
    },
    deviceready: function() {
        window.plugins.applicationPreferences.set('idleTimerDisabled','YES', function() {                                                  
                                                  }, function(error) {
                                                  }
                                                  );
       
        window.echo("echome", function(echoValue) {
                    alert(echoValue == "echome");});
        // note that this is an event handler so the scope is that of the event
        // so we need to call app.report(), and not this.report()
        app.report('deviceready');
        app.report('Installing child browser');
        //ChildBorwser init
        client_browser = ChildBrowser.install();
        app.report('installed child browser'); // for some reason this doesn't run
        
    },
    report: function(id) {
        console.log("report:" + id);
        // hide the .pending <p> and show the .complete <p>
        document.querySelector('#' + id + ' .pending').className += ' hide';
        var completeElem = document.querySelector('#' + id + ' .complete');
        completeElem.className = completeElem.className.split('hide').join('');
    }
};
