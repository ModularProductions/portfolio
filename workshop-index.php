<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Matt Haddock - des+dev</title>
  <meta name="description" content="Development for web, apps, and life">
  <meta name="author" content="">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">  
  <link rel="stylesheet" href="assets/css/reset.css">
  <!-- <link rel="stylesheet" href="assets/css/typeplate.css"> -->
  <link rel="stylesheet" href="assets/css/style.css">
  <!--[if lt IE 9]>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/html5shiv/3.7.3/html5shiv.js"></script>
  <![endif]-->
  <link href="https://fonts.googleapis.com/css?family=Alegreya:400i|Cambo|Courgette|Kotta+One|Roboto+Mono|Sriracha" rel="stylesheet">
</head>
<body>
  <div id="wrap">
    <div id="name">
      <div class="flavor pre inline">
        <span class="dec">const </span>
        <span class="varname">me </span>
        <span class="punc">= </span>
      </div>
      <h1>Matt Haddock</h1>
      <span class="punc"> ;</span>
    </div>
    <div id="arena">
      <span class="arenaWords">design and development</span>
    </div>
    <div id="projectsMenu">
      <span class="projectsToggle">expand.projects</span>
      <span class="filterArea hidden">
        (
        <span class="filterText">filter 
          <span class="filterNone">none</span>
          <span class="filterAll">all</span> 
        </span> ||
        <ul id="filterSet"></ul>
        );
      </span>
      <span class="thumbnails inline">
        = [
        <div id="thumbSet">
        </div>
        ];
      </span>
    </div>
    <div id="projectsDisplay">
    </div>
    <div id="about">
      <img src="./assets/images/circle-portrait.png" alt="portrait" />
      <p>Hi, I'm Matt. I wear a lot of figurative hats, but very few real ones. I'm an audio engineer, stage technician, sound designer, visual artist, and web developer. I like designing, making, customizing, rewiring, and repurposing. You can see some of my development projects up there, and contact information down there. </p>
    </div>
    <div id="contact">
      <div id="network">
        <ul>
          <li><a href="https://www.linkedin.com/in/matt-haddock-812804146/" target="_blank"><img src="assets/images/linkedin.png" width="30" height="30" alt="LinkedIn" /></a></li>
          <li><a href="http://www.github.com/ModularProductions" target="_blank"><img src="assets/images/github.png" width="30" height="30" alt="GitHub" /></a></li>
          <li><a href="http://www.twitter.com/TheNosferadude" target="_blank"><img src="assets/images/twitter.png" width="30" height="30" alt="Twitter" /></a></li>
          <li><a href="http://www.stackoverflow.com/users/8679340/nosferadude" target="_blank"><img src="assets/images/stackoverflow.png" width="30" height="30" alt="Stack Overflow" /></a></li>
        </ul>
      </div>
      <p>$.find(me)</p>
      <div id="contactContainer">
        <div class="contact">$(hitMe).up<span class="submit">"SEND", message</span></div>
        <div id = "emailForm">
          <form method="post" name="myemailform" action="form-to-email.php">
            <input type="text" name="name" placeholder="name">
            <input type="email" name="email" placeholder="email@address.com">
            <textarea name="message" placeholder="tell me your secrets"></textarea>
            <input type="submit" name='submit' class="hidden">
          </form>
        </div>
      </div>
    </div>
  </div> <!-- wrap -->
  <footer>
  </footer>
    <!-- <div id="main-content">
      <section id="about">
        <h2>About Me</h2>
        <img src="assets/images/me.jpeg" />
        <p>Hailing from Northern Virginia, I came to Georgia in pursuit of a degree in Illustration. As fate would have it, I got involved in the shadowy world of theater while in school, and though I did attain the degree, have been spending my time since as a theatrical technician and audio engineer. Along the way, I've developed an alter ego as a club DJ and music designer, and can be found blasting massive industrial beats when I'm not involved in soundtrack design for fashion shows. Other pastimes include Photoshop, Playstations, and carpentry.</p>
        <p>I've recently begun exploring a longtime hobby of computer coding more deeply, and am attending formal training with the goal of improving my skills and exploring new opportunities in hunching over computers.</p>
      </section>
    </div> -->
  <?php
    require_once "formavalidator.php"

    // set up validation
    $validator = new FormValidator();
    $validator->addValidation("name","req","Please fill in Name");
    $validator->addValidation("email","email","The input for Email should be a valid email value");
    $validator->addValidation("email","req","Please fill in Email");
    )
    // access form submission data
    $name = $_POST['name'];
    $visitor_email = $_POST['email'];
    $message = $_POST['message'];

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
  <script 
  src="https://code.jquery.com/jquery-3.2.1.min.js"
  integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4="
  crossorigin="anonymous"></script>
  <script src="projects.js"></script>
  <script src="assets/js/magic.js"></script>
  <!-- <script>
    $('#someID').on("click", function(){
      $('#submitButton').click();
    })
  </script> -->
</body>
</html>