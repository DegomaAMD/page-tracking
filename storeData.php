<?php
$servername = "localhost";
$username = "id21927008_hb88_andria";
$password = "@Hb88988";
$dbname = "id21927008_page_status";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$inputJSON = file_get_contents('php://input');
$clientData = json_decode($inputJSON, TRUE);


$visitDateTime = date("Y-m-d H:i:s"); 


$ip = $_SERVER['REMOTE_ADDR'];
$hostname = gethostbyaddr($ip);
$response = file_get_contents("http://ip-api.com/json/{$ip}?fields=countryCode");
$data = json_decode($response, true);
$countryCode = $data['countryCode'];



$stmt = $conn->prepare("INSERT INTO user_info (user_country, user_ip, uri, link, host, referrer, clicked_on, device_type, browser_type) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");


$uri = $clientData['uri'] ?? '';
$link = $clientData['link'] ?? '';
$referrer = $clientData['referrer'] ?? '';
$deviceType = $clientData['deviceType'] ?? '';
$browserType = $clientData['browserType'] ?? '';


$stmt->bind_param("sssssssss", $countryCode, $ip, $uri, $link, $hostname, $referrer, $visitDateTime, $deviceType, $browserType);


if ($stmt->execute()) {
    echo "Data captured and saved. ID: " . $stmt->insert_id;
} else {
    echo "Error inserting data: " . $stmt->error;
}

$conn->close();

?>