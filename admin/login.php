<?
session_start();
$_SESSION["autentificado"] = "NO";

if ($_POST["usuario"]=="txonyblue" && $_POST["password"]=="foucrazy"){	
    $_SESSION["autentificado"]= "SI";
    header ("Location: productos.php");
}else {
    header("Location: index.php");
}
?> 