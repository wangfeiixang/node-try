

const http = require('http');

let options = {
    hostname:"192.168.4.22",
    port:3001,
    path:'/demo/static/json/picture.json',
    method:'GET'
}



//返回一个请求对象

const reqSend = function () {
    let req = http.request(options,(res)=>{
        // console.log(`状态码：${res.statusCode}`)
        // console.log(`响应头：${JSON.stringify(res.headers)}`)
        let result = ''
        res.on("data",(chunk)=>{
            result += chunk;
        });

        res.on('end',()=>{
            console.log("get",result);
        });

        // return result;
    
    })
    
        req.on("error",(err)=>{
            console.log(err)
        })
    
    
    //需要在请求结束之后执行end方法
    req.end();

}



module.exports = reqSend;