<?php
include("./conexion.php");
$consulta = $conn->prepare("INSERT INTO usuarios(nombre, contrase) VALUES (?,?)");
$name = trim($_POST['nombre']);
$contra = trim($_POST['contrase']);
#bind param es para que no injecten codigo sql
$consulta->bind_param("ss",$name,$contra);#ss significa que ambos valores son string
$consulta->execute();
if($consulta->affected_rows>0){
    echo 'ok';
}
else{
    echo 'fail';
}
$consulta->close();
$conn->close();
?>