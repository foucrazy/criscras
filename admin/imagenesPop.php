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

<body>
	<div id="cuerpo">
		<div id="contenido">
			<div id="productos">
				<h2>Imagenes actuales</h2><br>
				<?									

				function listar_directorios_ruta($ruta)
				{
					$id=$_GET['id'];
					
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
							  echo "<br><a href=\"#\" onclick=\"window.opener.document.getElementById('".$id."').value='".$file."'; window.close();\">".$file."</a></div>";
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
	</div>
</body>
</html>
