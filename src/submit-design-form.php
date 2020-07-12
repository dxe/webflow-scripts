<?php

require("/home/ubuntu/php-config/adb-forms-config.php");
require("/home/ubuntu/php-config/recaptcha-webflow-config.php");

 if(isset($_POST['g-recaptcha-response'])) {
    // RECAPTCHA SETTINGS
    $captcha = $_POST['g-recaptcha-response'];
    $ip = $_SERVER['REMOTE_ADDR'];
    $key = $recaptcha_secret_key;
    $url = 'https://www.google.com/recaptcha/api/siteverify';
 
    // RECAPTCHA RESPONSE
    $recaptcha_response = file_get_contents($url.'?secret='.$key.'&response='.$captcha.'&remoteip='.$ip);
    $data = json_decode($recaptcha_response);

    if(isset($data->success) &&  $data->success === true) {
        // everything is okay, so keep running the script
    }
    else {
       die('Recaptcha failed!');
    }
 }
 else {
  die('Invalid recaptcha!');
 }

if(!empty($_POST['name'])) {
  // spam bot got caught by our honey pot!
  die('Not permitted.');
}

function test_input($conn, $data) {
  $data = trim($data);
  $data = stripslashes($data);
  $data = htmlspecialchars($data);
  // this will break line breaks and prob isn't needed since we aren't going in sql
  //$data = mysqli_real_escape_string($conn, $data);
  return $data;
}

function AddToArray ($post_information) {
    //Create the return array
    $return = array();
    //Iterate through the array passed
    foreach ($post_information as $key => $value) {
        //Append the key and value to the array, e.g.
            //$_POST['keys'] = "values" would be in the array as "keys"=>"values"
        $return[$key] = $value;
    }
    //Return the created array
    return $return;
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {

  if (isset($_POST['requester-email'])) {
    $data = AddToArray($_POST);
  }

  $emailBody = "";

  foreach ($data as $key => $value) {
    $key = test_input($conn, $key);
    $value = test_input($conn, $value);
    if ($key != "name" && $key != "g-recaptcha-response") { // don't include name as it's just a honey pot field
      $emailBody .= $key . ": ";
      $emailBody .= $value . "\r\n\r\n";
    }
  }

  $sendTo = 'design@directactioneverywhere.com';
  $headers = 'From: "DxE Tech Server" ' . "<tech-noreply@directactioneverywhere.com>" . "\r\n";
  $headers .= 'Cc: jake@directactioneverywhere.com' . "\r\n";
  $headers .= "Reply-To:" . "tech@dxe.io" . "\r\n";
  mail($sendTo,"Design Request Form Submitted",$emailBody,$headers);

  echo "Thank you. Your submission has been sent.";

  die();

}

echo "Error. Please contact tech@dxe.io for support.";

die();

?>