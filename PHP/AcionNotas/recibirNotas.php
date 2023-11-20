<?php 
    include('../conexion.php');
    $nombre=$_POST['nombre'];
    $contrase=$_POST['contrase'];
    $consulta = $conn->prepare("SELECT * FROM usuarios WHERE nombre = ? AND contrase = ?");
    $consulta->bind_param('ss',$nombre,$contrase);
    $consulta->execute();
    $result = $consulta->get_result();
    if($result->num_rows > 0){
        $consulta = $conn->prepare("SELECT id, texto, fecha FROM notas WHERE nombre = ?");
        $consulta->bind_param("s",$nombre);
        $consulta->execute();
        $result = $consulta->get_result();
        if($result->num_rows > 0){
            // $datos = $result->fetch_all(MYSQLI_ASSOC);
            $datos = array();
            while ($fila = $result->fetch_assoc()){
                $datos[] = [$fila['id'],$fila['texto'],$fila['fecha']];
            }
            echo json_encode(array_reverse($datos));
        }
        else{
            echo json_encode('No hay notas');
        }
    }
    else{
        echo json_encode('fail');
    }
    $consulta->close();
    $conn->close();
?>