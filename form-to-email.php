
<?php
  // following along at http://form.guide/php-form/php-form-validation.html
  
  require_once "formvalidator.php";
  
  // access form submission data
  $name = trim($_POST['name']);
  $visitor_email = $_POST['email'];
  $message = $_POST['message'];
  
  // set up validation
  $validator = new FormValidator();
  $validator->addValidation("name","req","Please enter your name");
  $validator->addValidation("email","email","The input for Email should be a valid email value");
  $validator->addValidation("email","req","Please fill in Email");
  )

  // validate form
  if(!$validator->ValidateForm())
  {
    echo "<B></B>"
  }

  // compose email message
  $email_from = 'matt@modularproductions.net';
  $email_subject = "New Form submission";
  $email_body = "You have received a new message from the user $name.\n"."Here is the message:\n $message";

  // send the email
  $to = "matt@modularproductions.net";
  $headers = "From: $email_from \r\n";
  $headers .= "Reply-To: $visitor_email \r\n";
  mail($to,$email_subject,$email_body,$headers);
?>