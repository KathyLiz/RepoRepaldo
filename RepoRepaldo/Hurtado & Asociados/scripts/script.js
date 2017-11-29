//Se utiliza jQuery para obtener el evento click sobre el botón de contáctanos 
$(function(){
$("#addClass").click(function () {
		//Lanza la ventana de chat, la abre
          $('#qnimate').addClass('popup-box-on');
            });
         //Oculta la ventana de chat
            $("#removeClass").click(function () {
          $('#qnimate').removeClass('popup-box-on');
            });
  });
  
  function mostrar(){
	  var nombres = document.getElementById("fname").value;
	  var correo= document.getElementById("correo").value;
	  var telefono=document.getElementById("correo").value;
	  var descripcion=document.getElementById("tpoProforma").value;
	  alert("Los valores ha registrar son:"+"\n"+ "Nombre: "+nombres + "\nCorreo: "+correo+"\Teléfono: "+telefono+"\nDescripción: "+descripcion);
  }
