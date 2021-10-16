const express = require('express');
const multer = require('multer');
const app = express();
const operaciones = require('./operaciones/codigo');

app.set('port', process.env.PORT || 4000);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const storage = multer.diskStorage({
    destination: '',
    filename: function (req,file,cb) {
        cb("",Date.now() + ".txt");
        operaciones.establecerF(Date.now());
    }
});

const upload = multer({
    storage: storage
});

app.get("/", (req,res) => {
    res.sendFile(__dirname + "/views/index.html");
});

app.post("/files",upload.single('archivo'),(req,res) => {
    operaciones.descifrar(req.body,res);
});

app.get('/descargar', (req, res) => {
    operaciones.descargar(res);
});

const server = app.listen(app.get('port'), () => {
    console.log(`Server started on port`, app.get('port'));
});