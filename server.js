const express = require('express');   //servidor
const path = require('path');
const logger = require('./middleware/logger');
const infoSistema = require('./middleware/mem.js');
const fs = require('fs');
const app = express();
const mapScraper = require('./objeto');
const escrevedorLogDeRequests = require('./exemplos/escreveRegistro.js');


app.use(logger)    //inicia o middleware

const PORT = process.env.PORT || 8080;
app.listen(PORT, _ => {
    console.log(`1) Servidor em \n http://localhost:${PORT}`)
});



const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8082});

//quando detecta uma nova conexão
wss.on('connection', ws => {
    console.log('Novo cliente conectado!   ');
    

    //quando recebe uma mensagem do cliente
    ws.on('message', argMensagemRecebida => {
        console.log("\n recebeu um request do cliente:\n " + argMensagemRecebida);
        let dadosSistema = JSON.stringify(infoSistema.arrInfo)
        ws.send(dadosSistema);
        fs.appendFile('chat.txt', argMensagemRecebida + `\r\n`, function (err, data) {});
        
    })
})



//Isto é uma ROTA, ou url, neste caso, a rota que recebe os parametros de CIDADE e TIPO de google place
app.get('/buscar/:cidade/:tipo/:num', function(req, res) {       //MAIS ATUAL
    let cidade = req.params.cidade;     //olha a url recebida e busca o parâmetro "cidade"
    let tipo = req.params.tipo;         //olha a url recebida e busca o parâmetro "tipo"
    let quantosLugaresVisitar = req.params.num;    //olha a url recebida e busca o parâmetro "numero de lugares"

    mapScraper.start(cidade, tipo, quantosLugaresVisitar).then(result => {   //promessa começa aqui
        console.log("Servidor diz: \nok, vou enviar estes dados: \n" + result + "\n\n terminei de enviar! ✔ ✅"); 
        //console.log("ok, vou enviar estes dados: \n" + result[0].Nome + result[0].Endereço + result[0].celular); 
        res.send(result);  //envia o Resultado desta PROMESSA
        //const data = JSON.stringify(result)
        escrevedorLogDeRequests.escrevedor(result)
});  //promessa termina aqui
})



app.get('/teste', function(req, res) {

    let texto = "Oi, deu tudo certo! \n\nfaça um request na rota\n \n www.localhost:8080/buscar/<cidade>/<tipo de lugar>/<quantos lugares>\n\n 😃😎";
    res.send(JSON.stringify(texto));})



//envia arquivo index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname) + '/views/index.html');
});


/* // Emitido logo antes da saída de um processo do Node
process.on('uncaughtException', code => {
   
        fs.writeFileSync('/errorlog', 'Logou um erro, data: ' + Date.now() + "code");
        logger.log(`Process will exit with code: ${code}`)
        process.exit(code);
        });
 */

