<?php
include("./conexion.php");
$consulta = $conn->prepare("SELECT nombre, contrase FROM usuarios WHERE nombre = ? AND contrase = ?");
$name = $_POST['nombre'];
$contra = $_POST['contrase'];
// #bind param es para que no injecten codigo sql
$consulta->bind_param("ss",$name,$contra);#ss significa que ambos valores son string
// $consulta = $conn->query("SELECT * FROM usuarios  WHERE nombre = '$name' AND contrase = '$contra'");
if($consulta->execute()){
    echo json_encode($consulta->get_result()->fetch_all(MYSQLI_ASSOC));
}
else{
    echo 'fail';
}
$consulta->close();
$conn->close();
?>