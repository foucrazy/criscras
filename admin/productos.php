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
	<title>CrisCras - Productos</title>
	<?php include ("head.html");?> 	
	<link href="./editor/je.css" type="text/css" rel="stylesheet">
	<script language="javascript" src="./editor/a_library.js" type="text/javascript"></script>
	<script language="javascript" src="./editor/jsonEditor.js" type="text/javascript"></script>			
</head>

<body>
	<?php include ("cabecera.php");?> 
	<div id="cuerpo">
		<div id="contenido">
			<h1>Gesti&oacute;n de productos</h1>
			<!--http://www.alkemis.com/jsonEditor.htm-->
			
			<div id="opciones">			
				<a onclick="loadResource('novedades')">Novedades</a>  - 
				<a onclick="loadResource('anillos')">Anillos</a>  - 
				<a onclick="loadResource('pendientes')">Pendientes</a> - 
				<a onclick="loadResource('colgantes')">Colgantes</a> - 
				<a onclick="loadResource('pulseras')">Pulseras</a> - 
				<a onclick="loadResource('broches')">Broches</a> - 
				<a onclick="loadResource('descatalogados')">Descatalogados</a> - 
				<a onclick="loadResource('pruebas')">Pruebas</a>
			</div>
			<br><hr><br>
			
			<div id="editor" style="display:none">
				<input type="hidden" id="infoInJson" value="{}" />
				
				<form action="save.php" method="POST" name="formSave" id="formSave">
					<input type="hidden" value="" id="fichero" name="fichero" />
					<div id="jsonFormDIV"></div>	
				</form>
				<input type='button' class='buttonINPUT' onclick='save()' value="Guardar cambios"/>
				
				<div id="messageDIV" class="messageCloseDIV " style="display: none; ">
					<img id="messageCloseIMG" src="./editor/img/je/popupClose.gif" onclick="jE.messageClose(); " title="Close">
					<div id="messageContentDIV">
					</div>
				</div>

				<div id="mixpanel" style="visibility: hidden; "></div>									
			</div>
		</div>		
		<?php include ("menu.php");?>
	</div>
	<?php include ("pie.php");?> 	
	
	<script type="text/javascript">		
		function save(){
			//Generar json formateado
			jE.form2json(1);
			//Comprobar validez
			jE.evalNewJson();
			//Guardado de los cambios
			$('#formSave').submit();
		}
	
		function loadResource(productName){
			$('#fichero').val(productName);	
			$("#editor").css("display","none");
			$.ajax({
			   type: "GET",
			   dataType: "text",
			   url: "../productos/"+productName+".json",		   
			   success: function(msg){						
				 $('#infoInJson').val(msg);				   
				 $("#editor").css("display","block");				 
				 jE.jsonToForm();
			   },error: function(msg){						 
				 alert("Ha ocurrido un problema");
			   }
			});			
		}
	
		function checkLibsLoaded(){
			var libsLoaded=false;
			if (jQuery) {
				// jQuery esta cargado
				$(document).ready(function() {
					console.log("Librerias y documento listos");
				});			
			} else {
				// jQuery no esta cargado
				setTimeout("checkLibsLoaded()",2000);
			}				
		}						
	
		checkLibsLoaded();			
	</script>		
</body>
</html>