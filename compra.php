<!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html dir="ltr" xmlns="http://www.w3.org/1999/xhtml" lang="es">

<head>
	<title>CrisCras - Terminar compra</title>
	<?php include ("head.html");?> 
</head>

<body onload="resumirPedido()">
	<?php include ("cabecera.php");?> 

	<div id="cuerpo">
		<div id="contenido">
			<h1>Terminar compra</h1>
			<p>
				Debido a que todos nuestros productos son fabricados a mano no disponemos de un gran stock permanente. Por esa razón para completar tu pedido necesitamos que nos facilites un par de datos para que podamos contactar contigo e informarte.
			</p>
			<form action="presupuesto.php" method="POST" enctype="text/plain" accept-charset="ISO-8859-1">
				<input type="hidden" id="listaProductos" name="listaProductos"/>
				<label for="nombreCliente">Nombre:&nbsp;&nbsp;</label>
				<input type="text" id="nombreCliente" name="nombreCliente"/><br><br>
				<label for="correoCliente">Correo electr&oacute;nico:&nbsp;&nbsp;</label>
				<input type="text" id="correoCliente" name="correoCliente" /><br><br>
				<input type="submit" title="Solicitar" name="Solicitar" value="Solicitar compra"/>
			</form>
		</div>
		
		<?php include ("menu.php");?> 
	</div>
	
	<?php include ("pie.php");?> 
</body>
</html>
