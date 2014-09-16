<html>
<body>

<?php
//datos del arhivo
$miniatura = "../productos/miniaturas/".$HTTP_POST_FILES['miniatura']['name'];
$grande = "../productos/".$HTTP_POST_FILES['grande']['name'];

//compruebo si las características del archivo son las que deseo
if ((move_uploaded_file($HTTP_POST_FILES['miniatura']['tmp_name'], $miniatura)) && (move_uploaded_file($HTTP_POST_FILES['grande']['tmp_name'], $grande)))
{
	echo "Imagenes guardadas.";
}else{
   echo "Ocurrió algún error al subir el fichero. No pudo guardarse.";
}

echo "<a href=\"imagenes.php\">Volver</a>";

?> 

</body>
</html>
