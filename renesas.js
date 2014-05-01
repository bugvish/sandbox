var toswarms = [{swarm: "5dbaf819af6eeec879a1a1d6c388664be4595bb3",resource: "714e1063eaf0f7980238040e777fbe543bc73fdc"}];	
var WEBUI_RESOURCE = "5cf5ad58fa9ad98a01841fde8e1761b2ca473dbf";
var allredon = {name: 'LED', feed:{'led0':true,'led2':true,'led4':true, 'led6':true, 'led8':true, 'led10':true}}; 
var allredoff = {name: 'LED', feed:{'led0':false,'led2':false,'led4':false, 'led6':false, 'led8':false, 'led10':false}}; 
var allyellowon = {name: 'LED', feed:{'led12':true}}; 
var allyellowoff = {name: 'LED', feed:{'led12':false}}; 
var resources = {};
var selectedResource = "";


setTimeout(function(){
	$('button#emailsubmit').click(function(e){
		var emailaddy = $("#emailfield").val();
	    	console.log(emailaddy);
	    	window.setEmailAddress(emailaddy);
	    	$("#emailfield").prop('disabled', true);
	    	$('button#emailsubmit').prop("disabled",true);
	});	
	
//	deviceSelect
	
	
	},3000);

function onPresence(presence) {
	console.log(presence);

    if (("swarm" in presence.from) && (presence.from.resource !== WEBUI_RESOURCE)){
        var resource = presence.from.resource;
        var swarm = presence.from.swarm;
        if (presence.type === "unavailable"){
		delete resources[resource];
       		$('option#' + resource).remove();
        }
        else {
        	resources[resource] = resource;
		if ('XDomainRequest' in window && window.XDomainRequest !== null) {
			// Use Microsoft XDR for Internet Explorer	
			var xdr = new XDomainRequest();
			if(xdr) {
				xdr.onerror = function() { console.log('xdr error!');};
				xdr.ontimeout = function() { console.log('timed out'); return;};
				xdr.onprogress = function() { return; };
				xdr.timeout = 5000;
				xdr.onload = function () {
					var dom = new ActiveXObject("Microsoft.XMLDOM");
					dom.async = false;
					dom.loadXML(xdr.responseText);
					console.log('response: '+xdr.responseText);
					resources[swarm][resource] = xdr.responseText;
					$('option').filter('#'+resource).html(xdr.responseText);
				};
				xdr.open("GET", "http://api.bugswarm.com/renesas/getmac/"+resource);
				xdr.send(null);
			}
		}
		else {
		        var url = 'http://api.bugswarm.com/resources/' + resource;
		        var xhr = createCORSRequest('GET', url);
		        xhr.onload = function() {
		          var responseText = xhr.responseText;
		          var data = {};
		          try {
		            data = JSON.parse(xhr.responseText);
		          } catch(e) {
		            console.error(e);
		          }
		          // process the response.
		          console.log(data.id+' is named '+data.name);
		              //$('option').filter('#'+resource).html(data.name);
		          resources[swarm][resource] = data.name;
		          $('option').filter('#'+resource).html(data.name);
		        };
		  
		        xhr.onerror = function() {
		          console.log('CORS request: There was an error!');
		        };
		  
		        xhr.setRequestHeader(
		          'x-bugswarmapikey', CFG_KEY);
		        xhr.send();
		}
		populateResourceList();
		
        } else{
        	
        }

}

function populateResourceList() {
  $('option.reslistitem').remove();
  for (var resource in resources){
    $('select#deviceSelect').append('<OPTION class=reslistitem VALUE='+resource+' id='+resource+'>'+resources[resource]+'</OPTION>');
  }
}

window.alertActive = false;
window.emailActive = false;
window.userEmailAddress = "";
window.servicerq1 = false;
window.servicerq2 = false;

window.tipAlert = function(){
	//message.feed['led12']=(true);
	SWARM.send(allredon, toswarms);
	freeboard.showDialog($("<div>Alert!  Machine was tipped over.  Send Repair Team.</div>"),"Alert","ok",null,function(){window.alertActive=false;SWARM.send(allredoff, toswarms);}); 
	window.alertActive = true;
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
		      'subject': 'RL78 Refridgeration Alert!',
		      'html': 'Temperature exceeded threshold'
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
	freeboard.showDialog($("<div>Service Request Detected!  Please press Confirm</div>"),"Alert","Confirm",null,function(){SWARM.send(allyellowon, toswarms);}); 
}

window.endServiceRequest = function() {
	window.servicerq2 = true;
	SWARM.send(allyellowoff, toswarms);
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

