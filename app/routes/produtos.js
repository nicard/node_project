module.exports = function (app) {
    app.get('/produtos', function (req, res) {
        var dbConnection = app.infra.connectionFactory();
        var produtosDAO = new app.infra.ProdutosDAO(dbConnection);

        produtosDAO.lista(function (err, result) {
            res.format({
                html: function () {
                    res.render("produtos/lista", {lista: result, message: ''});
                },
                json: function () {
                    res.json(result);
                }
            });
        });
        dbConnection.end();
    });

    app.get('/produtos/add', function (req, res) {
        res.render("produtos/form", {errosValidacao: {}, produto: {}});
    });

    app.post('/produtos', function (req, res) {
        var produto = req.body;

        req.assert('name', 'Titulo é obrigatório').notEmpty();
        req.assert('value', 'Valor deve ser numero').isFloat();
        var erros = req.validationErrors();
        if (erros) {
            res.format({
                html: function () {
                    res.status(400).render("produtos/form", {errosValidacao: erros, produto: produto});
                },
                json: function () {
                    res.status(400).json(erros);
                }
            });
            return;
        }

        var dbConnection = app.infra.connectionFactory();
        var produtosDAO = new app.infra.ProdutosDAO(dbConnection);
        produtosDAO.save(produto, function (err, result) {
            console.log(err);
            res.format({
                html: function () {
                    res.redirect("/produtos");
                },
                json: function () {
                    res.status(200).json({success: true});
                }
            });
        });
        dbConnection.end();
    });
}
