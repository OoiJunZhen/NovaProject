<?php
// Database configuration
$host = "localhost";
$username = "root";
$password = "";
$dbname = "nova_db";

header("Content-Type: application/json");

try {
    // Connect to the database
    $conn = new mysqli($host, $username, $password, $dbname);

    // Check connection
    if ($conn->connect_error) {
        throw new Exception("Connection failed: " . $conn->connect_error);
    }

    // SQL query to fetch all orders
    $sql = "SELECT id, ticket_number, ticket_number2, six_dgd, formatted_data, details, total_price, timestamp FROM order_tbl";
    $result = $conn->query($sql);

    // SELECT id, ticket_number, ticket_number2, six_dgd, formatted_data, total_price, timestamp
    //     FROM order_tbl
    //     WHERE DATE(timestamp) = CURDATE()
    
    if ($result->num_rows > 0) {
        $orders = [];

        // Fetch each row as an associative array
        while ($row = $result->fetch_assoc()) {
            $orders[] = $row;
        }

        // Return success response with data
        echo json_encode([
            "success" => true,
            "data" => $orders,
        ]);
    } else {
        // Return success response with empty data
        echo json_encode([
            "success" => true,
            "data" => [],
        ]);
    }
} catch (Exception $e) {
    // Return error response
    echo json_encode([
        "success" => false,
        "message" => $e->getMessage(),
    ]);
} finally {
    // Close the database connection
    $conn->close();
}
?>
