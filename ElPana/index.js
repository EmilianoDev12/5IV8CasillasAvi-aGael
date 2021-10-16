const express = require('express');
const path = require('path');
const cifrarFun = require('./funciones/cifrar');
const descargarFun = require('./funciones/descargar');
const app = express();

app.set('port', process.env.PORT || 5000);

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.post('/cifrar', (req, res) => {
    cifrarFun.encriptar(req.body,res);
});

app.get('/descargar', (req, res) => {
    descargarFun.descargar(res);
});

const server = app.listen(app.get('port'), () => {
    console.log(`Server started on port`, app.get('port'));
});