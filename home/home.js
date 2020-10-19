const URL = "https://api.uam.tv/";
var categoryList = [];
var mostRecentsList = [];
var mostViewedList = [];
var randomBannerList = []; 


var selectedListPos ;               //selected element of any of 3 lists...

var init = function () {
       
	
//	showLoader();
	
	
	//set Focus on details text....
	setFocus("detail" , "activeDetail");
	
	getHomeScreenData();
    initTizenKeys();
};


window.onload = init;






function initTizenKeys()
{
	 // add eventListener for keydown
    document.addEventListener('keydown', function(e) {
    	switch(e.keyCode){
    	case 37: //LEFT arrow
    		//moveLeft();
    		break;
    	case 38: //UP arrow
    		moveUp();
    		break;
    	case 39: //RIGHT arrow
    		moveRight();
    		break;
    	case 40: //DOWN arrow
    		moveDown();
    		break;
    	case 13: //OK button
    		moveOk();
    
    		
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



function setFocus(id , clas)
{
	
	document.getElementById(id).classList.add(clas);		
	
}

function removeFocus(clas)
{
	
		var el = document.getElementsByClassName(clas)[0].id;
	    document.getElementById(el.toString()).classList.remove(clas);
		
	
}

function moveOk()
{
	 
	if(document.getElementsByClassName("activeDetail")[0] !== undefined)
		{
		   location.href = "../detail/detail.html";
		}
	else if(document.getElementsByClassName("activeCategory")[0] !== undefined)
		{
			console.log( document.getElementsByClassName("activeCategory")[0].id);
		}
	else if(document.getElementsByClassName("activeViewed")[0] !== undefined)
	{
		console.log( document.getElementsByClassName("activeViewed")[0].id);
	}
	else if(document.getElementsByClassName("activeRecents")[0] !== undefined)
	{
		console.log( document.getElementsByClassName("activeRecents")[0].id);
	}
	
	
	  
}


function moveUp()
{
	if(document.getElementsByClassName("activeCategory")[0] !== undefined)
		{
		   setFocus("detail" , "activeDetail");
		   
		   removeFocus("activeCategory");
			
		}
	else if(document.getElementsByClassName("activeViewed")[0] !== undefined)
		{
		   window.scrollBy(0, -500);
		   selectedListPos = 0 ;
		   setFocus("categories " +  selectedListPos, "activeCategory");
		   
		   removeFocus("activeViewed");
		}
	else if(document.getElementsByClassName("activeRecents")[0] !== undefined)
	{
	
	   window.scrollBy(0, -200);
	   selectedListPos = 0 ;
	   setFocus("viewed " +  selectedListPos, "activeViewed");
	   
	   removeFocus("activeRecents");
	}
	
}


function moveDown()
{
	if(document.getElementsByClassName("activeDetail")[0] !== undefined)
		{
		   selectedListPos = 0 ;
		   setFocus("categories " +  selectedListPos, "activeCategory");
		   
		   removeFocus("activeDetail");
			
		}
	else if(document.getElementsByClassName("activeCategory")[0] !== undefined)
		{
		 
		 window.scrollBy(0, 500);	
		 selectedListPos = 0 ;
		   setFocus("viewed " +  selectedListPos, "activeViewed");
		   
		   removeFocus("activeCategory");
		}
	else if(document.getElementsByClassName("activeViewed")[0] !== undefined)
	{
		
		window.scrollBy(0, 300);	
	 selectedListPos = 0 ;
	   setFocus("recent " +  selectedListPos, "activeRecents");
	   
	   removeFocus("activeViewed");
	}
	
}



function moveRight()
{
	if(document.getElementsByClassName("activeCategory")[0] !== undefined)
	{
		if(selectedListPos !== (categoryList.length-1))
			{
			   selectedListPos++;
			   removeFocus("activeCategory");
			   setFocus("categories " +  selectedListPos, "activeCategory");
			}
	  
	   
	  
	}
	else if(document.getElementsByClassName("activeViewed")[0] !== undefined)
	{
		if(selectedListPos !== (mostViewedList.length-1))
			{
			   selectedListPos++;
			   removeFocus("activeViewed");
			   setFocus("viewed " +  selectedListPos, "activeViewed");
			}	  	
	  
	}
	else if(document.getElementsByClassName("activeRecents")[0] !== undefined)
	{
		if(selectedListPos !== (mostRecentsList.length-1))
			{
			   selectedListPos++;
			   removeFocus("activeRecents");
			   setFocus("recent " +  selectedListPos, "activeRecents");
			}	  	
	  
	}
	
	
}



function getHomeScreenData() {
	
	
	var token = localStorage.getItem("jwt token");
	
	if(token !== null)
		{
		    getRandomMovies(token);
		}
	else
		{
			console.log("No token found");
			location.href = "../login.html";
		}
	
	
		
	
}


function getRandomMovies(token)
{
	fetch(URL + 'v3/movies/onair/getRandomSelection.php', {
		  headers: {
			  'Authorization' : "Bearer " + token
		  },
		})
		.then(response => response.json())
		.then(data => {
	
			data.forEach((result, index) => {
		
 			//add categories to list.....
				var obj = {
						"fullId" :  result["src"]["id_full"],
						"title" :  result["langs"]["it"]["title"],
						"image" :  "https://media.uam.tv/images/media/frames/"  + result["src"]["id_full"] + ".jpg"
				};
			
				randomBannerList.push(obj);
				
						        
			})
			
			
			
			addBackground();
			getCategories(token);

		  
		})
		.catch((error) => {
		  console.error('Err:', error);
//		  hideLoader();
		});
	}





function getCategories(token)
{
	fetch(URL + 'v3/movies/categories/get.php', {
		  headers: {
			  'Authorization' : "Bearer " + token
		  },
		})
		.then(response => response.json())
		.then(data => {
	
			data["data"][0].forEach((result, index) => {
		
 			//add categories to list.....
				var obj = {
						"fullId" :  result[0],
						"title" :  result[1],
						"image" :  "https://media.uam.tv/images/media/category/" +result[0] + ".jpg"
				};
			
				categoryList.push(obj);
				
						        
			})
			
			
			
			addCategories();
			getMostRecents(token);
		  
		})
		.catch((error) => {
		  console.error('Err:', error);
//		  hideLoader();
		});
	}


function getMostRecents(token)
{
	fetch(URL + 'v3/movies/onair/getMostRecent.php', {
		  headers: {
			  'Authorization' : "Bearer " + token
		  },
		})
		.then(response => response.json())
		.then(data => {
	
			data.forEach((result, index) => {
		
 			//add most recents to list.....
				var obj = {
						"fullId" :  result["src"]["id_full"],
						"image" :  "https://media.uam.tv/images/media/slider/" + result["src"]["id_full"] + ".jpg"
				};
			
				mostRecentsList.push(obj);
		        
			})
			
			addMostRecents();
			getMostViewed(token);
		  
		})
		.catch((error) => {
		  console.error('Err:', error);
//		  hideLoader();
		});
	}







function getMostViewed(token)
{
	fetch(URL + 'v3/movies/onair/getMostViewed.php', {
		  headers: {
			  'Authorization' : "Bearer " + token
		  },
		})
		.then(response => response.json())
		.then(data => {
	
			data["data"].forEach((result, index) => {
		
 			//add most viewed to list.....
				
				var obj = {
						"fullId" :  result["id_full"],
						"image" :  "https://media.uam.tv/images/media/slider/" + result["id_full"] + ".jpg"
				};
			
				mostViewedList.push(obj);
		        
			})
			
			addMostViewed();
		  
		})
		.catch((error) => {
		  console.error('Err:', error);
//		  hideLoader();
		});
	}



function addBackground()
{
	var showcase = document.getElementById("");
}



function addCategories()
{
	
	var rowId = "-1";
	
	console.log(categoryList.length , categoryList);
	
	categoryList.forEach((result, idx) => {
		
		
		console.log(idx);
		
		if(idx % 4 == 0)
			{
			if(idx == 0)
				{
			
				var showcase = document.getElementById("category-carousel-item activeId");
				rowId = idx;
				
				showcase.innerHTML += `<div id="row ${rowId.toString()}" class="row"></div>`;
				
				}
			else
				{
				
				var mainContainer = document.getElementById("category-carousel-innerId");
				
				mainContainer.innerHTML += `<div id="item ${rowId.toString()}" class="carousel-item"></div>`;
				
				
				
				var showcase = document.getElementById("item " + rowId);
				
				rowId = idx;
				showcase.innerHTML += `<div id="row ${rowId.toString()}" class="row"></div>`;
				}
		
			
			}
		
		
		var row = document.getElementById("row " + rowId);
        var temp = `
        
        
        
        
        <div id="categories ${idx}" class="col-sm-3">
        <div class="thumb-wrapper">
            <div class="img-box">
                <img src= "${result["image"]}" class="img-fluid" alt="">
                <p class="catagory_name_style ml-2">${result["title"]}</p>
            </div>

        </div>
    </div>
        
        
        
        
        
        
        `;
        
        row.innerHTML += temp;
        
        
	})
	
	
	
}


function addMostRecents()
{
	
	var rowId = "-1";
	
	
	mostRecentsList.forEach((result, idx) => {
		
		
		console.log(idx);
		
		if(idx % 4 == 0)
			{
			if(idx == 0)
				{
			
				var showcase = document.getElementById("recent-carousel-item activeId");
				rowId = idx;
				
				showcase.innerHTML += `<div id="recent-row ${rowId.toString()}" class="row"></div>`;
				
				}
			else
				{
				
				var mainContainer = document.getElementById("recent-carousel-innerId");
				
				mainContainer.innerHTML += `<div id="recent-item ${rowId.toString()}" class="carousel-item"></div>`;
				
				
				
				var showcase = document.getElementById("recent-item " + rowId);
				
				rowId = idx;
				showcase.innerHTML += `<div id="recent-row ${rowId.toString()}" class="row"></div>`;
				}
		
			
			}
		
		
		var row = document.getElementById("recent-row " + rowId);
        var temp = `
        
        
        
        
        <div id="recent ${idx}" class="col-sm-3">
        <div class="thumb-wrapper">
            <div class="img-box">
                <img src= "${result["image"]}" class="img-fluid" alt="">
        
            </div>

        </div>
    </div>
        
        
        
        
        
        
        `;
        
        row.innerHTML += temp;
        
        
	})
}


function addMostViewed()
{
	
	var rowId = "-1";
	
	
	mostViewedList.forEach((result, idx) => {
		
		
		console.log(idx);
		
		if(idx % 4 == 0)
			{
			if(idx == 0)
				{
			
				var showcase = document.getElementById("viewed-carousel-item activeId");
				rowId = idx;
				
				showcase.innerHTML += `<div id="viewed-row ${rowId.toString()}" class="row"></div>`;
				
				}
			else
				{
				
				var mainContainer = document.getElementById("viewed-carousel-innerId");
				
				mainContainer.innerHTML += `<div id="viewed-item ${rowId.toString()}" class="carousel-item"></div>`;
				
				
				
				var showcase = document.getElementById("viewed-item " + rowId);
				
				rowId = idx;
				showcase.innerHTML += `<div id="viewed-row ${rowId.toString()}" class="row"></div>`;
				}
		
			
			}
		
		
		var row = document.getElementById("viewed-row " + rowId);
        var temp = `
        
        
        
        
        <div id="viewed ${idx}" class="col-sm-3">
        <div class="thumb-wrapper">
            <div class="img-box">
                <img src= "${result["image"]}" class="img-fluid" alt="">
        
            </div>

        </div>
    </div>
        
        
        
        
        
        
        `;
        
        row.innerHTML += temp;
        
        
	})
	
	
	
}


