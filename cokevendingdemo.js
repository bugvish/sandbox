$.support.cors = true;

setTimeout(function(){	
	$('button#vendingButton').click(function(e){
		dweetio.dweet_for('coke-vendingdemo-waltham', {"credit":200}, function(err, dweet){});
		freeboard.showLoadingIndicator(true);
		setTimeout(function(){	
			freeboard.showLoadingIndicator(false);
			freeboard.showDialog($("<div align='center'>Vending Machine Credit Sent!  Please make a selection.</div>"),"Success!","OK",null,function(){}); 
		},7000);
	});	
		
},3000);

