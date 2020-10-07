var tabRegistrosZoom;
var search = "";
var pagina = 1;
var qtdPagina = 10;
var parametros = new Object();

function IniciaDataTable() {

	console.log("ZOOM PESSOA");

	tabRegistrosZoom = $('#tabRegistrosZoom').DataTable({

		oLanguage : {

			"sUrl" : "/FluigMonditechWeb/DataTable/1.10/Language/portugues.json"

		},

		dom : "rt",

		pageLength : 5,

		// columns: [
		// { "data": "cpf_cnpj" },
		// { "data": "razao_social" }
		// ],

		columnDefs : [ {
			"targets" : "_all",
			"className" : "dt-center"
		}, {
			"targets" : 0,
			"width" : "20%",
			"visible" : !zoom.isMobile
		}, {
			"responsivePriority" : 10001, // MENOR PRIORIDADE DE VISUALIZACAO
											// POSSIVEL
			"targets" : [ 0 ]
		} ],

		order : [ [ 1, "asc" ] ],

		responsive : true

	});

	tabRegistrosZoom.on("responsive-resize", function(e, datatable, columns) {

		tabRegistrosZoom.columns.adjust().responsive.recalc();

		$('#tabRegistrosZoom th,td').show();
		$("#tabRegistrosZoom").width("100%");

	});

	$("#tabRegistrosZoom").width("100%");

}

function PopulaTabela(retorno) {

	tabRegistrosZoom.clear();
	console.log("retorno.length " + retorno.length);
	if (retorno != null && retorno.length > 0) {

		var row = new Array();
		for (var i = 0; i < retorno.length; i++) {

			row.push((retorno[i].Matricula != undefined ? retorno[i].Matricula : " - "));
			row.push((retorno[i].Nome != undefined ? retorno[i].Nome : " - "));
		}

		tabRegistrosZoom.row.add(row).draw(false);
		row = [];

		$("#pagProxima").height($("#pagina").height());
		$("#pagAnterior").height($("#pagina").height());
		$("#tabRegistrosZoom tr").prop("align", "center");
		zoom.loading.hide();

	} else {

		zoom.loading.hide();
	}

}

function AtualizaPaginaHTML() {

	$("#pagina").empty();
	$("#pagina").text(pagina);

}

function MudaPagina(valor) {

	if (valor > 0 || pagina != 1) {

		$("#erroZoom").fadeOut();
		pagina += valor;

		if (pagina > tabRegistrosZoom.page.info().pages) {

			pagina -= valor;
			$("#erroZoom")
					.html(
							"<p>Voc&ecirc; est&aacute; na &uacute;ltima p&aacute;gina!</p>");
			$("#erroZoom").fadeIn();

		} else {

			AtualizaPaginaHTML();
			// BuscarRegistros();
			tabRegistrosZoom.page((pagina - 1)).draw(false);

		}

	} else if (valor < 0 && pagina == 1) {

		$("#erroZoom").html(
				"<p>Voc&ecirc; est&aacute; na primeira p&aacute;gina!</p>");
		$("#erroZoom").fadeIn();

	}

}

function Search(event) {

	if (Monditech) {

		search = Monditech.RetirarAcento($("#search").val().trim()
				.toUpperCase());

	} else {

		search = RetirarAcento($("#search").val().trim().toUpperCase());

	}

	pagina = 1;
	AtualizaPaginaHTML();
	tabRegistrosZoom.search(search).draw();

}

function BuscarRegistros() {

	if (search == "") {

		zoom.loading.show();

	}

	$("#erroZoom").fadeOut();
	painelWeb = new painelWeb(parent.WCMAPI);
	var pessoas = painelWeb.ZoomPessoas(10, $("#pagina").val(), search, function(retorno) {
		console.log(retorno);
		if (retorno.length == 0 || retorno == "") {
			
	        $("#erroZoom").html("<p>Voc&ecirc; est&aacute; na &uacute;ltima p&aacute;gina!</p>");
	        $("#erroZoom").show();
	        pagina -= 1;
	        zoom.loading.hide();
			
		}
		else {
			
			PopulaTabela(retorno);
			
		}
		
		$("#pagina").text(pagina);
		
	});
	
	
	
}

function LoadZoom() {

	zoom.loading.show();

	if (!$("").DataTable) {

		$(".zoom")
				.prepend(
						"<link rel=\"stylesheet\" type=\"text/css\" href=\"/MonditechWeb/DataTables/Bootstrap-3/1.10.20/datatables.min.css?v=201901061713\" />")
				.load();
		$(".zoom")
				.prepend(
						"<link rel=\"stylesheet\" type=\"text/css\" href=\"/MonditechWeb/Monditech/css/monditech.css?v=201901061713\" />")
				.load();
		$(".zoom")
				.append(
						"<script type=\"text/javascript\" src=\"/MonditechWeb/DataTables/Bootstrap-3/1.10.20/datatables.min.js?v=201901061713\"></script>")
				.load();
		$(".zoom")
				.append(
						"<script type=\"text/javascript\" src=\"/MonditechWeb/Monditech/js/monditech.js?v=201901061713\"></script>")
				.load();

	}

	IniciaDataTable();
	parametros.paginar = {
		pagina : pagina.toString(),
		qtd_linhas : "5"
	};

	$('#tabRegistrosZoom tbody').on("click", "tr", function(event) {

		var registro = tabRegistrosZoom.row(this).data();
		console.log(registro);
		var campos = zoom.camposRetorno;
		$("#" + campos[0]).val(registro["Matricula"]).change();
		$("#" + campos[1]).val(registro["Nome"]).change();
		$("#zoomModal .modal-header .close").click();

	});

	$("#pagProxima").on("click", function() {

		MudaPagina(1);

	});

	$("#pagAnterior").on("click", function() {

		MudaPagina(-1);

	});

	$("#buscar").on("click", function() {

		Search(event);

	});

	// $("#search").on("change", function (event) {

	// Search(event);

	// });

	$("#search").on("keyup", function(event) {

		Search(event);

	});

	$(document).keyup(function(e) {

		if (e.key === "Escape") {

			$(".close").click();

		}

	});

	$("#zoomModal").fadeIn();

	BuscarRegistros();

}

LoadZoom();