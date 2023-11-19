<?php 
include('../conexion.php');
header('Content-Type: text/html; charset=utf-8');
$url = $_POST['url'];
$html = file_get_contents($url);
$texto = preg_replace('/<head>.*<\/head>/s', '', $html);
$texto = preg_replace('/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/si', '', $texto);
$texto = preg_replace('/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/i', '', $texto);
$texto = preg_replace('/<nav\b[^<]*(?:(?!<\/nav>)<[^<]*)*<\/nav>/i', '', $texto);
$texto = preg_replace('/<header\b[^<]*(?:(?!<\/header>)<[^<]*)*<\/header>/i', '', $texto);
$texto = preg_replace('/<footer\b[^<]*(?:(?!<\/footer>)<[^<]*)*<\/footer>/i', '', $texto);
$texto = preg_replace('/<aside\b[^<]*(?:(?!<\/aside>)<[^<]*)*<\/aside>/i', '', $texto);
$texto = preg_replace('/<button\b[^<]*(?:(?!<\/button>)<[^<]*)*<\/button>/i', '', $texto);
$texto = preg_replace('/<select\b[^<]*(?:(?!<\/select>)<[^<]*)*<\/select>/i', '', $texto);
$texto = preg_replace('/<dialog\b[^<]*(?:(?!<\/dialog>)<[^<]*)*<\/dialog>/i', '', $texto);
echo $texto;
?>
