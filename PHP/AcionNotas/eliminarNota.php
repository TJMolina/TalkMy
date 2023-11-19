<?php
include('../conexion.php');

if(isset($_POST['nombre'], $_POST['contrase'],  $_POST['id'])){
    $nombre = $_POST['nombre'];
    $contrase = $_POST['contrase'];
    $id = $_POST['id'];

    $consulta = $conn->prepare("SELECT * FROM usuarios WHERE nombre = ? AND contrase = ?");
    $consulta->bind_param('ss', $nombre, $contrase);
    $consulta->execute();
    $result = $consulta->get_result();

    if ($result->num_rows > 0) {
        $consulta = $conn->prepare("DELETE FROM notas WHERE id= ? AND nombre = ?");
        $consulta->bind_param('ss', $id, $nombre);
        $consulta->execute();
        echo 'listo';
    } else {
        echo 'Credenciales incorrectas o usuario no existente.';
    }
    $consulta->close();
} else {
    echo 'Faltan parámetros.';
}

$conn->close();
?>