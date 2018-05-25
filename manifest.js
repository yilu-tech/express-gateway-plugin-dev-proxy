


module.exports = {
  version: '1.0.0',
  init: function (pluginContext) {
    pluginContext.registerPolicy(require('./policies/dev-proxy'));//注册政策

    require('./ngrok').start(); 

  },
};
