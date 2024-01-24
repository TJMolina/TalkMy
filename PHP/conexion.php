<?php
// header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Origin: https://talkmy.vercel.app");
header('Access-Control-Allow-Credentials: true');
 $servername = "localhost";
 $dbname = "id21367182_talkmy";
 $username= "id21367182_root";
 $password = "#Tobiasmolina170"; 
// $dbname = "talkmy";
// $username = "root";
// $password = "";
 $conn = new mysqli($servername, $username, $password, $dbname);
 
 if ($conn->connect_error) {
     die('Error de conexión: ' . $conn->connect_error);
 }
?> 