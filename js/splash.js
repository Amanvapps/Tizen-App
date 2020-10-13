
//Initialize function
var init = function () {
       
    
    var token = localStorage.getItem("jwt token");
   
    
    //launch next screen after 2 seconds....
    setInterval(function(){
    	
    	
    	 if(token === null)
    		 location.href = "login.html";
    	 else
    	 	location.href = "home.html";
    		 
    	
    },2000);
   
    
 
};

window.onload = init;



