function painelWeb(fluig) {

    this.fluig = fluig;

}
function ShowToastAlert(titulo, mensagem, tipo, tempo) {

    if (typeof FLUIGC != "undefined") {

        FLUIGC.toast({ title: titulo, message: mensagem, type: tipo, timeout: tempo });

    }
    else {

        alert(titulo + " " + mensagem);

    }

};

painelWeb.prototype.GetEnderecoFluig = function () {

    return ((window.isMobile == true) ? window.location.origin : parent.WCMAPI.serverURL);

};

painelWeb.prototype.ZoomPessoas = function (search, pagina, qtdPorPagina, callback) {

    var retorno;

    $.ajax({

        type: "GET",
        contentType: "application/json",
        url: this.GetEnderecoFluig() + "/painelWeb/api/rest/Zoom/ZoomPessoa?search=&pagina=1&qtdPorPagina=1",
        async: (callback ? true : false),
        data: {},
        success: function (res, status, xhr) {

            if (callback) {

                callback(res);

            }
            else {

                retorno = res;
            }

        },
        error: function (res, textStatus, errorThrown) {

            ShowToastAlert("Erro Zoom Pessoa " , res.responseText, "danger");

        }

    });

    return retorno;

};
