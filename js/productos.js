var productos=new Array();
	  
	function getElementByClass(theClass){
		var allHTMLTags = new Array();
		allHTMLTags=document.getElementsByTagName("*");
		for (i=0; i<allHTMLTags.length; i++){
			if (allHTMLTags[i].className==theClass){
				allHTMLTags[i].style.display='none';				
			}
		}
	}
  
	function verDetalles(boton){		
		var indice=boton.attr("indice");							
		$("#tituloPopup").html(productos[indice][0]);
		$("#descripcionPopup").html(productos[indice][1]);
		$("#precioPopup").html(productos[indice][2]);
		$("#imagenPopup").html("<img src=\"productos/"+productos[indice][3]+"\">");		
		$("#productoMostrado").val(productos[indice][3]);
		$("#productos").css("display","none");
		$("#popup").css("width",$("#contenido").width());
		$("#popup").css("height",$("#contenido").height());
		$("#popup").css("left",($("#contenido").position().left)+9);
		$("#popup").css("display","block");
	}
		
	function cerrarDetalles(){
		$("#productos").css("display","block");
		$("#popup").css("display","none");
	}
	
	$(document).ready(function()
	{
		document.onkeydown = function(e){ 
          if (e == null) { // ie 
            keycode = event.keyCode; 
          } else { // mozilla 
            keycode = e.which; 
          } 
          if(keycode == 27){ // escape
			  cerrarDetalles();
          } 
        };
		
		$.getJSON(tipo,
		function(data)
		{							
		  $.each(data.items, function(i,item)
		  {
			productos[i]=new Array();
			var prod = productos[i];
			prod[0]=item.title;
			prod[1]=item.description;
			prod[2]=item.price;
			prod[3]=item.image;
			
			$("<div/>").attr("class", "imageDiv").attr("id","imageDiv"+i).appendTo("#productos");
			$("<img/>").attr("src", "productos/miniaturas/mini_"+prod[3]).attr("class","product").appendTo("#imageDiv"+i);						
			$("<img/>").attr("src", "css/add.png").attr("indice",i).attr("id","moreButton"+i).attr("class","moreButton").attr("title","Ver detalles").appendTo("#imageDiv"+i);
			
			$("#moreButton"+i).click(function () {
				verDetalles($(this));
			});			
		  });
		});				
	});