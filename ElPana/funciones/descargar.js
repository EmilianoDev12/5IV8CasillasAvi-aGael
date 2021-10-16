module.exports = {
    descargar: function (res) {
        const archivo = 'cifrado.txt';
        res.download(archivo, archivo, function (err) {
            if(err){
                console.log(err);
            }else{
                console.log('quedo facha');
            }
        });
    }
}