const { spawn } = require('child_process');
const path = require("path");

var os = require('os');
exports.start = function(){
    var command = path.join(__dirname,'ngrokd');
    var crt = path.join(__dirname,'server.crt');
    var key = path.join(__dirname,'server.key');

    var osType = os.type();
    if(process.env.APP_ENV != 'dev' || osType != 'Linux'){
      console.info('No start ngrokd.')
      return;
    }

    const ngrokd = spawn(command,['-tlsKey='+key,'-tlsCrt='+crt,'-domain=gw.proxy','-httpAddr=:10803','-httpsAddr=:10804','-tunnelAddr=:10805']);
    console.info(`Ngrokd in runing on http:10803 https:10804 tunnel:10805`);
    
    ngrokd.stdout.on('data', (data) => {
      // console.info(`stdout: ${data}`);
    });
    
    ngrokd.stderr.on('data', (data) => {
      console.info(`stderr: ${data}`);
    });
    
    ngrokd.on('close', (code) => {
      console.info(`--------》child process exited with code ${code}`);
    });
}
