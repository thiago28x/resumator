let pera = {}

var os = require('os');

// Convert total memory to kb, mb and gb
var total_memory = os.totalmem();
var total_mem_in_kb = total_memory/1024;
var total_mem_in_mb = total_mem_in_kb/1024;
var total_mem_in_gb = total_mem_in_mb/1024;
   
total_mem_in_kb = Math.floor(total_mem_in_kb);
total_mem_in_mb = Math.floor(total_mem_in_mb);
total_mem_in_gb = Math.floor(total_mem_in_gb);
   
total_mem_in_mb = total_mem_in_mb%1024;
total_mem_in_kb = total_mem_in_kb%1024;
total_memory = total_memory%1024;

let memoriaLivre = os.freemem()/1024

let memoriaTotal = total_mem_in_gb + "GB " + total_mem_in_mb + "MB "
let cpuservidor = os.cpus()[0].model





var osu = require('node-os-utils')
var mem = osu.mem
var cpu = osu.cpu




 let abacaxi = async function melancia() { mem.info()
  .then(info => {
    return info
  })}





 let teste = async function melancia() { mem.info()
    .then(info => {
      //console.log(info)
      pera = info
      return info
    })}

 

function vercpu() {cpu.usage()
  .then(cpuPercentage => {
    console.log("CPU livre" + cpuPercentage) // 10.38
  })}





let arrInfo =
                {
                  "Memoria": memoriaTotal,
                  "CPU": cpuservidor
                }



//console.log("Meu array de dados \n\ : " +  JSON.stringify(arrInfo))

  



module.exports = { memoriaTotal, cpuservidor, arrInfo}
