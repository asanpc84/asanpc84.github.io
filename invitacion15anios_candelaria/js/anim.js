
$(document).ready(function(){

	creaCountDown()	

	const iniCountdown = setInterval(creaCountDown, 1000)

})

function creaCountDown(){

	const fecha_hoy = new Date()
	const fecha_evento = new Date('2026/10/18 14:00:00')

	const dif_fechas = fecha_evento - fecha_hoy

	const $elem_countdown = $('.elem-countdown')

	if(dif_fechas > 0){

        const dias = Math.floor(dif_fechas / (1000 * 60 * 60 * 24));
        const horas = Math.floor((dif_fechas % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutos = Math.floor((dif_fechas % (1000 * 60 * 60)) / (1000 * 60));
        const segundos = Math.floor((dif_fechas % (1000 * 60)) / 1000);

        const format = num => String(num).padStart(2, '0');

        $($elem_countdown[0]).text(format(dias))
        $($elem_countdown[1]).text(format(horas))
        $($elem_countdown[2]).text(format(minutos))
        $($elem_countdown[3]).text(format(segundos))

	}

	else{
		clearInterval(iniCountdown)
	}
}


$('.img-galeria').on('mouseup', (e)=>{

	let $elem = $(e.currentTarget)[0]
	
	let $img_elem = $($elem).attr('src')
	let $img_elem_alt = $($elem).attr('alt')	
	
	$($elem).on("contextmenu", function(e) {
    e.preventDefault()
	})

	let $modal = $('<div>')
	
	$modal.attr('id', 'modal')

	$modal.css({'position':'absolute', 
		'top':'0', 
		'left':'0', 
		'z-index':'7',
		'width':'100vw', 
		'height':'100vh', 
		'background-color':'var(--fondo-principal)', 
		'align-content':'center',
		'text-align':'center'
	})

	let $boton_cierra_modal = $('<div>')
	$boton_cierra_modal.text('X')

	$boton_cierra_modal.css({'position':'absolute', 
		'top':'40px', 
		'right':'40px', 
		'width':'fit-content',
		'aspect-ratio':'1',
		'border-radius':'20px 0px 20px 0px',
		'padding':'5px',
		'color':'white',
		'background-color':'var(--color-secundario)',
		'font-family':'imprenta-bold', 
		'font-size':'3rem', 
		'cursor':'pointer'
	})

	$boton_cierra_modal.on('click', (e) =>{
		$modal.remove()
	})

	let $img = $('<img>')

	$img.attr('src', $img_elem)
	$img.attr('alt', $img_elem_alt)

	$img.css({'max-height':'95vh',
		'max-width': '95vw', 
		'margin':'auto'
	})


	$modal.append($boton_cierra_modal)
	$modal.append($img)
	$('body').append($modal)

})