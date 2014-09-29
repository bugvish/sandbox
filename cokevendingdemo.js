$.support.cors = true;

window.count = 146;
window.proximitycount = 198;
window.pointscount = 180;
window.alreadyVerified = false;

setTimeout(function(){	
	$('button#vendingButton').click(function(e){
		freeboard.showLoadingIndicator(true);
		setTimeout(function(){	
			freeboard.showLoadingIndicator(false);
			//datasources["VendingMachine"]["count"]++;
			window.count++;
		},3000);
	});	
		
},3000);

window.showVerificationAlert = function() {
	
	freeboard.showDialog($("<div align='center'>Reward points confirmed!  Please press Coke button to trigger vend.</div>"),"Confirmed!","OK",null,function(){}); 
}
