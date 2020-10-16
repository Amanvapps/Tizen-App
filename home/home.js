const URL = "https://api.uam.tv/";
var categoryList = [];
var mostRecentsList = [];
var mostViewedList = [];

var init = function () {
       
	
//	showLoader();
	
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
    	
    		break;
    	case 38: //UP arrow
    		break;
    	case 39: //RIGHT arrow
    		break;
    	case 40: //DOWN arrow
    		break;
    	case 13: //OK button
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


function getHomeScreenData() {
	
	
	//var token = localStorage.getItem("jwt token");
	
//	if(token !== null)
//		{
			getCategories("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpYXQiOjE2MDI4NDg2NDgsImlzcyI6Ii51YW0udHYiLCJuYmYiOjE2MDI4NDg2MTgsImV4cCI6MTYwMjkzNTAxOCwicmVmcmVzaHRva2VuIjoiZjE2ZWEyMjctMGE2MS00ZTI0LTlmZDMtODFkMWFkNzlmYmU4IiwidXNlcklkIjoiM2JhNjI2MWQtNjJkMy00YTA5LTllOTEtMDVhNDY5ZDg0NzVjIiwidXNlck5hbWUiOiJiaGF2bmEua2F0YXJpYUBvb2RsZXN0ZWNobm9sb2dpZXMuY29tIiwiZm5hbWUiOiJCaGF2bmEiLCJzdGF0ZSI6IkFjdGl2ZSIsImlzLWFkbWluIjpudWxsLCJiZXRhIjpudWxsLCJlbnYiOiJQUk9EIn0.YayNyK2hmNZhNkZw3b8sx5U8COs96OApJuDAeOu2nGednxJi1AGW--7gr4VHWuGrUh4LU24O29kdCxyz34Rk1g");
//		}
//	else
//		{
//			console.log("No token found");
//		}
//	
		
	
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
        
        
        
        
        <div id="categories {idx}" class="col-sm-3">
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
        
        
        
        
        <div id="recent {idx}" class="col-sm-3">
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
        
        
        
        
        <div id="viewed {idx}" class="col-sm-3">
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
