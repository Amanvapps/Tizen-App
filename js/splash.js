
//Initialize function
var init = function () {
       
    
    var token = localStorage.getItem("jwt token");
    
    console.log(token);
   
    setInterval(function(){
    	
    	
    	 if(token === null)
     	{
     	location.href = "index.html";
     	}
    	 else
    		 {
    	     	location.href = "home.html";
    		 }
    	
    },5000);
   
    
 
};
// window.onload can work without <body onload="">
window.onload = init;



