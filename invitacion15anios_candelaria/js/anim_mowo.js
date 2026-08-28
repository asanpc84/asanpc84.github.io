var ult_pos_scroll = 0
var offset_contenedores = []
var anim_activa = false

var es_mobile = false
var dir_scrolly = true;
var tamanio_pantalla = window.innerWidth


/*
function limita_ejecuta(func, limite) {

	
	let en_ejec;
  
  	return function(...args) {
    
		console.log('lim')
    	if (!en_ejec) {

      		func.apply(this, args);
      		en_ejec = true;
      		setTimeout(() => (en_ejec = false), limite);
		}

		func(...args);
	};
}

*/

$('.grupo_elem_carr').on('mouseenter', (e) =>{	

	let $carrousel = $(e.currentTarget)[0]
	let cant_elem_carr = $($carrousel).find('.contenido_carr').length
	anim_car1($carrousel, cant_elem_carr)
})

$('.grupo_elem_carr').on('click', (e) =>{	

	let $carrousel = $(e.currentTarget)[0]
	let cant_elem_carr = $($carrousel).find('.contenido_carr').length
	anim_car1($carrousel, cant_elem_carr)
})


$('a, .interact').on('mouseenter', () =>{

	$('#sigue-cursor').css({'background-color':'rgba(244, 63, 193, 0.8)', 'width':'50px', 'height':'50px', 'box-shadow':'0px 0px 25px rgb(244, 63, 193)' })
})

$('a, .interact').on('mouseleave', () =>{
	$('#sigue-cursor').css({'background-color':'rgb(244, 63, 193)', 'width':'30px', 'height':'30px', 'box-shadow':'none'})
})


function crea_sliders(){


	let cant_carr = $('.grupo_elem_carr').length

	for(let i=1; i<=cant_carr;i++){

		let cant_elem_carr = ($(`.contenido_carr${i}`)).length

		$($(`.grupo_elem_carr${i}`)[0]).css({'width': `${100*cant_elem_carr}%`, 'transition':'2s'})
	}

	$('.grupo_elem_carr').addClass('interact')



}


async function anim_car1(carrousel, cant_elem_carr){

	//let cant_carr = $('.grupo_elem_carr').length

	//for(let i=1; i<=cant_carr;i++){
		
		//let cant_elem_carr = $(cont_carrousel).length
		//console.log(cant_elem_carr)
		let porc_elem_car1 = 100/cant_elem_carr
		let ult_elem = (100 - porc_elem_car1) *-1
		let params_keyframes = []
		//let carrousel = $(carrousel)
		let pos_act = 0
		let pos_ini = 0


		//$(carrousel).css({'width': `${100*cant_elem_carr}%`, 'transition':'2s'})
		
		params_keyframes.push({transform:`translateX(${pos_ini}%)`})

		for(let j=0;j<cant_elem_carr-1;j++){

			pos_act-= porc_elem_car1
			
			if(j==0){
				pos_ini = pos_act
			}
			//if(pos_act <= ult_elem){pos_act = 0}
			params_keyframes.push({transform:`translateX(${pos_act}%)`})

		}

		params_keyframes.push({transform:`translateX(0%)`})

		if($(carrousel).css('transform') == 'none'){


			$(carrousel)[0].animate(
			
				params_keyframes, 
				{
					duration: 3000 * cant_elem_carr,
					iterations: 1
				}
			)

		}

	//}

}

/*
async function anim_car1(){

	let cant_carr = $('.grupo_elem_carr').length

	for(let i=1; i<=cant_carr;i++){
		
		let cant_elem_carr = ($(`.contenido_carr${i}`)).length
		let porc_elem_car1 = 100/cant_elem_carr
		let ult_elem = (100 - porc_elem_car1) *-1
		let params_keyframes = []
		let carrousel = $($(`.grupo_elem_carr${i}`)[0])
		let pos_act = 0
		let pos_ini = 0


		$($(`.grupo_elem_carr${i}`)[0]).css({'width': `${100*cant_elem_carr}%`, 'transition':'2s'})
		
		params_keyframes.push({transform:`translateX(${pos_ini}%)`})

		for(let j=0;j<cant_elem_carr-1;j++){

			pos_act-= porc_elem_car1
			
			if(j==0){
				pos_ini = pos_act
			}
			//if(pos_act <= ult_elem){pos_act = 0}
			params_keyframes.push({transform:`translateX(${pos_act}%)`})

		}

		params_keyframes.push({transform:`translateX(0%)`})

		$(`.grupo_elem_carr${i}`)[0].animate(
		
			params_keyframes, 
			{
				duration: 4000 * cant_elem_carr + i*800,
				iterations: 1
			}
		)
	}

}
*/


$(document).ready(function(){

	//navigator.maxTouchPoints

	let info_dispositivo = navigator.userAgent.toUpperCase()	

	if(info_dispositivo.indexOf('ANDROID') != -1 || info_dispositivo.indexOf('IPAD') != -1 || info_dispositivo.indexOf('IPHONE') != -1 || tamanio_pantalla < 1024 || navigator.maxTouchPoints != 0){
		
		es_mobile =true
	}

	crea_sliders()
	//anim_car1()



	let pos_scrolly_ini
	let pos_scrolly_fin

    $(document).on('touchstart', function(e) {
        //pos_scrollx_ini = e.originalEvent.touches[0].clientX;

		pos_scrolly_ini = e.changedTouches[0].clientY
	    
	    anim_logo_portada(event)

    })	

	$(document).on('touchend', function(event) {
        //pos_scrollx_ini = e.originalEvent.touches[0].clientX;
        pos_scrolly_fin = event.changedTouches[0].clientY
        //pos_scrolly_fin

	    if(pos_scrolly_ini > pos_scrolly_fin){
	    	dir_scrolly = true // scroll up
	    }else if(pos_scrolly_ini < pos_scrolly_fin){
	    	dir_scrolly = false // scrol down
	    
	    }

	    anim_logo_portada(event)
	})
    
	$(window).on('wheel', function(event){
		anim_logo_portada(event)
		anim_seccion($('#portfolio'), 1)
	})

	$(window).on('scroll', function(event){
		anim_logo_portada(event)
		anim_seccion($('#portfolio'), 1)
	})


	$('.controlador-desplegable-servicios').on('click', function(){
		toggle_tarjeta_servicios(this)
	})

	obtener_estilos()

	desplaza_banner_servicios()

	if(!es_mobile || navigator.maxTouchPoints == 0){
	 	
	 	$(document).on('mousemove', (e) => {
	        
	        $('#sigue-cursor').css({'transform':`translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`, 'visibility':'visible'});
	    });

	}


	window.onresize = function(){

		tamanio_pantalla = window.innerWidth


		if(tamanio_pantalla < 1024){
			
			es_mobile = true

			if(!$('#controlador-nav-mobile').length){

	    		$('nav').after('<span id="controlador-nav-mobile"><img src="assets/img/ico/ham_menu.png" style="height:80%; margin-left:auto;"/></span>')
			}

	    	$('#controlador-nav-mobile').on('click', despliega_nav_mobile)    	
    		$('nav a').on('click', despliega_nav_mobile)
		}else{
			es_mobile = false
			$('nav').css({'display':'flex', 'opacity':'1'})
	    	$('#controlador-nav-mobile').remove()
	    	$('nav a').off('click', despliega_nav_mobile)
	    	//$('#controlador-nav-mobile').on('click', despliega_nav_mobile)

		}
	}


    if(es_mobile){

		if(!$('#controlador-nav-mobile').length){

    		$('nav').after('<span id="controlador-nav-mobile"><img src="assets/img/ico/ham_menu.png" style="height:80%; margin-left:auto;"/></span>')
		}

    	$('#controlador-nav-mobile').on('click', despliega_nav_mobile)    	
    	$('nav a').on('click', despliega_nav_mobile)

    	$('.cont-descripcion-desplegable').css('display','none')
    }

    $('#enlace-modal').on('click', muestra_modal)


    /*
    $('.min-cel-social-media').on('click', (e) =>{
    	muestra_img_social_media(e)

    })

    $('.avatar-follow-social-media').on('click', (e) =>{

    	abre_feed_social_media(e)

    })

    $('#back-cel-social-media').on('click',back_social_media)
	*/
})

function despliega_nav_mobile (){

	let $nav = $('nav')
	let displ = $nav.css('display')
	let delay = 500

	if($($nav).css('opacity')  ==  '0'){    			
		delay = 0
		
		setTimeout(function(){
			$($nav).css('opacity', '1')
		}, delay)
		
		$($nav).css('display', 'flex')

	}else{
		
		$($nav).css('opacity', '0')
		
		setTimeout(function(){
			$($nav).toggle()
		}, delay)
	}


}

function anim_logo_portada(event){

	let pos_ini = $(window).scrollTop() 


	//if(!es_mobile){
		var $logo_portada = $('#logo-portada')
		var $portada = $('#portada')
		var $tamanio_logo_portada = $($logo_portada).width() / $($logo_portada).parent().width() *100	
		
		var transition

		
		if($(window).scrollTop() <= $('#portada').height()){
			
			if(parseFloat($('#portada').css('opacity')) > 0) {$('body').addClass('desactiva_scroll')}

			anim_activa = false
			if (event.originalEvent.wheelDelta > 0 || event.originalEvent.detail < 0 || dir_scrolly == false) {

		    // Scroll up
				$($logo_portada).css('display', 'block')
				anim_activa = false
				$tamanio_logo_portada = $tamanio_logo_portada / 3
				tamanio_fondo_portada = parseFloat($($portada).css('background-size').replace('%', '')) - 5

				let increm_opacidad

				if(!es_mobile){				
				
					if($tamanio_logo_portada < 50){$tamanio_logo_portada = 50}
					if(tamanio_fondo_portada < 50){tamanio_fondo_portada = 50}

					increm_opacidad = 0.05

				}else{

					if($tamanio_logo_portada < 90){$tamanio_logo_portada = 90}
					if(tamanio_fondo_portada < 100){tamanio_fondo_portada = 100}
					
					increm_opacidad = 0.3
				}
				
				$('body').removeClass('desactiva_scroll')
				$('#portada').css('opacity', parseFloat($('#portada').css('opacity')) + increm_opacidad)

				if(increm_opacidad > 1){increm_opacidad = 1}
				transition = 1
			}
			else {
			    // Scroll down


				let decrem_opacidad

				if(parseFloat($('#portada').css('opacity')) > 0){$('body').addClass('desactiva_scroll')}
				if(!es_mobile) {

					decrem_opacidad = 0.05
				}else{

					decrem_opacidad = 0.3
				}

				if(decrem_opacidad < 0){decrem_opacidad = 0}

				$tamanio_logo_portada = $tamanio_logo_portada * 2
				tamanio_fondo_portada = parseFloat($($portada).css('background-size').replace('%', '')) +5

				$('#portada').css('opacity', parseFloat($('#portada').css('opacity')) - decrem_opacidad)

				if(parseFloat($('#portada').css('opacity')) <= 0){
					//anim_activa = true
					$('body').removeClass('desactiva_scroll') 
					$($logo_portada).css('display', 'none')
					anim_activa = true
				}else{
					$($logo_portada).css('display', 'block')
				}

				transition = 1
			}
			if(!anim_activa){

				$logo_portada.css({'transition':'ease-out '+transition+'s', 'width': $tamanio_logo_portada+'%'})
				$portada.css('background-size', tamanio_fondo_portada + '%')
			}
		}else{

				$('body').removeClass('desactiva_scroll') 
		}
	//}

}

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

async function anim_seccion(contenedor, offset){

	let posicion_scroll = $(window).scrollTop()

	let $contenedor = contenedor
	let alto_contenedor = parseFloat($contenedor.css('height').replaceAll('px'))
	let $elems = $('.titulo-portfolio')


	if(posicion_scroll >= (offset_contenedores[offset]/2 ) && posicion_scroll <= ($contenedor.offset().top) + alto_contenedor){

		for(let a=0; a<$elems.length;a++){

			$($elems[a]).css({'transform':'translateX(0)', 'transition':'ease-in-out 1.5s'})
			await sleep(300)

		}
		

	}else{

		for(let a=0; a<$elems.length;a++){

			$($elems[a]).css({'transform':'translateX(-150%)', 'transition':'ease-in-out 0.5s'})
			await sleep(150)

		}
	}

}

function obtener_estilos(){

	$contenedores = $('section')

	let ancho = parseFloat($('#'+$contenedores[0].getAttribute('id')).css('height').replaceAll('px'))

	 for(let i=0; i<$contenedores.length; i++){

	 	offset_contenedores.push(ancho)

	 	ancho += parseFloat($('#'+$contenedores[i].getAttribute('id')).css('height').replaceAll('px'))

	 }

}


function toggle_tarjeta_servicios(elem){

	if($(elem).siblings('.cont-desplegado').css('margin-top') == '0px'){
		
		$(elem).find('span').css({'transform':'rotate(0deg)'})

		$(elem).siblings('.cont-desplegado').css({'opacity':'0','transition':'0.5s'})
		
		setTimeout(function(){
			let alto_elem

			if(es_mobile){
				alto_elem = '0px'
			$(elem).siblings('.cont-desplegado').find('.cont-descripcion-desplegable').css({'display':'none'})
			}else{
				alto_elem = '5%'
			}

			$(elem).siblings('.cont-desplegado').css({'margin-top':'-150%', 'transition':'2s', 'visibility':'hidden', 'height': alto_elem})

		},100)

	}else{
		

		$(elem).find('span').css({'transform':'rotate(-270deg)'})

		$(elem).siblings('.cont-desplegado').css({'margin-top':'0%', 'transition':'0.5s ease-in-out', 'visibility':'visible', 'height':'fit-content'})
		
		setTimeout(function(){

			$(elem).siblings('.cont-desplegado').find('.cont-descripcion-desplegable').css({'display':'block'})
			$(elem).siblings('.cont-desplegado').css({'opacity':'1','transition':'0.8s'})

		},200)
	}

}


function desplaza_banner_servicios(){

	let velocidad = 1.5
	let $elementos_desplaza = $('.cont-titulo-servicios')
	let ancho_elem_desplaza = parseFloat($($elementos_desplaza).css('width').replace('px','')) 
	let posicion_desplaza1 = (ancho_elem_desplaza)
	let posicion_desplaza2 = posicion_desplaza1

	function anim() {
				
			posicion_desplaza1-= velocidad
			posicion_desplaza2-= velocidad

			$($elementos_desplaza[0]).css({'opacity':'1','transform':`translateX(${posicion_desplaza1}px`})
			$($elementos_desplaza[1]).css({'opacity':'1','transform':`translateX(${posicion_desplaza2}px`})


			if($($elementos_desplaza[0]).offset().left <= ancho_elem_desplaza*(-1)){

				$($elementos_desplaza[0]).css({'opacity':'0', 'transform':`translateX(${0}px`})

				posicion_desplaza1 = ancho_elem_desplaza
			}

			if($($elementos_desplaza[1]).offset().left <= ancho_elem_desplaza*(-1)){

				$($elementos_desplaza[1]).css({'opacity':'0', 'transform':`translateX(${ancho_elem_desplaza*(-1)}px)`})

				posicion_desplaza2 = 0
			}

			requestAnimationFrame(anim)
		}


	anim()
	
}


function muestra_modal(){

	$modal = $('<div>')
	$modal.attr('id', 'modal')

	$('#servicios').append($modal)

	let titulos_modal = ['Sitio Web Profesional para Emprendedores', 'Sitio Web Autogestionable para Emprendedores', 'Sitio Web Corporativo para Empresas']
	let resumen_plan = ['Ideal para marcas personales, profesionales independientes o emprendimientos que necesitan una web clara, funcional y bien presentada.', 'Ideal para quienes quieren una web profesional y también poder gestionarla de forma autónoma, editando imágenes y textos sin depender de nadie.', 'Pensado para empresas consolidadas o en crecimiento que necesitan mostrar profesionalismo, trayectoria y estructura.']
	let detalles_plan = [['Diseño 100% personalizado','Contenido a medida (servicios, portfolio, contacto, etc.)','Botón de WhatsApp integrado','Enlaces a redes sociales','Optimización para todos los dispositivos','Mail corporativo (ejemplo@marca.com.ar)', 'Registro de dominio propio GRATIS','Hosting y mantenimiento GRATIS','Certificación SSL de seguridad','Copia de seguridad semanal','Soporte personalizado'],['Todo lo incluido en el Plan 1','Panel autogestionable (editar textos, imágenes, secciones)','Carga inicial de contenidos','Acompañamiento en el uso del panel'],['Diseño 100% personalizado','Hasta 8 páginas internas (Inicio, Nosotros, Servicios, Portfolio, Blog, Contacto, etc.)','Contenido a medida','Formulario de contacto profesional','Botón de WhatsApp y redes sociales','Optimización responsive (todos los dispositivos)','Hasta 3 mails corporativos (ejemplo@empresa.com.ar)','Registro de dominio propio GRATIS','Hosting y mantenimiento GRATIS','Certificado SSL','Copia de seguridad semanal','Soporte técnico y estratégico personalizado']]

	for(let i=0; i<3;i++){

		let $tarjeta_modal = $('<div>')
		$tarjeta_modal.addClass('tarjeta-modal contenedor')

		let $titulo = $('<h3>')
		$titulo.text(titulos_modal[i])
		$titulo.addClass('titulo-tarjeta-modal')

		$tarjeta_modal.append($titulo)

		let $resumen_plan = $('<p class="resumen-tarjeta-modal">')
		$resumen_plan.text(resumen_plan[i])

		$tarjeta_modal.append($resumen_plan)

		$detalle_plan = $('<ul class="detalles-tarjeta-modal">')

		for(let j=0;j<detalles_plan[i].length;j++){

			$detalle_plan.append('<li>' + detalles_plan[i][j] + '</li>')
		}

		$tarjeta_modal.append($detalle_plan)

		$modal.append($tarjeta_modal)

	}

	setTimeout(function(){
		$modal.css({'opacity':'1'})
	},10)

	$('body').addClass('desactiva_scroll2')	

	
	$modal.on('click', function (e){

		$modal.css({'opacity':'0'})

		setTimeout(function(){			
			e.currentTarget.remove()		
			$('body').removeClass('desactiva_scroll2')
		},200)
	})
}



/*
function muestra_img_social_media(e){

	$('.min-cel-social-media').addClass('interact')

	if($('#pantalla-cel-social-media').find('.img-cel-social-media').length == 0){

		$cont_img = $('<div class="img-cel-social-media">')
		$($cont_img).css({'background-image': $(e.currentTarget).css('background-image'), 'background-size':'100%', 'background-repeat':'no-repeat', 'background-position':'center','width':'100%', 'height':'100%', 'position':'absolute', 'top':'0', 'background-color':' rgba(0, 0, 0, 0.7)'})	
		//$('#pantalla-cel-social-media').css('overflowY', 'hidden')

		$('#pantalla-cel-social-media').append($cont_img)

		$($cont_img).on('click', (ev) =>{
			ev.currentTarget.remove()
			//$('#pantalla-cel-social-media').css('overflowY', 'scroll')
		})
	}
}


function abre_feed_social_media(e){

	id_feed = $(e.currentTarget).attr('data-value')

	$('.feed-social-media').css('display','none')
	$('#home-social-media').css('display','none')	
	$('#feed-social-media-'+id_feed).css('display','block')

}


function back_social_media(){
	

	$('.img-cel-social-media').remove()
	$('.feed-social-media').css('display','none')
	$('#home-social-media').css('display','flex')	
}
*/