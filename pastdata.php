<?php
// Replace YOUR_API_KEY with your actual API key

// Extract the relevant weather data
// $date = date("Y-m-d");
// $temperature = $data['main']['temp'];
// $humidity = $data['main']['humidity'];
// $pressure = $data['main']['pressure'];
// $wind_speed = $data['wind']['speed'];
// $weather_condition = $data['weather'][0]['description'];

// Connect to the MySQL database
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "weather_data";

$conn = mysqli_connect($servername, $username, $password, $dbname);

// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}
else{
    echo"   ";
}


$api_key = "90fe303d20dec43c15e217847bf5532b";

// Replace YOUR_CITY_NAME with the name of the city you want to fetch weather data for
$city_name = "Trafford";

// Construct the API request URL
$url = "https://api.openweathermap.org/data/2.5/weather?q=".urlencode($city_name)."&appid=".$api_key."&units=metric";

// Fetch the weather data from the API
$response = file_get_contents($url);

// Parse the JSON response
$data = json_decode($response);


// Prepare the SQL statement to insert weather data
$sql = "INSERT INTO weather (temperature, humidity, pressure, wind_speed, weather_description)
        VALUES ('" . $data->main->temp . "','" . $data->main->humidity . "','" . $data->main->pressure . "','" . $data->wind->speed. "','" . $data->weather[0]->description. "')";

// Execute the SQL statement
if (mysqli_query($conn, $sql)) {
    echo "  ";
} else {
    echo "Error inserting weather data: " . mysqli_error($conn);
}

$sql = "SELECT * FROM weather";
$result = mysqli_query($conn, $sql);
$weather = array();
while ($row = mysqli_fetch_assoc($result)){
    $weather[] = $row;
}


foreach($weather as $data){

}

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Weather</title>
    <link rel="stylesheet" href="Srijan_Phombo_Limbu_2329588(weatherapp,css2).css">
</head>
<body>

    <h3 style="color: pink;"> Past Weathers  </h3 >
    <button id="searchbn"><a href="index.html"><img src="/Image/reload.png" alt=""></a></button>
    <section class="container">
        <?php $previous_date = null; // Variable to store the previous date ?>
    <?php foreach ($weather as $data): ?>
        <?php $current_date = date('l, F j, Y', strtotime($data['date'])); // Get the current date
        if ($current_date != $previous_date):?>
    <div class="card"> 
        <div class="icon">
            <?php
$weatherIcon =$data['weather_description']; ?>
<?php 
if($weatherIcon=="clear sky"): ?>
<img src="https://openweathermap.org/img/wn/01d@2x.png" >
<?php endif ?>
<?php
if($weatherIcon=="overcast clouds"): ?>

<img src="https://openweathermap.org/img/wn/02d@2x.png" >
<?php endif ?>
<?php
if($weatherIcon=="drizzle"): ?>

<img src="https://openweathermap.org/img/wn/09d@2x.png" >
<?php endif ?>
<?php
if($weatherIcon=="thunderstorm"): ?>

<img src="https://openweathermap.org/img/wn/11d@2x.png" >
<?php endif ?>
<?php
if($weatherIcon=="rain"): ?>

<img src="https://openweathermap.org/img/wn/09d@2x.png" >
<?php endif ?>
<?php
if($weatherIcon=="snow"): ?>

<img src="https://openweathermap.org/img/wn/13d@2x.png" >
<?php endif ?>
<?php
if($weatherIcon=="mist"): ?>

<img src="https://openweathermap.org/img/wn/50d@2x.png" >
<?php endif ?>
        </div>



    
      <h2 class="date"><?php echo $current_date ?></h2>
      <p class="icon"><?php echo $weatherIcon?></p>
      <p class="pressure">Pressure:<?php echo $data['pressure'] ?> hPa</p>
      <p class="pressure">Temperature:<?php echo $data['temperature'] ?> °C </p>
      <p class="humidity">Humidity:<?php echo $data['humidity'] ?>% </p>
      <p class="weather condition">Weather condition:<?php echo $data['weather_description'] ?> </p>
      <p class="wind speed">Wind speed:<?php echo $data['wind_speed'] ?>m/s</p>
      </div>
        </div>
        <?php endif; ?>
        <?php  $previous_date = $current_date; // Set the current date as the previous date for the next iteration ?>
        <?php endforeach; ?>
      </section>


     
    
</body>
</html>

