<!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html dir="ltr" xmlns="http://www.w3.org/1999/xhtml" lang="es">

<head>
	<title>CrisCras - Guardar</title>
	<?php include ("head.html");?> 	
</head>

<body>
	<?php include ("cabecera.php");?> 
	<div id="cuerpo">
		<div id="contenido">
			<h1>Guardar</h1>
						
			<?php
			$fichero=$_POST['fichero'];
			$contenido=$_POST['newInfoInJson'];
			$now=time();
			
			try{
				echo "Producto:".$fichero;
				echo "<br> Contenido:".$contenido;
				
				$now=time();
				copy("../productos/".$fichero.".json", "../productos/".$fichero."-".$now.".json"); 
				unlink("../productos/".$fichero.".json"); 
				$archivo= fopen("../productos/".$fichero.".json" , "w"); 
				if ($archivo) { 
					fputs ($archivo, $contenido);					
				} 				
				fclose ($archivo);
				echo "<p>Productos actualizados correctamente.</p>";
				
			}catch(Exception $e){
			   echo "<p>Ocurrió algún error,no pudo guardarse.</p>";
			   copy("../productos/".$fichero."-".$now.".json","../productos/".$fichero.".json"); 
			}

			echo "<a href=\"productos.php\">Volver</a>";

			?> 

		</div>		
		<?php include ("menu.php");?>
	</div>
	<?php include ("pie.php");?> 	
</body>
</html>
