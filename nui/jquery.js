$(document).ready(function(){
	let actionContainer = $("#actionmenu");
	let actionButton = $("#actionbutton");

	window.addEventListener("message",function(event){
		let item = event.data;
		switch(item.action){
			case "showMenu":
				actionButton.fadeIn(1000);
				actionContainer.fadeIn(1000);
			break;

			case "hideMenu":
				actionButton.fadeOut(1000);
				actionContainer.fadeOut(1000);
			break;

			case 'updateCarros':
				updateCarros();
			break;

			case 'updateMotos':
				updateMotos();
			break;

			case 'updateImport':
				updateImport();
			break;

			case 'updatebrasil':
				updateIbrasil();
			break;

			case 'updatecaminhoes':
				updatecaminhoes();
			break;

			case 'updatePossuidos':
				updatePossuidos();
			break;

			case 'updateExclusive':
				updateExclusive();
			break;
		}
	});

	$("#inicio").load("./inicio.html");

	document.onkeyup = function(data){
		if (data.which == 27){
			$.post("http://vrp_dealership/dealerClose",JSON.stringify({}),function(datab){});
		}
	};
});

$('#actionbutton').click(function(e){
	$.post("http://vrp_dealership/dealerClose",JSON.stringify({}),function(datab){});
});

const formatarNumero = (n) => {
	var n = n.toString();
	var r = '';
	var x = 0;

	for (var i = n.length; i > 0; i--) {
		r += n.substr(i - 1, 1) + (x == 2 && i != 1 ? '.' : '');
		x = x == 2 ? 0 : x + 1;
	}

	return r.split('').reverse().join('');
}

const carregarMenu = (name) => {
	return new Promise((resolve) => {
		$("#inicio").load(name+".html",function(){
			resolve();
		});
	});
}

/*const updateCarros = () => {
	$.post("http://vrp_dealership/requestCarros",JSON.stringify({}),(data) => {
		let i = 0;
		const nameList = data.veiculos.sort((a,b) => (a.nome > b.nome) ? 1: -1);
		$('#inicio').html(`
			<div class="comprar">COMPRAR</div>
			<div class="obs">Para efetuar uma <b>compra</b> selecione um modelo abaixo e clique em <b>comprar</b>, o sistema vai efetuar as checagens necessárias e se você possuir o valor do veículo ele compra automaticamente.</div>
			<div class="title">CARROS</div>
			${nameList.map((item) => (`
				<div class="model" data-name-key="${item.k}">
					<div class="id">${i = i + 1}</div>
					<div class="name">${item.nome}</div>
					<div class="valor">$${formatarNumero(item.price)}</div>
					<div class="malas">${item.chest}</div>
					<div class="estoque">${item.stock}</div>
				</div>
			`)).join('')}
		`);
	});
}*/

const updateCarros = () => {
	$.post("http://vrp_dealership/requestCarros",JSON.stringify({}),(data) => {
		let i = 0;
		const nameList = data.veiculos.sort((a,b) => (a.nome > b.nome) ? 1: -1);
		$('#inicio').html(`
		${nameList.map((item) => (`
		<div class="card" >
            <span class="badge badge-error">${item.stock}</span>
            <p style="margin-top:-10px;">
                <div class="text-divider"><h4>${item.nome}</h4></div>
            </p>
			<img src="http://phoenix-rp.online/imgs/${item.k}.png" alt="Avatar" style="width:100%;height:120px;">

			<center>
                <img src="http://phoenix-rp.online/imgs/dinheirosujo.png" 
                style="width: 30px;height: 30px;margin-top: 5px;">
				<span style="position:relative;top:-10px;">${formatarNumero(item.price)}</span>
				<br>
				<div class="comprar" carid="${item.k}">COMPRAR</div>
            </center>
		</div>
		`)).join('')}
		`);
	});
}

const updateMotos = () => {
	$.post("http://vrp_dealership/requestMotos",JSON.stringify({}),(data) => {
		let i = 0;
		const nameList = data.veiculos.sort((a,b) => (a.nome > b.nome) ? 1: -1);
		$('#inicio').html(`
			${nameList.map((item) => (`
			<div class="card" >
				<span class="badge badge-error">${item.stock}</span>
				<p style="margin-top:-10px;">
					<div class="text-divider"><h4>${item.nome}</h4></div>
				</p>
				<img src="http://phoenix-rp.online/imgs/${item.k}.png" alt="Avatar" style="width:100%;height:120px;">

				<center>
					<img src="http://phoenix-rp.online/imgs/dinheirosujo.png" 
					style="width: 30px;height: 30px;margin-top: 5px;">
					<span style="position:relative;top:-10px;">${formatarNumero(item.price)}</span>
					<br>
					<div class="comprar" carid="${item.k}">COMPRAR</div>
				</center>
			</div>
			`)).join('')}
		`);
	});
}

const updateImport = () => {
	$.post("http://vrp_dealership/requestImport",JSON.stringify({}),(data) => {
		let i = 0;
		const nameList = data.veiculos.sort((a,b) => (a.nome > b.nome) ? 1: -1);
		$('#inicio').html(`
			${nameList.map((item) => (`
			<div class="card" >
				<span class="badge badge-error">${item.stock}</span>
				<p style="margin-top:-10px;">
					<div class="text-divider"><h4>${item.nome}</h4></div>
				</p>
				<img src="http://phoenix-rp.online/imgs/${item.k}.png" alt="Avatar" style="width:100%;height:120px;">

				<center>
					<img src="http://phoenix-rp.online/imgs/dinheirosujo.png" 
					style="width: 30px;height: 30px;margin-top: 5px;">
					<span style="position:relative;top:-10px;">${formatarNumero(item.price)}</span>
					<br>
					<div class="comprar" carid="${item.k}">COMPRAR</div>
				</center>
			</div>
			`)).join('')}
		`);
	});
}
const updateExclusive = () => {
	$.post("http://vrp_dealership/requestVIP",JSON.stringify({}),(data) => {
		$('#inicio').html(data)

		let i = 0;
		const nameList = data.veiculos.sort((a,b) => (a.nome > b.nome) ? 1: -1);
		$('#inicio').html(`
			${nameList.map((item) => (`
			<div class="card" >
				<span class="badge badge-error">${item.stock}</span>
				<p style="margin-top:-10px;">
					<div class="text-divider"><h4>${item.nome}</h4></div>
				</p>
				<img src="http://phoenix-rp.online/imgs/${item.k}.png" alt="Avatar" style="width:100%;height:120px;">

				<center>
					<img src="http://phoenix-rp.online/imgs/dinheirosujo.png" 
					style="width: 30px;height: 30px;margin-top: 5px;">
					<span style="position:relative;top:-10px;">${formatarNumero(item.price)}</span>
					<br>
					<div class="comprar" carid="${item.k}">COMPRAR</div>
				</center>
			</div>
			`)).join('')}
		`);
	});
}

const updatecaminhoes = () => {
	$.post("http://vrp_dealership/requestcaminhoes",JSON.stringify({}),(data) => {
		let i = 0;
		const nameList = data.veiculos.sort((a,b) => (a.nome > b.nome) ? 1: -1);
		$('#inicio').html(`
			${nameList.map((item) => (`
			<div class="card" >
				<span class="badge badge-error">${item.stock}</span>
				<p style="margin-top:-10px;">
					<div class="text-divider"><h4>${item.nome}</h4></div>
				</p>
				<img src="http://phoenix-rp.online/imgs/${item.k}.png" alt="Avatar" style="width:100%;height:120px;">

				<center>
					<img src="http://phoenix-rp.online/imgs/dinheirosujo.png" 
					style="width: 30px;height: 30px;margin-top: 5px;">
					<span style="position:relative;top:-10px;">${formatarNumero(item.price)}</span>
					<br>
					<div class="comprar" carid="${item.k}">COMPRAR</div>
				</center>
			</div>
			`)).join('')}
		`);
	});
}

const updatePossuidos = () => {
	$.post("http://vrp_dealership/requestPossuidos",JSON.stringify({}),(data) => {
		let i = 0;
		const nameList = data.veiculos.sort((a,b) => (a.nome > b.nome) ? 1: -1);
		$('#inicio').html(`
			${nameList.map((item) => (`
			<div class="card">
				<p>
					<div class="text-divider"><h4>${item.nome}</h4></div>
				</p>
				<img src="http://phoenix-rp.online/imgs/${item.k}.png" alt="Avatar" style="width:100%;height:120px;">
				<br><br>
				<div class="vender" carid="${item.k}">VENDER</div>
			</div>
			`)).join('')}
		`);
	});
}

$(document).on("click",".card",function(){
	let $el = $(this);
	let isActive = $el.hasClass('active');
	$('.card').removeClass('active');
	if(!isActive) $el.addClass('active');
});


$(document).on("click",".comprar",function(){
	let $button = $(this);
	$.post("http://vrp_dealership/buyDealer",JSON.stringify({
		name: $button.attr('carid')
	}));
});

$(document).on("click",".vender",function(){
	let $button = $(this);
	$.post("http://vrp_dealership/sellDealer",JSON.stringify({
		name: $button.attr('carid')
	}));
});