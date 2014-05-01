setTimeout(function(){
	SWARM.leave(["69df1aea11433b3f85d2ca6e9c3575a9c86f8182"]);
	SWARM.join(["69df1aea11433b3f85d2ca6e9c3575a9c86f8182","5dbaf819af6eeec879a1a1d6c388664be4595bb3"]);},5000);


function toggleLEDS() {
	var toswarms = [{swarm: "5dbaf819af6eeec879a1a1d6c388664be4595bb3",resource: "714e1063eaf0f7980238040e777fbe543bc73fdc"}];	
	var message = {name: 'LED', feed:{}}; 
	message.feed[10]=(true);
	SWARM.send(message, toswarms);
}
