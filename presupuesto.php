<?php

try {
	$nombreCliente = $_POST["nombreCliente"];
	$correoCliente = $_POST["correoCliente"];
	$listaProductos = $_POST["listaProductos"];
	
	$to = "pedidos@criscras.com";
	$cc = "foucrazy@gmail.com";
	$subject = "Pedido en CrisCras.com";
	$message = "Nombre cliente: $nombreCliente <br> Correo cliente: $correoCliente <br> Lista de productos: $listaProductos";
	$from = "pedidos@criscras.com";

	$cabeceras  = 'MIME-Version: 1.0' . "\r\n";
	$cabeceras .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
	$cabeceras .= 'To: Foucrazy <'.$to.'>' . "\r\n";
	$cabeceras .= 'From: Pedidos CrisCras <'. $from .'>' . "\r\n";
	$cabeceras .= 'Cc: '.$cc . "\r\n";	
	
	mail($to,$subject,$message,$cabeceras);
	header("Location: correcto.php");	
} catch (Exception $e) {
	header("Location: fallido.php");    
}

?>