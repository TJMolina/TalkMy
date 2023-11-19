<?php
include('../conexion.php');

if(isset($_POST['nombre'], $_POST['contrase'], $_POST['texto'], $_POST['id'])){
    $nombre = $_POST['nombre'];
    $contrase = $_POST['contrase'];
    $texto = $_POST['texto'];
    $fecha = $_POST['fecha'];
    $id = $_POST['id'];

    $consulta = $conn->prepare("SELECT * FROM usuarios WHERE nombre = ? AND contrase = ?");
    $consulta->bind_param('ss', $nombre, $contrase);
    $consulta->execute();
    $result = $consulta->get_result();

    if ($result->num_rows > 0) {
        $consulta = $conn->prepare("INSERT INTO notas (id, texto, nombre, fecha) VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE texto = ?, fecha = ?");
        $consulta->bind_param('ssssss', $id, $texto, $nombre, $fecha, $texto, $fecha);
        $consulta->execute();

        echo ($consulta->affected_rows > 0) ? 'Operación exitosa.' : 'No se realizaron cambios.';
    } else {
        echo 'Credenciales incorrectas o usuario no existente.';
    }

    $consulta->close();
} else {
    echo 'Faltan parámetros.';
}

$conn->close();
?>