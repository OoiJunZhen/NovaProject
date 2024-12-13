<?php
header('Content-Type: application/json');

$host = "localhost";
$username = "root"; // Default username for XAMPP
$password = "";     // Default password is empty for XAMPP
$database = "nova_db";

// Create a connection
$conn = new mysqli($host, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die(json_encode(["success" => false, "message" => "Database connection failed: " . $conn->connect_error]));
}

// Get POST data
$data = json_decode(file_get_contents('php://input'), true);

if ($data) {
    $ticket_number = $conn->real_escape_string($data['ticket_number']);
    $ticket_number2 = $conn->real_escape_string($data['ticket_number2']);
    $six_dgd = $conn->real_escape_string($data['six_dgd']);
    $user_inputs = $conn->real_escape_string(json_encode($data['user_inputs']));
    $formatted_data = $conn->real_escape_string($data['formatted_data']);
    $total_price = $conn->real_escape_string($data['total_price']);
    $details = $conn->real_escape_string($data['details']);

    $sql = "INSERT INTO order_tbl (ticket_number, ticket_number2, six_dgd, user_inputs, formatted_data, details, total_price)
            VALUES ('$ticket_number', '$ticket_number2', '$six_dgd', '$user_inputs', '$formatted_data', '$details', '$total_price')";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(["success" => true, "message" => "Data stored successfully."]);
    } else {
        echo json_encode(["success" => false, "message" => "Error: " . $conn->error]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Invalid input."]);
}

$conn->close();
?>