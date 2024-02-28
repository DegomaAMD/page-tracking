<?php

include 'db_connection.php';

$query = "SELECT * FROM user_info ORDER BY clicked_on DESC LIMIT 100";
$result = $conn->query($query);

if ($result === false) {
    echo "Error: " . $conn->error;
} else {
    $data = $result->fetch_all(MYSQLI_ASSOC);
    echo json_encode($data);
}

$conn->close();
?>
