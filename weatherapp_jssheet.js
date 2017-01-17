$(document).ready(function() {
  var key = config.key
  $.getJSON("http://ip-api.com/json", function(json){
      var place = "";
      place += "<p class='place'>" + json.city + ", " + json.country + "</p>";
      $(place).prependTo(".temperature");
      var city = json.city;
      var country = json.countryCode;
      $.getJSON("http://api.openweathermap.org/data/2.5/weather?q="
      + city + "," + country + "&appid=" + key, function(owm) {
        var temperatureInFahrenheit = "<p id='temp'>" + Math.floor((owm.main.temp - 273.15) * 1.8 + 32) + "°F</p>";
        var temperatureInCelsius = "<p id='temp'>" + Math.floor(owm.main.temp - 273) + "°C</p>";
        var description = "<p id='description' class='text-center'>" + owm.weather[0].description + "</p>";
        var weatherType = owm.weather[0].id.toString();
        var icon
        var bgMain;
        var bgBody;
        $("#temp").replaceWith(temperatureInFahrenheit);
        $(description).appendTo(".weatherText");
        switch (true) {
          case (weatherType.charAt(0) === "2"):
            icon = "<i class='wi wi-thunderstorm'></i>";
            bgMain = "bgdark";
            bgBody = "thunderstorm";
            break;
          case (weatherType.charAt(0) === "3"):
            icon = "<i class='wi wi-showers'></i>";
            bgMain = "bgdark";
            bgBody = "rain";
            break;
          case (weatherType.charAt(0) === "5"):
            icon = "<i class='wi wi-rain'></i>";
            bgMain = "bgdark";
            bgBody = "rain"
            break;
          case (weatherType.charAt(0) === "6"):
            icon = "<i class='wi wi-snow'></i>";
            bgMain = "bgdark";
            bgBody = "snow"
            break;
          case (weatherType.charAt(0) === "7"):
            icon = "<i class='wi wi-fog'></i>";
            bgMain = "bgdark";
            bgBody = "fog"
            break;
          case (weatherType === "800" || weatherType === "951" || weatherType === "952"):
            icon = "<i class='wi wi-day-sunny'></i>";
            bgMain = "bgsunny"
            bgBody = "sunny"
            break;
          case (weatherType.charAt(0) === "8"):
            icon = "<i class='wi wi-cloudy'></i>";
            bgMain = "bgdark";
            bgBody = "cloudy"
            break;
          case (weatherType === "900" || weatherType === "901"):
            icon = "<i class='wi wi-tornado'></i>";
            bgMain = "bgdark";
            bgBody = "tornado"
            break;
          case (weatherType === "902" || weatherType === "962"):
            icon = "<i class='wi wi-hurricane'></i>";
            bgMain = "bgdark";
            bgBody = "hurricane"
            break;
          case (weatherType === "903"):
            icon = "<i class='wi wi-snowflake-cold'></i>";
            bgMain = "bgdark";
            bgBody = "cold"
            break;
          case (weatherType === "904"):
            icon = "<i class='wi wi-hot'></i>";
            bgMain = "bgsunny";
            bgBody = "hot"
            break;
          case (weatherType === "905" || weatherType === "953" || weatherType === "954" || weatherType === "955" || weatherType === "956"):
            icon = "<i class='wi wi-windy'></i>";
            bgBody = "windy"
            break;
          case (weatherType === "906"):
            icon = "<i class='wi wi-hail'></i>";
            bgMain = "bgdark";
            bgBody = "hail"
            break;
          case (weatherType === "957" || weatherType === "958" || weatherType === "959"):
            icon = "<i class='wi wi-gale-warning'></i>";
            bgMain = "bgdark";
            bgBody = "gale"
            break;
          case (weatherType === "960" || weatherType === "961" || weatherType === "962"):
            icon = "<i class='wi wi-storm-warning'></i>";
            bgMain = "bgdark";
            bgBody = "storm";
        };
        $(".main").css({"background-image": "url(bg/" + bgMain + ".png)", "background-repeat": "no-repeat", "background-size": "cover"});
        $("body").css({"background-image": "url(bg/" + bgBody + ".jpg)", "background-repeat": "no-repeat", "background-size": "cover"});
        $(".celsius").on("click", function() {
          $("#temp").replaceWith(temperatureInCelsius);
          $(".fahrenheit").removeClass("active");
          $(".celsius").addClass("active");
          $(icon).appendTo(".weatherText");
        });
        $(".fahrenheit").on("click", function() {
          $("#temp").replaceWith(temperatureInFahrenheit);
          $(".celsius").removeClass("active");
          $(".fahrenheit").addClass("active");
          $(icon).appendTo(".weatherText");
        });
        $(icon).appendTo(".weatherText");
      });
    });
  });
