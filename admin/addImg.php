<html>
<body>

<?php
//datos del arhivo
$miniatura = "../productos/miniaturas/".$HTTP_POST_FILES['miniatura']['name'];
$grande = "../productos/".$HTTP_POST_FILES['grande']['name'];

//compruebo si las caracter�sticas del archivo son las que deseo
if ((move_uploaded_file($HTTP_POST_FILES['miniatura']['tmp_name'], $miniatura)) && (move_uploaded_file($HTTP_POST_FILES['grande']['tmp_name'], $grande)))
{
	echo "Imagenes guardadas.";
}else{
   echo "Ocurri� alg�n error al subir el fichero. No pudo guardarse.";
}

echo "<a href=\"imagenes.php\">Volver</a>";

?> 

</body>
</html>
