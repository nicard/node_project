module.exports = function (app) {
    app.get('/produtos', function (req, res) {
        var dbConnection = app.infra.connectionFactory();

        dbConnection.query("select * from produtos", function(err, result){
            res.render("produtos/lista", {lista: result});
        });

        dbConnection.end();
    });
}
