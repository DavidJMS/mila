'use strict'
window.addEventListener('load',()=>{

	// Vars Of Form Contact

	var form 	= document.querySelector("#form");
	var button 	=  document.querySelector("#button");
	var check = false

	var inputs  = document.querySelectorAll('.form-contact');
	var faFas   = document.querySelectorAll('i.prefix');

	var name 	   = document.querySelector("#name");
	var email 	   = document.querySelector("#email");
	var subject    = document.querySelector("#subject");
	var message    = document.querySelector("#message");

	// Btn Of Contact 

	var btnMessage = document.querySelector(".btn-message");

	// Events In Fiels Forms Contact
	inputs.forEach((input,indice)=>{
		input.addEventListener('focus',()=>{
			input.classList.remove('is-invalid');
			input.classList.remove('is-valid');
			faFas[indice].style.color="#06D6A0";
			input.style.borderBottom="1px solid #06D6A0";
		});
		input.addEventListener('blur',()=>{
			faFas[indice].style.color="black";
			input.style.borderBottom="initial";
		});
	});

	button.addEventListener("click", ()=>{

		var nameValue 	   = name.value;
		var emailValue 	   = email.value;
		var subjectValue   = subject.value;
		var messageValue   = message.value;
		var emailRegularExpresion = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
		let count = 0;
		check = false;

		if (nameValue.trim()==null || nameValue.trim().length==0 ){
			name.classList.add('is-invalid');
			inputs[0].style.borderBottom = '1px solid red';
		}else{
			count++;
			name.classList.remove('is-invalid');
			name.classList.add('is-valid');
			inputs[0].style.borderBottom = '1px solid green';
		}

		if (emailRegularExpresion.test(emailValue)){
			count++;
			email.classList.remove('is-invalid');
			email.classList.add('is-valid');
			inputs[1].style.borderBottom = '1px solid green';
		}else{
			email.classList.add('is-invalid');
			inputs[1].style.borderBottom = '1px solid red';
		}

		if (subjectValue.trim()==null || subjectValue.trim().length==0 ){
			subject.classList.add('is-invalid');
			inputs[2].style.borderBottom = '1px solid red';
		}else{
			count++;
			subject.classList.remove('is-invalid');
			subject.classList.add('is-valid');
			inputs[2].style.borderBottom = '1px solid green';
		}

		if (messageValue.trim()==null || messageValue.trim().length==0 ){
			message.classList.add('is-invalid');
			inputs[3].style.borderBottom = '1px solid red';
			
		}else{
			count++;
			message.classList.remove('is-invalid');
			message.classList.add('is-valid');
			inputs[3].style.borderBottom = '1px solid green';
		}

		if (count == 4){
			check = true;
		}

		console.log('entro');
		if (check == true){

			// vars and const to fetch

			var url = 'http://127.0.0.1:8000/message/';
			var data = { email: emailValue, subject: subjectValue, name: nameValue, message: messageValue };
			const csrftoken = getCookie('csrftoken');

			sendMessage(url,data,csrftoken);
			           
			async function sendMessage(url,data,csrftoken){
				
				var response = await fetch(url, {
					method: "POST",
					headers:{
						"X-Requested-With": "XMLHttpRequest",
						"X-CSRFToken": csrftoken,
						"Content-Type": "application/json; charset=utf-8",
						"Accept": "application/json"
						},
					body: JSON.stringify(data)
				}).then( async (res) => {return await res.json()});

				if (response.detail == 'Mensaje Enviado Correctamente'){

					Swal.fire({
					  title: 'Listo!',
					  text: 'Su mensaje fue envido exitoxamente',
					  type: "success",
					});
					document.querySelector('.form').reset();
					inputs.forEach((input,indice)=>{
						input.classList.remove('is-valid');
						input.style.borderBottom="initial";
					});
					
				}

				else{

					Swal.fire({
					  title: 'Upss',
					  text: 'Mensaje no enviado!',
					  type: "error",
					});

				}
				
			}
		}
	});
	function getCookie(name) {
		  if (!document.cookie) {
		    return null;
		  }

		  const xsrfCookies = document.cookie.split(';')
		    .map(c => c.trim())
		    .filter(c => c.startsWith(name + '='));

		  if (xsrfCookies.length === 0) {
		    return null;
		  }
		  return decodeURIComponent(xsrfCookies[0].split('=')[1]);
		}
		//offsetLeft me devuelve una posicion segun el tamaño de la pantala
	
	var difX = 0
	var difY = 0
	btnMessage.addEventListener('mousedown',inicio,false);
	/*btnMessage.addEventListener('touchstart',()=> {
		btnMessage.addEventListener('touchmove',inicio,false);
		});*/

	function inicio(e){
		//console.log(e);
	    var pX = e.pageX;
	    var pY = e.pageY;

	    var btnX = btnMessage.offsetLeft;
	    var btnY = btnMessage.offsetTop;
	    //console.log('posicion del boton en y',btnY,'posicion del boton en x',btnX);
	    difX=pX-btnX;
	    difY=pY-btnY;
	    //console.log('Esta es la diferencia en Y: ',difY,'Esta es la diferencia en X: ',difX);
	    //Detectamos cuando el mouse se mueva y suelte
	    document.addEventListener('mousemove',mover,false);
		document.addEventListener('mouseup',soltar,false);

	}

	function mover(e)
	{
		var mousePX = e.pageX;
		var mousePY = e.pageY;
		console.log('Resultado que hay que mover: Y ',mousePY,'Resultado que hay que mover: X ',mousePX)
		var tY= mousePY-difY;
		var tX= mousePX-difX;
		//console.log(tY,tX);
		btnMessage.style.top=mousePY+'px';
		btnMessage.style.left=mousePX+'px';
	}

	// Funcion que se ejecuta el botón del ratón
	function soltar(e)
	{
		// Eliminamos los eventos creados en la funcion inicio
		document.removeEventListener('mousemove',mover,false);
		document.removeEventListener('mouseup',soltar,false);
	}

});