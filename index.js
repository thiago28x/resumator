console.log("Processo inicializado corretamente... \n \n")
const fs = require('fs');
const puppeteer = require('puppeteer');




(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
 })
  const page = await browser.newPage();
  await page.setUserAgent(
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.125 Safari/537.36'
   )
  


  await page.setViewport({
    width: 1300,
    height: 900
  })


    let keyword = "marmita"
    let local = "floripa"


  await page.goto('https://www.google.com/maps/search/' + keyword + "+" + local);
  //await page.screenshot({path: 'example.png'});

  

    const captar = await page.evaluate(() => {
    const seletor = document.querySelectorAll("*[aria-label]");
    let lista = [];
    seletor.forEach((tag) => {
        lista.push(tag.innerText + "     ");
    });  

    

    return lista

});


  
  //console.log(JSON.stringify(captar));
  console.log("⭐   ENCONTRAMOS " + captar.length + " LUGARES \n")
  //console.log("~~~ ~~~~ ~~~~~~~ ~~~ ~~ Resultados: \n \n " + captar[0])
  const myArray = captar.toString().split("·");
  console.log(" LISTA COMEÇA AQUI PARA BAIXO ~~~~~~~~~~~~~ \n \n " + myArray + "\n \n ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")



  //thiago = JSON.stringify(captar)

  //funciona! pode mandar o myArray direto.. lembrar de verificar se tem como pegar direto do "captar"




  testmap.forEach((tag, i) => {

    var fs = require('fs');
    fs.appendFile('resultado.csv', `${"⭐Lugar: " + i } ${tag.replace(/,/g,"⋅").replace(/⋅⋅/g,"")}\n\n\n\n`, function (err, data) {});
});  


  //await browser.close();

})();           




/*          const labels = document.querySelectorAll("*[aria-label]");
const list = Array.from(labels, (el, i) => el.getAttribute('aria-label'));

console.log(list); */
