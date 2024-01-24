<?php
include('../conexion.php');

if(isset($_COOKIE['auth-token'])){
    $token = $_COOKIE['auth-token'];
    $completada = $_POST['completada'];
    $fecha = $_POST['fecha'];
    $id = $_POST['id'];
    
    $consulta = $conn->prepare("UPDATE notas SET fecha = ?, completada = ? WHERE id = ? AND usuarioID = ?");
    $consulta->bind_param('sss', $fecha, $completada, $id, $token);
    $consulta->execute();
    echo ($consulta->affected_rows > 0) ? 'Operación exitosa.' : 'No se realizaron cambios.';

    $consulta->close();
}    
$conn->close();
?>