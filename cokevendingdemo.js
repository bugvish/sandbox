$.support.cors = true;

setTimeout(function(){	
	$('button#vendingButton').click(function(e){
		freeboard.showLoadingIndicator(true);
		setTimeout(function(){	
			freeboard.showLoadingIndicator(false);
			datasources["VendingMachine"]["count"]++;
			//INCREMENT 
		},5000);
	});	
		
},3000);

