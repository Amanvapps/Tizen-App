const URL = "https://api.uam.tv/";

var init = function () {
       
	showProfileSection();
    initTizenKeys();
};


window.onload = init;






function initTizenKeys()
{
	 // add eventListener for keydown
    document.addEventListener('keydown', function(e) {
    	switch(e.keyCode){
    	case 37: //LEFT arrow
    	//	moveLeft();
    		break;
    	case 38: //UP arrow
    	//	moveUp();
    		break;
    	case 39: //RIGHT arrow
    	//	moveRight();
    		break;
    	case 40: //DOWN arrow
    		//moveDown();
    		break;
    	case 13: //OK button
    		//moveOk();
    
    		
       		break;
    	case 10009: //RETURN button
    		location.href = "../home/home.html";
    		break;
    	default:
    		console.log('Key code : ' + e.keyCode);
    		break;
    	}
    });
}



function getProfileData() {
	
	
	var token = localStorage.getItem("jwt token");
	
	if(token !== null)
		{
			
			fetch(URL + 'v3/users/get.php', {
				  headers: {
					  'Authorization' : "Bearer " + token
				  },
				})
				.then(response => response.json())
				.then(data => {
			
				
						document.getElementById('profile_name_section_id').innerHTML = data["data"][0]["fname"] + " " +  data["data"][0]["lname"];
						document.getElementById('profile_email_section_id').innerHTML = data["data"][0]["email"];
						document.getElementById('profile_phone_section_id').innerHTML = data["data"][0]["phone"];
						

						
								
						
				

				  
				})
				.catch((error) => {
				  console.error('Err:', error);
//				  hideLoader();
				});
			
		}
	else
		{
			console.log("No token found");
			location.href = "../login.html";
		}
	
	
		
	
}



function showProfileSection()
{
	
	

	
	  showSection("profile_section_id");
	  hideSection("subscription_section_id");
	  hideSection("register_section_id");
	  hideSection("help_section_id");
	  hideSection("about_section_id");
	  hideSection("contact_section_id");
 

}


function showSubscriptionSection()
{
  hideSection("profile_section_id");
  showSection("subscription_section_id");
  hideSection("register_section_id");
  hideSection("help_section_id");
  hideSection("about_section_id");
  hideSection("contact_section_id");

}

function showRegisterSection()
{
  hideSection("profile_section_id");
  hideSection("subscription_section_id");
  showSection("register_section_id");
  hideSection("help_section_id");
  hideSection("about_section_id");
  hideSection("contact_section_id");

}


function showHelpSection()
{
  hideSection("profile_section_id");
  hideSection("subscription_section_id");
  hideSection("register_section_id"); 
  showSection("help_section_id");
  hideSection("about_section_id");
  hideSection("contact_section_id");

}

function showContactSection()
{
  hideSection("profile_section_id");
  hideSection("subscription_section_id");
  hideSection("register_section_id");
  hideSection("help_section_id");
  hideSection("about_section_id");
  showSection("contact_section_id");
}


function showAboutSection()
{
  hideSection("profile_section_id");
  hideSection("subscription_section_id");
  hideSection("register_section_id");
  hideSection("help_section_id");
  showSection("about_section_id");
  hideSection("contact_section_id");

}


function showSection(id){

	document.getElementById(id).style.display = "block";
	
}


function hideSection(id){
	
	
	document.getElementById(id).style.display = "none";
	
}

