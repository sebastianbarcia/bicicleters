<?php

$mail = $_POST['email'];

$header = 'From: ' . $mail . " \r\n";
$header .= "X-Mailer: PHP/" . phpversion() . " \r\n";
$header .= "Mime-Version: 1.0 \r\n";
$header .= "Content-Type: text/plain";

$para = 'sebastianbarcia@hotmail.com';
$asunto = 'Mensaje del sitio web bicicleters';

mail($para, $asunto, utf8_decode($mail), $header);
header("Location:/index.html");
?>