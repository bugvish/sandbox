setTimeout(function(){
	SWARM.leave(["69df1aea11433b3f85d2ca6e9c3575a9c86f8182"]);
	SWARM.join(["69df1aea11433b3f85d2ca6e9c3575a9c86f8182","5dbaf819af6eeec879a1a1d6c388664be4595bb3"]);},5000);


var toswarms = [{swarm: "5dbaf819af6eeec879a1a1d6c388664be4595bb3",resource: "714e1063eaf0f7980238040e777fbe543bc73fdc"}];	


window.alertActive = false;

window.tipAlert = function(){
	var message = {name: 'LED', feed:{'led3':true,'led5':true,'led7':true}}; 
	//message.feed['led12']=(true);
	SWARM.send(message, toswarms);
	freeboard.showDialog($("<div>Alert!  Machine was tipped over.  Send Repair Team.</div>"),"Alert","ok",null,function(){window.alertActive=false;}); 
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
