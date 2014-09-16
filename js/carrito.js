	function getCarrito(){
	  var productosCarrito=$.sessionStorage( 'productosCarrito' );
	  if (productosCarrito==null){
			productosCarrito =  new Array();
	  }	 	
	  console.debug('Carrito con '+productosCarrito.length+' productos');
	  return productosCarrito;
	}	
	
	function anadir(){
	    console.debug("Añadiendo al carrito");	

		var productoNuevo = new Array();
		productoNuevo[0] = $("#productoMostrado").val();
		productoNuevo[1] = $("#tituloPopup").html();
		productoNuevo[2] = $("#descripcionPopup").html();
		productoNuevo[3] = $("#precioPopup").html();
		
		var productosCarrito=getCarrito();		
		productosCarrito[productosCarrito.length]=productoNuevo;		
		$.sessionStorage( 'productosCarrito', productosCarrito );
		mostrar();
	}
	
	function eliminar(productoEliminar){
	  console.debug("Eliminado del carrito:"+productoEliminar);
	  var productosCarrito=getCarrito();	  
	  var newProductosCarrito=new Array();	  
	  var yaEliminado=false;
	  $.each(productosCarrito, function(i,producto){		
		if (producto[0]!=productoEliminar || yaEliminado){
			newProductosCarrito[newProductosCarrito.length]=producto;
		}else{
		  yaEliminado=true;
		}		
	  });			
	  $.sessionStorage( 'productosCarrito', newProductosCarrito );
	}
	
	function mostrar(){	
	  console.debug("Mostrando carrito");	
	  var productosCarrito=getCarrito();
	  $("#productosCarritoLateral").empty();
	  $.each(productosCarrito, function(i,producto)	{	
		$("<div/>").attr("class", "iconoCarritoLateral").attr("id","iconoCarritoLateral"+i).appendTo("#productosCarritoLateral");
		$("<img/>").attr("title", producto[1]).attr("src", "productos/miniaturas/mini_"+producto[0]).appendTo("#iconoCarritoLateral"+i);		
	  });	
	  
	  if(productosCarrito.length>0){
		$("#infoCarritoLateral").html('Llevas '+(productosCarrito.length)+' productos');
	  }
	}
	
	function mostrarDetallado(){	
	  console.debug("Mostrando carrito detallado");	
	  var productosCarrito=getCarrito();
	  var total=parseInt(0);
	  $("#productosEnCarrito").empty();
	  $.each(productosCarrito, function(i,producto){		
		$("<div/>").attr("class", "listaProductos").attr("id","detallesProducto"+i).appendTo("#productosEnCarrito");
		$("<img/>").attr("src", "productos/miniaturas/mini_"+producto[0]).appendTo("#detallesProducto"+i);		
		$("<p/>").attr("innerHTML", producto[1]+' - '+producto[3]+'&euro;').appendTo("#detallesProducto"+i);	
		$("<a/>").attr("href", 'carrito.php').attr("innerHTML", 'Ya no lo quiero').attr("onClick", 'eliminar(\''+producto[0]+'\')').appendTo("#detallesProducto"+i);
		total=total + parseInt(producto[3]);
		$("#totalCarrito").html('Llevas '+(productosCarrito.length)+' productos, que hace un total de '+total+' &euro;');		
	  });		  	 
	}
	
	function resumirPedido(){
	  var productosCarrito=getCarrito();	
	  var resumen='';	  
	  $.each(productosCarrito, function(i,producto)	{	
		resumen = resumen + producto[0] +'#';
	  });		
	  $("#listaProductos").val(resumen);
	}
	
	function limpiarPedido(){
		var newProductosCarrito=new Array();	  
		$.sessionStorage( 'productosCarrito', newProductosCarrito );
		mostrar();
	}
	
	$(document).ready(function(){
		mostrar()
	});	