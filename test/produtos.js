var express = require('../config/express')();
var request = require('supertest')(express);

beforeEach(function(done){
    if(process.env.NODE_ENV == 'test') {
        var conn = express.infra.connectionFactory();
        conn.query("delete from produtos", function (ex, result) {
            if (!ex) {
                done();
            } else {
                console.log(ex);
            }
        });
    } else {
        throw new Error('NODE_ENV have to be \'test\'');
    }
});

describe('#ProdutosController', function(){
    it('#listagem json', function(endFunction){
        request.get('/produtos')
            .set('Accept','application/json')
            .expect('Content-Type',/json/)
            .expect(200, endFunction);
    });

    it('#cadastro de novo produto com dados invalidos', function(endFunction){
        request.post('/produtos')
            .send({name: "", value: "5", count: 2})
            .expect(400, endFunction);
    });

    it('#cadastro de novo produto com dados validos', function(endFunction){
        request.post('/produtos')
            .send({name: "novo via test", value: "1", count: 2})
            .expect(302, endFunction);
    });

    it('#cadastro de novo produto com dados validos(JSON)', function(endFunction){
        request.post('/produtos')
            .set('Accept','application/json')
            .send({name: "novo via test", value: "1", count: 2})
            .expect(200, endFunction);
    });
});