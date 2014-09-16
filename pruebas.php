<!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html dir="ltr" xmlns="http://www.w3.org/1999/xhtml" lang="es">

<head>
	<title>CrisCras - Pruebas</title>
	<?php include ("head.html");?> 	
	<script> var tipo="productos/pruebas.json"; </script>			
	<script src="js/productos.js" type="text/javascript"></script>
</head>

<body>
	<?php include ("cabecera.php");?> 
	<div id="cuerpo">
		<div id="contenido">
			<h1>Pruebas</h1>
			<div id="productos"></div>			
		</div>		
		<?php include ("menu.php");?>
	</div>
	<div id="popup">
		<div id="controlPopup"><a href="#productos" onclick="cerrarDetalles()"><img src="css/cerrar.png" alt="Cerrar" title="Cerrar"/></a></div>
		<div id="imagenPopup"></div>
		<div id="tituloPopup"></div>
		<div id="descripcionPopup"></div>
		<div id="precioPopup"></div>
		<div id="opcionesPopup"><a href="#productos"><img src="css/melopido.png" alt="Me lo pido!" title="Me lo pido!"/></a></div>
	</div>
	<?php include ("pie.php");?> 	
</body>
</html>
