<?php
include('../conexion.php');

if(isset($_COOKIE['auth-token']) && isset($_POST['texto']) && isset($_POST['id'])){
    $token = $_COOKIE['auth-token'];
    $texto = $_POST['texto'];
    $fecha = $_POST['fecha'];
    $id = $_POST['id'];

    $consulta = $conn->prepare("INSERT INTO notas (id, usuarioID, texto, fecha) VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE texto = ?, fecha = ?");
    $consulta->bind_param('ssssss', $id, $token, $texto, $fecha, $texto, $fecha);
    $consulta->execute();

    echo ($consulta->affected_rows > 0) ? 'Operación exitosa.' : 'No se realizaron cambios.';

    $consulta->close();
} else {
    echo 'Faltan parámetros.';
}

$conn->close();
?>
