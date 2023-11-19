<?php
header("Access-Control-Allow-Origin: *");

 $servername = "localhost";
 $dbname = "id21367182_talkmy";
 $username= "id21367182_root";
 $password = "#Tobiasmolina170"; 

 $conn = new mysqli($servername, $username, $password, $dbname);
 
 if ($conn->connect_error) {
     die('Error de conexión: ' . $conn->connect_error);
 }
?> 