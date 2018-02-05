
const fs = require("fs");

const mime = require('mime');

const reqGet = require('./get.js');

const http = require('http');

let options = {
    hostname:"192.168.4.22",
    port:3001,
    path:'/demo/static/json/picture.json',
    method:'GET'
}

let router = {
    init(url,res){
        // console.log("这是router");
        this.judge(url,res);
    },
    judge(url,res){  
        // console.log("judge",url.pathname);
        let type = url.pathname.split('/')[1];
        // console.log("type",type)
        if ( url.pathname=='/favicon.ico' ) { //去除favicon.ico 小图标
            this.readFile1('../static/404.html',res);
        } 

        if ( url.pathname=='/' || url.pathname == '/index.html' ) { //判断是不是首页
            this.readFile1('../static/index.html',res);
        } 

        if ( type=='static' ) { //静态资源
            this.handleSource(url.pathname,res);
        } else if( type=='api' ){

            console.log("调用api");

            let req = http.request(options,(res1)=>{

                let result = '';
                res1.on("data",(chunk)=>{
                    result += chunk;
                });
        
                res1.on('end',()=>{
                    // result = JSON.parse(result);
                    console.log("get",typeof(result),result);
                    res.writeHead(200,{'Content-Type':'application/json'});
                    res.end(result);
                });
        
                // return result;
            
            })
            
                req.on("error",(err)=>{
                    console.log(err)
                })
            
            
                //需要在请求结束之后执行end方法
                req.end();
            
            // this.handleSource('/static/json/picture.json',res);
        }


    },
    handleSource(pathname,res){
        let that = this;
        // console.log("handleSource",pathname);
        fs.access('..'+pathname,fs.R_OK,(err)=>{
            if (err) { //如果没有该文件，就跳转到404页面
                that.readFile1('../static/404.html',res);
            } else { //如果有该文件，就显示
                that.readFile1('..'+pathname,res);
            }
        })
    },
    readFile1(pathname,res){ //读取文件
        fs.readFile(pathname,(err,data)=>{
            // console.log( "1:",mime.getType(pathname) )
            res.writeHead(200,{'Content-Type':mime.getType(pathname)})
            res.end(data)
        })
    }


}

module.exports = router; 