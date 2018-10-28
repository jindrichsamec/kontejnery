<?php

# curl init ve cesitli post icin gerekli ayarlar
$ch = curl_init("https://kontejnery.herokuapp.com" . $_SERVER['REQUEST_URI']);
curl_setopt($ch, CURLOPT_HTTPGET, 1);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
curl_setopt($ch, CURLOPT_HEADER, 0);  // DO NOT RETURN HTTP HEADERS
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);  // RETURN THE CONTENTS OF THE CALL
# post isleminden geri donen response
$response = curl_exec($ch);
# curl objesini kapatiyoruz ki memory vs server sismesin
curl_close($ch);
# response, burda geri donen response a gore JSON, XML, HTML content-type header lari eklenebilir
header('Content-Type: application/json');
echo $response;

