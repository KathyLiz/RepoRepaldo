/**
 * Copyright 2017 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
 //Función para hacer el consumo de la API de DialogFlow, el agente que responde las preguntas
(function() {
  "use strict";
	//Esta varible se inicializa en 13 porque es el código de la tecla enter
  var ENTER_KEY_CODE = 13;
  //Se declaran variables para guardar el request y el response
  var queryInput, resultDiv;
  //Se guarda el token de acceso que permite hacer la peticiones a la API de Inteligencia Artificial
  const accessTokenInput='3d48acce9ef945a785d059ff7e188a13';
//Cuando la ventana carga se jecuta la fucnión init
  window.onload = init;

  // se inicializan todos los valores que se van a obtener de la página html
  function init() {
    queryInput = document.getElementById("q");
    resultDiv = document.getElementById("result");
    queryInput.addEventListener("keydown", queryInputKeyDown);
    document.getElementById("main-wrapper").style.display = "block";
	//Se inicializan las peticiones inicializa la variable de token de acceso
    window.init(accessTokenInput);
  }

  //Se escucha el evento keydown que es cuando el usuario está presionando teclas
  function queryInputKeyDown(event) {
	  //Si en cada petición que hace el Usuario es diferente de enter no devuelve nada
    if (event.which !== ENTER_KEY_CODE) {
      return;
    }
	
	//Cuando la tecla presionada es Enter
	//Se toma el valor ingresado en la caja de texto
    var value = queryInput.value;
	//Se borra el contenido enviado
    queryInput.value = "";
	//Se grafica el valor de la petición
    createQueryNode(value);
	
	//Se declara una variable para graficar la respuesta de la API
    var responseNode = createResponseNode();

	//Se ejecuta la petición al archivo demoFunctions.js que es el encargado de realizar las peticiones a la API
    sendText(value)
      .then(function(response) {
		  //respuesta exitosa
        var result;
        try {
          result = response.result.fulfillment.speech
        } catch(error) {
			//Respuesta de error
          result = "";
        }
        //setResponseJSON(response);
		//Se grafica la respuesta en la página
        setResponseOnNode(result, responseNode);
      })
      .catch(function(err) {
      //  setResponseJSON(err);
	  //Se grafica el error con el mensaje
        setResponseOnNode("Something goes wrong", responseNode);
      });
  }
	//Función para graficar las peticiones del usuario a la API 
  function createQueryNode(query) {
    var node = document.createElement('div');
    node.className = "clearfix left-align left card-panel green accent-1";
    node.innerHTML = query;
    resultDiv.appendChild(node);
  }
	
   //Función que crea el espacio para poner la respuesta y grafica puntos mientras recibe la respuesta de la API
  function createResponseNode() {
    var node = document.createElement('div');
    node.className = "clearfix right-align right card-panel blue-text text-darken-2 hoverable";
    node.innerHTML = "...";
    resultDiv.appendChild(node);
    return node;
  }

  //Pone la respuesta de la API en el div que graficó la función anterior
  function setResponseOnNode(response, node) {
    node.innerHTML = response ? response : "[empty response]";
    node.setAttribute('data-actual-response', response);
  }

 /* function setResponseJSON(response) {
    var node = document.getElementById("jsonResponse");
    node.innerHTML = JSON.stringify(response, null, 2);
  }*/
	//Envía la petición desde el archivo demoFunctions
  function sendRequest() {

  }

})();
