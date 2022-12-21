const fs = require("fs");




let motivo = "motivo: "



/* const teste = async function dataAgora() {
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;
    return dateTime
  } */




/* async function loggerRequests(motivo) {
  console.info(`\n${dateTime} Request deu erro: \n ${motivo}\n`)
  fs.appendFile('log-requests.csv', motivo + "\n,", function (err, teste) {}); //fecha a função que escreve arquivo
} */



const logger = (req, res, next) => {
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;

    motivo = dateTime + `\n Request em: \n${req.protocol}://${req.get("host")}${req.originalUrl}\n ${motivo}\n`;
    console.log(motivo + '\n');
    fs.appendFile('abc-teste.txt', motivo, function (err, teste) {}); //fecha a função que escreve arquivo
    motivo = ""
    next();
}


module.exports = logger;



//fs.appendFile('abc-teste.txt', 'Chegou um request', function (err, teste) {}); //fecha a função que escreve arquivo

