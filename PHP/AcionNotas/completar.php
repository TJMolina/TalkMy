<?php
include('../conexion.php');

$nombre = $_POST['nombre'];
$contrase = $_POST['contrase'];
$completada = $_POST['completada'];
$fecha = $_POST['fecha'];
$id = $_POST['id'];

$consulta = $conn->prepare("SELECT * FROM usuarios WHERE nombre = ? AND contrase = ?");
$consulta->bind_param('ss', $nombre, $contrase);
$consulta->execute();
$result = $consulta->get_result();

if ($result->num_rows > 0) {
    $consulta = $conn->prepare("UPDATE notas SET fecha = ?, completada = ? WHERE id = ?");
    $consulta->bind_param('sss', $fecha, $completada, $id);
    $consulta->execute();
    echo ($consulta->affected_rows > 0) ? 'Operación exitosa.' : 'No se realizaron cambios.';
}
 else {
    echo 'Credenciales incorrectas o usuario no existente.';
}

$consulta->close();
$conn->close();
?>