window.targetThing = "";
window.alertActive = false;
window.emailActive = false;
window.userEmailAddress = "";
window.currentMachine = "";

$.support.cors = true;

setTimeout(function(){	
	$('button#emailsubmit').click(function(e){
			var emailaddy = $("#emailfield").val();
	    	console.log(emailaddy);
	    	window.setEmailAddress(emailaddy);
	    	$("#emailfield").prop('disabled', true);
	    	$('button#emailsubmit').prop("disabled",true);	
	});	
	$('button#alertButton').click(function(e){
			var emailaddy = $("#emailfield").val();
//	    	$("#emailfield").prop('disabled', true);
	    	$('button#alertButton').prop("disabled",true);
	    	window.sendEmailAlert();
	});	
	$('select#deviceSelect').on('change', function (e) {
			var optionSelected = $("option:selected", this);
    		var valueSelected = this.value;
   			populateStoreList(valueSelected);
	});
	$('select#reportSelect').on('change', function (e) {
			var optionSelected = $("option:selected", this);
    		var valueSelected = this.value;
			freeboard.showLoadingIndicator(true);
			setTimeout(function(){	
				freeboard.showLoadingIndicator(false);
				window.location = valueSelected; 
			},1000);
	});
	$('#storeTablediv').parent().parent().parent().css({overflow:"scroll"});
	$('#machinediv input').change(function () {
        // The one that fires the event is always the
        // checked one; you don't need to test for this
        var newMachine = $(this).val();
        window.currentMachine = newMachine;
        changeMachine(newMachine);
    });
	$('#alertdiv input').change(function () {
        // The one that fires the event is always the
        // checked one; you don't need to test for this
        var newSelection = $(this).val();
		if (newSelection == "mix_out" || newSelection == "mix_low") {
			$('#alertthresh').prop('disabled', true);
		}
		else $('#alertthresh').prop('disabled', false);
    });
		
},3000);


function populateStoreList(region) {
	$('tr.storeentry').remove();
	if (region === 'ALL') {
		$("#storetable > tbody:last").append('<tr class="storeentry"><td class="StoreCell"><a id="store1" onclick="changeStore()" href="#">Store 1111</a></td><td class="ZipCell">91225</td><td class="StatusCell; red">1</td></tr>');
		$("#storetable > tbody:last").append('<tr class="storeentry"><td class="StoreCell"><a id="store2" onclick="changeStore()" href="#">Store 2222</a></td><td class="ZipCell">10007</td><td class="StatusCell; red">1</td></tr>');
		$("#storetable > tbody:last").append('<tr class="storeentry"><td class="StoreCell"><a id="store2" onclick="changeStore()" href="#">Store 3333</a></td><td class="ZipCell">10011</td><td class="StatusCell; red">1</td></tr>');
		$("#storetable > tbody:last").append('<tr class="storeentry"><td class="StoreCell"><a id="store2" onclick="changeStore()" href="#">Store 4444</a></td><td class="ZipCell">44313</td><td class="StatusCell; red">1</td></tr>');
		$("#storetable > tbody:last").append('<tr class="storeentry"><td class="StoreCell"><a id="store2" onclick="changeStore()" href="#">Store 5555</a></td><td class="ZipCell">11880</td><td class="StatusCell; red">1</td></tr>');
		$("#storetable > tbody:last").append('<tr class="storeentry"><td class="StoreCell"><a id="store2" onclick="changeStore()" href="#">Store 2121</a></td><td class="ZipCell">10007</td><td class="StatusCell; red">1</td></tr>');
		$("#storetable > tbody:last").append('<tr class="storeentry"><td class="StoreCell"><a id="store2" onclick="changeStore()" href="#">Store 3131</a></td><td class="ZipCell">25135</td><td class="StatusCell; red">1</td></tr>');
		$("#storetable > tbody:last").append('<tr class="storeentry"><td class="StoreCell"><a id="store2" onclick="changeStore()" href="#">Store 4141</a></td><td class="ZipCell">62002</td><td class="StatusCell; red">1</td></tr>');
		$("#storetable > tbody:last").append('<tr class="storeentry"><td class="StoreCell"><a id="store2" onclick="changeStore()" href="#">Store 5151</a></td><td class="ZipCell">09822</td><td class="StatusCell; red">1</td></tr>');
		$("#storetable > tbody:last").append('<tr class="storeentry"><td class="StoreCell"><a id="store2" onclick="changeStore()" href="#">Store 6161</a></td><td class="ZipCell">27652</td><td class="StatusCell; red">1</td></tr>');
		$("#storetable > tbody:last").append('<tr class="storeentry"><td class="StoreCell"><a id="store2" onclick="changeStore()" href="#">Store 4242</a></td><td class="ZipCell">33445</td><td class="StatusCell; red">1</td></tr>');
		$("#storetable > tbody:last").append('<tr class="storeentry"><td class="StoreCell"><a id="store2" onclick="changeStore()" href="#">Store 2424</a></td><td class="ZipCell">89898</td><td class="StatusCell; red">1</td></tr>');
		$("#storetable > tbody:last").append('<tr class="storeentry"><td class="StoreCell"><a id="store2" onclick="changeStore()" href="#">Store 6464</a></td><td class="ZipCell">10220</td><td class="StatusCell; red">1</td></tr>');
		$("#storetable > tbody:last").append('<tr class="storeentry"><td class="StoreCell"><a id="store2" onclick="changeStore()" href="#">Store 4646</a></td><td class="ZipCell">10007</td><td class="StatusCell; red">1</td></tr>');
		$("#storetable > tbody:last").append('<tr class="storeentry"><td class="StoreCell"><a id="store2" onclick="changeStore()" href="#">Store 6868</a></td><td class="ZipCell">35835</td><td class="StatusCell; red">1</td></tr>');
		$("#storetable > tbody:last").append('<tr class="storeentry"><td class="StoreCell"><a id="store2" onclick="changeStore()" href="#">Store 0001</a></td><td class="ZipCell">44313</td><td class="StatusCell; red">1</td></tr>');
		$("#storetable > tbody:last").append('<tr class="storeentry"><td class="StoreCell"><a id="store2" onclick="changeStore()" href="#">Store 0002</a></td><td class="ZipCell">90123</td><td class="StatusCell; red">1</td></tr>');
		$("#storetable > tbody:last").append('<tr class="storeentry"><td class="StoreCell"><a id="store1" onclick="changeStore()" href="#">Store 0003</a></td><td class="ZipCell">91225</td><td class="StatusCell; red">1</td></tr>');
		$("#storetable > tbody:last").append('<tr class="storeentry"><td class="StoreCell"><a id="store2" onclick="changeStore()" href="#">Store 0004</a></td><td class="ZipCell">10007</td><td class="StatusCell; red">1</td></tr>');
		$("#storetable > tbody:last").append('<tr class="storeentry"><td class="StoreCell"><a id="store2" onclick="changeStore()" href="#">Store 0005</a></td><td class="ZipCell">10011</td><td class="StatusCell; red">1</td></tr>');
	}
	else if (region === 'NORTH') {
		$("#storetable > tbody:last").append('<tr class="storeentry"><td class="StoreCell"><a id="store1" onclick="changeStore()" href="#">Store 1111</a></td><td class="ZipCell">91225</td><td class="StatusCell; red">1</td></tr>');
		$("#storetable > tbody:last").append('<tr class="storeentry"><td class="StoreCell"><a id="store2" onclick="changeStore()" href="#">Store 2222</a></td><td class="ZipCell">10007</td><td class="StatusCell; red">1</td></tr>');
		$("#storetable > tbody:last").append('<tr class="storeentry"><td class="StoreCell"><a id="store2" onclick="changeStore()" href="#">Store 3333</a></td><td class="ZipCell">10011</td><td class="StatusCell; red">1</td></tr>');
		$("#storetable > tbody:last").append('<tr class="storeentry"><td class="StoreCell"><a id="store2" onclick="changeStore()" href="#">Store 4444</a></td><td class="ZipCell">44313</td><td class="StatusCell; red">1</td></tr>');
		$("#storetable > tbody:last").append('<tr class="storeentry"><td class="StoreCell"><a id="store2" onclick="changeStore()" href="#">Store 5555</a></td><td class="ZipCell">11880</td><td class="StatusCell; red">1</td></tr>');	
	}
	else if (region === 'SOUTH') {
		$("#storetable > tbody:last").append('<tr class="storeentry"><td class="StoreCell"><a id="store2" onclick="changeStore()" href="#">Store 2121</a></td><td class="ZipCell">10007</td><td class="StatusCell; red">1</td></tr>');
		$("#storetable > tbody:last").append('<tr class="storeentry"><td class="StoreCell"><a id="store2" onclick="changeStore()" href="#">Store 3131</a></td><td class="ZipCell">25135</td><td class="StatusCell; red">1</td></tr>');
		$("#storetable > tbody:last").append('<tr class="storeentry"><td class="StoreCell"><a id="store2" onclick="changeStore()" href="#">Store 4141</a></td><td class="ZipCell">62002</td><td class="StatusCell; red">1</td></tr>');
		$("#storetable > tbody:last").append('<tr class="storeentry"><td class="StoreCell"><a id="store2" onclick="changeStore()" href="#">Store 5151</a></td><td class="ZipCell">09822</td><td class="StatusCell; red">1</td></tr>');
		$("#storetable > tbody:last").append('<tr class="storeentry"><td class="StoreCell"><a id="store2" onclick="changeStore()" href="#">Store 6161</a></td><td class="ZipCell">27652</td><td class="StatusCell; red">1</td></tr>');
	}
	else if (region === 'EAST') {
		$("#storetable > tbody:last").append('<tr class="storeentry"><td class="StoreCell"><a id="store2" onclick="changeStore()" href="#">Store 4242</a></td><td class="ZipCell">33445</td><td class="StatusCell; red">1</td></tr>');
		$("#storetable > tbody:last").append('<tr class="storeentry"><td class="StoreCell"><a id="store2" onclick="changeStore()" href="#">Store 2424</a></td><td class="ZipCell">89898</td><td class="StatusCell; red">1</td></tr>');
		$("#storetable > tbody:last").append('<tr class="storeentry"><td class="StoreCell"><a id="store2" onclick="changeStore()" href="#">Store 6464</a></td><td class="ZipCell">10220</td><td class="StatusCell; red">1</td></tr>');
		$("#storetable > tbody:last").append('<tr class="storeentry"><td class="StoreCell"><a id="store2" onclick="changeStore()" href="#">Store 4646</a></td><td class="ZipCell">10007</td><td class="StatusCell; red">1</td></tr>');
		$("#storetable > tbody:last").append('<tr class="storeentry"><td class="StoreCell"><a id="store2" onclick="changeStore()" href="#">Store 6868</a></td><td class="ZipCell">35835</td><td class="StatusCell; red">1</td></tr>');
	}
	else if (region === 'WEST') {
		$("#storetable > tbody:last").append('<tr class="storeentry"><td class="StoreCell"><a id="store2" onclick="changeStore()" href="#">Store 0001</a></td><td class="ZipCell">44313</td><td class="StatusCell; red">1</td></tr>');
		$("#storetable > tbody:last").append('<tr class="storeentry"><td class="StoreCell"><a id="store2" onclick="changeStore()" href="#">Store 0002</a></td><td class="ZipCell">90123</td><td class="StatusCell; red">1</td></tr>');
		$("#storetable > tbody:last").append('<tr class="storeentry"><td class="StoreCell"><a id="store1" onclick="changeStore()" href="#">Store 0003</a></td><td class="ZipCell">91225</td><td class="StatusCell; red">1</td></tr>');
		$("#storetable > tbody:last").append('<tr class="storeentry"><td class="StoreCell"><a id="store2" onclick="changeStore()" href="#">Store 0004</a></td><td class="ZipCell">10007</td><td class="StatusCell; red">1</td></tr>');
		$("#storetable > tbody:last").append('<tr class="storeentry"><td class="StoreCell"><a id="store2" onclick="changeStore()" href="#">Store 0005</a></td><td class="ZipCell">10011</td><td class="StatusCell; red">1</td></tr>');	
	}
	
  //for (var resource in resources){
    //$('select#deviceSelect').append('<OPTION class=reslistitem VALUE='+resource+' id='+resource+'>'+resources[resource]+'</OPTION>');
  //}
}

function changeStore() {
	freeboard.showLoadingIndicator(true);
	$('#machinediv').hide();
	setTimeout(function(){	
		$('#machinediv').show();
		freeboard.showLoadingIndicator(false);
	},1000);
}

function changeMachine(machine) {
	freeboard.showLoadingIndicator(true);
	setTimeout(function(){	
		freeboard.setDatasourceSettings("Machine_1", {"datafile":"https://raw.githubusercontent.com/bugvish/sandbox/master/"+machine+".json"});
		freeboard.showLoadingIndicator(false);
	},1200);
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
		      'subject': 'Food Service Machine Alert!',
		      'html': 'Mix out on Machine 1 at Store 1111.'
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
	freeboard.showDialog($("<div align='center'>Service Request Detected!  Please press Confirm</div>"),"Alert","Confirm",null,function(){dweetio.dweet_for(window.targetThing+'-send', {"led15":true}, function(err, dweet){});}); 
}

window.endServiceRequest = function() {
	window.servicerq2 = true;
	dweetio.dweet_for(window.targetThing+'-send', {"led15":false}, function(err, dweet){});
}

