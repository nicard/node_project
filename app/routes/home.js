module.exports = function(app){
    app.get('/', function (req, res) {
        var dbConnection = app.infra.connectionFactory();
        var produtosDAO = new app.infra.ProdutosDAO(dbConnection);

        produtosDAO.lista(function (err, result) {
            res.render("home/index", {livros: result, message: ''});
        });
        dbConnection.end();
    });
}