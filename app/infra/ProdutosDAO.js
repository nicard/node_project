function ProdutosDAO(dbConnection) {
    this._dbConnection = dbConnection;
}

ProdutosDAO.prototype.lista = function (callback) {
    this._dbConnection.query("select * from produtos", callback);
}

ProdutosDAO.prototype.remove = function (id, callback) {
    this._dbConnection.query("delete from produtos where id = '" + id + "'", callback);
}

ProdutosDAO.prototype.save = function (produto, callback) {
    this._dbConnection.query("insert into produtos set ?", produto, callback);
}

module.exports = function () {
    return ProdutosDAO;
}
