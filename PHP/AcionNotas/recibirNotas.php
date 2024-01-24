<?php 
    include('../conexion.php');
    if(isset($_COOKIE['auth-token'])){
        $token = $_COOKIE['auth-token'];
    
        $consulta = $conn->prepare("SELECT * FROM notas WHERE usuarioID = ?");
        $consulta->bind_param('s',$token);
        $consulta->execute();
        $result = $consulta->get_result();
        if($result->num_rows > 0){
            // $datos = $result->fetch_all(MYSQLI_ASSOC);
            $datos = array();
            while ($fila = $result->fetch_assoc()){
                $datos[] = [$fila['id'],$fila['texto'],$fila['fecha'],$fila['completada']];
            }
            echo json_encode(array_reverse($datos));
            }
        else{
            echo json_encode('No hay notas');
        }
        $consulta->close();
    }
    $conn->close();
?>