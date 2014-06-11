var allredon = {name: 'LED', feed:{'led0':true,'led2':true,'led4':true, 'led6':true, 'led8':true, 'led10':true}}; 
var allredoff = {name: 'LED', feed:{'led0':false,'led2':false,'led4':false, 'led6':false, 'led8':false, 'led10':false}}; 
var allyellowon = {name: 'LED', feed:{'led12':true}}; 
var allyellowoff = {name: 'LED', feed:{'led12':false}}; 
var resources = {};


window.targetThing = "";
window.alertActive = false;
window.emailActive = false;
window.userEmailAddress = "";
window.servicerq1 = false;
window.servicerq2 = false;

$.support.cors = true;

setTimeout(function(){
	$('button#thingsubmit').click(function(e){
		window.setThing($("#thingfield").val());
		freeboard.setDatasourceSettings("DemoBoard", {"name":window.targetThing});
	    	console.log(window.targetThing);
	    	$("#thingfield").prop('disabled', true);
	    	$('button#thingsubmit').prop("disabled",true);
	
		dweetio.dweet_for(window.targetThing+'-send', {"led3":true}, function(err, dweet){
		if (dweet.this === "succeeded") {
			console.log("yayyya");
		}
	});

	});	
	$('button#emailsubmit').click(function(e){
		var emailaddy = $("#emailfield").val();
	    	console.log(emailaddy);
	    	window.setEmailAddress(emailaddy);
	    	$("#emailfield").prop('disabled', true);
	    	$('button#emailsubmit').prop("disabled",true);
	});	
	
},3000);


window.tipAlert = function(){
	//message.feed['led12']=(true);
	dweetio.dweet_for(window.targetThing+'-send', {"led3":true}, function(err, dweet){
		if (dweet.this === "succeeded") {
			console.log("yayyya);
		}
	});
	//SWARM.send(allredon, [{swarm: "5dbaf819af6eeec879a1a1d6c388664be4595bb3",resource: window.selectedResource}]);
	//freeboard.showDialog($("<div align='center'>Alert!  Machine was tipped over.  Send Repair Team.</div>"),"Alert","ok",null,function(){window.alertActive=false;SWARM.send(allredoff, [{swarm: "5dbaf819af6eeec879a1a1d6c388664be4595bb3",resource: window.selectedResource}]);}); 
	//window.alertActive = true;
}

window.toggleBuzzer = function() {
	 SWARM.send({
            name: 'Beep',
            feed: {

              freq: 500,
              duration: 1}}, toswarms);
        freeboard.showDialog($("<div>hello world</div>"),"test","ok",null,function(){window.alertActive=false;}); 
        window.alertActive = true;
}

window.setThing = function(thingname) {
	window.targetThing = thingname;
}

window.setEmailAddress = function(email) {
	window.userEmailAddress = email;
}

window.sendEmailAlert = function() {
	window.emailActive = true;
	if (window.userEmailAddress !== '') {
		$.ajax({
		  type: "POST",
		  url: "https://mandrillapp.com/api/1.0/messages/send.json",
		  data: {
		    'key': 'gNeJtNdrBCy42EZp3dsMbw',
		    'message': {
		      'from_email': 'alerts@bugswarm.com',
		      'to': [
		          {
		            'email': window.userEmailAddress,
		            'type': 'to'
		          }
		        ],
		      'autotext': 'true',
		      'subject': 'RL78 Refrigeration Alert!',
		      'html': 'Temperature exceeded threshold.'
		    }
		  }
		 }).done(function(response) {
		 });
	}
}

window.resetEmail = function() {
	window.emailActive = false;
}

window.startServiceRequest = function() {
	window.servicerq1 = true;
	freeboard.showDialog($("<div align='center'>Service Request Detected!  Please press Confirm</div>"),"Alert","Confirm",null,function(){SWARM.send(allyellowon, [{swarm: "5dbaf819af6eeec879a1a1d6c388664be4595bb3",resource: window.selectedResource}]);}); 
}

window.endServiceRequest = function() {
	window.servicerq2 = true;
	SWARM.send(allyellowoff, [{swarm: "5dbaf819af6eeec879a1a1d6c388664be4595bb3",resource: window.selectedResource}]);
}

/*
setTimeout(function(){
	$('button#emailsubmit').click(function(e){
		var emailaddy = $("#emailfield").val();
	    	console.log(emailaddy);
	    	window.setEmailAddress(emailaddy);
	    	$("#emailfield").prop('disabled', true);
	    	$('button#emailsubmit').prop("disabled",true);
	});
},10000); */

