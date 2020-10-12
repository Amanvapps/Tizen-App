
//Initialize function
var init = function () {
       
    document.getElementById("email").focus();
    
  
  initFormEvents();
    
 
   initKeys();
};
// window.onload can work without <body onload="">
window.onload = init;



function initKeys()
{
	 // add eventListener for keydown
    document.addEventListener('keydown', function(e) {
    	switch(e.keyCode){
    	case 37: //LEFT arrow
    		break;
    	case 38: //UP arrow
    		if(document.activeElement.id === "pass")
			{
		    document.getElementById("email").focus();
			}
    		break;
    	case 39: //RIGHT arrow
    		break;
    	case 40: //DOWN arrow
    		if(document.activeElement.id === "email")
    			{
    		    document.getElementById("pass").focus();
    			}
    		else if(document.activeElement.id === "pass")
    			{
    		    document.getElementById("loginButton").focus();
    			}
    		break;
    	case 13: //OK button
    		if(document.activeElement.id === "loginButton")
    		login();
    	//	console.log(document.getElementById("email").value);
    		break;
    	case 10009: //RETURN button
		tizen.application.getCurrentApplication().exit();
    		break;
    	default:
    		console.log('Key code : ' + e.keyCode);
    		break;
    	}
    });
}






function login()
{
	

	
	
	let formData = new FormData();
	formData.append('username', document.getElementById("email").value);
	formData.append('password', document.getElementById("pass").value);
	formData.append('devicehash', "SDKHUWUR7SQ24");
	formData.append('devicefriendlyname', "Tizen " + webapis.productinfo.getModel());
	formData.append('platform', webapis.tvinfo.getVersion());
	formData.append('version', webapis.productinfo.getVersion());
	
	
	
	console.log(document.getElementById("email").value);
	console.log(document.getElementById("pass").value);
	console.log(webapis.productinfo.getDuid());
	console.log(webapis.productinfo.getModel());
	console.log(webapis.tvinfo.getVersion());
	console.log(webapis.productinfo.getVersion());

	
	
	

	fetch('https://api.uam.tv/v3/users/auth/get.php', {
	  method: 'POST', // or 'PUT'
	  body:formData,
	})
	.then(response => response.json())
	.then(data => {
	  console.log('Success:', data["jwt"]);
	  
	  localStorage.setItem("jwt token", data["jwt"]);
	  
	  console.log("jwt : " + localStorage.getItem("jwt token"));
	  
	})
	.catch((error) => {
	  console.error('Err:', error);
	});
	

	
	
}

function initFormEvents()
{

    
    document.getElementById('email').addEventListener('focus', function() {
    	  console.log("input element is focused and ready to get user input.");
    	});

    	document.getElementById('email').addEventListener('blur', function() {
    	  console.log("input element loses focus.");
    	});

    	document.getElementById('email').addEventListener('change', function() {
    	  console.log("input element value is changed.");
    	});



    	document.body.addEventListener('email', function(event) {
    	  switch (event.keyCode) {
    	    case 65376: // Done
    	      document.getElementById('email').blur();
    	      break;
    	    case 65385: // Cancel
    	      document.getElementById('email').blur();
    	      break;
    	  }
    	});
    	
    	
    	  document.getElementById('pass').addEventListener('focus', function() {
    	  console.log("input element is focused and ready to get user input.");
    	});

    	document.getElementById('pass').addEventListener('blur', function() {
    	  console.log("input element loses focus.");
    	});

    	document.getElementById('pass').addEventListener('change', function() {
    	  console.log("input element value is changed.");
    	});



    	document.body.addEventListener('pass', function(event) {
    	  switch (event.keyCode) {
    	    case 65376: // Done
    	      document.getElementById('pass').blur();
    	      break;
    	    case 65385: // Cancel
    	      document.getElementById('pass').blur();
    	      break;
    	  }
    	});
    
    
}

