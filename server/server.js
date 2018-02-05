

const http = require("http");

const url = require("url");

const host = 'localhost';

const router =  require("./router.js");

const port = 3033;

const server = http.createServer((req,res)=>{

    let strObj = url.parse(req.url,true,true); //获取地址栏信息
    // console.log(strObj);
    router.init(strObj,res);
   /*  res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
    res.write('你好');
    res.end(); */

})

server.listen(port,()=>{
    console.log('server is running at  '+host+':'+port);
})

