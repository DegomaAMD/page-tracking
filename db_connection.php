<?php
$servername = "localhost";
$username = "id21923373_stats";
$password = "@Parker08";
$dbname = "id21923373_stats";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
