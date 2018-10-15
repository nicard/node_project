module.exports = function (app) {
    app.get('/produtos', function (req, res) {
        var dbConnection = app.infra.connectionFactory();
        var produtosDAO = new app.infra.ProdutosDAO(dbConnection);

        produtosDAO.lista(function(err, result){
            res.render("produtos/lista", {lista: result});
        });
        dbConnection.end();
    });

    app.get('/produtos', function (req, res) {
        var produtosBanco = app.infra.produtosBanco;
    });
}
