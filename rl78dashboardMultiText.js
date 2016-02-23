window.targetThing = "";
window.userEmailAddress = "";
window.currentMachine = "";
window.LEDstore = [];
$.support.cors = true;

setTimeout(function(){	
	
	if(window.location.hostname !== 'freeboard.thingspace.io') {
        freeboard.showDialog(
            $("<div align='center'>Are you using a Verizon ThingSpace RL78 board?</div>"),
            "Setup Instructions","YES","NO",
            function(){window.location.href = "https://freeboard.thingspace.io/board/eUXnv5";}
        );
	}
	var presetThing = freeboard.getDatasourceSettings("DemoBoard").thing_id;
	if (presetThing !=='') {
		window.setThing(presetThing);
		$("#thingfield").val(presetThing);
		//$("#thingfield").prop('disabled', true);
	    //$('button#thingsubmit').prop("disabled",true);
	}
	
	$('button#thingsubmit').click(function(e){
		window.setThing($("#thingfield").val());
		freeboard.setDatasourceSettings("DemoBoard", {"thing_id":window.targetThing});
	    $("#thingfield").prop('disabled', true);
	    $('button#thingsubmit').prop("disabled",true);
	});	

	$('button#lcdsubmit').click(function(e){		
		var fieldnum = $(this).attr('name');
		console.log(fieldnum);
		var lcdtext = $("#lcdtextfield"+fieldnum).val();
		$(this).prop("disabled",true);	
		window.setRL78Text(lcdtext,fieldnum);
		$("#lcdtextfield"+fieldnum).val('');
	});
	
	$('button#buzzerButton').click(function(e){
		window.sendBuzz();	
	});
	
	$('button#led').click(function(e){
		var lednum = $(this).attr('name');
		if (window.LEDstore[lednum]) {
			//dweetio.dweet_for(window.targetThing+'-send', {lednum:false}, function(err, dweet){console.log(dweet);});	
			window.LEDoff(lednum);
		} 
		else {
			//dweetio.dweet_for(window.targetThing+'-send', {lednum:true}, function(err, dweet){console.log(dweet);});	
			window.LEDon(lednum);
		}
		
	});	
		
},3000);

window.setThing = function(thingname) {
	window.targetThing = thingname;
}
window.LEDoff = function(num) {
	var convert = {};
	convert[num] = false;
	if (window.targetThing == "") {
		freeboard.showDialog($("<div align='center'>Error: Please set thing name!</div>"),"Error!","OK",null,function(){}); 	
		return;	
	}
	dweetio.dweet_for(window.targetThing+'-send', convert, function(err, dweet){console.log(dweet);});
	freeboard.showLoadingIndicator(true);
	setTimeout(function(){	
		freeboard.showLoadingIndicator(false);
	},1000);	
}
window.LEDon = function(num) {
	var convert = {};
	convert[num] = true;
	if (window.targetThing == "") {
		freeboard.showDialog($("<div align='center'>Error: Please set thing name!</div>"),"Error!","OK",null,function(){}); 	
		return;	
	}
	dweetio.dweet_for(window.targetThing+'-send', convert, function(err, dweet){console.log(dweet);});	
	freeboard.showLoadingIndicator(true);
	setTimeout(function(){	
		freeboard.showLoadingIndicator(false);
	},1000);	
}

window.setRL78Text = function(text,linenum) {
	if (window.targetThing == "") {
		freeboard.showDialog($("<div align='center'>Error: Please set thing name!</div>"),"Error!","OK",null,function(){}); 	
		return;	
	}
	var dataToSend = {};
	var target = "lcd_text"+linenum;
	dataToSend[target] = text;
	dweetio.dweet_for(window.targetThing+'-send', dataToSend, function(err, dweet){ if(!err) $("button#lcdsubmit[name='"+linenum+"']").prop("disabled",false);});
 	freeboard.showLoadingIndicator(true);
		setTimeout(function(){	
			freeboard.showLoadingIndicator(false);
		},750);	
}

window.sendBuzz = function() {
	if (window.targetThing == "") {
		freeboard.showDialog($("<div align='center'>Error: Please set thing name!</div>"),"Error!","OK",null,function(){}); 	
		return;	
	}
	dweetio.dweet_for(window.targetThing+'-send', {"beep":true}, function(err, dweet){});
 	freeboard.showLoadingIndicator(true);
	setTimeout(function(){	
		freeboard.showLoadingIndicator(false);
		freeboard.showDialog($("<div align='center'>Buzzer activated on RL78 "+window.targetThing+"</div>"),"Success!","OK",null,function(){}); 
	},750);	
}

