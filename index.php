<!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html dir="ltr" xmlns="http://www.w3.org/1999/xhtml" lang="es">

<head>
	<title>CrisCras</title>
	<?php include ("head.html");?> 		
	<link rel="stylesheet" href="css/nivo-slider.css" type="text/css" media="screen" />
	<script src="js/nivo-slider/jquery.nivo.slider.pack.js" type="text/javascript"></script>

	<script type="text/javascript">
	$(window).load(function() {
	    $('#slider').nivoSlider(
		{
			effect:'fold',
			animSpeed:500,
			pauseTime:3000,
			directionNav:false,
			pauseOnHover:true
		});
	});
	</script>
</head>

<body>
	<?php include ("cabecera.php");?> 
	<div id="cuerpo">
		<div id="contenido">
			<h1>Bienvenido a CrisCras.com!</h1>
			<br />
			<div id="slider-wrapper">
			    <div id="featured"></div>
			    <div id="slider" class="nivoSlider">				  
			    </div>
			</div>			
			<p>
				&nbsp;&nbsp;&nbsp;Todos los productos aqu&iacute; mostrados son de elaboraci&oacute;n artesanal y con materiales de primera calidad como el murano, tiffany, swarovski, plata, etc.
				<br />&nbsp;&nbsp;&nbsp;Si no encuentra lo que busca que sepa que los dise&ntilde;os de los productos son <b>totalmente personalizables</b> por el cliente, usted mismo puede 
				convertirse en el dise&ntilde;ador de sus complementos! 
			</p>
			<div id="productos">
			<script  type="text/javascript">
				$(document).ready(function()
				{
					$.getJSON("productos/novedades.json",
					function(data)
					{							
					  $.each(data.items, function(i,item)
					  {						
						$("<img/>").attr("src", "productos/"+item.image).appendTo("#slider");
					  });
					});				
				});
			</script>
			</div>
		</div>		
		<?php include ("menu.php");?> 
	</div>	
	<?php include ("pie.php");?> 
</body>
</html>
