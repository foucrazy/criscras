<?
session_start();
if (!isset($_SESSION["autentificado"])){
   $_SESSION["autentificado"] = "NO";
}
?> 

<!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html dir="ltr" xmlns="http://www.w3.org/1999/xhtml" lang="es">

<head>
	<title>CrisCras - Acceder</title>
	<?php include ("head.html");?> 	
</head>

<body>
	<?php include ("cabecera.php");?> 
	<div id="cuerpo">
		<div id="contenido">
			<h1>Acceder</h1>
			<form action="login.php" method="POST">
				<label>Usuario:</label><br>
				<input type="text" value="" name="usuario" id="usuario"/><br>
				<label>Contraseña:</label><br>
				<input type="password" value="" name="password" id="password"/><br><br>
				<input type="submit" value="Entrar" text="Entrar">
			</form>	
		</div>		
		<?php include ("menu.php");?>
	</div>
	<?php include ("pie.php");?> 	
</body>
</html>
