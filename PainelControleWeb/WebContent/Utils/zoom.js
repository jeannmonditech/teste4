function Zoom(tipoZoom) {
	console.log("Zoom_1");
    //utilizados em todos os zoom's
    this.usuario;
    this.camposRetorno = new Array();
    this.tamanhoZoom;
    this.tamanhoFieldset;
    this.nomeZoom = tipoZoom;
    this.quantidadePorPagina;
    this.isMobile;
    this.search;
    this.titulo;
    this.tamanho;
    this.modal;
    this.loading = null;
    this.parametros = null;

}

Zoom.prototype.Open = function () {
	console.log("Zoom_2");
    if (!this.quantidadePorPagina) {

        this.quantidadePorPagina = 10;

    }
	console.log("Zoom_3");
    //Na widget náo precisa setar o zoom.IsMobile, pois a widget mobile reconhece o parent.WCMAPI.serverURL, já no processo é necessário setar o zoom.IsMobile
    var serverUrl = ((window.isMobile == true) ? window.location.origin : parent.WCMAPI.serverURL);
	console.log(serverUrl + "\\painelWeb\\zoom\\" + this.nomeZoom + "\\" + this.nomeZoom + ".html");
    return serverUrl + "\\painelWeb\\zoom\\" + this.nomeZoom + "\\" + this.nomeZoom + ".html";

};

Zoom.prototype.CreateModal = function () {
	console.log("Zoom_5");
    if (this.tamanho == "pequeno") {

        this.tamanho = 'small';

    }
    else if (this.tamanho == "medio") {

        this.tamanho = 'large';

    }
    else if (this.tamanho == "grande") {

        this.tamanho = 'full';

    }
    else { // tamanho padrão

        this.tamanho = '';

    }
	console.log("Zoom_6");
    this.loading = FLUIGC.loading(window);
    this.loading.show();
    var self = this;
	console.log("Zoom_7");
    this.modal = FLUIGC.modal({
            title: this.titulo,
            id: 'zoomModal',
            content: '<div id="contModal"></div>',
            size: this.tamanho
        },
        function (err, data) {

            if (err) {

                FLUIGC.toast({
                    title: "ERRO AO INSTANCIAR ZOOM.js!",
                    message: err.message,
                    type: "danger"
                });

            }
            else {

                $("#zoomModal").hide();
                $("#contModal").load(self.Open());
                self.loading.hide();

            }

        });
	console.log("Zoom_8");
    return this.modal;

};