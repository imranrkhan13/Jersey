<?php
// Get the form data
$name = $_POST['name'];
$phone = $_POST['phone'];
$address = $_POST['address'];
$city = $_POST['city'];
$state = $_POST['state'];
$zip = $_POST['zip'];

// Generate the receipt
$receipt = "Product Description: <insert product description here>\n";
$receipt .= "Name: $name\n";
$receipt .= "Phone Number: $phone\n";
$receipt .= "Address: $address\n";
$receipt .= "City: $city\n";
$receipt .= "State: $state\n";
$receipt .= "Zip Code: $zip\n";

// Send the receipt to the user
mail($email, "Order Receipt", $receipt);
?>
