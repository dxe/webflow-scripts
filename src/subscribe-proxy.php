<?php
require("/home/ubuntu/php-config/sendy-api-config.php");

if ($_SERVER["REQUEST_METHOD"] != "POST") {
  http_response_code(400);
  die("Invalid request.");
}

// get variables from post
$name = $email = $chapter = "";
$name = test_input($conn, $_POST["subscriber-name"]);
$email = test_input($conn, $_POST["subscriber-email"]);
$chapter = test_input($conn, $_POST["subscriber-chapter"]);

if (empty($email)) {
   http_response_code(400);
   die("Email not supplied.");
}

// calculate first name
$i = strpos($name, " ");
if ($i == FALSE) {
  // there are no spaces in name
  $firstName = $name;
} else {
    $firstName = substr($name, 0, $i);
}

// add to global sendy list
add_to_sendy($name, $email, $firstName, "Jx892mirlwaaY8uFHms763uCrw");
echo "Subscribed to Global. ";

// add to sf bay sendy list if chapter is sf bay
// IF chapter == SF Bay Area
if ($chapter == "SF Bay Area") {
  add_to_sendy($name, $email, $firstName, "7xHfg85E19lj763ubrr95e1g");
  echo "Subscribed to SF Bay. ";
}

// close connection
http_response_code(200);
die();

function add_to_sendy($name, $email, $first_name, $list_id) {
  // make request to sendy
  $url = 'https://sendy.dxetech.org/subscribe';
  $data = array(
    'name' => $name,
    'email' => $email,
    'list' => $list_id,
    'FirstName' => $first_name,
    'LastSource' => 'Webflow Sign Up Form',
    'hp' => '',
    'api_key' => $GLOBALS['sendy_api_key'],
    'boolean' => 'true' // gives us a plain text response
  );
  $options = array(
      'http' => array(
          'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
          'method'  => 'POST',
          'content' => http_build_query($data)
      )
  );
  $context  = stream_context_create($options);
  $result = file_get_contents($url, false, $context);
  if ($result === FALSE) {
    /* Handle error */
    http_response_code(500);
    die("Sendy error.");
  }
  // read sendy response
  if ($result == 1 || $result == "Already subscribed.") {
    return;
  } else {
    http_response_code(500);
    die("Sendy error: " . $result);
  }
}

function test_input($conn, $data) {
  $data = trim($data);
  $data = stripslashes($data);
  $data = htmlspecialchars($data);
  // this will break line breaks and prob isn't needed since we aren't going in sql
  //$data = mysqli_real_escape_string($conn, $data);
  return $data;
}

?>