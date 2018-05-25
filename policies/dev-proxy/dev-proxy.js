
var evilDns = require('evil-dns');
var baseHostname = ".gw.proxy";
evilDns.add('*'+baseHostname, '127.0.0.1');  //泛域名解析*.gw.proxy到本机127.0.0.1 访问 ngrokd Server.

exports.run =function (req,res,next,proxy){
    
    
    var hostname = targetHandler(req.hostname,req.url);

    if(!hostname){
        return next();    //必须return
    }

    var option = { 
      target: 'http://'+hostname+':10803'    //必须带http://
    };
    console.log(option,req.url)
    proxy.web(req, res, option);

}


function targetHandler(hostname,url){
    
    var moduleName = url.split("/")[1]; //0位是绝对路径
    
    var first = hostname.split('.')[0];
    if(first.indexOf('-') < 0){
        return null;
    }
    var items = first.split('--');
    for(var i in items){
        var item = items[i];
        if(item.indexOf(moduleName) > 0){
            var targetName = item.split('-')[0];
            return targetName + baseHostname;
        }
    }
    return null;

}