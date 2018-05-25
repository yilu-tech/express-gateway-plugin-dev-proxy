const httpProxy = require('http-proxy');
const logger = require('express-gateway/lib/logger').gateway;
var devProxy = require('./dev-proxy');


module.exports = {
  name: 'dev-proxy',
  policy: (actionParams) => {

    const proxy = httpProxy.createProxyServer({ changeOrigin: true });
    
    proxy.on('error', (err, _req, res) => {
      logger.warn(err);
  
      if (!res) {
        throw err;
      }
  
      if (!res.headersSent) {
        res.status(502).send(err);
      } else {
        res.end();
      }
    });
    
    return (req, res, next) => {
      devProxy.run(req,res,next,proxy);
    };
  }
};






