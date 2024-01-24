<?php
include('../conexion.php');

if(isset($_COOKIE['auth-token']) && isset($_POST['id'])){
    $token = $_COOKIE['auth-token'];
    $id = $_POST['id'];

    $consulta = $conn->prepare("DELETE FROM notas WHERE id = ? AND usuarioID = ?");
    $consulta->bind_param('ss', $id, $token); // Corregido: se cambió $nombre por $token
    $consulta->execute();
    echo 'listo';

    $consulta->close();
} else {
    echo 'Faltan parámetros.';
}

$conn->close();
?>
