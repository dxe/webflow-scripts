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


// define variables and set to empty values
$email = $subject = $message = "";

if ($_SERVER["REQUEST_METHOD"] == "POST") {

  // if subject & message are blank, don't bother sending the email

  $email = test_input($conn, $_POST["email"]);
  $subject = test_input($conn, $_POST["subject"]);
  $message = test_input($conn, $_POST["message"]);

  if ($subject == "" && $message == "") {
    die('No subject or message provided.');
  }

  $emailMsg = "Email: " . $email . "\r\n\r\nSubject: " . $subject . "\r\n\r\nMessage: " . $message;
  $sendTo = 'dxe@directactioneverywhere.com';
  $headers = 'From: "DxE Tech Server" ' . "<tech-noreply@directactioneverywhere.com>" . "\r\n";
  $headers .= 'Cc: jake@directactioneverywhere.com' . "\r\n";
  mail($sendTo,"Contact Form Submission", $emailMsg, $headers);

  echo "Thank you for your submission.";
  die;
  
}
else {
  die();
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