var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
      showLogo();
//        var parentElement = document.getElementById(id);
//        var listeningElement = parentElement.querySelector('.listening');
//        var receivedElement = parentElement.querySelector('.received');

//        listeningElement.setAttribute('style', 'display:none;');
//        receivedElement.setAttribute('style', 'display:block;');
//$("div").html("<font color=white size=36>TEST!!</font>");
//$("div").load("http://www.mplus.com.tw");
//	window.open('http://www.mplus.com.tw','_self');
//	window.location = "http://www2.mplus.com.tw";

//	$(".loading").click(showFBpage);
//	setTimeout(function(){
//	if (window.cordova.platformId == "browser") {
//		    facebookConnectPlugin.browserInit(1999496016942296);
		        // version is optional. It refers to the version of API you may want to use.
//	 }},1000);
//	facebookConnectPlugin.browserInit(1999359246955973);
//       	setTimeout(function(){
//	showFBpage();
//	},1000);
	$("iframe").load(function(e){
		//window.plugins.spinnerDialog.hide();
    window._iframe_loaded = true;
	});
//	window.plugins.spinnerDialog.show("MPlus","loading...");
//window.sum(2, 3, function(result) { alert("Result:" + result); }, function(err) { alert(err); });
//	cordova.exec(function(success){},function(err){alert(err);},"MyToast","showToast",["it works"]);
        console.log('Received Event: ' + id);

    }
};



function showLogo(){
  var height = $(".loading").height();
	var width = $(".loading").width();
	var posX = width /2;
	var posY = height /2;
	$("<div id='loading_div' class='div' style='opacity:0;top:"+(height*2/3)+"px;left:"+(posX-100)+"px'><img src='img/logo_20862.jpg' style='opacity:1;position:absolute'></img></div>").appendTo(".loading");
  $("#loading_div").css('width','208px');
  $("#loading_div").css('height', '100px');
	$("#loading_div").animate({opacity:1,top:(posY-50)+"px"},1000,function(){
    $("<div id='login_fb' style='opacity:0;position:absolute;top:70px;left:30px;font-size:12pt'>請登入FB後使用</div>").appendTo($("#loading_div"));
    $("#login_fb").animate({opacity:1},1000,function(){
      if (window.cordova.platformId == "browser") {
            facebookConnectPlugin.browserInit(1999359246955973);
        }
      setTimeout(
        function(){
            showFBpage();
        }
        ,1000
      );

    });
		//showFBpage();
	});

}

function showFBpage(){

var fbLoginSuccess = function (userData) {
  console.log("UserInfo: ", userData);
  facebookConnectPlugin.getAccessToken(function(token) {
        //alert("Token: " + token);
          fadeoutLogo(
            function(){
              var _id = setInterval(function(){
                if(window._iframe_loaded){
                  $(".loading").remove();
                  clearInterval(_id);
                }
              },500);
            }
          );
	    });
}

facebookConnectPlugin.login(["public_profile","user_likes"], fbLoginSuccess,
		  function (error) {
			      alert("登入失敗!!");
	  }
	  );
}

function fadeoutLogo(cb){
	var height = $(".loading").height();
	var width = $(".loading").width();
	var posX = width /2;
	var posY = height /2;
	$("#loading_div").animate({opacity:0,top:(posY/2)+"px"},1000,function(){
			$(".loading").animate({opacity:0},200,function(){
//				$(".loading").remove();
				cb.call(window);
			});
		});
}

//console.log("TEST");
app.initialize();
