var apiKey ="d092e4c696e2cfb7a6d26f9f58875d39";
var chosenCityTemp;
var city = JSON.parse(window.localStorage.getItem("cityValue"));
var historyContainer = document.getElementById("city-history");

    // Function to get search history from local storage
    var intialSearch = function(){
        var storedHistory = JSON.parse(window.localStorage.getItem("search-history")) || [];
        //sort the search 
        storedHistory.sort(function(a,b){
            return b.storedHistory - a.storedHistory
        })
        for (var i =0; i<storedHistory.length;i++){
            var liItems=document.createElement("li");
            liItems.textContent=storedHistory[i];
            console.log(storedHistory);
            historyContainer.append(liItems);
        }
        
    }
    console.log("my city", city)
    intialSearch(); 
// Array of drink IDs
var coldDrinks = [11634, 17267, 178358, 13936];
var coolDrinks = [14282, 16987, 17239, 17255];
var warmDrinks = [15933, 11326, 178334, 12560];
var hotDrinks = [11320, 178352, 16485, 17212];

// Selected drink ID
var selectedDrink = "";

// Static URL variable cocktail DB
var cocktailApiUrl = "";

// Function to select drink based on temp
var getDrinkId = function () {
    if (chosenCityTemp <= 30) {
      selectedDrink =
        coldDrinks[Math.floor(Math.random() * (coldDrinks.length - 1))];
    } else if (chosenCityTemp > 30 && chosenCityTemp <= 60) {
      selectedDrink =
        coolDrinks[Math.floor(Math.random() * (coolDrinks.length - 1))];
    } else if (chosenCityTemp > 60 && chosenCityTemp <= 80) {
      selectedDrink =
        warmDrinks[Math.floor(Math.random() * (warmDrinks.length - 1))];
    } else if (chosenCityTemp > 80) {
      selectedDrink =
        hotDrinks[Math.floor(Math.random() * (hotDrinks.length - 1))];
    } else {
      console.log("error");
    }
    cocktailApiUrl =
      "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + selectedDrink;
    getDrink();
};
var getDrink = function () {
    fetch(cocktailApiUrl)
      .then(function (response) {
        if (response.status !== 200) {
          console.log("whoops, somthing went wrong");
          return;
        }
  
        response.json().then(function (data) {
          displayCocktailInfo(data);
        });
      })
      .catch(function (err) {
        console.log("Fetch Error", err);
      });
  };
  // Array of meal IDs for MealDB API
var coldMeals = [53057, 52803, 52942, 52903, 52788];
var coolMeals = [53043, 52922, 52851, 52989, 52934];
var warmMeals = [52944, 53038, 53051, 53062, 52871];
var hotMeals = [52891, 52957, 52889, 53063, 52939];

// selected meal ID for MealDB API
var chosenMeal = "";

// static variable MealDB API URL
var mealApiUrl = "";

// function to select random meal ID and run fetch to MealDB API
var getMealId = function () {
  if (chosenCityTemp <= 30) {
    chosenMeal = coldMeals[Math.floor(Math.random() * (coldMeals.length - 1))];
  } else if (chosenCityTemp > 30 && chosenCityTemp <= 60) {
    chosenMeal = coolMeals[Math.floor(Math.random() * (coolMeals.length - 1))];
  } else if (chosenCityTemp > 60 && chosenCityTemp <= 80) {
    chosenMeal = warmMeals[Math.floor(Math.random() * (warmMeals.length - 1))];
  } else if (chosenCityTemp > 80) {
    chosenMeal = hotMeals[Math.floor(Math.random() * (hotMeals.length - 1))];
  } else {
    console.log("error on meal choice");
  }
  mealApiUrl = "https://themealdb.com/api/json/v1/1/lookup.php?i=" + chosenMeal;
  // console.log(chosenMeal);
  getMeal();
};

// function to fetch JSON data from MealDB API
var getMeal = function () {
  fetch(mealApiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        // console.log(data)
      });
    } else {
      console.log("error in JSON request");
    }
  });
};
//get the name span by ID
var nameEl =document.getElementById("city-name")
var iconEl = document.createElement("img");
// assign an SRC attribute to hold the icon URL
iconEl.setAttribute("src","");
//create an <p> elements to hold the weather information 
var tempEl= document.createElement("p");
var humidityEl= document.createElement("p");
var windEl= document.createElement("p");
var descEl= document.createElement("p");
// appending the dynamically created element
// get weather info function
var getWaetherInfo = function () {
    // get weather info function, to test the URl change the (+ city +) with any city name
    var apiUrl =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&units=imperial&appid=" +
      apiKey;
    //make a request to the url
    fetch(apiUrl)
      .then(function (response) {
        // if the response is okay
        if (response.ok) {
          //get the data
          response.json().then(function (data) {
            // run dsiplay weathr function
            getWeather(data);
          });
          // if the city name was wrong
        } else {
          // alert the user // must change to a popup message element
          alert("error City not found");
        }
      })
      // if there is any network error
      .catch(function (error) {
        //alert the user // must change to a popup message element
        alert("Unable to connect to the server");
      });
  };
  //get weather information on the website 
  var getWeather = function(data){
    //define variables for the weather data
    var {name} = data;
    var {icon,description}=data.weather[0];
    var {temp,humidity}=data.main;
    chosenCityTemp=temp.data.main;
    console.log (name,icon,chosenCityTemp,humidity,description);
    //write the weather infromation in each element 
    nameEl.innerText = "Weather in " + name;
    iconEl.src = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
    tempEl.innerText = "Temp: "+ chosenCityTemp + "°F";
    humidityEl.innerText = "Humidity: "+ humidity; 
    descEl.innerText = description; 
}
getWaetherInfo();