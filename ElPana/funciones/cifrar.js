const fs = require('fs');
const aesjs = require('aes-js');

module.exports = {
    encriptar:function (data,res) {
        let { msg, tipo, pass } = data;
        console.log(msg, tipo, pass);
        const archivo = 'cifrado.txt';
        if(fs.existsSync(archivo)){
            console.log('si está');
            fs.unlink(archivo, (err) => {
                if (err) throw err;
                console.log('si se borro');
            });
        }else{
            console.log('no está');
        }
        if(tipo == 128){
            pass = pass.substring(0,16);
        }else if(tipo == 192){
            pass = pass.substring(0,24);
        }else{
            pass = pass.substring(0,32);
        }
        pass = aesjs.utils.utf8.toBytes(pass);
        msg = aesjs.utils.utf8.toBytes(msg);
        console.log(msg);
        let aesCtr = new aesjs.ModeOfOperation.ctr(pass, new aesjs.Counter(5));
        let encrypted = aesCtr.encrypt(msg);
        let hex = aesjs.utils.hex.fromBytes(encrypted);
        fs.writeFileSync(archivo, hex);
        console.log('escribido');
        res.redirect('/descargar');
    }
}