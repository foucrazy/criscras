<?php
	session_start();
	if ($_SESSION["autentificado"]!="SI")
	{
		$_SESSION["autentificado"]= "NO";
		header ("Location: index.php");
	}
?>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html dir="ltr" xmlns="http://www.w3.org/1999/xhtml" lang="es">

<head>
	<title>CrisCras - Imagenes</title>
	<?php include ("head.html");?> 	
</head>

<body>
	<?php include ("cabecera.php");?> 
	<div id="cuerpo">
		<div id="contenido">
			<h1>Imagenes</h1>
			<div id="cargador">
				<h2>Subir imagenes para producto nuevo</h2>
				<form method="post" action="addImg.php" name="formNueva" enctype="multipart/form-data">	
					<label>Miniatura:</label>
					<input type="file" value="" id="miniatura" name="miniatura" size="35"/><br>
					<label>Grande:</label>
					<input type="file" value="" id="grande" name="grande" size="35"/><br><br>								
					<input type="submit" value="Subir" text="Añadir"><br>
				</form>				
			</div>
			<hr>
			<div id="productos">
				<h2>Imagenes actuales</h2><br><br>
				<?		
				function listar_directorios_ruta($ruta)
				{
				   if (is_dir($ruta)) 
				   {
					  if ($dh = opendir($ruta))   
					  {
						 while (($file = readdir($dh)) !== false) 
						 {
							$extension = strpos($file, ".json");
							if (!is_dir($ruta."/".$file) && $file!="." && $file!=".." && $extension === false)
							{ 
							  echo "<div style=\"float:left; margin:4px; text-align:center\"><a target=\"blank\" href=\"".$ruta."/".$file."\"><img title=\"".$file."\" alt=\"".$file."\" src=\"".$ruta."/miniaturas/mini_".$file."\" /></a>";  
							  echo "<br>".$file."</div>";
							} 
						 } 
						 closedir($dh); 
					  } 
				   }
				   else 
					 echo "<br>No es ruta valida"; 
				} 
				
				listar_directorios_ruta("../productos");
				?>						
			</div>			
		</div>		
		<?php include ("menu.php");?>
	</div>
	<?php include ("pie.php");?> 	
</body>
</html>
