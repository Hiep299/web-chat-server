var server=require('ws').Server;
var s=new server({port:5001});
var EventEmitter = require ('events');
//bắt kết nối
s.on('connection',function(ws){
    //nhận và in tin nhắn
    ws.on('message',function(message){
         message=JSON.parse(message);
         if(message.type=="name"){
           ws.personName=message.data;
           return;

         }
        console.log("Received",message);
        s.clients.forEach(function e(client){
          if(client!=ws){
            client.send(JSON.stringify({
              name:ws.personName,
              data:message.data,

            }));
          }
          // if(client!=ws)
          // client.send(message);
        });

        // ws.send("From server"+message);
    });
    ws.on('close',function(){
      console.log("1 người dủng vừa out...")
    })
    console.log("1 người dùng vừa đăng nhập...")

    

})