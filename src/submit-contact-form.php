<?php
require("/home/ubuntu/php-config/adb-forms-config.php");

// define variables and set to empty values
$email = $subject = $message = "";

if ($_SERVER["REQUEST_METHOD"] == "POST") {

  // if subject & message are blank, don't bother sending the email

  $email = test_input($conn, $_POST["email"]);
  $subject = test_input($conn, $_POST["subject"]);
  $message = test_input($conn, $_POST["message"]);

  if ($subject == "" && $message == "") {
    http_response_code(400);
    die('No subject or message provided.');
  }

  $emailMsg = "From: " . $email . "<br /><br />Message: " . $message;
  $sendTo = 'dxe@directactioneverywhere.com';
  $headers = "MIME-Version: 1.0" . "\r\n"; 
  $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n"; 
  $headers .= 'From: "DxE Website Contact Form Submissions" ' . "<tech-noreply@directactioneverywhere.com>" . "\r\n";
  $headers .= 'Cc: jake@directactioneverywhere.com' . "\r\n";
  mail($sendTo, $subject, $emailMsg, $headers);

  echo "Thank you for your submission.";
  http_response_code(200);
  die;
  
}
else {
  http_response_code(400);
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