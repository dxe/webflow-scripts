<?php
require("/home/ubuntu/php-config/adb-forms-config.php");

if(!empty($_POST['name'])) {
  // spam bot got caught by our honey pot!
  http_response_code(400);
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
    if ($key == "item-description") {
      $item_description = $value;
    }
  }

  $sendTo = 'design@directactioneverywhere.com';
  $headers = 'From: "Design Form Submissions" ' . "<tech-noreply@directactioneverywhere.com>" . "\r\n";
  $headers .= 'Cc: jake@directactioneverywhere.com' . "\r\n";
  $headers .= "Reply-To:" . "tech@dxe.io" . "\r\n";
  mail($sendTo,"Design Request Form Submitted",$emailBody,$headers);

  $sendTo = 'x+509541481001483@mail.asana.com';
  $headers = 'From: "Jake Hobbs" ' . "<jake@directactioneverywhere.com>" . "\r\n";
  $headers .= "Reply-To:" . "tech@dxe.io" . "\r\n";
  mail($sendTo,$item_description,$emailBody,$headers);

  echo "Thank you. Your submission has been sent.";

  http_response_code(200);
  die();

}

echo "Error. Please contact tech@dxe.io for support.";

http_response_code(400);
die();

?>