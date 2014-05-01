setTimeout(function(){
	SWARM.leave(["69df1aea11433b3f85d2ca6e9c3575a9c86f8182"]);
	SWARM.join(["69df1aea11433b3f85d2ca6e9c3575a9c86f8182","5dbaf819af6eeec879a1a1d6c388664be4595bb3"]);},5000);


var toswarms = [{swarm: "5dbaf819af6eeec879a1a1d6c388664be4595bb3",resource: "714e1063eaf0f7980238040e777fbe543bc73fdc"}];	
var allredon = {name: 'LED', feed:{'led0':true,'led2':true,'led4':true, 'led6':true, 'led8':true, 'led10':true}}; 
var allredoff = {name: 'LED', feed:{'led0':false,'led2':false,'led4':false, 'led6':false, 'led8':false, 'led10':false}}; 


window.alertActive = false;

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

window.sendEmailAlert = function(email) {
	$.ajax({
	  type: “POST”,
	  url: “https://mandrillapp.com/api/1.0/messages/send.json”,
	  data: {
	    ‘key’: ‘gNeJtNdrBCy42EZp3dsMbw’,
	    ‘message’: {
	      ‘from_email’: ‘alerts@bugswarm.com’,
	      ‘to’: [
	          {
	            ‘email’: email,
	            ‘type’: ‘to’
	          }
	        ],
	      ‘autotext’: ‘true’,
	      ‘subject’: ‘RL78 Refridgeration Alert!’,
	      ‘html’: ‘Temperature exceeded threshold’
	    }
	  }
	 }).done(function(response) {
	   console.log(response); // if you're into that sorta thing
	 });
}
