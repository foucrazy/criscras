<!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html dir="ltr" xmlns="http://www.w3.org/1999/xhtml" lang="es">

<head>
	<title>CrisCras - Carrito</title>
	<?php include ("head.html");?> 
</head>

<body onload="mostrarDetallado()">
	<?php include ("cabecera.php");?> 

	<div id="cuerpo">
		<div id="contenido">
			<h1>Productos elegidos</h1>
			<div id="productosEnCarrito"></div>
			<div id="opcionesCarrito">
				<p id="totalCarrito"></p>
				<a href="index.php">Continuar mirando</a>
				<a href="compra.php">Terminar pedido</a>
			</div>
		</div>
		
		<?php include ("menu.php");?> 
	</div>
	
	<?php include ("pie.php");?> 
</body>
</html>
