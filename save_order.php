<?php
header("Content-Type: application/json");

// Database configuration
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "nova_db";

// Retrieve POST data
$data = json_decode(file_get_contents("php://input"), true);

// Validate data
if (!$data) {
    echo json_encode(["success" => false, "message" => "Invalid input"]);
    exit;
}

// Extract data
$userInput = json_encode($data["userInput"]);
$details = $data["details"];
$ticketNumber = $data["ticketNumber"];
$ticketNumber2 = $data["ticketNumber2"];
$sixDGD = $data["SixDGD"];

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    echo json_encode(["success" => false, "message" => "Connection failed: " . $conn->connect_error]);
    exit;
}

// Insert data
// $sql = "INSERT INTO order_tbl (user_input, details, ticket_number, ticket_number2, six_dgd) VALUES (?, ?, ?, ?, ?)";
$sql = "INSERT INTO `orders_tbl`(`ticketNumber`) VALUES ('$ticketNumber')";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sssss", $userInput, $details, $ticketNumber, $ticketNumber2, $sixDGD);

if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "Order saved successfully"]);
} else {
    echo json_encode(["success" => false, "message" => "Error: " . $stmt->error]);
}

$stmt->close();
$conn->close();
?>
