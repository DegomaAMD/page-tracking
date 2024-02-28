<?php
include 'db_connection.php';

$query = "SELECT device_type FROM user_info";
$result = $conn->query($query);

if ($result === false) {
    echo "Error: " . $conn->error;
} else {
    $data = $result->fetch_all(MYSQLI_ASSOC);
    echo json_encode($data);
}

$conn->close();
?>
