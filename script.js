/**
 * A method which gets the weather given a city name
 * 
 * @param cityName 
 *                The name of a city
 */
function getWeather(cityName ) {
  const key = '' // Please enter your API key here
  const link = 'https://api.openweathermap.org/data/2.5/weather?q='
  const units = '&units=imperial';
  // We will fetch the data
  fetch(link + cityName + '&appid=' + key + units).then(function(response){
    return response.json()
  }).then(function(data){
    showWeather(data);
  })
   .catch(function() {
    alert("The city does not exist or the weather could not be retrieved. Please try again 😩");
  
  });
  
}

/**
 * A method which displays the data from the API on the webpage
 * @param: data
 *              The json() file
 */
function showWeather(data){
   // We will extract the meaningful information from the json file
   const { name } = data;
   const{ main, description } = data.weather[0];
   const{ temp, temp_min, temp_max } = data.main;

   // We will update our page based on these new values.
   document.querySelector(".city").innerText = "Weather in " + name;
   document.querySelector(".temp").innerText =  temp + "°F";
   document.querySelector(".description").innerText = description;
   document.querySelector(".high-low").innerText = "High-Low: " + temp_max + "°F/" + temp_min + "°F";

   // We will update the time and date based on the getDate function I created
   const time = getDate();
   document.querySelector(".date-time").innerText = "As of " + time;

  
   // This will allow make the weather display visible after it runs for the first time.
   document.querySelector(".weather").classList.remove("loading");
}

/**
 * A method which displays the correct date 
 * 
 * @returns the correct date in string format
 */
function getDate(){
  // We will call the date() function and extract the normal date
  var date = new Date();
  var month = date.getMonth() + 1;
  var day_month = date.getDate();
  var year = date.getFullYear();

  // We will get the time
  var hours = date.getHours();
  var am_pm;
  // We will convert from military time to 12-hr system
  if(hours > 12){
    hours = hours - 12;
    am_pm = "PM";
  } else{
    am_pm = "AM";
  }
  var minutes = date.getMinutes();

  if(minutes < 10){
    minutes = "0" + minutes;
  }

  // We will get the day of the week and add 1 to make it between 1 and 7

  var day = date.getDay() + 1;
  var day_week;

  if(day == 1){
    day_week = "Sunday";
  } else if(day == 2){
    day_week = "Monday";
  } else if(day == 3){
    day_week = "Tuesday";
  } else if(day == 4){
    day_week = "Wednesday";
  } else if(day == 5){
    day_week = "Thursday";
  } else if(day == 6){
    day_week = "Friday";
  } else{
    day_week = "Saturday";
  }

  const final_Date = day_week + " " + month + "/" + day_month + "/" + year + " at " + hours + "." + minutes + " " + am_pm;

  return final_Date;
}

window.onload = function() {
  // When the page loads, we want the default weather to be Columbus, OH
  getWeather("Columbus");
  // We will set up an eventListener for the  'search' button
  document.querySelector(".search-button").addEventListener("click", function(){
    getWeather(document.querySelector(".search-box").value)
  })

  // We will set up an eventlistener for the 'enter' key on the keyboard
  document.querySelector(".search-box").addEventListener("keyup", function(event){
    if(event.key == "Enter"){
    getWeather(document.querySelector(".search-box").value)
  }
  })

  

 }
