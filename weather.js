var lat,long, sky;

    window.onload = function() {
      $.ajax({
            url: "https://geoip-db.com/jsonp",
            jsonpCallback: "callback",
            dataType: "jsonp",
            success: function( location ) {
                lat = location.latitude;
                long = location.longitude;
                console.log(typeof lat);
                console.log(typeof long);
                 $('.location').append(location.city + ", ").append(location.state);
                $('.country').html(location.country_name);
                $('#latitude').html(location.latitude);
                $('#longitude').html(location.longitude);
                getWeather();
                 
            }
        });  
    }
    
 

function getWeather(){
    
     $.ajax({
  url: "https://api.darksky.net/forecast/fc53930319a4fa092e69b06c40e1c057/"+lat+", "+long,
  dataType: "jsonp",
  success: function (data) {
      console.log('here');
      console.log(data.currently.temperature);
      //var temp = [(json.main.temp - 273.15).toFixed(0) + "°C", (1.8 * (json.main.temp - 273.15) + 32).toFixed(0) + "F"];
     // $('.temperature').append(data.currently.temperature);
      var temp = [((data.currently.temperature - 32)/1.8).toFixed(0) + "°C", data.currently.temperature + "°F"];
      console.log(temp[0]);
      console.log(temp[1]);
	$(".temp-celsius").html(temp[0]);
      $("temp-celsius").hide();
	$(".temp-fahrenheit").html(temp[1]);
	$(".temperature").click(function () {
        $(".temp-fahrenheit").toggle();
		$(".temp-celsius").toggle();
		
	});
      $('#humidity').append("Humidity: "+data.currently.humidity+"%.");
      $('#wind-speed').append("Wind Speed: "+data.currently.windSpeed + " mph.")
      sky = data.currently.icon;
     // console.log(sky);
      console.log(typeof sky)
      console.log(data.currently.visibility);
       $('#visibilty').append("Visibility: "+data.currently.visibility);
       $('#summary').append("Summary: "+data.currently.summary);
      var icons = new Skycons({"color": "black"});
console.log('here in icons');
    
    if(sky === "clear-night") {
        icons.set("environ-icon", Skycons.CLEAR_NIGHT);
    }
    else if(sky === "clear-day") {
        icons.set("environ-icon", Skycons.CLEAR_DAY);
    }
    else if(sky === "partly-cloudy-night") {
        console.log(sky);
        icons.set("environ-icon", Skycons.PARTLY_CLOUDY_NIGHT);
    }
    else if(sky === "partly-cloudy-day") {
        console.log(sky);
        icons.set("environ-icon", Skycons.PARTLY_CLOUDY_DAY);
    }
    else if(sky === "sleet") {
        console.log(sky);
        icons.set("environ-icon", Skycons.SLEET);
    }
    else if(sky === "rain") {
        console.log(sky);
        icons.set("environ-icon", Skycons.RAIN);
    }
    else if(sky === "cloudy") {
        console.log(sky);
        icons.set("environ-icon", Skycons.CLOUDY);
    }
        else if(sky === "snow") {
        console.log(sky);
        icons.set("environ-icon", Skycons.SNOW);
        }
    else if(sky === "wind") {
        console.log(sky);
        icons.set("environ-icon", Skycons.WIND);
        }
    else if(sky === "fog") {
        console.log(sky);
        icons.set("environ-icon", Skycons.FOG);
        }
icons.play();

  }
    
     });
}

