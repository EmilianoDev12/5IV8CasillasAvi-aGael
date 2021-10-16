const fs = require('fs');
const aesjs = require('aes-js');
let fichero = '';

module.exports = {

    establecerF:function (siu) {
        fichero = siu;
    },
    descifrar:function (data,res) {
        let { pass, tipo } = data;
        fs.readFile(fichero + ".txt",'utf-8', function (err,dat) {
            if(tipo == 128){
                pass = pass.substring(0,16);
            }else if(tipo == 192){
                pass = pass.substring(0,24);
            }else{
                pass = pass.substring(0,32);
            }
            pass = aesjs.utils.utf8.toBytes(pass);
            let aesCtr = new aesjs.ModeOfOperation.ctr(pass, new aesjs.Counter(5));
            let a = String(dat);
            console.log(dat);
            console.log(a);
            var encryptedBytes = aesjs.utils.hex.toBytes(a);
            var decryptedBytes = aesCtr.decrypt(encryptedBytes);
 
            // Convert our bytes back into text
            var decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes);
            fs.writeFileSync(fichero + "descifrado.txt", decryptedText);
            fichero += 'descifrado.txt';
            console.log('escribido');
            res.redirect('/descargar');
        });
    },
    descargar:function (res) {
        res.download(fichero, fichero, function (err) {
            if(err){
                console.log(err);
            }else{
                console.log('quedo facha');
            }
        });
    }
}