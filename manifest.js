


module.exports = {
  version: '1.0.0',
  schema: {
    $id: 'http://express-gateway.io/schemas/policies/dev-proxy-plugin.json',
  },
  init: function (pluginContext) {
    pluginContext.registerPolicy(require('./policies/dev-proxy'));//注册政策

    require('./ngrok').start(); 

  },
};
